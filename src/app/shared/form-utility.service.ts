import { Injectable } from '@angular/core';
import { IClass } from './models.component';

@Injectable({
  providedIn: 'root'
})
export class FormUtilityService {

  races = [{ key: 'Aarakocra', value: 'Aarakocra' }, { key: 'Aasimar', value: 'Aasimar' }, { key: 'Bugbear', value: 'Bugbear' },
  { key: 'Dragonborn', value: 'Dragonborn' }, { key: 'Dwarf', value: 'Dwarf' }, { key: 'Elf', value: 'Elf' },
  { key: 'Fairy', value: 'fairy' },
  { key: 'Firbolg', value: 'Firbolg' }, { key: 'Genasi', value: 'Genasi' }, { key: 'Goblin', value: 'Goblin' },
  { key: 'Goliath', value: 'Goliath' }, { key: 'Gnome', value: 'Gnome' }, { key: 'Halfling', value: 'Halfling' },
  { key: 'Half-Elf', value: 'Half-Elf' }, { key: 'Half-Orc', value: 'Half-Orc' }, { key: 'Hobgoblin', value: 'Hobgoblin' },
  { key: 'Human', value: 'Human' }, { key: 'Kenku', value: 'Kenku' }, { key: 'Kobold', value: 'Kobold' },
  { key: 'Lizardfolk', value: 'Lizardfolk' }, { key: 'Orc', value: 'Orc' }, { key: 'Tabaxi', value: 'Tabaxi' },
  { key: 'Tiefling', value: 'Tiefling' }, { key: 'Triton', value: 'Triton' }, { key: 'Yuan-Ti', value: 'Yuan-Ti' }];

  classList = [{ key: 'Barbarian', value: 'barbarian' }, { key: 'Bard', value: 'bard' }, { key: 'Bloodhunter', value: 'bloodhunter' },
  { key: 'Cleric', value: 'cleric' }, { key: 'Druid', value: 'druid' }, { key: 'Fighter', value: 'fighter' },
  { key: 'Gunslinger', value: 'gunslinger' }, { key: 'Monk', value: 'monk' }, { key: 'Paladin', value: 'paladin' },
  { key: 'Ranger', value: 'ranger' }, { key: 'Rogue', value: 'rogue' }, { key: 'Shinobi', value: 'shinobi' },
  { key: 'Sorcerer', value: 'sorcerer' }, { key: 'Warlock', value: 'warlock' }, { key: 'Witcher', value: 'witcher' },
  { key: 'Wizard', value: 'wizard' }];

  magicalClassList = [{ key: 'Bard', value: 'bard' }, { key: 'Bloodhunter', value: 'bloodhunter' },
  { key: 'Cleric', value: 'cleric' }, { key: 'Druid', value: 'druid' }, { key: 'Paladin', value: 'paladin' },
  { key: 'Ranger', value: 'ranger' }, { key: 'Sorcerer', value: 'sorcerer' }, { key: 'Warlock', value: 'warlock' },
  { key: 'Wizard', value: 'wizard' }, { key: 'Ritual', value: 'ritual' }];

  constructor() { }

  getRaces() {
    return this.races;
  }

  getClassList() {
    return this.classList;
  }

  getMagicalClassList() {
    return this.magicalClassList;
  }

  isValidLevels(expectedLevel: number, classes: IClass[]): boolean {
    let givenLevel = 0;
    classes.forEach(cl => {
      givenLevel = Number(cl.classLevel) + givenLevel;
    });
    return Number(expectedLevel) === givenLevel;
  }

  ensureNumeralNotNull(wouldBeNumeral: number): number {
    return wouldBeNumeral !== undefined && wouldBeNumeral !== null ? wouldBeNumeral : 0;
  }

  checkIsNullorUndefined(item: any): boolean {
    return item === null || item === undefined;
  }

  getBarbarianChosen(formControlValueList: any): boolean {
    return this.checkIsNullorUndefined(formControlValueList) ? false : formControlValueList.includes('barbarian');
  }

  getBardChosen(formControlValueList: any): boolean {
    return this.checkIsNullorUndefined(formControlValueList) ? false : formControlValueList.includes('bard');
  }

  getBloodHunterChosen(formControlValueList) {
    return this.checkIsNullorUndefined(formControlValueList) ? false : formControlValueList.includes('bloodhunter');
  }

  getClericChosen(formControlValueList) {
    return this.checkIsNullorUndefined(formControlValueList) ? false : formControlValueList.includes('cleric');
  }

  getDruidChosen(formControlValueList) {
    return this.checkIsNullorUndefined(formControlValueList) ? false : formControlValueList.includes('druid');
  }

  getFighterChosen(formControlValueList) {
    return this.checkIsNullorUndefined(formControlValueList) ? false : formControlValueList.includes('fighter');
  }

  getGunslingerChosen(formControlValueList) {
    return this.checkIsNullorUndefined(formControlValueList) ? false : formControlValueList.includes('gunslinger');
  }

  getMonkChosen(formControlValueList) {
    return this.checkIsNullorUndefined(formControlValueList) ? false : formControlValueList.includes('monk');
  }

  getPaladinChosen(formControlValueList) {
    return this.checkIsNullorUndefined(formControlValueList) ? false : formControlValueList.includes('paladin');
  }

  getRangerChosen(formControlValueList) {
    return this.checkIsNullorUndefined(formControlValueList) ? false : formControlValueList.includes('ranger');
  }

  getRogueChosen(formControlValueList) {
    return this.checkIsNullorUndefined(formControlValueList) ? false : formControlValueList.includes('rogue');
  }

  getShinobiChosen(formControlValueList) {
    return this.checkIsNullorUndefined(formControlValueList) ? false : formControlValueList.includes('shinobi');
  }

  getSorcererChosen(formControlValueList) {
    return this.checkIsNullorUndefined(formControlValueList) ? false : formControlValueList.includes('sorcerer');
  }

  getWarlockChosen(formControlValueList) {
    return this.checkIsNullorUndefined(formControlValueList) ? false : formControlValueList.includes('warlock');
  }

  getWitcherChosen(formControlValueList) {
    return this.checkIsNullorUndefined(formControlValueList) ? false : formControlValueList.includes('witcher');
  }

  getWizardChosen(formControlValueList) {
    return this.checkIsNullorUndefined(formControlValueList) ? false : formControlValueList.includes('wizard');
  }

  getRitualChosen(formControlValueList) {
    return this.checkIsNullorUndefined(formControlValueList) ? false : formControlValueList.includes('ritual');
  }
}
