import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ICharacter, ClassOption } from '../shared/models.component';
import { EditCharacterDialogComponent } from '../edit-character-dialog/edit-character-dialog.component';

@Component({
  selector: 'app-dashboard-character-expanded-dialog',
  templateUrl: './dashboard-character-expanded-dialog.component.html',
  styleUrls: ['./dashboard-character-expanded-dialog.component.scss']
})
export class DashboardCharacterExpandedDialogComponent implements OnInit {

  character: ICharacter;
  fromDashboard: boolean;

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DashboardCharacterExpandedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.character = data.character;
    this.fromDashboard = data.fromDashboard;
  }

  ngOnInit() {
  }

  get isSpellcaster() {
    let isMagical = false;
    this.character.characterClass.forEach(ele => {
      if (ele.className === ClassOption.Bard || ele.className === ClassOption.BloodHunter ||
        ele.className === ClassOption.Cleric || ele.className === ClassOption.Druid ||
        ele.className === ClassOption.Paladin || ele.className === ClassOption.Ranger ||
        ele.className === ClassOption.Sorcerer || ele.className === ClassOption.Warlock ||
        ele.className === ClassOption.Wizard) {
        isMagical = true;
      }
    });
    return isMagical;
  }

  openEditDialog() {
    const dialogConfig = new MatDialogConfig();
    
    dialogConfig.width = '750px';
    dialogConfig.data = {
      character: this.character
    }

    this.dialog.open(EditCharacterDialogComponent, dialogConfig);
  }

}
