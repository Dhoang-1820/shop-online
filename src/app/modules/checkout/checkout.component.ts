import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { finalize } from 'rxjs';
import { AddressService } from 'src/app/services/address.service';
import { AuthenService } from 'src/app/services/authen.service';
import { BearerService } from 'src/app/services/bearer.service';
import { CartService } from 'src/app/services/cart.service';
import { Order, OrderDetailList } from '../model/Order';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers: [MessageService]
})
export class CheckoutComponent implements OnInit {
  provices: any[];
  districts: any[];
  wards: any[];
  provinceSelected: any;
  districtSelected: any;
  wardSelected: any;

  items!: MenuItem[];
    
  home!: MenuItem;

  selectedProvice: any;
  userInfo: any;
  dataLoading: boolean;
  carts: any[];
  totalMoney: number;

  checkoutInfoForm: FormGroup;

  firstName: string;
  lastName: string;
  userProvince: string;
  userDistrict: string;
  userWard: string;
  userAddressDetail: string;
  userEmail: string;
  userPhone: string;
  paymenMode: string = "Thanh toán khi nhận hàng"

  orderSubmit: Order;

  orderDetailList: OrderDetailList;

  constructor(private messageService: MessageService, private orderService: CheckoutService, private bearerService: BearerService, private cartService: CartService, private addressService: AddressService, private auth: AuthenService) { 
    this.orderSubmit = new Order();
    this.orderDetailList = new OrderDetailList();
    this.provices = [];
    this.districts = [];
    this.wards = [];
    this.items = [
      {label: 'Danh mục'},
      {label: 'Thanh toán'},
    ];
    this.home = {icon: 'pi pi-home'};
    this.firstName = "";
    this.lastName = "";
    this.userEmail = "";
    this.userPhone = "";
    this.userProvince = "";
    this.userDistrict = "";
    this.userWard = "";
    this.userAddressDetail = "";

    this.checkoutInfoForm = new FormGroup({
      firstName: new FormControl(this.firstName, [Validators.required]),
      lastName: new FormControl(this.lastName, [Validators.required]),
      provices: new FormControl(this.userProvince, [Validators.required]),
      districts: new FormControl(this.userDistrict, [Validators.required]),
      wards: new FormControl(this.userWard, [Validators.required]),
      addressDetail: new FormControl(this.userAddressDetail, [Validators.required]),
      email: new FormControl(this.userEmail, [Validators.email]),
      phones: new FormControl(this.userPhone, [Validators.required]),
    })

    this.dataLoading = false;
    this.carts = [];
    this.totalMoney = 0;

    console.log('asg',this.checkoutInfoForm.get('firstName')?.hasError('required'))
  }

  ngOnInit(): void {
    this.getAllProvices();
    this.checkoutInfoForm.get('firstName')?.valueChanges.subscribe(firstName => this.firstName = firstName)
    this.checkoutInfoForm.get('lastName')?.valueChanges.subscribe(lastName => this.lastName = lastName)
    this.checkoutInfoForm.get('email')?.valueChanges.subscribe(userEmail => this.userEmail = userEmail)
    this.checkoutInfoForm.get('phone')?.valueChanges.subscribe(userPhone => this.userPhone = userPhone)
    this.checkoutInfoForm.get('addressDetail')?.valueChanges.subscribe(userAddressDetail => this.userAddressDetail = userAddressDetail)
    
    this.checkoutInfoForm.get('provices')?.valueChanges.subscribe(provices => {
      this.userProvince = provices.name;
      this.provinceSelected = provices;
      this.getDistrictsOfProvice();
    })
    this.checkoutInfoForm.get('districts')?.valueChanges.subscribe(districts => {
      this.userDistrict = districts.name;
      this.districtSelected = districts;
      this.getWardsOfDistrict();
    })
    this.checkoutInfoForm.get('wards')?.valueChanges.subscribe(userWard => {
      this.userWard = userWard;
      this.wardSelected = userWard
    })
    this.userInfo = this.auth.getUserLoggedIn();
    if (this.userInfo) {
      this.getCartByUserId();
    }
  }

  showToastError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Vui lòng nhập đầy đủ thông tin' });
  }

  getAllProvices(): void {
    this.addressService.getProvices().pipe(
      finalize(() => console.log(this.provices))
    ).subscribe(data => this.provices = data)
  }

  getDistrictsOfProvice(): void {
    this.wards = [];
    this.addressService.getDistrictsOfProvince(this.provinceSelected.code).pipe(
      finalize(() => console.log('districts',this.districts))
    ).subscribe(data => this.districts = data.districts)
  }

  getWardsOfDistrict(): void {
    this.addressService.getWardsOfDistrict(this.districtSelected.code).pipe(
      finalize(() => console.log('wards', this.wards))
    ).subscribe(data => this.wards = data.wards)
  }

  getCartByUserId(): void {
    this.dataLoading = true;
    this.cartService.getCartByUserId(this.userInfo.id).pipe(
      finalize(() => {
        this.dataLoading = false;
        this.getTotalMoney();
        let infor = {userInfo: this.userInfo, cartInfo: this.carts};
        this.bearerService.pass2Header(infor);
        window.scroll({ 
          top: 0, 
          left: 0, 
          behavior: 'smooth' 
        });
      })
    ).subscribe(carts => this.carts = carts)
  }

  getTotalMoney(): void {
    this.totalMoney = 0;
    console.log('carts',this.carts)
    this.carts.forEach(item => {
      this.totalMoney += item.product.price * item.quantity
    })
  }

  getOrderDetailList(): OrderDetailList[] {
    let result: OrderDetailList[] = [];
    this.carts.forEach(item => {
      this.orderDetailList = new OrderDetailList();
      this.orderDetailList.productId = item.product.id;
      this.orderDetailList.quantity = item.quantity;
      this.orderDetailList.unitPrice = item.product.price;
      result.push(this.orderDetailList)
    })
    return result;
  }

  prepareRequest(): void {
    this.getTotalMoney();
    this.orderSubmit.date = new Date();
    this.orderSubmit.paymentMode = this.paymenMode;
    this.orderSubmit.status = "Đang xử lý";
    this.orderSubmit.totalPrice = this.totalMoney;
    this.orderSubmit.userId = this.userInfo.id;
    this.orderSubmit.orderDetailList = this.getOrderDetailList();
  }

  deleteUserCart(): void {
    this.cartService.removeAllCart(this.userInfo.id).pipe(
      finalize(() => {
        this.getCartByUserId();
      })
    ).subscribe(data => console.log(data))
  }

  submit(): void {
    let isValid = this.checkoutInfoForm.valid;
    if (isValid) {
      this.prepareRequest();
      console.log(this.orderSubmit)
      this.dataLoading = true;
      this.orderService.saveOrder(this.orderSubmit).pipe(
        finalize(() => {
          this.deleteUserCart();
        })
      ).subscribe(data => console.log(data))
    } else {
      this.checkoutInfoForm.markAllAsTouched();
      this.showToastError();
    }
    
  }

}
