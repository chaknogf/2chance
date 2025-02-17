/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ContactarIconComponent } from './contactarIcon.component';

describe('ContactarIconComponent', () => {
  let component: ContactarIconComponent;
  let fixture: ComponentFixture<ContactarIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactarIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactarIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
