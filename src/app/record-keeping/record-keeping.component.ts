import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UtilityService } from '../shared/utility.service';
import { Spell, Jutsu, Monster, IAbility } from '../shared/models.component';
import { FormUtilityService } from '../shared/form-utility.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-record-keeping',
  templateUrl: './record-keeping.component.html',
  styleUrls: ['./record-keeping.component.scss'],
  standalone: false
})
export class RecordKeepingComponent implements OnInit {

  schools = [{ key: 'Abjuration', value: 'Abjuration' }, { key: 'Conjuration', value: 'Conjuration' },
  { key: 'Divination', value: 'Divination' }, { key: 'Enchantment', value: 'Enchantment' },
  { key: 'Evocation', value: 'Evocation' }, { key: 'Illusion', value: 'Illusion' },
  { key: 'Necromancy', value: 'Necromancy' }, { key: 'Transmutation', value: 'Transmutation' }];

  ranks = [{ key: 'S Rank', value: 'S' }, { key: 'A Rank', value: 'A' }, { key: 'B Rank', value: 'B' },
  { key: 'C Rank', value: 'C' }, { key: 'D Rank', value: 'D' }, { key: 'Basic Level', value: 'Basic' }];

  sizes = [{ key: 'Tiny', value: 'Tiny' }, { key: 'Small', value: 'Small' }, { key: 'Medium', value: 'Medium' },
  { key: 'Large', value: 'Large' }, { key: 'Huge', value: 'Huge' }, { key: 'Gargantuan', value: 'Gargantuan' }];

  releases = [{ key: 'Earth', value: 'Earth' }, { key: 'Fire', value: 'Fire' }, { key: 'Lightning', value: 'Lightning' },
  { key: 'Water', value: 'Water' }, { key: 'Wind', value: 'Wind' }, { key: 'Blaze', value: 'Blaze' },
  { key: 'Explosive', value: 'Explosive' }, { key: 'Ice', value: 'Ice' }, { key: 'Lava', value: 'Lava' },
  { key: 'Magnet', value: 'Magnet' }, { key: 'Scorch', value: 'Scorch' }, { key: 'Storm', value: 'Storm' },
  { key: 'Swift', value: 'Swift' }, { key: 'Vapor', value: 'Vapor' }, { key: 'Wood', value: 'Wood' },
  { key: 'Yin-Yang', value: 'Yin-Yang' }];

  monsterTypes = [{ key: 'Aberration', value: 'Aberration' }, { key: 'Beast', value: 'Beast' },
  { key: 'Celestial', value: 'Celetstial' }, { key: 'Construct', value: 'Construct' },
  { key: 'Dragon', value: 'Dragon' }, { key: 'Elemental', value: 'Elemental' },
  { key: 'Fey', value: 'Fey' }, { key: 'Fiend', value: 'Fiend' }, { key: 'Giant', value: 'Giant' },
  { key: 'Humanoid', value: 'Humanoid' }, { key: 'Monstrosity', value: 'Monstrosity' },
  { key: 'Ooze', value: 'Ooze' }, { key: 'Plant', value: 'Plant' }, { key: 'Undead', value: 'Undead' }];

  alignments = [{ key: 'Lawful Good', value: 'LG' }, { key: 'Lawful Neutral', value: 'LN' },
  { key: 'Lawful Evil', value: 'LE' }, { key: 'Neutral Good', value: 'NG' }, { key: 'Neutral', value: 'N' },
  { key: 'Neutral Evil', value: 'NE' }, { key: 'Chaotic Good', value: 'CG' },
  { key: 'Chaotic Neutral', value: 'CN' }, { key: 'Chaotic Evil', value: 'CE' }];

  // Radio values
  // --  0 - Jutsu
  // --  1 - Spell
  // --  2 - File
  // --  3 - Monster
  selectedDataType: number;

  /** Jutsu variables */
  jutsuName: string;
  release: string;
  jutsuRank: string;
  cost: number;
  jRange: string;
  jDuration: string;
  jDescription: string;

  /** Spell variables */
  spellName: string;
  spellSchool: string;
  spellLevel: number;
  castingTime: string;
  sRange: string;
  components: string;
  sDuration: string;
  sDescription: string;

