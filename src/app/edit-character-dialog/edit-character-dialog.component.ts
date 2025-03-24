import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ICharacter, ClassOption, IClass } from '../shared/models.component';
import { CharacterService } from '../shared/character.service';
import { FormControl } from '@angular/forms';
import { FormUtilityService } from '../shared/form-utility.service';

@Component({
  selector: 'app-edit-character-dialog',
  templateUrl: './edit-character-dialog.component.html',
  styleUrls: ['./edit-character-dialog.component.scss']
})
export class EditCharacterDialogComponent implements OnInit {

  character: ICharacter;
  classes = new FormControl();
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
  selectedClasses: IClass[] = [];
  races;
  classList;

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<EditCharacterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private charService: CharacterService,
    private formUtils: FormUtilityService
  ) {
    this.character = data.character;
    this.getCharacterClassInformation();
    this.races = this.formUtils.getRaces();
    this.classList = this.formUtils.getClassList();
  }

  ngOnInit() {
  }

  edit() {
    this.getSelectedClasses();
    this.character.characterClass = this.selectedClasses;
    this.ensureCorrectMod();
    this.charService.updateCharacter(this.character).subscribe(() => {
      this.dialogRef.close();
    });
  }

  getCharacterClassInformation() {
    const clazz = [];
    this.character.characterClass.forEach(character => {
      if (character.className === ClassOption.Barbarian) {
        clazz.push('barbarian');
        this.barbarianLevel = character.classLevel;
      }
      if (character.className === ClassOption.Bard) {
        clazz.push('bard');
        this.bardLevel = character.classLevel;
      }
      if (character.className === ClassOption.BloodHunter) {
        clazz.push('bloodhunter');
        this.bloodhunterLevel = character.classLevel;
      }
      if (character.className === ClassOption.Cleric) {
        clazz.push('cleric');
        this.clericLevel = character.classLevel;
      }
      if (character.className === ClassOption.Druid) {
        clazz.push('druid');
        this.druidLevel = character.classLevel;
      }
      if (character.className === ClassOption.Fighter) {
        clazz.push('fighter');
        this.fighterLevel = character.classLevel;
      }
      if (character.className === ClassOption.Gunslinger) {
        clazz.push('gunslinger');
        this.gunslingerLevel = character.classLevel;
      }
      if (character.className === ClassOption.Monk) {
        clazz.push('monk');
        this.monkLevel = character.classLevel;
      }
      if (character.className === ClassOption.Paladin) {
        clazz.push('paladin');
        this.paladinLevel = character.classLevel;
      }
      if (character.className === ClassOption.Ranger) {
        clazz.push('ranger');
        this.rangerLevel = character.classLevel;
      }
      if (character.className === ClassOption.Rogue) {
        clazz.push('rogue');
        this.rogueLevel = character.classLevel;
      }
      if (character.className === ClassOption.Shinobi) {
        clazz.push('shinobi');
        this.shinobiLevel = character.classLevel;
      }
      if (character.className === ClassOption.Sorcerer) {
        clazz.push('sorcerer');
        this.sorcererLevel = character.classLevel;
      }
      if (character.className === ClassOption.Warlock) {
        clazz.push('warlock');
        this.warlockLevel = character.classLevel;
      }
      if (character.className === ClassOption.Witcher) {
        clazz.push('witcher');
        this.witcherLevel = character.classLevel;
      }
      if (character.className === ClassOption.Wizard) {
        clazz.push('wizard');
        this.wizardLevel = character.classLevel;
      }
    });
    this.classes.setValue(clazz);
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

  ensureCorrectMod() {
    this.character.strength.abilityModifier = this.charService.convertABSToMod(this.character.strength.abilityScore);
    this.character.dexterity.abilityModifier = this.charService.convertABSToMod(this.character.dexterity.abilityScore);
    this.character.constitution.abilityModifier = this.charService.convertABSToMod(this.character.constitution.abilityScore);
    this.character.intelligence.abilityModifier = this.charService.convertABSToMod(this.character.intelligence.abilityScore);
    this.character.wisdom.abilityModifier = this.charService.convertABSToMod(this.character.wisdom.abilityScore);
    this.character.charisma.abilityModifier = this.charService.convertABSToMod(this.character.charisma.abilityScore);
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
