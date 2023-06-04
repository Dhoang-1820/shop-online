import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { finalize } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../model/Product';
import { AuthenService } from 'src/app/services/authen.service';
import { CartService } from 'src/app/services/cart.service';
import { BearerService } from 'src/app/services/bearer.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  items!: MenuItem[];
    
  home!: MenuItem;

  productQuant: number;

  productId!: number;
  dataLoading: boolean;
  addCartLoading: boolean;
  userInfo: any;
  isUserLoggedIn: boolean;
  carts: any[];

  product: Product;

  constructor(private bearerService: BearerService, private cartService: CartService, private router: Router, private auth: AuthenService, private route: ActivatedRoute, private productService: ProductService) {
    this.product = new Product();
    this.dataLoading = false;
    this.addCartLoading = false;
    this.productQuant = 1;
    this.isUserLoggedIn = this.auth.isUserLoggedIn();
    this.carts = [];
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.getProductById(this.productId)
    this.userInfo = this.auth.getUserLoggedIn()
  }

  getProductById(productId: number): void {
    this.dataLoading = true;
    this.productService.getProductById(productId).pipe(
        finalize(() => {
            this.items = [
              {label: 'Danh mục'},
              {label: this.product.productName},
            ];
            
            this.home = {icon: 'pi pi-home'};
            window.scroll({ 
              top: 0, 
              left: 0, 
              behavior: 'smooth' 
            });
            this.dataLoading = false;
        })
    ).subscribe(data => this.product = data)
  }

  saveCart(productId: number): void {
    let user = this.auth.getUserLoggedIn();
    this.addCartLoading = true;
    this.cartService.saveCart(user.id, productId, this.productQuant).pipe(
      finalize(() => {
        this.addCartLoading = false;
        let infor = {userInfo: this.userInfo, cartInfo: this.carts};
        this.bearerService.pass2Header(infor);
      })
    ).subscribe(cart => this.carts = cart)
  }
  
  addToCart(productId: number): void {
    if (this.isUserLoggedIn) {
      this.saveCart(productId)
    } else {
      this.router.navigate(['/login']);
    }
  }

  saveCartWithOne(productId: number): void {
    this.addCartLoading = true;
    let user = this.auth.getUserLoggedIn();
    this.cartService.saveCart(user.id, productId, 1).pipe(
      finalize(() => {
        this.addCartLoading = false;
        let infor = {userInfo: this.userInfo, cartInfo: this.carts};
        console.log('cart', this.carts)
        this.bearerService.pass2Header(infor);
      })
    ).subscribe(cart => this.carts = cart)
  }
  
  addToCartWithOne(productId: number): void {
      if (this.isUserLoggedIn) {
        this.saveCartWithOne(productId)
      } else {
        this.router.navigate(['/login']);
      }
  }

}
