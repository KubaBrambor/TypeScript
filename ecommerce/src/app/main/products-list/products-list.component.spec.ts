import { ProductsListComponent } from './products-list.component';
import { Product } from '../../model/product';
import { ProductsComponent } from '../products/products.component';

describe('AppComponent', () => {
  it('should have product instantiated on ngInit', () => {
    const productListComponent = new ProductsListComponent();
    expect(productListComponent.product).toBeUndefined();
    productListComponent.ngOnInit();
    expect(productListComponent.product).toEqual(
      new Product('Stol', 20, 'url', false, 20));
  });

  it('should add product to favourite', () => {
    const productListComponent = new ProductsListComponent();
    productListComponent.ngOnInit();
    expect(productListComponent.productsList[0].favourite).toBeFalsy();
    productListComponent.productsList[0].favourite = true;
    expect(productListComponent.productsList[0].favourite).toBeTruthy();
  })

  it('should add amount', () => {
    const productListComponent = new ProductsListComponent();
    productListComponent.ngOnInit();
    expect(productListComponent.productsList[1].amount).toEqual(1);
    productListComponent.addQuantity(1);
    expect(productListComponent.productsList[1].amount).toEqual(2);
  })
})