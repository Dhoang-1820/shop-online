import { Component } from '@angular/core';
import { BearerService } from './services/bearer.service';
import { AuthenService } from './services/authen.service';
import { CartService } from './services/cart.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shop-online';

  userInfor: any;
  cartInfo: any;

  constructor(private bearerService: BearerService, private auth: AuthenService, private cartService: CartService) { 
    
  }

  ngAfterContentInit() {
    this.userInfor = this.auth.getUserLoggedIn();
    if (this.userInfor) {
      this.cartService.getCartByUserId(this.userInfor.id).pipe(
        finalize(() => {
          let infor = {userInfo: this.userInfor, cartInfo: this.cartInfo};
          console.log('info',infor)
          this.bearerService.pass2Header(infor);
        })
      ).subscribe(quantity => this.cartInfo = quantity)
      
    }
    
  }
}
