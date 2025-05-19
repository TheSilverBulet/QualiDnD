import { ICharacter } from "./character.interfaces";

export interface IUser {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
}

export interface IUserRegistration extends IUser{
    password: string;
}

export interface LoggedInUser extends IUser {
    activeCharacter: ICharacter | null;
    role: string;
}