import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../model/Category';
import { CategoryService } from 'src/app/services/category.service';
import { finalize } from 'rxjs';
import { Brand } from '../../model/Brand';
import { BrandService } from 'src/app/services/brand.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./../css/main.scss']
})
export class BrandComponent implements OnInit {

  categoryForm: FormGroup;

  brands: Brand[];

  brand: Brand;

  brandSubmit: Brand;
  dataLoading: boolean = false;
  file!: File;
  fileBase64!: any;
  isEdit: boolean = false;

  constructor(private messageService: MessageService, private brandService: BrandService) {
    this.brand = new Brand()
    this.brand.imageBase64 = null;
    this.brandSubmit = new Brand()
    this.brands = []

    this.categoryForm = new FormGroup({
      name: new FormControl(this.brand.name, [Validators.required]),
      note: new FormControl(this.brand.descipttion),
    })
  }

  ngOnInit(): void {
    this.categoryForm.get('name')?.valueChanges.subscribe(name => this.brand.name = name)
    this.categoryForm.get('name')?.valueChanges.subscribe(note => this.brand.descipttion = note)
    this.getAllCategory()
  }

  getAllCategory(): void {
    this.dataLoading = true;
    this.brandService.getAllBrand().pipe(
      finalize(() => {
        console.log(this.brands)
        this.dataLoading = false;
      })
    ).subscribe(data => this.brands = data)
  }

  addCategory(): void {
    this.dataLoading = true;
    if (!this.isEdit) {
      this.brand.id = null;
      this.brandService.saveBrand(this.brand).pipe(
        finalize(() => {
          this.showToastSuccess()
          this.getAllCategory();
          this.brand.imageBase64 = '';
        })
      )
      .subscribe(data => console.log(data))
    } else {
      this.brandService.editBrand(this.brandSubmit).pipe(
        finalize(() => {
          this.getAllCategory();
          this.showToastSuccess()
          this.isEdit = false;
        })
      )
      .subscribe(data => console.log(data))
    }
    
  }

  prepareProduct2Edit(category: Category): void {
    this.categoryForm.get('name')?.setValue(category.name)
    this.categoryForm.get('note')?.setValue(category.note)
    
    this.brandSubmit = Object.assign({}, this.brand)
    this.brandSubmit.id = category.id;

     console.log('category',this.brand)
    console.log('categorySubmit',this.brandSubmit)

  }

  editCategory(category: any): void {
    this.isEdit = true;
    this.prepareProduct2Edit(category);
  }

  deleteCategory(brand: any): void {
    this.dataLoading = true;
    this.brandService.deleteBrand(brand.id).pipe(
      finalize(() => {
        this.getAllCategory();
      })
    ).subscribe(data => console.log(data))
  }

  onChange(event: any) {
    const _this = this;
    this.file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = function () {
      _this.fileBase64 = reader.result;
      _this.brand.imageBase64 = _this.fileBase64;
      _this.brandSubmit.imageBase64 = _this.fileBase64;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
    console.log(this.brand)
    console.log(this.brandSubmit)
  }

  showToastSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Sucess', detail: 'Sucess' });
  }
}
