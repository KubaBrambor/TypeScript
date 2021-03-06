import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { ProductService } from '../../services/product.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
  providers: [MessageService]
})
export class CreateProductComponent implements OnInit {
  public product: Product; 
  public confirmed: boolean = false;
  public message: string = 'no message';
  public imageUrlValidatorText: string;
  public quantityValidatorText: string;
  
  constructor(private productService: ProductService,
              public messageService: MessageService) {
    this.product = new Product('', '','',false,"0")
  }

  ngOnInit():void {
    this.messageService.message = "Level create-product component";
  }

  printValue(event) {
    this.product.name = event.toUpperCase()
  }
  createProduct(productForm) {
    console.log(this.product)
    if(productForm.valid){
      this.productService.createProduct(this.product)
          .subscribe((result) => { this.messageService.message = result.msg }, 
          (err)=> { this.messageService.message = err.msg })
      console.log(this.productService.getProducts())
      // Object.assign(this.productArr[this.productArr.length-1], this.product)
      this.confirmed = false;
      
    } else { 
      if(productForm.form.controls.product.controls.productURL.touched){
        this.imageUrlValidatorText = "This field is mandatory! Please paste image URL."
      }
      if(productForm.form.controls.product.controls.productQuantity.value == 0){
        this.quantityValidatorText = "Quantity must be higher than 0."
      }
      console.error("Stock form is in an invalid state.")
    }
    
  }
}
