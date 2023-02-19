import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  provices: any[];
  districts: any[];
  wards: any[];
  provinceSelected: any;
  districtSelected: any;
  wardSelected: any;

  constructor(private addressService: AddressService) { 
    this.provices = [];
    this.districts = [];
    this.wards = [];
  }

  ngOnInit(): void {
    this.getAllProvices();
  }

  getAllProvices(): void {
    this.addressService.getProvices().pipe(
      finalize(() => console.log(this.provices))
    ).subscribe(data => this.provices = data)
  }

  getDistrictsOfProvice(target: any): void {
    this.wards = [];
    const province = target.value
    console.log(this.provinceSelected)
    this.addressService.getDistrictsOfProvince(this.provinceSelected.code).pipe(
      finalize(() => console.log('districts',this.districts))
    ).subscribe(data => this.districts = data.districts)
  }

  getWardsOfDistrict(target: any): void {
    const district = target.value
    console.log(district)
    
    this.addressService.getWardsOfDistrict(this.districtSelected.code).pipe(
      finalize(() => console.log('districts',this.wards))
    ).subscribe(data => this.wards = data.wards)
  }

}
