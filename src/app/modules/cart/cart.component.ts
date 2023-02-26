import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

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
