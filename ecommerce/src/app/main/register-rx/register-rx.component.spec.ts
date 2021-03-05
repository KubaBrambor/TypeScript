import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRXComponent } from './register-rx.component';

describe('RegisterRXComponent', () => {
  let component: RegisterRXComponent;
  let fixture: ComponentFixture<RegisterRXComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterRXComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterRXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
