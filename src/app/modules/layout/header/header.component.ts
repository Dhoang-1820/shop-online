import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core'
import { finalize } from 'rxjs';
import { AuthenService } from 'src/app/services/authen.service';
import { BearerService } from 'src/app/services/bearer.service'
import { CartService } from 'src/app/services/cart.service';

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


    constructor(private bearerService: BearerService, private auth: AuthenService, private cartService: CartService) {
        this.bearerService.headerPass.subscribe(data => this.setHeaderInfo(data))
    }

    ngOnInit(): void {
        
    }

    setHeaderInfo(info: any) {
        this.userInfo = this.auth.getUserLoggedIn();
        this.getCart();
    }

    getCart(): void {
        this.cartService.getCartByUserId(this.userInfo.id).pipe(
        finalize(() => {
            
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

    onclick(): void {
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
}
