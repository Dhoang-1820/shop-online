import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './modules/about/about.component';
import { AccountComponent } from './modules/account/account.component';
import { AdminMainComponent } from './modules/admin/admin-main/admin-main.component';
import { CartComponent } from './modules/cart/cart.component';
import { CheckoutComponent } from './modules/checkout/checkout.component';
import { ContactComponent } from './modules/contact/contact.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { ProductComponent } from './modules/product/product.component';
import { ShopComponent } from './modules/shop/shop.component';
import { SignupComponent } from './modules/signup/signup.component';
import { AdminProductComponent } from './modules/admin/admin-product/admin-product.component';
import { CategoryComponent } from './modules/admin/category/category.component';
import { AdminOrderComponent } from './modules/admin/admin-order/admin-order.component';
import { BrandComponent } from './modules/admin/brand/brand.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  }, 
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
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
    path: 'account/order',
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
  },
  {
    path: 'product/:id',
    component: ProductComponent,
  },
  {
    path: 'admin',
    children: [
      {
        path: 'product',
        component: AdminProductComponent
      },
      {
        path: 'category',
        component: CategoryComponent
      },
      {
        path: 'order',
        component: AdminOrderComponent
      },
      {
        path: 'brand',
        component: BrandComponent
      },
      {
        path: '',
        component: AdminMainComponent
      }
    ]
  }
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
