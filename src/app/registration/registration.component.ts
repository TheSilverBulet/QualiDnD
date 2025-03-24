import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IClass, ClassOption } from '../shared/models.component';
import { UserService } from '../shared/user.service';
import { MatSnackBar } from '@angular/material';
import { AppViewService } from '../shared/app-view.service';
import { FormControl } from '@angular/forms';
import { FormUtilityService } from '../shared/form-utility.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  classes = new FormControl();
  races;
  classList;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  selectedRace: string;
  characterName: string;
  password: string;
  createCharacter: boolean;
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
  wizardLevel: number;
  chakra: number;
  selectedClasses: IClass[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private appView: AppViewService,
    private formUtils: FormUtilityService,
    private notificationService: NotificationService
  ) {
    this.races = this.formUtils.getRaces();
    this.classList = this.formUtils.getClassList();
  }

  ngOnInit() {
  }

  toDashboard() {
    this.router.navigate(['/login']);
  }

  register() {
    const newUser = {
      id: null,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      username: this.username,
      password: this.password,
      role: 'USER',
      activeCharacter: null
    };
    if (this.createCharacter) {
      this.getClassObjects();
      if (!this.formUtils.isValidLevels(this.level, this.selectedClasses)) {
        this.snackBar.open('The levels provided don\'t match overall level', 'Done').onAction().subscribe(() => { });
      }
      const newCharacter = {
        name: this.characterName,
        race: this.selectedRace,
        level: this.level !== undefined ? this.level : 0,
        maxHealth: this.health !== undefined ? this.health : 0,
        currentHealth: this.health !== undefined ? this.health : 0,
        characterClass: this.selectedClasses,
        isMulticlassed: this.selectedClasses.length > 1,
        isActive: true,
        strength: this.strength !== undefined ? this.strength : 0,
        dexterity: this.dexterity !== undefined ? this.dexterity : 0,
        constitution: this.constitution !== undefined ? this.constitution : 0,
        intelligence: this.intelligence !== undefined ? this.intelligence : 0,
        wisdom: this.wisdom !== undefined ? this.wisdom : 0,
        charisma: this.charisma !== undefined ? this.charisma : 0,
        chakra: this.chakra !== undefined ? this.chakra : 0
      };
      if (this.formUnprocessable(newUser, newCharacter) || !this.formUtils.isValidLevels(this.level, this.selectedClasses)) {
        this.snackBar.open('There was an issue processing your form', 'Done').onAction().subscribe(() => { });
      } else {
        this.userService.registerUser(newUser, newCharacter).subscribe(resp => {
          if (resp) {
            this.notificationService.success("Registration", "You have successfully registered", 4000);
            this.router.navigate(['/login']);
          }
        });
      }
    } else {
      if (this.formUnprocessable(newUser, null) || !this.formUtils.isValidLevels(this.level, this.selectedClasses)) {
        this.snackBar.open('There was an issue processing your form', 'Done').onAction().subscribe(() => { });
      } else {
        this.userService.registerUser(newUser, null).subscribe(resp => {
          if (resp) {
            this.notificationService.success("Registration", "You have successfully registered", 4000);
            this.router.navigate(['/login']);
          }
        });
      }
    }
  }

  getClassObjects() {
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
    if (this.formUtils.getWizardChosen(this.classes.value)) {
      placeholder = {
        className: ClassOption.Wizard,
        classLevel: !this.formUtils.checkIsNullorUndefined(this.wizardLevel) ? this.wizardLevel : 0
      };
      this.selectedClasses.push(placeholder);
    }
  }

  formUnprocessable(potentialUser, potentialChar): boolean {
    if (potentialChar === null) {
      return potentialUser.username === undefined || potentialUser.password === undefined ||
        potentialUser.password === ' ' || potentialUser.firstName === undefined || potentialUser.lastName === undefined;
    }
    return (potentialChar.name === undefined || potentialChar.name === null || potentialChar.name === '' ||
      potentialChar.name === ' ' || this.selectedClasses.length < 1 || this.selectedRace === undefined ||
      potentialUser.username === undefined || potentialUser.password === undefined ||
      potentialUser.password === ' ' || potentialUser.firstName === undefined || potentialUser.lastName === undefined);
  }

  get isMobile() {
    return this.appView.getIsMobileResolution();
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

}
