import { Component, OnInit } from '@angular/core';
import { CharacterService } from '../shared/character.service';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { IClass, ClassOption } from '../shared/models.component';
import { FormControl } from '@angular/forms';
import { FormUtilityService } from '../shared/form-utility.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-character-creation-dialog',
  templateUrl: './character-creation-dialog.component.html',
  styleUrls: ['./character-creation-dialog.component.scss']
})
export class CharacterCreationDialogComponent implements OnInit {

  classes = new FormControl();
  races;
  classList;

  username: string;
  selectedRace: string;
  characterName: string;
  level: number;
  health: number;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  active: string;
  barbarianLevel: number;
  bardLevel: number;
  bloodhunterLevel: number;
  clericLevel: number;
  druidLevel: number;
  fighterLevel: number;
  gunslingerLevel: number;
  monkLevel: number;
  paladinLevel: number;
  rangerLevel: number;
  rogueLevel: number;
  shinobiLevel: number;
  sorcererLevel: number;
  warlockLevel: number;
  witcherLevel: number;
  wizardLevel: number;
  chakra: number;
  selectedClasses: IClass[] = [];

  constructor(
    public dialogRef: MatDialogRef<CharacterCreationDialogComponent>,
    private formUtils: FormUtilityService,
    private charService: CharacterService,
    private snackBar: MatSnackBar,
    private notificationService: NotificationService
  ) {
    this.races = this.formUtils.getRaces();
    this.classList = this.formUtils.getClassList();
  }

  ngOnInit() {
  }

  create() {
    this.getSelectedClasses();
    if (!this.formUtils.isValidLevels(this.level, this.selectedClasses)) {
      this.snackBar.open('The levels provided don\'t match overall level', 'Done').onAction().subscribe(() => {
        return;
      });
    }
    const newCharacter = {
      name: this.characterName,
      race: this.selectedRace,
      level: this.formUtils.ensureNumeralNotNull(this.level),
      maxHealth: this.formUtils.ensureNumeralNotNull(this.health),
      currentHealth: this.formUtils.ensureNumeralNotNull(this.health),
      characterClass: this.selectedClasses,
      isMulticlassed: this.selectedClasses.length > 1,
      isActive: false,
      strength: this.formUtils.ensureNumeralNotNull(this.strength),
      dexterity: this.formUtils.ensureNumeralNotNull(this.dexterity),
      constitution: this.formUtils.ensureNumeralNotNull(this.constitution),
      intelligence: this.formUtils.ensureNumeralNotNull(this.intelligence),
      wisdom: this.formUtils.ensureNumeralNotNull(this.wisdom),
      charisma: this.formUtils.ensureNumeralNotNull(this.charisma),
      chakra: this.formUtils.ensureNumeralNotNull(this.chakra)
    };
    if (this.formUnprocessable(newCharacter)) {
      this.snackBar.open('There was an issue processing your form', 'Done').onAction().subscribe(() => { });
    } else {
      this.charService.createCharacter(newCharacter).subscribe(resp => {
        if (!resp) {
          this.notificationService.error("Character Creation Failure", "There was an issue creating your character", 4000);
        } else {
          this.notificationService.success("Character Creation Success", "Your Character was created successfully!", 4000);
          this.dialogRef.close();
        }
      });
    }
  }

