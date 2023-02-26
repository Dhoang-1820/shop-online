import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  items!: MenuItem[];
    
  home!: MenuItem;

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
