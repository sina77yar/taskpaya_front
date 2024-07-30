import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfReceiveOrdersComponent } from './self-receive-orders.component';

describe('SelfReceiveOrdersComponent', () => {
  let component: SelfReceiveOrdersComponent;
  let fixture: ComponentFixture<SelfReceiveOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelfReceiveOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelfReceiveOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
