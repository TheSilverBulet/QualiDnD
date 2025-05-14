import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ICharacter, IInitiative, IMonster, IAbility } from '../shared/models.component';
import { InitiativeService } from '../shared/initiative.service';
import { AuthService } from '../authorization/auth.service';
import { CharacterService } from '../shared/character.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { UtilityService } from '../shared/utility.service';
import { startWith, map } from 'rxjs/operators';
import { AppViewService } from '../shared/app-view.service';
import { SafeHtmlPipe } from '../pipes/safe-html.pipe';
import { InitiativeTableComponent } from '../initiative-table/initiative-table.component';
import { DashboardCharacterComponent } from '../dashboard-character/dashboard-character.component';
import { AbilitySearchComponent } from '../ability-search/ability-search.component';

const SINGLE_SPACE = '&nbsp;';
const DOUBLE_SPACE = '&nbsp;&nbsp;';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [InitiativeTableComponent, DashboardCharacterComponent, AbilitySearchComponent]
})
export class DashboardComponent implements OnInit {

  @ViewChild('miscBonusField', { static: false }) miscBonusField: ElementRef;
  @ViewChild('npcNameField', { static: false }) npcNameField: ElementRef;
  @ViewChild('npcHealthField', { static: false }) npcHealthField: ElementRef;
  @ViewChild('npcDexBonusField', { static: false }) npcDexBonusField: ElementRef;
  miscBonus: number;
  initTable: IInitiative[] = [];
  activeCharacter: ICharacter | null;

  /** NPC Initiative */
  npcName: string;
  npcHealth: number;
  npcDexBonus: number;
  /**
   * 0 - FreeForm
   * 1 - From Database
   */
  npcType: number;
  allowInitiative = true;

  /** Monster */
  monsters: IMonster[];
  selectedMonster: IMonster | null;
  filteredMonsters: Observable<IMonster[]>;
  monsterControl = new FormControl();

  isAdmin = false;

  constructor(
    private initiativeService: InitiativeService,
    private authService: AuthService,
    private charService: CharacterService,
    private utilService: UtilityService,
    private viewService: AppViewService,
    private safeHtml: SafeHtmlPipe
  ) {
  }

  ngOnInit() {
    this.initiativeService.getInitTable().subscribe(resp => {
      this.initTable = resp;
    });
    this.charService.getDashboardCharacter().subscribe(resp => {
      if (resp && resp.name) {
        this.activeCharacter = resp;
        sessionStorage.setItem('activeCharacter', JSON.stringify(resp));
      } else {
        this.activeCharacter = null;
      }
    });
    this.monsters = this.utilService.retrieveAllMonsters();
    this.isAdmin = this.authService.isAdmin;
  }

  public rollInitiative(advantageFlag: number) {
    if (this.miscBonusField.nativeElement.value === '') {
      this.miscBonus = 0;
    }
    if (advantageFlag === 1) {
      this.initiativeService.rollInitiativeAdv(this.miscBonus, this.authService.getLoggedInUsername).subscribe(resp => {
        console.log('Successfully rolled initiative with advantage');
        this.initTable = resp;
      });
    } else if (advantageFlag === -1) {
      this.initiativeService.rollInitiativeDis(this.miscBonus, this.authService.getLoggedInUsername).subscribe(resp => {
        console.log('Successfully rolled initiative with disadvantage');
        this.initTable = resp;
      });
    } else {
      this.initiativeService.rollInitiative(this.miscBonus, this.authService.getLoggedInUsername).subscribe(resp => {
        console.log('Successfully rolled initiative');
        console.log(resp);
        this.initTable = resp;
      });
    }
    this.miscBonusField.nativeElement.value = '';
    this.allowInitiative = false;
  }

  // Fix this method for the rest of the npc fields apparently for creatures from DB it's broken
  public rollNpcInitiative(advantageFlag: number) {
    if (this.npcType === 0) {
      this.rollFreeFormNpcInitiative(advantageFlag);
    } else {
      this.rollDBNpcInitiative(advantageFlag);
    }
  }

