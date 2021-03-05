import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './main/products/products.component';
import { ProductsListComponent } from './main/products-list/products-list.component';
import { CreateProductComponent } from './main/create-product/create-product.component';
import { RegisterComponent } from './main/register/register.component';
import { RegisterRXComponent } from './main/register-rx/register-rx.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductsListComponent,
    CreateProductComponent,
    RegisterComponent,
    RegisterRXComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
