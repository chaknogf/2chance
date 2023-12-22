/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormNacComponent } from './form-nac.component';

describe('FormNacComponent', () => {
  let component: FormNacComponent;
  let fixture: ComponentFixture<FormNacComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNacComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
