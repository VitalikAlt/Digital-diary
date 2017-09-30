import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMissesComponent } from './misses.component';

describe('AdminMissesComponent', () => {
  let component: AdminMissesComponent;
  let fixture: ComponentFixture<AdminMissesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMissesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMissesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
