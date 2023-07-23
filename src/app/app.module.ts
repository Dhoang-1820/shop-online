import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgImageSliderModule } from 'ng-image-slider';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputNumberModule } from 'primeng/inputnumber';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SpinnerModule } from 'primeng/spinner';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './modules/about/about.component';
import { AccountComponent } from './modules/account/account.component';
import { AdminMainComponent } from './modules/admin/admin-main/admin-main.component';
import { CategoryComponent } from './modules/admin/category/category.component';
import { CartComponent } from './modules/cart/cart.component';
import { CheckoutComponent } from './modules/checkout/checkout.component';
import { ContactComponent } from './modules/contact/contact.component';
import { HomeComponent } from './modules/home/home.component';
import { FooterComponent } from './modules/layout/footer/footer.component';
import { HeaderComponent } from './modules/layout/header/header.component';
import { LoginComponent } from './modules/login/login.component';
import { ProductComponent } from './modules/product/product.component';
import { ShopComponent } from './modules/shop/shop.component';
import { SignupComponent } from './modules/signup/signup.component';
import { WrapperComponent } from './modules/wrapper/wrapper.component';
import { BearerService } from './services/bearer.service';
import { AdminProductComponent } from './modules/admin/admin-product/admin-product.component';
import { AdminOrderComponent } from './modules/admin/admin-order/admin-order.component';
import { BrandComponent } from './modules/admin/brand/brand.component';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    CartComponent,
    AccountComponent,
    ContactComponent,
    AboutComponent,
    ShopComponent,
    CheckoutComponent,
    ProductComponent,
    WrapperComponent,
    LoginComponent,
    SignupComponent,
    CategoryComponent,
    AdminMainComponent,
    AdminProductComponent,
    AdminOrderComponent,
    BrandComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    BrowserAnimationsModule,
    MatSlideToggleModule,
    CheckboxModule,
    NgImageSliderModule,
    BreadcrumbModule,
    MatIconModule,
    InputNumberModule,
    MatFormFieldModule,
    MatInputModule,
    PaginatorModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    TableModule,
    SpinnerModule,
    ProgressSpinnerModule,
    ButtonModule,
    ReactiveFormsModule,
    ToastModule,
    MatToolbarModule,
    MatMenuModule,
    MatListModule,
  ],
  providers: [BearerService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
