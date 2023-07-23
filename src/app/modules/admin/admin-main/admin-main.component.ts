import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { DasboardService } from 'src/app/services/dasboard.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./../css/main.scss']
})
export class AdminMainComponent implements OnInit {

  completedOrder: any[] = []
  recentOrder: any[] = []
  lowStockProduct: any[] = []
  categories: any[] = []
  dataLoading: boolean = false;

  constructor(private categoryService: CategoryService, private dashboardService: DasboardService) { }

  ngOnInit(): void {
    this.getAllCategory()
    this.getDashboard()
  }

  getDashboard(): void {
    let temp: any;
    this.dataLoading = true;
    this.dashboardService.getDashboard().pipe(
      finalize(() => {
          this.dataLoading = false;
          this.recentOrder = temp.recentOrder;
          this.lowStockProduct = temp.lowStockProduct
          this.completedOrder = temp.completedOrder
      }),
  )
  .subscribe((data) => temp = data)
  }

  getCategoryById(id: number): any {
    let category = this.categories.find(item => item.id === id)
    return category;
  }

  getAllCategory(): void {
    this.categoryService.getAllCategory().pipe(
      finalize(() => console.log(this.categories))
    ).subscribe(data => this.categories = data)
  }

}
