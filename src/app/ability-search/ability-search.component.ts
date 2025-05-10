import { Component, OnInit } from '@angular/core';
import { IJutsu, ISpell, ICharacter, ClassOption } from '../shared/models.component';
import { UtilityService } from '../shared/utility.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { AuthService } from '../authorization/auth.service';

@Component({
  selector: 'app-ability-search',
  templateUrl: './ability-search.component.html',
  styleUrls: ['./ability-search.component.scss']
})
export class AbilitySearchComponent implements OnInit {

  /** Jutsu Keys */
  /** Yin-Yang Release requires sage mode, but is singular */
  /** Blaze Release = fire + lightning */
  /** Explosive Release = earth + lightning */
  /** Ice Release = water + wind */
  /** Lava Release = earth + fire */
  /** Magnet Release = wind + earth */
  /** Scorch Release = wind + fire */
  /** Storm Release = water + lightning */
  /** Swift Release =  wind + lightning */
  /** Vapor Release = fire + water */
  /** Wood Release = earth + water */
  releaseList = [{ key: 'Fire Release', value: 'fireRelease' }, { key: 'Water Release', value: 'waterRelease' },
  { key: 'Lightning Release', value: 'lightningRelease' }, { key: 'Earth Release', value: 'earthRelease' },
  { key: 'Wind Release', value: 'windRelease' }, { key: 'Yin-Yang Release', value: 'yinYangRelease' }];


  /** Spell Keys */
  spellList = [{ key: 'Bard Spells', value: 'bardCanCast' }, { key: 'BloodHunter Spells', value: 'bloodHunterCanCast' },
  { key: 'Cleric Spells', value: 'clericCanCast' }, { key: 'Druid Spells', value: 'druidCanCast' },
  { key: 'Paladin Spells', value: 'paladinCanCast' }, { key: 'Ranger Spells', value: 'rangerCanCast' },
  { key: 'Sorcerer Spells', value: 'sorcererCanCast' }, { key: 'Warlock Spells', value: 'warlockCanCast' },
  { key: 'Wizard Spells', value: 'wizardCanCast' }, { key: 'Ritual Spells', value: 'isRitualSpells' }];

  /** Lists */
  spells: ISpell[];
  allSpells: ISpell[];
  jutsu: IJutsu[];
  allJutsu: IJutsu[];

  /** Form operators */
  selectedSpell: ISpell;
  selectedJutsu: IJutsu;
  filteredSpells: Observable<ISpell[]>;
  filteredJutsu: Observable<IJutsu[]>;
  spellControl = new FormControl();
  jutsuControl = new FormControl();
  releaseFormControl = new FormControl();
  spellFormControl = new FormControl();
  isFiltered = false;

  isShinobi = false;
  isMagical = false;

  isAdmin = false;

  constructor(
    private utilService: UtilityService,
    private authService: AuthService
  ) {
    this.isAdmin = this.authService.isAdmin;
  }

  ngOnInit() {
    this.utilService.retrieveAllSpells().subscribe(spells => {
      if (spells) {
        this.allSpells = spells;
      }
    });
    this.utilService.retrieveAllJutsu().subscribe(jutsu => {
      if (jutsu) {
        this.allJutsu = jutsu;
      }
    });

    this.isShinobi = this.isShinobiCharacter();
    this.isMagical = this.isMagicalCharacter();
  }

  describeSpell(selectedSpell: ISpell) {
    this.selectedSpell = selectedSpell;
  }

