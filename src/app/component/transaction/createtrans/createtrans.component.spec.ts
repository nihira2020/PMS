import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatetransComponent } from './createtrans.component';

describe('CreatetransComponent', () => {
  let component: CreatetransComponent;
  let fixture: ComponentFixture<CreatetransComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatetransComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatetransComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
