import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgClass } from '@angular/common';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform, signal, Type } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TranslationService } from '@aut/services/translation/translation.service';
import { ChildComponent } from './child.component';

describe('ChildComponent', () => {
  let component: ChildComponent;
  let fixture: ComponentFixture<ChildComponent>;
  let translationServiceMock: jasmine.SpyObj<TranslationService>;

  const products = [
    { name: 'product 1', selected: false },
    { name: 'product 2', selected: false },
    { name: 'product 3', selected: false },
  ];

  beforeEach(async () => {
    translationServiceMock = jasmine.createSpyObj(TranslationService, ['translate']);

    const MockTitleCasePipe = mockPipe('titlecase', (value: string) => `titlecase: ${value}`);
    const MockHyphenatePipe = mockPipe('hyphenate', (value: string) => `hyphenate: ${value}`);

    await TestBed.configureTestingModule({
      imports: [ChildComponent],
    })
      .overrideComponent(ChildComponent, {
        set: {
          imports: [NgClass, MockTitleCasePipe, MockHyphenatePipe],
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

    const productEls = fixture.debugElement.queryAll(By.css('[data-test*="product"]'));

    // count
    expect(productEls.length).toBe(3);

    // pipes
    expect(productEls[0].nativeElement.textContent.trim()).toBe(`titlecase: ${productsInput()[0].name}`);
    expect(productEls[1].nativeElement.textContent.trim()).toBe(`hyphenate: ${productsInput()[1].name}`);
    expect(productEls[2].nativeElement.textContent.trim()).toBe(`titlecase: ${productsInput()[2].name}`);

    // [ngClass] and [class.<...>]
    expect(productEls[0].nativeElement.classList.contains('even')).toBeTrue();
    expect(productEls[1].nativeElement.classList.contains('odd')).toBeTrue();
    expect(productEls[2].nativeElement.classList.contains('even')).toBeTrue();

    // directives
    expect(productEls[0].properties['appHighlight']).toBe('purple');
    expect(productEls[2].properties['appHighlight']).toBe('purple');
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

export function mockPipe(pipeName: string, transform: PipeTransform['transform']): Type<PipeTransform> {
  @Pipe({
    name: pipeName,
    standalone: true,
  })
  class MockPipe implements PipeTransform {
    transform(value: any, ...args: any[]): any {
      return transform(value, ...args);
    }
  }

  return MockPipe;
}
