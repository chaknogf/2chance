/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RecepciónComponent } from './recepción.component';

describe('RecepciónComponent', () => {
  let component: RecepciónComponent;
  let fixture: ComponentFixture<RecepciónComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecepciónComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepciónComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
