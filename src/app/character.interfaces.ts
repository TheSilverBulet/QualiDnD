export interface ICharacter {
    name: string;
    stats: IStat[];
}

export interface IStat {
    type: Stat;
    score: IAbility;
}

export interface IAbility {
    score: number;
    modifier: number;
}

export enum Stat {
    STRENGTH="STR",
    DEXTERITY="DEX",
    CONSTITUTION="CON",
    INTELLIGENCE="INT",
    WISDOM="WIS",
    CHARISMA="CHA"
}