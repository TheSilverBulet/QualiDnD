export interface ICharacter {
    name: string;
    stats: IStat[];
    health: number;
}

export interface IStat {
    type: StatName;
    score: IAbility;
}

export interface IAbility {
    score: number;
    modifier: number;
}

export enum StatName {
    STRENGTH="STR",
    DEXTERITY="DEX",
    CONSTITUTION="CON",
    INTELLIGENCE="INT",
    WISDOM="WIS",
    CHARISMA="CHA",
    NONE="NA"
}

export class Ability implements IAbility {
    score = 0;
    modifier = this.getMod(this.score);

    private getMod(scr: number): number {
        return 0; //TODO IMPLEMENT
    }
}

export class Stat implements IStat {
    type = StatName.NONE;
    score = new Ability();
}

export class Character implements ICharacter{
    name = '';
    stats: IStat[] = [];
    health = 0;
}