import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { MenuItem } from 'primeng/api'
import { finalize } from 'rxjs'
import { AddressService } from 'src/app/services/address.service'
import { AuthenService } from 'src/app/services/authen.service'
import { BearerService } from 'src/app/services/bearer.service'
import { CartService } from 'src/app/services/cart.service'
import { OrderService } from 'src/app/services/order.service'
import { ProductService } from 'src/app/services/product.service'
import { UserService } from 'src/app/services/user.service'

interface Product {
  date?: any
  id?: number
  orderDetailList?: []
  paymentMode?: string
  status?: string
  totalPrice?: number
  userId?: number
}

interface Filter {
  id?: number,
  display?: string;
}

@Component({
  selector: 'app-admin-order',
  templateUrl: './admin-order.component.html',
  styleUrls: ['./../css/main.scss']
})
export class AdminOrderComponent implements OnInit {

  orderShowed: Product[]
  selectedFilter: number;
  filter: Filter[];
  dataLoading: boolean;
  orders: any[]
  userInfo: any

  constructor(private router: Router, private addressService: AddressService, private orderService: OrderService, private userService: UserService, private auth: AuthenService, private bearerService: BearerService, private productService: ProductService) {
    this.orderShowed = []
    this.orders = []
     this.dataLoading = false
    this.selectedFilter = 1;
    this.filter = [
        {
            id: 1,
            display: 'Đang xử lý'
        },
        {
            id: 2,
            display: 'Đang giao'
        },
        {
            id: 3,
            display: 'Đã giao'
        },
        {
            id: 4,
            display: 'Đã huỷ'
        },
    ]
  }

  ngOnInit(): void {
    this.userInfo = this.auth.getUserLoggedIn();
    this.getAllOrder()
  }

  getAllOrder(): void {
    this.dataLoading = true
    this.orderService.getAllOrder().pipe(
        finalize(() => {
            this.dataLoading = false;
            this.orderShowed = this.orders;
            this.orderShowed.forEach(item => item.date = new Date(item.date));
            this.changeFilter({id: 1, display: 'Đang xử lý'});
        }),
    )
    .subscribe((order) => (this.orders = order))
}

  changeFilter(target: any): void {
      console.log(target)
      this.selectedFilter = target.id;
      this.orderShowed = this.orders.filter(item => item.status === target.display);
      this.orderShowed.forEach(item => item.date = new Date(item.date));
  }

  confirmOrder(order: any): void {
    this.dataLoading = true
    order.status = 'Đang giao';
    this.orderService.changeOrderStatus(order).pipe(
      finalize(() => {
        this.getAllOrder()
      })
    )
    .subscribe(data => console.log(data))
  }

  cancelOrder(order: any): void {
    this.dataLoading = true
    order.status = 'Đã huỷ';
    this.orderService.changeOrderStatus(order).pipe(
      finalize(() => {
        this.getAllOrder()
      })
    )
    .subscribe(data => console.log(data))
  }

  deliveredOrder(order: any): void {
    this.dataLoading = true
    order.status = 'Đã giao';
    this.orderService.changeOrderStatus(order).pipe(
      finalize(() => {
        this.getAllOrder()
      })
    )
    .subscribe(data => console.log(data))
  }

}