  classList;
  classes = new FormControl();

  /** File Variables */
  fileToUpload: File = null;
  @ViewChild('file', { static: false }) adminFile: ElementRef;

  /** Monster Variables */
  monsterCommonName: string;
  monsterType: string;
  monsterSubType: string;
  monsterArmorClass: number;
  monsterHealth: number;
  monsterStrength: IAbility;
  monsterDexterity: IAbility;
  monsterConstitution: IAbility;
  monsterIntelligence: IAbility;
  monsterWisdom: IAbility;
  monsterCharisma: IAbility;
  monsterSpeed: string;
  monsterSkills: string;
  monsterSavingThrows: string;
  monsterDamageResistances: string;
  monsterDamageImmunities: string;
  monsterDamageVulnerabilities: string;
  monsterSenses: string;
  monsterLanguages: string;
  monsterChallengeRating: number;
  monsterAbilities: string;
  monsterAttacks: string;
  monsterSize: string;
  monsterAlignment: string;
  monsterConditionImmunities: string;
  monsterHitDice: string;
  monsterExpValue: number;
  monsterLegendaryActions: string;

  constructor(
    private utilService: UtilityService,
    private formUtils: FormUtilityService) {
    this.classList = this.formUtils.getMagicalClassList();
  }

  ngOnInit() {
  }

  public addRecord() {
    if (this.selectedDataType === 0) {
      const jutsu: Jutsu = new Jutsu();
      jutsu.cost = this.cost;
      jutsu.description = this.jDescription;
      jutsu.duration = this.jDuration;
      jutsu.jutsuName = this.jutsuName;
      jutsu.range = this.jRange;
      jutsu.rank = this.jutsuRank;
      jutsu.release = this.release;
      this.utilService.addJutsuRecord(jutsu).subscribe(resp => {
        if (resp.success) {
          this.cost = 0;
          this.jDescription = '';
          this.jDuration = '';
          this.jutsuName = '';
          this.jRange = '';
          this.jutsuRank = '';
          this.release = '';
        }
      });
    } else if (this.selectedDataType === 1) {
      const spell: Spell = new Spell();
      spell.spellName = this.spellName;
      spell.spellSchool = this.spellSchool;
      spell.spellLevel = this.spellLevel;
      spell.castingTime = this.castingTime;
      spell.components = this.components;
      spell.description = this.sDescription;
      spell.duration = this.sDuration;
      spell.range = this.sRange;
      spell.bardCanCast = this.bardChosen;
      spell.bloodHunterCanCast = this.bloodHunterChosen;
      spell.clericCanCast = this.clericChosen;
      spell.druidCanCast = this.druidChosen;
      spell.paladinCanCast = this.paladinChosen;
      spell.rangerCanCast = this.rangerChosen;
      spell.sorcererCanCast = this.sorcererChosen;
      spell.warlockCanCast = this.warlockChosen;
      spell.wizardCanCast = this.wizardChosen;
      spell.isRitual = this.ritualChosen;
      this.utilService.addSpellRecord(spell).subscribe(resp => {
        if (resp.success) {
          if (resp.success) {
            this.spellName = '';
            this.spellSchool = '';
            this.spellLevel = 0;
            this.castingTime = '';
            this.components = '';
            this.sDescription = '';
            this.sDuration = '';
            this.sRange = '';
            this.classes.patchValue([]);
          }
        }
      });
    } else if (this.selectedDataType === 2) {
      this.utilService.uploadFile(this.fileToUpload).subscribe(resp => {
        if (resp && resp.success) {
          this.adminFile.nativeElement.value = null;
        }
      });
    } else if (this.selectedDataType === 3) {
      const monster = new Monster();
      monster.commonName = this.monsterCommonName;
      monster.type = this.monsterType;
      monster.subType = this.monsterSubType;
      monster.armorClass = this.monsterArmorClass;
      monster.health = this.monsterHealth;
      monster.strength = this.monsterStrength;
      monster.dexterity = this.monsterDexterity;
      monster.constitution = this.monsterConstitution;
      monster.intelligence = this.monsterIntelligence;
      monster.wisdom = this.monsterWisdom;
      monster.charisma = this.monsterCharisma;
      monster.speed = this.monsterSpeed;
      monster.skills = this.monsterSkills;
      monster.savingThrows = this.monsterSavingThrows;
      monster.damageResistances = this.monsterDamageResistances;
      monster.damageImmunities = this.monsterDamageImmunities;
      monster.damageVulnerabilities = this.monsterDamageVulnerabilities;
      monster.senses = this.monsterSenses;
      monster.languages = this.monsterLanguages;
      monster.challengeRating = this.monsterChallengeRating;
      monster.abilities = this.monsterAbilities;
      monster.attacks = this.monsterAttacks;
      monster.size = this.monsterSize;
      monster.alignment = this.monsterAlignment;
      monster.conditionImmunities = this.monsterConditionImmunities;
      monster.expValue = this.monsterExpValue;
      monster.avgHitDice = this.monsterHitDice;
      monster.legendaryActions = this.monsterLegendaryActions;
      this.utilService.addMonsterRecord(monster).subscribe(resp => {
        if (resp && resp.success) {
          this.monsterCommonName = '';
          this.monsterType = '';
          this.monsterSubType = '';
          this.monsterArmorClass = 0;
          this.monsterHealth = 0;
          this.monsterStrength = null;
          this.monsterDexterity = null;
          this.monsterConstitution = null;
          this.monsterIntelligence = null;
          this.monsterWisdom = null;
          this.monsterCharisma = null;
          this.monsterSpeed = '';
          this.monsterSkills = '';
          this.monsterSavingThrows = '';
          this.monsterDamageResistances = '';
          this.monsterDamageImmunities = '';
          this.monsterDamageVulnerabilities = '';
          this.monsterSenses = '';
          this.monsterLanguages = '';
          this.monsterChallengeRating = 0;
          this.monsterAbilities = '';
          this.monsterAttacks = '';
          this.monsterSize = '';
          this.monsterAlignment = '';
          this.monsterConditionImmunities = '';
          this.monsterExpValue = 0;
          this.monsterHitDice = '';
          this.monsterLegendaryActions = '';
        }
      });
    } else {
      console.log('Do nothing');
    }
  }

