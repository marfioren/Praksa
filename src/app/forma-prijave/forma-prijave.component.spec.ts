import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaPrijaveComponent } from './forma-prijave.component';

describe('FormaPrijaveComponent', () => {
  let component: FormaPrijaveComponent;
  let fixture: ComponentFixture<FormaPrijaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormaPrijaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormaPrijaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
