/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RobotFormComponent } from './robot-form.component';

describe('RobotFormComponent', () => {
  let component: RobotFormComponent;
  let fixture: ComponentFixture<RobotFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RobotFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RobotFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
