import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../shared/utility.service';

@Component({
  selector: 'app-reference-dialog',
  templateUrl: './reference-dialog.component.html',
  styleUrls: ['./reference-dialog.component.scss'],
  standalone: false
})
export class ReferenceDialogComponent implements OnInit {

  miscDocList = [
    { key: 'Backgrounds', value: 'Backgrounds' }, { key: 'Fairy Race', value: 'Fairy' }, { key: 'Races', value: 'Races' },
    { key: 'Tiny Player Rules', value: 'TinyPlayerReference' }, { key: 'Turn Cheat Sheet', value: 'Turn_Cheat_Sheet' }
  ];

  classDocList = [
    { key: 'Barbarian', value: 'Barbarian' }, { key: 'Bard', value: 'Bard' }, { key: 'Blood Hunter', value: 'Blood_Hunter' },
    { key: 'Cleric', value: 'Cleric' }, { key: 'Druid', value: 'Druid' }, { key: 'Fighter', value: 'Fighter' },
    { key: 'Gunslinger', value: 'Gunslinger' }, { key: 'Monk', value: 'Monk' }, { key: 'Paladin', value: 'Paladin' },
    { key: 'Ranger', value: 'Ranger' }, { key: 'Rogue', value: 'Rogue' }, { key: 'Shinobi', value: 'Shinobi' },
    { key: 'Sorcerer', value: 'Sorcerer' }, { key: 'Warlock', value: 'Warlock' }, { key: 'Witcher', value: 'Witcher' }, { key: 'Wizard', value: 'Wizard' },
  ];

  spellDocList = [
    { key: 'Cantrips', value: 'Cantrips' }, { key: 'Level 1 Spells', value: 'Level_1' }, { key: 'Level 2 Spells', value: 'Level_2' },
    { key: 'Level 3 Spells', value: 'Level_3' }, { key: 'Level 4 Spells', value: 'Level_4' }, { key: 'Level 5 Spells', value: 'Level_5' },
    { key: 'Level 6 Spells', value: 'Level_6' }, { key: 'Level 7 Spells', value: 'Level_7' }, { key: 'Level 8 Spells', value: 'Level_8' },
    { key: 'Level 9 Spells', value: 'Level_9' },
  ];

  selectedDoc: string;
  selectedDocType: string;

  constructor(
    private utilService: UtilityService
  ) { }

  ngOnInit() {
  }

  get noneSelected() {
    return !(this.selectedDocType === '' || this.selectedDocType === null);
  }

  getDoc() {
    this.utilService.getReferenceDocument(this.selectedDoc).subscribe(doc => {
      const newBlob = new Blob([doc], { type: 'application/pdf' });

      // IE doesn't allow using a blob object directly as link href
      // instead it is necessary to use msSaveOrOpenBlob
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob);
        return;
      }

      // For other browsers:
      // Create a link pointing to the ObjectURL containing the blob.
      const data = window.URL.createObjectURL(newBlob);

      const link = document.createElement('a');
      link.href = data;
      link.download = this.selectedDoc + '.pdf';
      // this is necessary as link.click() does not work on the latest firefox
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

      setTimeout(() => {
        // For Firefox it is necessary to delay revoking the ObjectURL
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
    });
  }

}
