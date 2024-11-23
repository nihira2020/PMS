import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepersonComponent } from './createperson.component';

describe('CreatepersonComponent', () => {
  let component: CreatepersonComponent;
  let fixture: ComponentFixture<CreatepersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatepersonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatepersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
