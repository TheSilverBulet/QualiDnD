import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ICharacter } from '../shared/models.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    dialogConfig.width = '400px';
    dialogConfig.data = {
      character: this.activeCharacter,
      fromDashboard: true
    }

    this.dialog.open(DashboardCharacterExpandedDialogComponent, dialogConfig).afterClosed().subscribe(() => {
      this.characterEmitter.emit(true);
    });
  }

}
