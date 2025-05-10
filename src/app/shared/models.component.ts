export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: string;
}

export interface ICharacter {
  name: string;
  race: string;
  level: number;
  baseArmorClass: number;
  maxHealth: number;
  currentHealth: number;
  temporaryHitPoints: number;
  characterClass: IClass[];
  isMulticlassed: boolean;
  active: boolean;
  strength: IAbility;
  dexterity: IAbility;
  constitution: IAbility;
  intelligence: IAbility;
  wisdom: IAbility;
  charisma: IAbility;
  deathSave: IDeathSave;
  spellSlots: ISpellSlot[];
  userSetValues: Map<string, string>;
  chakra: number;
  owner: string;
}

export interface IInitiative {
  initialRoll: number;
  totalRoll: number;
  username: string;
  currentHealth: string;
  miscBonus: number;
  rollType: string;
  modifier: number;
  health: number;
  current: boolean;
  loggedInRole: string;
}

export interface IClass {
  className: ClassOption;
  classLevel: number;
}

export interface IAbility {
  abilityScore: number;
  abilityModifier: number;
}

export class Ability {
  abilityScore = 0;
  abilityModifier = 0;
}

export enum ClassOption {
  Barbarian = 'Barbarian',
  Bard = 'Bard',
  BloodHunter = 'BloodHunter',
  Cleric = 'Cleric',
  Druid = 'Druid',
  Fighter = 'Fighter',
  Gunslinger = 'Gunslinger',
  Monk = 'Monk',
  Paladin = 'Paladin',
  Ranger = 'Ranger',
  Rogue = 'Rogue',
  Shinobi = 'Shinobi',
  Sorcerer = 'Sorcerer',
  Warlock = 'Warlock',
  Witcher = 'Witcher',
  Wizard = 'Wizard'
}

export interface IDeathSave {
  Successes: number;
  Failures: number;
}

export interface ISpellSlot {
  slotLevel: number;
  numberOfSlots: number;
}

export interface IAttrUpdate {
  attributeKey: string;
  attributeValue: unknown;
  creature: unknown;
}

export interface ISpell {
  spellName: string;
  spellSchool: string;
  spellLevel: number;
  castingTime: string;
  range: string;
  components: string;
  duration: string;
  description: string;
  isRitual: boolean;
  bardCanCast: boolean;
  bloodHunterCanCast: boolean;
  clericCanCast: boolean;
  druidCanCast: boolean;
  paladinCanCast: boolean;
  rangerCanCast: boolean;
  sorcererCanCast: boolean;
  warlockCanCast: boolean;
  wizardCanCast: boolean;
}

export class Spell {
  spellName = '';
  spellSchool = '';
  spellLevel = 0;
  castingTime = '';
  range = '';
  components = '';
  duration = '';
  description = '';
  isRitual = false;
  bardCanCast = false;
  bloodHunterCanCast = false;
  clericCanCast = false;
  druidCanCast = false;
  paladinCanCast = false;
  rangerCanCast = false;
  sorcererCanCast = false;
  warlockCanCast = false;
  wizardCanCast = false;
}

export interface IJutsu {
  jutsuName: string;
  release: string;
  rank: string;
  cost: number;
  range: string;
  description: string;
  duration: string;
}

export class Jutsu {
  jutsuName = '';
  release = '';
  rank = '';
  cost = 0;
  range = '';
  description = '';
  duration = '';
}

export interface IMonster {
  commonName: string;
  type: string;
  subType: string;
  armorClass: number;
  health: number;
  strength: IAbility;
  dexterity: IAbility;
  constitution: IAbility;
  intelligence: IAbility;
  wisdom: IAbility;
  charisma: IAbility;
  speed: string;
  skills: string;
  savingThrows: string;
  damageResistances: string;
  damageImmunities: string;
  damageVulnerabilities: string;
  senses: string;
  languages: string;
  challengeRating: number;
  abilities: string;
  attacks: string;
  size: string;
  alignment: string;
  conditionImmunities: string;
  avgHitDice: string;
  expValue: number;
  legendaryActions: string;
}

export class Monster {
  commonName = '';
  type = '';
  subType = '';
  armorClass = 10;
  health = 0;
  strength = null;
  dexterity = null;
  constitution = null;
  intelligence = null;
  wisdom = null;
  charisma = null;
  speed = '';
  skills = '';
  savingThrows = '';
  damageResistances = '';
  damageImmunities = '';
  damageVulnerabilities = '';
  senses = '';
  languages = '';
  challengeRating = 0;
  abilities = '';
  attacks = '';
  size = '';
  alignment = '';
  conditionImmunities = '';
  avgHitDice = '';
  expValue = 0;
  legendaryActions = '';
}

export enum NotificationType {
  success = 0,
  warning = 1,
  error = 2,
  info = 3
}

export class Notification {
  constructor(
    public id: number,
    public type: NotificationType,
    public title: string,
    public message: string,
    public timeout: number,
  ) { }
}
