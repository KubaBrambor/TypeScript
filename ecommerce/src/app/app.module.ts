import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './main/products/products.component';
import { ProductsListComponent } from './main/products-list/products-list.component';
import { CreateProductComponent } from './main/create-product/create-product.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductsListComponent,
    CreateProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
