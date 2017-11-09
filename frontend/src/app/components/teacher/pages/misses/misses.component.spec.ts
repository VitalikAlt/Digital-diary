import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherMissesComponent } from './misses.component';

describe('TeacherMissesComponent', () => {
  let component: TeacherMissesComponent;
  let fixture: ComponentFixture<TeacherMissesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherMissesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherMissesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
