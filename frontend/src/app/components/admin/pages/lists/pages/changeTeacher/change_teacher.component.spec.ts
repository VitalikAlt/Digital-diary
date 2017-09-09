import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTeacherComponent } from './change_teacher.component';

describe('ChangeTeacherComponent', () => {
  let component: ChangeTeacherComponent;
  let fixture: ComponentFixture<ChangeTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
