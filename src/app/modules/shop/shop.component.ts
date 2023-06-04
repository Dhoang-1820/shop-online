import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { MenuItem } from 'primeng/api'
import { AuthenService } from 'src/app/services/authen.service'
import { BearerService } from 'src/app/services/bearer.service'
import { CartService } from 'src/app/services/cart.service'
import { ProductService } from 'src/app/services/product.service'
import { Product } from '../model/Product'
import { finalize } from 'rxjs'
import { CategoryService } from 'src/app/services/category.service'

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss'],
})
export class ShopComponent implements OnInit {
    items!: MenuItem[]

    home!: MenuItem

    userInfo: any

    carts: any[]
    categories: any[]
    products: Product[]
    recommendedProducts: Product[]
    dataLoading: boolean

    message: string = ''
    approvalText: string = ''
    addCartLoading: boolean
    isUserLoggedIn: boolean

    selectedCategory!: number;

    constructor(
        private cartService: CartService,
        private router: Router,
        private auth: AuthenService,
        private bearerService: BearerService,
        private productService: ProductService,
        private categoryService: CategoryService
    ) {
        this.products = []
        this.categories = []
        this.recommendedProducts = []
        this.carts = []
        this.dataLoading = false
        this.addCartLoading = false
        this.isUserLoggedIn = this.auth.isUserLoggedIn()
    }

    ngOnInit(): void {
        this.items = [{ label: 'Danh mục' }, { label: 'Cửa hàng' }]

        this.home = { icon: 'pi pi-home' }

        this.getAllProduct();
        this.getRecommendedProduct();
        this.getAllCategory();
        this.userInfo = this.auth.getUserLoggedIn()
    }

    getProductByCategoryId(categoryId: number): void {
        this.dataLoading = true
        if (this.selectedCategory === categoryId) {
            this.selectedCategory = 0;
            this.getAllProduct();
        } else {
            this.selectedCategory = categoryId;
        }
        this.productService.getProductByCategoryId(categoryId).pipe(
            finalize(() => {
                this.dataLoading = false;
            })
        )
        .subscribe(data => this.products = data)
    }

    getAllCategory(): void{
      this.dataLoading = true
      this.categoryService.getAllCategory().pipe().subscribe(data => this.categories = data)
    }

    getAllProduct(): void {
        this.dataLoading = true
        this.productService
            .getAllProduct()
            .pipe(
                finalize(() => {
                    this.dataLoading = false
                }),
            )
            .subscribe((data) => (this.products = data))
    }

    getRecommendedProduct(): void {
        this.dataLoading = true
        this.productService
            .getRecomendedProduct()
            .pipe(
                finalize(() => {
                    this.dataLoading = false
                    console.log(this.recommendedProducts)
                }),
            )
            .subscribe((data) => (this.recommendedProducts = data))
    }

    saveCart(productId: number): void {
        this.addCartLoading = true
        let user = this.auth.getUserLoggedIn()
        this.cartService
            .saveCart(user.id, productId, 1)
            .pipe(
                finalize(() => {
                    this.addCartLoading = false
                    let infor = { userInfo: this.userInfo, cartInfo: this.carts }
                    console.log('cart', this.carts)
                    this.bearerService.pass2Header(infor)
                }),
            )
            .subscribe((cart) => (this.carts = cart))
    }

    addToCart(productId: number): void {
        if (this.isUserLoggedIn) {
            this.saveCart(productId)
        } else {
            this.router.navigate(['/login'])
        }
    }
}
