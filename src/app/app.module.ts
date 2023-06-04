import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './modules/about/about.component';
import { AccountComponent } from './modules/account/account.component';
import { CartComponent } from './modules/cart/cart.component';
import { CheckoutComponent } from './modules/checkout/checkout.component';
import { ContactComponent } from './modules/contact/contact.component';
import { HomeComponent } from './modules/home/home.component';
import { FooterComponent } from './modules/layout/footer/footer.component';
import { HeaderComponent } from './modules/layout/header/header.component';
import { ProductComponent } from './modules/product/product.component';
import { ShopComponent } from './modules/shop/shop.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CheckboxModule } from 'primeng/checkbox';
import { NgImageSliderModule } from 'ng-image-slider';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import {MatIconModule} from '@angular/material/icon';
import {InputNumberModule} from 'primeng/inputnumber';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import {PaginatorModule} from 'primeng/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import { WrapperComponent } from './modules/wrapper/wrapper.component'
import {TableModule} from 'primeng/table';
import { BearerService } from './services/bearer.service';
import { SpinnerModule } from 'primeng/spinner';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { LoginComponent } from './modules/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ToastModule } from 'primeng/toast';

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
    LoginComponent
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
    ToastModule
  ],
  providers: [BearerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
