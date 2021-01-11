import { TestBed, async } from '@angular/core/testing';


import { ProductsComponent } from './products.component';
import { Product } from '../../model/product';
import { By } from '@angular/platform-browser';

describe('Product Component', () => {
  it('Should have productsArray instantiated on OnInit', () => {
    const productsComponent = new ProductsComponent;
    expect(productsComponent.productsArray).toBeUndefined();
    
  })
})