import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TranslationService } from '@aut/services/translation/translation.service';
import { ChildComponent } from './child.component';

describe('ChildComponent', () => {
  let component: ChildComponent;
  let fixture: ComponentFixture<ChildComponent>;
  let translationServiceMock: jasmine.SpyObj<TranslationService>;

  const products = [
    { name: 'Product 1', selected: false },
    { name: 'Product 2', selected: false },
    { name: 'Product 3', selected: false },
  ];

  beforeEach(async () => {
    translationServiceMock = jasmine.createSpyObj(TranslationService, ['translate']);

    await TestBed.configureTestingModule({
      imports: [ChildComponent],
    })
      .overrideComponent(ChildComponent, {
        set: {
          imports: [],
          providers: [{ provide: TranslationService, useValue: translationServiceMock }],
          schemas: [NO_ERRORS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ChildComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display proper heading', () => {
    const productsInput = signal([]);

    translationServiceMock.translate.withArgs('child').and.returnValue('[CHILD]');
    translationServiceMock.translate.withArgs('child.no-products').and.returnValue('[NO_PRODUCTS]');

    fixture.componentRef.setInput('products', productsInput());
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('h1'));

    expect(el).toBeTruthy();
    expect(el.nativeElement.textContent).toBe('[CHILD]');
  });

  it('should render empty products', () => {
    const productsInput = signal([]);

    translationServiceMock.translate.withArgs('child').and.returnValue('[CHILD]');
    translationServiceMock.translate.withArgs('child.no-products').and.returnValue('[NO_PRODUCTS]');

    fixture.componentRef.setInput('products', productsInput());
    fixture.detectChanges();

    const el = fixture.debugElement.query(By.css('[data-test="no-products"]'));

    expect(el).toBeTruthy();
    expect(el.nativeElement.textContent).toBe('[NO_PRODUCTS]');
  });

  it('should render products', () => {
    const productsInput = signal(products.map((product, index) => ({ ...product, selected: index % 2 === 0 })));

    translationServiceMock.translate.withArgs('child').and.returnValue('[CHILD]');
    translationServiceMock.translate.withArgs('child.no-products').and.returnValue('[NO_PRODUCTS]');

    fixture.componentRef.setInput('products', productsInput());
    fixture.detectChanges();

    const unselected = fixture.debugElement.queryAll(By.css('[data-test="product"]'));
    const selected = fixture.debugElement.queryAll(By.css('[data-test="product-selected"]'));

    expect(unselected.length).toBe(1);
    expect(selected.length).toBe(2);

    expect(selected[0].nativeElement.textContent.trim()).toBe(productsInput()[0].name);
    expect(unselected[0].nativeElement.textContent.trim()).toBe(productsInput()[1].name);
    expect(selected[1].nativeElement.textContent.trim()).toBe(productsInput()[2].name);
  });

  it('should report product selection', () => {
    const productsInput = signal(products.map((product, index) => ({ ...product, selected: index % 2 === 0 })));

    translationServiceMock.translate.withArgs('child').and.returnValue('[CHILD]');
    translationServiceMock.translate.withArgs('child.no-products').and.returnValue('[NO_PRODUCTS]');

    fixture.componentRef.setInput('products', productsInput());
    fixture.detectChanges();

    const unselected = fixture.debugElement.query(By.css('[data-test="product"]'));
    const selected = fixture.debugElement.query(By.css('[data-test="product-selected"]'));

    const emitSpy = spyOn(component.productSelected, 'emit');

    selected.nativeElement.dispatchEvent(new Event('click'));
    expect(emitSpy).toHaveBeenCalledOnceWith(productsInput()[0]);

    emitSpy.calls.reset();

    unselected.nativeElement.dispatchEvent(new Event('click'));
    expect(emitSpy).toHaveBeenCalledOnceWith(productsInput()[1]);
  });
});
