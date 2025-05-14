import { Component, OnInit } from '@angular/core';
import { ISpell, ICharacter, ClassOption } from '../shared/models.component';
import { UtilityService } from '../shared/utility.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { AuthService } from '../authorization/auth.service';

@Component({
  selector: 'app-ability-search',
  templateUrl: './ability-search.component.html',
  styleUrls: ['./ability-search.component.scss'],
  standalone: false
})
export class AbilitySearchComponent implements OnInit {


  /** Spell Keys */
  spellList = [{ key: 'Bard Spells', value: 'bardCanCast' }, { key: 'BloodHunter Spells', value: 'bloodHunterCanCast' },
  { key: 'Cleric Spells', value: 'clericCanCast' }, { key: 'Druid Spells', value: 'druidCanCast' },
  { key: 'Paladin Spells', value: 'paladinCanCast' }, { key: 'Ranger Spells', value: 'rangerCanCast' },
  { key: 'Sorcerer Spells', value: 'sorcererCanCast' }, { key: 'Warlock Spells', value: 'warlockCanCast' },
  { key: 'Wizard Spells', value: 'wizardCanCast' }, { key: 'Ritual Spells', value: 'isRitualSpells' }];

  /** Lists */
  spells: ISpell[] | null;
  allSpells: ISpell[];

  /** Form operators */
  selectedSpell: ISpell | null;
  filteredSpells: Observable<ISpell[]>;
  spellControl = new FormControl();
  spellFormControl = new FormControl();
  isFiltered = false;

  isMagical = false;

  isAdmin = false;

  constructor(
    private utilService: UtilityService,
    private authService: AuthService
  ) {
    this.isAdmin = this.authService.isAdmin;
  }

  ngOnInit() {
    this.allSpells = this.utilService.retrieveAllSpells();
    this.isMagical = this.isMagicalCharacter();
  }

  describeSpell(selectedSpell: ISpell) {
    this.selectedSpell = selectedSpell;
  }

