import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core'
import { finalize } from 'rxjs';
import { AuthenService } from 'src/app/services/authen.service';
import { BearerService } from 'src/app/services/bearer.service'
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from '../../model/Product';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    headerRef!: any
    @ViewChild('header_parent') input!: ElementRef<HTMLInputElement>

    @Input()
    isFetch!: boolean;

    message: string = ''
    approvalText: string = ''

    userInfo: any;
    cartInfo: any;
    totalMoney: number;
    searchResult: any[];
    dataLoading: boolean
    products: Product[]


    constructor(private router: Router, private productService: ProductService, private bearerService: BearerService, private auth: AuthenService, private cartService: CartService) {
        this.bearerService.headerPass.subscribe(data => this.setHeaderInfo(data))
        this.totalMoney = 0;
        this.searchResult = []
        this.products = []
        this.dataLoading = false
    }

    ngOnInit(): void {

        this.getAllProduct();
        
    }

    searchProduct(event: any): void {
        let searchText = event.target.value;
        console.log(searchText)
        if (searchText != '') {
            this.searchResult = this.products.filter((item: Product) => item.productName.toLowerCase().includes(searchText.toLowerCase()))
        } else {
            this.searchResult = [];
        }
    }

    getProduct(product: any): void {
        this.searchResult = [];
        this.router.navigate(['product', product.id])
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


    setHeaderInfo(info: any) {
        this.userInfo = this.auth.getUserLoggedIn();
        this.getCart();
    }

    getCart(): void {
        this.cartService.getCartByUserId(this.userInfo.id).pipe(
        finalize(() => {
            this.getTotalMoney();
        })
        ).subscribe(quantity => this.cartInfo = quantity)
    }

    
    ngAfterViewInit() {
        window.addEventListener('scroll', this.slideHeader)
    }

    test(): void {
        this.bearerService.valuePassed$.pipe (
            
        ).subscribe(msg => this.test2(msg))

        
    }

    test2({ state, key2 }: { state: string; key2: number }): void {
        console.log('text', state)
    }

    getUserDetail(): void {
        console.log('user info', this.userInfo)
    }

    slideHeader = () => {
        const scrolled = window.screenTop || window.scrollY
        this.input.nativeElement.style.transition = 'all 1s'
        if (scrolled >= 600) {
            this.input.nativeElement.style.height = 50 + 'px'
        } else {
            this.input.nativeElement.style.height = 80 + 'px'
        }
    }

    addEven(): void {
        window.addEventListener('scroll', this.slideHeader)
    }

    getTotalMoney(): void {
        this.totalMoney = 0;
        console.log('carts',this.cartInfo)
        this.cartInfo.forEach((item: any) => {
            this.totalMoney += item.product.price * item.quantity
        })
    }
}
