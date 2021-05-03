import { Injectable } from '@angular/core';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[];
  constructor() { 
    this.products = [
      new Product('Żel', "20", 'obraz', true, "0"),
      new Product('Mydło', "10", 'obraz', false, "5"),
      new Product('Pasta do zębów', "5", 'obraz', true, "10")
    ]
   }

   getProducts(): Product[] {
     return this.products;
   }

   createProduct(product:Product){
    console.log(product)
    let foundProduct = this.products.find(each => each.prize === product.name);
    console.log(foundProduct)
    if(foundProduct){
      return false;
    } else {
      let newProduct = new Product(product.name, product.prize, product.imageURL, product.onSale, product.quantity)
      this.products.push(newProduct);
      console.log(this.products)
      return true;
    }
  }

  toggleFavourite(index: number){
    let foundProduct = this.products.find(each => each.name === this.products[index].name)
    if(foundProduct){
      foundProduct.favourite = !foundProduct.favourite;
    }
  }

}
