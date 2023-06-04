import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { finalize } from 'rxjs';
import { AuthenService } from 'src/app/services/authen.service';
import { BearerService } from 'src/app/services/bearer.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  items!: MenuItem[];
    
  home!: MenuItem;

  dataLoading: boolean;
  userInfo: any;
  carts: any[];
  totalMoney: number;
  addCartLoading: boolean;

  constructor(private cartService: CartService, private router: Router, private auth: AuthenService, private bearerService: BearerService, private productService: ProductService) {
    this.dataLoading = false;
    this.addCartLoading = false;
    this.carts = [];
    this.totalMoney = 0;
  }

  ngOnInit(): void {
    this.items = [
      {label: 'Danh mục'},
      {label: 'Giỏ hàng'}
    ];
    this.userInfo = this.auth.getUserLoggedIn()
    this.home = {icon: 'pi pi-home'};
    if (this.userInfo) {

      this.getCartByUserId();
    }
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

  onChangeProductQuantity(cart: any): void {
    let quantity = cart.quantity;
    if (quantity === 0) {
      this.removeCart(cart.product.id)
    } else {
      this.saveCart(cart, cart.product.id);
    }
  }

  removeCart(productId: number): void {
    this.dataLoading = true;
    this.cartService.removeCart(this.userInfo.id, productId).pipe(
      finalize(() => {
        this.getCartByUserId();
      })
    ).subscribe(data => console.log(data))
  }

  getTotalMoney(): void {
    this.totalMoney = 0;
    this.carts.forEach(item => {
      this.totalMoney += item.product.price * item.quantity
    })
  }

  checkOut(): void {
    
  }

  saveCart(cart: any, productId: number): void {
    this.addCartLoading = true;
    this.cartService.putCart(cart, this.userInfo.id, productId).pipe(
      finalize(() => {
        this.getTotalMoney();
        this.addCartLoading = false;
        let infor = {userInfo: this.userInfo, cartInfo: this.carts};
        this.bearerService.pass2Header(infor);
      })
    ).subscribe(cart => this.carts = cart)
  }
 
}