  prepareFilteredSpellList() {
    const spells: ISpell[] = [];
    if (this.bardChosen) {
      this.allSpells.forEach(spell => {
        if (spell.bardCanCast) {
          spells.push(spell);
        }
      });
    }
    if (this.bloodHunterChosen) {
      this.allSpells.forEach(spell => {
        if (spell.bloodHunterCanCast) {
          spells.push(spell);
        }
      });
    }
    if (this.clericChosen) {
      this.allSpells.forEach(spell => {
        if (spell.clericCanCast) {
          spells.push(spell);
        }
      });
    }
    if (this.druidChosen) {
      this.allSpells.forEach(spell => {
        if (spell.druidCanCast) {
          spells.push(spell);
        }
      });
    }
    if (this.paladinChosen) {
      this.allSpells.forEach(spell => {
        if (spell.paladinCanCast) {
          spells.push(spell);
        }
      });
    }
    if (this.rangerChosen) {
      this.allSpells.forEach(spell => {
        if (spell.rangerCanCast) {
          spells.push(spell);
        }
      });
    }
    if (this.sorcererChosen) {
      this.allSpells.forEach(spell => {
        if (spell.sorcererCanCast) {
          spells.push(spell);
        }
      });
    }
    if (this.warlockChosen) {
      this.allSpells.forEach(spell => {
        if (spell.warlockCanCast) {
          spells.push(spell);
        }
      });
    }
    if (this.wizardChosen) {
      this.allSpells.forEach(spell => {
        if (spell.wizardCanCast) {
          spells.push(spell);
        }
      });
    }
    if (this.ritualSpellsChosen) {
      this.allSpells.forEach(spell => {
        if (spell.isRitual) {
          spells.push(spell);
        }
      });
    }
    if (this.allSpellFlagsFalse()) {
      this.allSpells.forEach(spell => {
        spells.push(spell);
      });
    }
    this.isFiltered = true;
    spells.sort(this.compareSpellNames);
    this.spells = spells;
    this.filteredSpells = this.spellControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterSpells(value))
    );
  }

  filterSpells(value: ISpell): ISpell[] {
    const filterValue = value === undefined ? '' : value.spellName === undefined ? '' : value.spellName.toLowerCase();
    if (this.spells){
      return this.spells.filter(option => option.spellName.toLowerCase().indexOf(filterValue) === 0);
    }
    return []
  }

  testSelectedSpellValue(): boolean {
    return this.selectedSpell !== undefined && this.selectedSpell !== null;
  }

  resetSpell() {
    this.selectedSpell = null;
  }

  resetSpellFilter() {
    this.spells = null;
    this.selectedSpell = null;
    this.isFiltered = false;
    this.spellFormControl.patchValue([]);
  }

  setMagical() {
    this.isMagical = true;
  }

  clearSettings() {
    this.resetSpellFilter();
    this.resetSpell();
    this.isMagical = false;
  }

  displayLevelAndSchool() {
    if (this.selectedSpell?.spellLevel === 0) {
      return this.selectedSpell.spellSchool + ' Cantrip';
    } else {
      return 'Level ' + this.selectedSpell?.spellLevel + ' ' + this.selectedSpell?.spellSchool;
    }
  }

  formatDescription(description: string): string {
    if (this.checkIsNullorUndefined(description) || description.length === 0) {
      return '';
    }
    return description.split('*').join('\n*').split('_').join('\n');
  }

  isMagicalCharacter(): boolean {
    let isMagical = false;
    const character: ICharacter = JSON.parse((sessionStorage.getItem('activeCharacter') as string));
    if (!character) {
      return false;
    }
    character.characterClass.forEach(ele => {
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

  allSpellFlagsFalse() {
    if (!this.bardChosen && !this.bloodHunterChosen && !this.clericChosen && !this.druidChosen && !this.ritualSpellsChosen &&
      !this.paladinChosen && !this.rangerChosen && !this.sorcererChosen && !this.warlockChosen && !this.wizardChosen) {
      return true;
    }
    return false;
  }

  compareSpellNames(a, b) {
    if (a.spellName < b.spellName) {
      return -1;
    }
    if (a.spellName > b.spellName) {
      return 1;
    }
    return 0;
  }


  get bardChosen() {
    return this.checkIsNullorUndefined(this.spellFormControl.value) ? false : this.spellFormControl.value.includes('bardCanCast');
  }

  get bloodHunterChosen() {
    return this.checkIsNullorUndefined(this.spellFormControl.value) ? false : this.spellFormControl.value.includes('bloodHunterCanCast');
  }

  get clericChosen() {
    return this.checkIsNullorUndefined(this.spellFormControl.value) ? false : this.spellFormControl.value.includes('clericCanCast');
  }

  get druidChosen() {
    return this.checkIsNullorUndefined(this.spellFormControl.value) ? false : this.spellFormControl.value.includes('druidCanCast');
  }

  get paladinChosen() {
    return this.checkIsNullorUndefined(this.spellFormControl.value) ? false : this.spellFormControl.value.includes('paladinCanCast');
  }

  get rangerChosen() {
    return this.checkIsNullorUndefined(this.spellFormControl.value) ? false : this.spellFormControl.value.includes('rangerCanCast');
  }

  get sorcererChosen() {
    return this.checkIsNullorUndefined(this.spellFormControl.value) ? false : this.spellFormControl.value.includes('sorcererCanCast');
  }

  get warlockChosen() {
    return this.checkIsNullorUndefined(this.spellFormControl.value) ? false : this.spellFormControl.value.includes('warlockCanCast');
  }

  get wizardChosen() {
    return this.checkIsNullorUndefined(this.spellFormControl.value) ? false : this.spellFormControl.value.includes('wizardCanCast');
  }

  get ritualSpellsChosen() {
    return this.checkIsNullorUndefined(this.spellFormControl.value) ? false : this.spellFormControl.value.includes('isRitualSpells');
  }

  checkIsNullorUndefined(item: unknown) {
    return item === null || item === undefined;
  }
}
