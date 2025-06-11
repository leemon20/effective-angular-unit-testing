import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA, Signal, signal, WritableSignal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ProductsService } from '@aut/services/products/products.service';
import { ParentComponent } from './parent.component';

// Allows creating a mock of a service by overriding
// Signals with WritableSignals and functions with jasmine spies
// so that the behaviour of those can be controlled during a test
type Mock<T> = {
  [K in keyof T]: T[K] extends Signal<infer R>
    ? WritableSignal<R>
    : T[K] extends jasmine.Func
      ? T[K] & jasmine.Spy<T[K]>
      : T[K];
};

describe('ParentComponent', () => {
  let component: ParentComponent;
  let fixture: ComponentFixture<ParentComponent>;
  let productsServiceMock: Mock<ProductsService>;

  const products = [
    { name: 'Product 1', selected: false },
    { name: 'Product 2', selected: false },
    { name: 'Product 3', selected: false },
  ];

  beforeEach(async () => {
    productsServiceMock = {
      products: signal([]),
      toggleSelection: jasmine.createSpy('toggleSelection'),
    };

    await TestBed.configureTestingModule({
      imports: [ParentComponent],
    })
      .overrideComponent(ParentComponent, {
        set: {
          imports: [],
          providers: [{ provide: ProductsService, useValue: productsServiceMock }],
          schemas: [NO_ERRORS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render child component', () => {
    const el = fixture.debugElement.query(By.css('child-component'));

    expect(el).toBeTruthy();
  });

  it('should pass data to child', () => {
    const el = fixture.debugElement.query(By.css('child-component'));

    expect(el.properties['products']).toEqual([]);

    productsServiceMock.products.set(products);

    fixture.detectChanges();

    expect(el.properties['products']).toEqual(products);
  });

  it('should update selection on product selection', () => {
    productsServiceMock.products.set(products);

    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('child-component'));

    el.triggerEventHandler('productSelected', products[0]);

    expect(productsServiceMock.toggleSelection).toHaveBeenCalledWith(products[0]);
  });
});
