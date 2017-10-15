import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStudentModal } from './update.component';

describe('UpdateStudentModal', () => {
  let component: UpdateStudentModal;
  let fixture: ComponentFixture<UpdateStudentModal>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateStudentModal ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStudentModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
