import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMissesComponent } from './misses.component';

describe('StudentMissesComponent', () => {
  let component: StudentMissesComponent;
  let fixture: ComponentFixture<StudentMissesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentMissesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMissesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
