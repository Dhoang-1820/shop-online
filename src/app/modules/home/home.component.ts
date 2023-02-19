import { Component, OnInit } from '@angular/core';
import {CheckboxModule} from 'primeng/checkbox';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  selectedCities: string[] = [];

  selectedCategories: any[] = ['Technology', 'Sports'];

  categories: any[] = [{name: 'Accounting', key: 'A'}, {name: 'Marketing', key: 'M'}, {name: 'Production', key: 'P'}, {name: 'Research', key: 'R'}];

  checked: boolean = false;

  is: boolean = true;

  constructor() { }

  ngOnInit(): void {
    
  }

  imgCollection: Array<object> = [
    {
      image: 'https://cdn-crownx.winmart.vn/images/prod/ch%C4%83m%20s%C3%B3c%20c%C3%A1%20nh%C3%A2n_1180x400%20copy%202_05361143-5dea-47b1-bca8-d5b27de08bc5.jpg',
      thumbImage: 'https://cdn-crownx.winmart.vn/images/prod/ch%C4%83m%20s%C3%B3c%20c%C3%A1%20nh%C3%A2n_1180x400%20copy%202_05361143-5dea-47b1-bca8-d5b27de08bc5.jpg',
      alt: 'Image 1',
      title: ''
    }, {
      image: 'https://ss-hn.fptvds.vn/images/2022/main-banner-_trao-rau-cu-qua-sach-01.jpg',
      thumbImage: 'https://ss-hn.fptvds.vn/images/2022/main-banner-_trao-rau-cu-qua-sach-01.jpg',
      title: '',
      alt: 'Image 2'
    }, {
      image: 'https://ss-hn.fptvds.vn/images/2022/online1_867x400.jpg',
      thumbImage: 'https://ss-hn.fptvds.vn/images/2022/online1_867x400.jpg',
      title: '',
      alt: 'Image 3'
    }
];

  

}
