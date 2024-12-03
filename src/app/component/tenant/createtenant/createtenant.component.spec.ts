import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatetenantComponent } from './createtenant.component';

describe('CreatetenantComponent', () => {
  let component: CreatetenantComponent;
  let fixture: ComponentFixture<CreatetenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatetenantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatetenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