  describeJutsu(selectedJutsu: IJutsu) {
    this.selectedJutsu = selectedJutsu;
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

  prepareFilteredJutsuList() {
    const fjutsu: IJutsu[] = [];
    if (this.fireReleaseChosen) {
      this.allJutsu.forEach(jutsu => {
        if (jutsu.release === 'Fire') {
          fjutsu.push(jutsu);
        }
      });
      if (this.lightningReleaseChosen) {
        this.allJutsu.forEach(jutsu => {
          if (jutsu.release === 'Blaze') {
            fjutsu.push(jutsu);
          }
        });
      }
      if (this.waterReleaseChosen) {
        this.allJutsu.forEach(jutsu => {
          if (jutsu.release === 'Vapor') {
            fjutsu.push(jutsu);
          }
        });
      }
    }// fire end
    if (this.earthReleaseChosen) {
      this.allJutsu.forEach(jutsu => {
        if (jutsu.release === 'Earth') {
          fjutsu.push(jutsu);
        }
      });
      if (this.lightningReleaseChosen) {
        this.allJutsu.forEach(jutsu => {
          if (jutsu.release === 'Explosive') {
            fjutsu.push(jutsu);
          }
        });
      }
      if (this.fireReleaseChosen) {
        this.allJutsu.forEach(jutsu => {
          if (jutsu.release === 'Lava') {
            fjutsu.push(jutsu);
          }
        });
      }
      if (this.waterReleaseChosen) {
        this.allJutsu.forEach(jutsu => {
          if (jutsu.release === 'Wood') {
            fjutsu.push(jutsu);
          }
        });
      }
    } // earth end
    if (this.windReleaseChosen) {
      this.allJutsu.forEach(jutsu => {
        if (jutsu.release === 'Wind') {
          fjutsu.push(jutsu);
        }
      });
      if (this.lightningReleaseChosen) {
        this.allJutsu.forEach(jutsu => {
          if (jutsu.release === 'Swift') {
            fjutsu.push(jutsu);
          }
        });
      }
      if (this.earthReleaseChosen) {
        this.allJutsu.forEach(jutsu => {
          if (jutsu.release === 'Magnet') {
            fjutsu.push(jutsu);
          }
        });
      }
      if (this.fireReleaseChosen) {
        this.allJutsu.forEach(jutsu => {
          if (jutsu.release === 'Scorch') {
            fjutsu.push(jutsu);
          }
        });
      }
    } // wind end
    if (this.lightningReleaseChosen) {
      this.allJutsu.forEach(jutsu => {
        if (jutsu.release === 'Lightning') {
          fjutsu.push(jutsu);
        }
      });
    } // lightning end
    if (this.waterReleaseChosen) {
      this.allJutsu.forEach(jutsu => {
        if (jutsu.release === 'Water') {
          fjutsu.push(jutsu);
        }
      });
      if (this.lightningReleaseChosen) {
        this.allJutsu.forEach(jutsu => {
          if (jutsu.release === 'Storm') {
            fjutsu.push(jutsu);
          }
        });
      }
      if (this.windReleaseChosen) {
        this.allJutsu.forEach(jutsu => {
          if (jutsu.release === 'Ice') {
            fjutsu.push(jutsu);
          }
        });
      }
    }// water end
    if (this.yinYangReleaseChosen) {
      this.allJutsu.forEach(jutsu => {
        if (jutsu.release === 'Yin-Yang') {
          fjutsu.push(jutsu);
        }
      });
    }
    if (this.allReleaseFlagsFalse()) {
      this.allJutsu.forEach(spell => {
        fjutsu.push(spell);
      });
    }
    this.isFiltered = true;
    fjutsu.sort(this.compareJutsuNames);
    this.jutsu = fjutsu;
    this.filteredJutsu = this.jutsuControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterJutsu(value))
    );
  }

  filterSpells(value: ISpell): ISpell[] {
    const filterValue = value === undefined ? '' : value.spellName === undefined ? '' : value.spellName.toLowerCase();
    return this.spells.filter(option => option.spellName.toLowerCase().indexOf(filterValue) === 0);
  }

  filterJutsu(value: string): IJutsu[] {
    const filterValue = value === undefined ? '' : value.toLowerCase();
    return this.jutsu.filter(option => option.jutsuName.toLowerCase().indexOf(filterValue) === 0);
  }

  testSelectedSpellValue(): boolean {
    return this.selectedSpell !== undefined && this.selectedSpell !== null;
  }

  testSelectedJutsuValue(): boolean {
    return this.selectedJutsu !== undefined && this.selectedJutsu !== null;
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

  resetJutsu() {
    this.selectedJutsu = null;
  }

  resetJutsuFilter() {
    this.jutsu = null;
    this.selectedJutsu = null;
    this.isFiltered = false;
    this.releaseFormControl.patchValue([]);
  }

  setShinobi() {
    this.resetSpellFilter();
    this.isShinobi = true;
    this.isMagical = false;
  }

  setMagical() {
    this.resetJutsuFilter();
    this.isMagical = true;
    this.isShinobi = false;
  }

  clearSettings() {
    this.resetSpellFilter();
    this.resetSpell();
    this.resetJutsuFilter();
    this.resetJutsu();
    this.isMagical = false;
    this.isShinobi = false;
  }

  displayLevelAndSchool() {
    if (this.selectedSpell.spellLevel === 0) {
      return this.selectedSpell.spellSchool + ' Cantrip';
    } else {
      return 'Level ' + this.selectedSpell.spellLevel + ' ' + this.selectedSpell.spellSchool;
    }
  }

  displayRankAndRelease() {
    if (this.selectedJutsu.rank !== 'Basic') {
      return this.selectedJutsu.rank + ' Rank ' + this.selectedJutsu.release + ' Release';
    } else {
      return this.selectedJutsu.rank + ' ' + this.selectedJutsu.release + ' Release';
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
    const character: ICharacter = JSON.parse(sessionStorage.getItem('activeCharacter'));
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

  isShinobiCharacter(): boolean {
    const character: ICharacter = JSON.parse(sessionStorage.getItem('activeCharacter'));
    if (!character) {
      return false;
    }
    let isShinobi = false;
    character.characterClass.forEach(ele => {
      if (ele.className === ClassOption.Shinobi) {
        isShinobi = true;
      }
    });
    return isShinobi;
  }

  allSpellFlagsFalse() {
    if (!this.bardChosen && !this.bloodHunterChosen && !this.clericChosen && !this.druidChosen && !this.ritualSpellsChosen &&
      !this.paladinChosen && !this.rangerChosen && !this.sorcererChosen && !this.warlockChosen && !this.wizardChosen) {
      return true;
    }
    return false;
  }

  allReleaseFlagsFalse() {
    if (!this.fireReleaseChosen && !this.earthReleaseChosen && !this.windReleaseChosen && !this.lightningReleaseChosen &&
      !this.waterReleaseChosen) {
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

  compareJutsuNames(a, b) {
    if (a.jutsuName < b.jutsuName) {
      return -1;
    }
    if (a.jutsuName > b.jutsuName) {
      return 1;
    }
    return 0;
  }

  get fireReleaseChosen() {
    return this.checkIsNullorUndefined(this.releaseFormControl.value) ? false : this.releaseFormControl.value.includes('fireRelease');
  }

  get waterReleaseChosen() {
    return this.checkIsNullorUndefined(this.releaseFormControl.value) ? false : this.releaseFormControl.value.includes('waterRelease');
  }

  get lightningReleaseChosen() {
    return this.checkIsNullorUndefined(this.releaseFormControl.value) ? false : this.releaseFormControl.value.includes('lightningRelease');
  }

  get earthReleaseChosen() {
    return this.checkIsNullorUndefined(this.releaseFormControl.value) ? false : this.releaseFormControl.value.includes('earthRelease');
  }

  get windReleaseChosen() {
    return this.checkIsNullorUndefined(this.releaseFormControl.value) ? false : this.releaseFormControl.value.includes('windRelease');
  }

  get yinYangReleaseChosen() {
    return this.checkIsNullorUndefined(this.releaseFormControl.value) ? false : this.releaseFormControl.value.includes('yinYangRelease');
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