  getSelectedClasses() {
    this.selectedClasses = [];
    let placeholder: IClass;
    if (this.formUtils.getBarbarianChosen(this.classes.value)) {
      placeholder = {
        className: ClassOption.Barbarian,
        classLevel: !this.formUtils.checkIsNullorUndefined(this.barbarianLevel) ? this.barbarianLevel : 0
      };
      this.selectedClasses.push(placeholder);
    }
    if (this.formUtils.getBardChosen(this.classes.value)) {
      placeholder = {
        className: ClassOption.Bard,
        classLevel: !this.formUtils.checkIsNullorUndefined(this.bardLevel) ? this.bardLevel : 0
      };
      this.selectedClasses.push(placeholder);
    }
    if (this.formUtils.getBloodHunterChosen(this.classes.value)) {
      placeholder = {
        className: ClassOption.BloodHunter,
        classLevel: !this.formUtils.checkIsNullorUndefined(this.bloodhunterLevel) ? this.bloodhunterLevel : 0
      };
      this.selectedClasses.push(placeholder);
    }
    if (this.formUtils.getClericChosen(this.classes.value)) {
      placeholder = {
        className: ClassOption.Cleric,
        classLevel: !this.formUtils.checkIsNullorUndefined(this.clericLevel) ? this.clericLevel : 0
      };
      this.selectedClasses.push(placeholder);
    }
    if (this.formUtils.getDruidChosen(this.classes.value)) {
      placeholder = {
        className: ClassOption.Druid,
        classLevel: !this.formUtils.checkIsNullorUndefined(this.druidLevel) ? this.druidLevel : 0
      };
      this.selectedClasses.push(placeholder);
    }
    if (this.formUtils.getFighterChosen(this.classes.value)) {
      placeholder = {
        className: ClassOption.Fighter,
        classLevel: !this.formUtils.checkIsNullorUndefined(this.fighterLevel) ? this.fighterLevel : 0
      };
      this.selectedClasses.push(placeholder);
    }
    if (this.formUtils.getGunslingerChosen(this.classes.value)) {
      placeholder = {
        className: ClassOption.Gunslinger,
        classLevel: !this.formUtils.checkIsNullorUndefined(this.gunslingerLevel) ? this.gunslingerLevel : 0
      };
      this.selectedClasses.push(placeholder);
    }
    if (this.formUtils.getMonkChosen(this.classes.value)) {
      placeholder = {
        className: ClassOption.Monk,
        classLevel: !this.formUtils.checkIsNullorUndefined(this.monkLevel) ? this.monkLevel : 0
      };
      this.selectedClasses.push(placeholder);
    }
    if (this.formUtils.getPaladinChosen(this.classes.value)) {
      placeholder = {
        className: ClassOption.Paladin,
        classLevel: !this.formUtils.checkIsNullorUndefined(this.paladinLevel) ? this.paladinLevel : 0
      };
      this.selectedClasses.push(placeholder);
    }
    if (this.formUtils.getRangerChosen(this.classes.value)) {
      placeholder = {
        className: ClassOption.Ranger,
        classLevel: !this.formUtils.checkIsNullorUndefined(this.rangerLevel) ? this.rangerLevel : 0
      };
      this.selectedClasses.push(placeholder);
    }
    if (this.formUtils.getRogueChosen(this.classes.value)) {
      placeholder = {
        className: ClassOption.Rogue,
        classLevel: !this.formUtils.checkIsNullorUndefined(this.rogueLevel) ? this.rogueLevel : 0
      };
      this.selectedClasses.push(placeholder);
    }
    if (this.formUtils.getShinobiChosen(this.classes.value)) {
      placeholder = {
        className: ClassOption.Shinobi,
        classLevel: !this.formUtils.checkIsNullorUndefined(this.shinobiLevel) ? this.shinobiLevel : 0
      };
      this.selectedClasses.push(placeholder);
    }
    if (this.formUtils.getSorcererChosen(this.classes.value)) {
      placeholder = {
        className: ClassOption.Sorcerer,
        classLevel: !this.formUtils.checkIsNullorUndefined(this.sorcererLevel) ? this.sorcererLevel : 0
      };
      this.selectedClasses.push(placeholder);
    }
    if (this.formUtils.getWarlockChosen(this.classes.value)) {
      placeholder = {
        className: ClassOption.Warlock,
        classLevel: !this.formUtils.checkIsNullorUndefined(this.warlockLevel) ? this.warlockLevel : 0
      };
      this.selectedClasses.push(placeholder);
    }
    if (this.formUtils.getWitcherChosen(this.classes.value)) {
      placeholder = {
        className: ClassOption.Witcher,
        classLevel: !this.formUtils.checkIsNullorUndefined(this.witcherLevel) ? this.witcherLevel : 0
      };
      this.selectedClasses.push(placeholder);
    }
    if (this.formUtils.getWizardChosen(this.classes.value)) {
      placeholder = {
        className: ClassOption.Wizard,
        classLevel: !this.formUtils.checkIsNullorUndefined(this.wizardLevel) ? this.wizardLevel : 0
      };
      this.selectedClasses.push(placeholder);
    }
  }

  formUnprocessable(potentialChar): boolean {
    return (potentialChar.name === undefined || potentialChar.name === null || potentialChar.name === '' ||
      potentialChar.name === ' ' || this.selectedClasses.length < 1 || this.selectedRace === undefined);
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

  get witcherChosen() {
    return this.formUtils.getWitcherChosen(this.classes.value);
  }

  get wizardChosen() {
    return this.formUtils.getWizardChosen(this.classes.value);
  }

}
