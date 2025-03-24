import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ICharacter } from '../shared/models.component';
import { MatDialog } from '@angular/material/dialog';
import { DashboardCharacterExpandedDialogComponent } from '../dashboard-character-expanded-dialog/dashboard-character-expanded-dialog.component';
import { AppViewService } from '../shared/app-view.service';

@Component({
  selector: 'app-dashboard-character',
  templateUrl: './dashboard-character.component.html',
  styleUrls: ['./dashboard-character.component.scss']
})
export class DashboardCharacterComponent implements OnInit {

  @Input() activeCharacter: ICharacter;
  @Output() characterEmitter = new EventEmitter();

  constructor(
    private dialog: MatDialog,
    public viewService: AppViewService
  ) { }

  ngOnInit() {
  }

  displayCharacter(): void {
    const dialogRef = this.dialog.open(DashboardCharacterExpandedDialogComponent, {
      width: '400px',
      autoFocus: false,
      data: {
        character: this.activeCharacter,
        fromDashboard: true
      }
    }).afterClosed().subscribe(() => {
      this.characterEmitter.emit(true);
    });
  }

}
