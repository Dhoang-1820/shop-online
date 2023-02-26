import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  items!: MenuItem[];
    
  home!: MenuItem;

  value18: number = 1;

  constructor() { }

  

  ngOnInit(): void {
    this.items = [
      {label: 'Category'},
      {label: 'Men'},
      {label: 'Watches'}
    ];
    
    this.home = {icon: 'pi pi-home'};
  }

}