  private rollFreeFormNpcInitiative(advantageFlag: number) {
    if (this.npcDexBonusField.nativeElement.value === '') {
      this.npcDexBonus = 0;
    }
    if (advantageFlag === 1) {
      this.initiativeService.rollNpcInitiativeAdv(this.npcDexBonus, this.npcName, this.npcHealth).subscribe(resp => {
        console.log('Successfully rolled initiative with advantage');
        this.initTable = resp;
      });
    } else if (advantageFlag === -1) {
      this.initiativeService.rollNpcInitiativeDis(this.npcDexBonus, this.npcName, this.npcHealth).subscribe(resp => {
        console.log('Successfully rolled initiative with disadvantage');
        this.initTable = resp;
      });
    } else {
      this.initiativeService.rollNpcInitiative(this.npcDexBonus, this.npcName, this.npcHealth).subscribe(resp => {
        console.log('Successfully rolled initiative');
        this.initTable = resp;
      });
    }
    this.npcDexBonusField.nativeElement.value = '';
    this.npcHealthField.nativeElement.value = '';
    this.npcNameField.nativeElement.value = '';
  }

  private rollDBNpcInitiative(advantageFlag: number) {
    if (this.selectedMonster) {
      if (advantageFlag === 1) {
        this.initiativeService.rollNpcInitiativeAdv(this.selectedMonster.dexterity.abilityModifier, this.selectedMonster.commonName + this.smallRandom, this.selectedMonster.health).subscribe(resp => {
          console.log('Successfully rolled initiative with advantage');
          this.initTable = resp;
        });
      } else if (advantageFlag === -1) {
        this.initiativeService.rollNpcInitiativeDis(this.selectedMonster.dexterity.abilityModifier, this.selectedMonster.commonName + this.smallRandom, this.selectedMonster.health).subscribe(resp => {
          console.log('Successfully rolled initiative with disadvantage');
          this.initTable = resp;
        });
      } else {
        this.initiativeService.rollNpcInitiative(this.selectedMonster.dexterity.abilityModifier, this.selectedMonster.commonName + this.smallRandom, this.selectedMonster.health).subscribe(resp => {
          console.log('Successfully rolled initiative');
          this.initTable = resp;
        });
      }
    }
  }

