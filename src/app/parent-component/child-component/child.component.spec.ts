import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA, signal } from '@angular/core';
import { TranslationService } from '@aut/services/translation/translation.service';
import { ChildComponent } from './child.component';

describe('ChildComponent', () => {
  let component: ChildComponent;
  let fixture: ComponentFixture<ChildComponent>;
  let mockTranslationService: jasmine.SpyObj<TranslationService>;

  beforeEach(async () => {
    mockTranslationService = jasmine.createSpyObj(TranslationService, ['translate']);

    await TestBed.configureTestingModule({
      imports: [ChildComponent],
    })
      .overrideComponent(ChildComponent, {
        set: {
          imports: [],
          providers: [{ provide: TranslationService, useValue: mockTranslationService }],
          schemas: [NO_ERRORS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ChildComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    const products = signal([{ name: 'Product 1', selected: false }]);

    fixture.componentRef.setInput('products', products());

    expect(component.products()).toEqual(products());
    expect(component).toBeTruthy();
  });
});