  get isJutsu() {
    return this.selectedDataType === 0;
  }

  get isSpell() {
    return this.selectedDataType === 1;
  }

  get isFile() {
    return this.selectedDataType === 2;
  }

  get isMonster() {
    return this.selectedDataType === 3;
  }

  newArray() {
    return new Array(9);
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  get barbarianChosen(): boolean {
    return this.formUtils.getBarbarianChosen(this.classes.value);
  }

  get bardChosen(): boolean {
    return this.formUtils.getBardChosen(this.classes.value);
  }

  get bloodHunterChosen() {
    return this.formUtils.getBloodHunterChosen(this.classes.value);
  }

  get clericChosen() {
    return this.formUtils.getClericChosen(this.classes.value);
  }

  get druidChosen() {
    return this.formUtils.getDruidChosen(this.classes.value);
  }

  get fighterChosen() {
    return this.formUtils.getFighterChosen(this.classes.value);
  }

  get gunslingerChosen() {
    return this.formUtils.getGunslingerChosen(this.classes.value);
  }

  get monkChosen() {
    return this.formUtils.getMonkChosen(this.classes.value);
  }

  get paladinChosen() {
    return this.formUtils.getPaladinChosen(this.classes.value);
  }

  get rangerChosen() {
    return this.formUtils.getRangerChosen(this.classes.value);
  }

  get rogueChosen() {
    return this.formUtils.getRogueChosen(this.classes.value);
  }

  get shinobiChosen() {
    return this.formUtils.getShinobiChosen(this.classes.value);
  }

  get sorcererChosen() {
    return this.formUtils.getSorcererChosen(this.classes.value);
  }

  get warlockChosen() {
    return this.formUtils.getWarlockChosen(this.classes.value);
  }

  get wizardChosen() {
    return this.formUtils.getWizardChosen(this.classes.value);
  }

  get ritualChosen() {
    return this.formUtils.getRitualChosen(this.classes.value);
  }

  validateObjectComplete(obj: any) {
    for (const i in obj) {
      if (!obj[i]) {
        console.log(obj[i]);
        return false;
      }
    }
  }

}
