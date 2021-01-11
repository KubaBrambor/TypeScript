import { TestBed, async } from '@angular/core/testing';

import { ProductsListComponent } from './products-list.component';
import { ProductsComponent } from '../products/products.component';
import { Product } from '../../model/product';
import { By } from '@angular/platform-browser';

describe('ProductsListComponent', () => {
  
  describe('Simple, No Angular Unit Test', () => {
    it('should have product instantiated on ngInit', () => {
      const productListComponent = new ProductsListComponent();
      expect(productListComponent.product).toBeUndefined();
      productListComponent.ngOnInit();
      expect(productListComponent.product).toEqual(
        new Product('Stol', 20, 'url', false, 20));
      productListComponent.productsList = [
        new Product('Mydło', 10, 'obraz', false, 5)
      ]
      expect(productListComponent.productsList).toEqual([
        new Product('Mydło', 10, 'obraz', false, 5)
      ])
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

  describe('Angular-Aware test', () => {
    let fixture, component;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
          ProductsListComponent,
          ProductsComponent
        ],
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ProductsListComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should load title and stock card', () => {
      const titleEl = fixture.debugElement.query(By.css('p'));
      expect(titleEl.nativeElement.textContent.trim()).toEqual('products-list works!');
      component.productsList = [new Product('Mydło', 10, 'obraz', false, 5)];
      fixture.detectChanges()
      const nameEl = fixture.debugElement.query(By.css('.name'));
      expect(nameEl.nativeElement.textContent).toEqual('Mydło');
      const priceEl = fixture.debugElement.query(By.css('.price'));
      expect(priceEl.nativeElement.textContent).toEqual('Cena: 10 zł');
      const plusEl = fixture.debugElement.query(By.css('.plus'));
      expect(plusEl).toBeDefined();
    });

    it('should trigger plus button and add quantity', () => {
      component.productsList = [new Product('Mydło', 10, 'obraz', false, 2)];
      fixture.detectChanges()
      expect(component.productsList[0].inStock()).toBeTruthy();
      expect(component.productsList[0].amount).toEqual(1);

      let plusButtonEl = fixture.debugElement.query(By.css('.plus'));
      expect(plusButtonEl).toBeDefined();

      plusButtonEl.triggerEventHandler('click', null);

      fixture.detectChanges();

      expect(component.productsList[0].amount).toEqual(2);

      plusButtonEl = fixture.debugElement.nativeElement.querySelector('.plus');
      expect(plusButtonEl.disabled).toBeTruthy()
    })
  });
});

