import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterCreationDialogComponent } from './character-creation-dialog.component';

describe('CharacterCreationDialogComponent', () => {
  let component: CharacterCreationDialogComponent;
  let fixture: ComponentFixture<CharacterCreationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterCreationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
