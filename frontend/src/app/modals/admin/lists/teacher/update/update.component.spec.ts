import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTeacherModal } from './update.component';

describe('UpdateTeacherModal', () => {
  let component: UpdateTeacherModal;
  let fixture: ComponentFixture<UpdateTeacherModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTeacherModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTeacherModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
