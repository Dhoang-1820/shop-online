import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './modules/about/about.component';
import { AccountComponent } from './modules/account/account.component';
import { CartComponent } from './modules/cart/cart.component';
import { CheckoutComponent } from './modules/checkout/checkout.component';
import { ContactComponent } from './modules/contact/contact.component';
import { HomeComponent } from './modules/home/home.component';
import { ShopComponent } from './modules/shop/shop.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  }, 
  {
    path: 'cart',
    component: CartComponent
  }, 
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'account',
    component: AccountComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  }, 
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'shop',
    component: ShopComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  }
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
