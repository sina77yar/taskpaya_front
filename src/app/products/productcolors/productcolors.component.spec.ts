import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductcolorsComponent } from './productcolors.component';

describe('ProductcolorsComponent', () => {
  let component: ProductcolorsComponent;
  let fixture: ComponentFixture<ProductcolorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductcolorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductcolorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
