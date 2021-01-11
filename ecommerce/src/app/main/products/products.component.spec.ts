import { TestBed, async } from '@angular/core/testing';


import { ProductsComponent } from './products.component';
import { Product } from '../../model/product';
import { By } from '@angular/platform-browser';

describe('Product Component', () => {

  let fixture, component;

  beforeEach(async(()=>{
    TestBed.configureTestingModule({
      declarations: [
        ProductsComponent
      ],
    }).compileComponents();
  }));

  beforeEach(()=>{
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    component.productsArray = [new Product('Krzeslo', 20, 'url', false, 10)];
    component.productClasses = function(){console.log('ok')}
    fixture.detectChanges();
  })

  it('should create stock component and render stock data', () => {
    const nameElement = fixture.debugElement.query(By.css('.name'));
    expect(nameElement.nativeElement.textContent).toEqual('Krzeslo');
    const priceElemenet = fixture.debugElement.query(By.css(".price"));
    expect(priceElemenet.nativeElement.textContent).toEqual('Cena: 20 zł');
    const minusQuantity = fixture.debugElement.query(By.css('.minus'));
    expect(minusQuantity).toBeDefined();
  })

  it('should trigger plus buttom emitter', () => {
    let quantity: number;
    component.addQuantity = ()=>{quantity=1}
    const addQuantity = fixture.debugElement.query(By.css('.plus'));

    expect(quantity).toBeUndefined();
    addQuantity.triggerEventHandler('click', null);
    expect(quantity).toEqual(1);
  })

  it('Should have productsArray instantiated on OnInit', () => {
    const productsComponent = new ProductsComponent;
    expect(productsComponent.productsArray).toBeUndefined();
    productsComponent.ngOnInit();
    productsComponent.productsArray = [new Product('Koszyk', 20, 'url', false, 10)];
    expect(productsComponent.productsArray).toEqual(
      [new Product('Koszyk', 20, 'url', false, 10)]
    );
  })
})