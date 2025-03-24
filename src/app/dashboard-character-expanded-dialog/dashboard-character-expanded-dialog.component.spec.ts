import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCharacterExpandedDialogComponent } from './dashboard-character-expanded-dialog.component';

describe('DashboardCharacterExpandedDialogComponent', () => {
  let component: DashboardCharacterExpandedDialogComponent;
  let fixture: ComponentFixture<DashboardCharacterExpandedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCharacterExpandedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCharacterExpandedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
