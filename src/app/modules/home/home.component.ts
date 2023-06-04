import { Component, OnInit } from '@angular/core'
import { finalize } from 'rxjs'
import { BearerService } from 'src/app/services/bearer.service'
import { ProductService } from 'src/app/services/product.service'
import { Product } from '../model/Product'
import { AuthenService } from 'src/app/services/authen.service'
import { CartService } from 'src/app/services/cart.service'
import { Router } from '@angular/router'

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    selectedCities: string[] = []

    selectedCategories: any[] = ['Technology', 'Sports']

    categories: any[] = [
        { name: 'Accounting', key: 'A' },
        { name: 'Marketing', key: 'M' },
        { name: 'Production', key: 'P' },
        { name: 'Research', key: 'R' },
    ]

    products: Product[];
    recommendedProducts: Product[];

    dataLoading: boolean;
    userInfo: any;

    carts: any[];

    message: string = ''
    approvalText: string = ''
    addCartLoading: boolean;
    isUserLoggedIn: boolean;

    constructor(private cartService: CartService, private router: Router, private auth: AuthenService, private bearerService: BearerService, private productService: ProductService) {
        this.products = [];
        this.recommendedProducts = [];
        this.carts = [];
        this.dataLoading = false;
        this.addCartLoading = false;
        this.isUserLoggedIn = this.auth.isUserLoggedIn();
    }

    ngOnInit(): void {
        this.getAllProduct();
        this.getRecommendedProduct();
        this.userInfo = this.auth.getUserLoggedIn()
    }
  
    imgCollection: Array<object> = [
        {
            image: 'https://cdn-crownx.winmart.vn/images/prod/ch%C4%83m%20s%C3%B3c%20c%C3%A1%20nh%C3%A2n_1180x400%20copy%202_05361143-5dea-47b1-bca8-d5b27de08bc5.jpg',
            thumbImage:
                'https://cdn-crownx.winmart.vn/images/prod/ch%C4%83m%20s%C3%B3c%20c%C3%A1%20nh%C3%A2n_1180x400%20copy%202_05361143-5dea-47b1-bca8-d5b27de08bc5.jpg',
            alt: 'Image 1',
            title: '',
        },
        {
            image: 'https://ss-hn.fptvds.vn/images/2022/main-banner-_trao-rau-cu-qua-sach-01.jpg',
            thumbImage: 'https://ss-hn.fptvds.vn/images/2022/main-banner-_trao-rau-cu-qua-sach-01.jpg',
            title: '',
            alt: 'Image 2',
        },
        {
            image: 'https://ss-hn.fptvds.vn/images/2022/online1_867x400.jpg',
            thumbImage: 'https://ss-hn.fptvds.vn/images/2022/online1_867x400.jpg',
            title: '',
            alt: 'Image 3',
        },
    ]

    getAllProduct(): void {
        this.dataLoading = true;
        this.productService.getAllProduct().pipe(
            finalize(() => {
                this.dataLoading = false;
            })
        ).subscribe(data => this.products = data)
    }

    getRecommendedProduct(): void {
        this.dataLoading = true;
        this.productService.getRecomendedProduct().pipe(
            finalize(() => {
                this.dataLoading = false;
                console.log(this.recommendedProducts)
            })
        ).subscribe(data => this.recommendedProducts = data)
    }

    saveCart(productId: number): void {
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
      
    addToCart(productId: number): void {
        if (this.isUserLoggedIn) {
          this.saveCart(productId)
        } else {
          this.router.navigate(['/login']);
        }
    }
}
