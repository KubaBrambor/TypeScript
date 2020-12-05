import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ex150Component } from './ex150.component';

describe('Ex150Component', () => {
  let component: Ex150Component;
  let fixture: ComponentFixture<Ex150Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ex150Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ex150Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
