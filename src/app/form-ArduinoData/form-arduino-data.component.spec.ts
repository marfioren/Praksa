import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArduinoDataComponent } from './form-arduino-data.component';

describe('FormArduinoDataComponent', () => {
  let component: FormArduinoDataComponent;
  let fixture: ComponentFixture<FormArduinoDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormArduinoDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormArduinoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