  get firstname(): string {
    const name: string = JSON.parse((sessionStorage.getItem('currentUser') as string)).firstName;
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  concludeBattle() {
    this.initiativeService.conclude().subscribe(resp => {
      if (resp.success) {
        this.initTable = [];
      }
    });
  }

  forceUpdate() {
    this.initiativeService.getInitTable().subscribe(table => {
      this.initTable = table;
    });
    if (this.initTable.length === 0) {
      this.allowInitiative = true;
    } else {
      this.allowInitiative = false;
    }
  }

  setAllowInitiative(value) {
    this.allowInitiative = value;
  }

  nextCreature() {
    this.initiativeService.nextCreature().subscribe(table => {
      this.initTable = table;
    });
  }

  fetchCharacter() {
    this.charService.getDashboardCharacter().subscribe(resp => {
      if (resp) {
        this.activeCharacter = resp;
        sessionStorage.setItem('activeCharacter', JSON.stringify(resp));
      }
    });
  }

  describeMonster(selectedMonster: IMonster) {
    this.selectedMonster = selectedMonster;
  }

  filterMonsters(value: IMonster): IMonster[] {
    const filterValue = value === undefined ? '' : value.commonName === undefined ? '' : value.commonName.toLowerCase();
    return this.monsters.filter(option => option.commonName.toLowerCase().indexOf(filterValue) === 0);
  }

  prepareFilteredMonsters() {
    this.filteredMonsters = this.monsterControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterMonsters(value))
    );
  }

  get hasSelectedMonster(): boolean {
    return this.selectedMonster !== undefined && this.selectedMonster !== null;
  }

  resetMonster() {
    this.selectedMonster = null;
  }

  describeAllAbilities(monster: IMonster) {
    return `<b>STR</b>` + SINGLE_SPACE + this.describeAbility(monster.strength) + DOUBLE_SPACE + `<b>DEX</b>` + SINGLE_SPACE + this.describeAbility(monster.dexterity) + DOUBLE_SPACE + `<b>CON</b>` + SINGLE_SPACE + this.describeAbility(monster.constitution) + DOUBLE_SPACE + `<b>INT</b>` + SINGLE_SPACE + this.describeAbility(monster.intelligence) + DOUBLE_SPACE + `<b>WIS</b>` + SINGLE_SPACE + this.describeAbility(monster.wisdom) + DOUBLE_SPACE + `<b>CHA</b>` + SINGLE_SPACE + this.describeAbility(monster.charisma);
  }

  describeCRAndExpVal(monster: IMonster) {
    return `<b>Challenge Rating</b>:` + SINGLE_SPACE + monster.challengeRating + SINGLE_SPACE + '(' + monster.expValue + SINGLE_SPACE + 'XP' + ')';
  }

  describeAbility(ability: IAbility) {
    if (ability.abilityModifier >= 0) {
      return ability.abilityScore + '(+' + ability.abilityModifier + ')';
    } else {
      return ability.abilityScore + '(' + ability.abilityModifier + ')';
    }
  }

  describeSizeTypeAlignment(monster: IMonster) {
    return `<i>` + monster.size + SINGLE_SPACE + monster.type + ',' + SINGLE_SPACE + monster.alignment + `</i>`;
  }

  describeInateAbilities(monster: IMonster) {
    let completeInateAbilitiesList = '';
    if (monster.savingThrows) {
      completeInateAbilitiesList = completeInateAbilitiesList + this.describeSavingThrows(monster);
    }
    if (monster.skills) {
      completeInateAbilitiesList = completeInateAbilitiesList + this.describeSkills(monster);
    }
    if (monster.damageVulnerabilities) {
      completeInateAbilitiesList = completeInateAbilitiesList + this.describeDamageVuln(monster);
    }
    if (monster.damageResistances) {
      completeInateAbilitiesList = completeInateAbilitiesList + this.describeDamageRes(monster);
    }
    if (monster.damageImmunities) {
      completeInateAbilitiesList = completeInateAbilitiesList + this.describeDamageImm(monster);
    }
    if (monster.conditionImmunities) {
      completeInateAbilitiesList = completeInateAbilitiesList + this.describeConditionImm(monster);
    }
    if (monster.senses) {
      completeInateAbilitiesList = completeInateAbilitiesList + this.describeSenses(monster);
    }
    if (monster.languages) {
      completeInateAbilitiesList = completeInateAbilitiesList + this.describeLanguages(monster);
    }
    if (monster.challengeRating) {
      completeInateAbilitiesList = completeInateAbilitiesList + this.describeCRAndExpVal(monster);
    }
    return completeInateAbilitiesList;
  }

  describeSavingThrows(monster: IMonster) {
    return `<span><b>Saving Throws</b>` + SINGLE_SPACE + monster.savingThrows + `</span><br />`;
  }

  describeSkills(monster: IMonster) {
    return `<span><b>Skills</b>` + SINGLE_SPACE + monster.skills + `</span><br />`;
  }

  describeDamageVuln(monster: IMonster) {
    return `<span><b>Damage Vulnerabilities</b>` + SINGLE_SPACE + monster.damageVulnerabilities + `</span><br />`;
  }

  describeDamageRes(monster: IMonster) {
    return `<span><b>Damage Resistances</b>` + SINGLE_SPACE + monster.damageResistances + `</span><br />`;
  }

  describeDamageImm(monster: IMonster) {
    return `<span><b>Damage Immunities</b>` + SINGLE_SPACE + monster.damageImmunities + `</span><br />`;
  }

  describeConditionImm(monster: IMonster) {
    return `<span><b>Condition Immunities</b>` + SINGLE_SPACE + monster.conditionImmunities + `</span><br />`;
  }

  describeSenses(monster: IMonster) {
    return `<span><b>Senses</b>` + SINGLE_SPACE + monster.senses + `</span><br />`;
  }

  describeLanguages(monster: IMonster) {
    return `<span><b>Languages</b>` + SINGLE_SPACE + monster.languages + `</span><br />`;
  }

  describeFeatures(monster: IMonster) {
    return `<div style="white-space: pre-wrap;">` + monster.abilities + `</div>`;
  }

  describeActions(monster: IMonster) {
    return `<div style="white-space: pre-wrap;"><b>Actions</b><br />` + monster.attacks + `</div>`;
  }

  get freeForm() {
    return this.npcType === 0;
  }

  get fromDatabase() {
    return this.npcType === 1;
  }

  get isMobile() {
    return this.viewService.getIsMobileResolution();
  }

  get smallRandom() {
    return Math.floor(Math.random() * (15 - 0) + 0);
  }

}
