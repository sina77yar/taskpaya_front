import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactussettingComponent } from './contactussetting.component';

describe('ContactussettingComponent', () => {
  let component: ContactussettingComponent;
  let fixture: ComponentFixture<ContactussettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactussettingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactussettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
