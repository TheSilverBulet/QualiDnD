import { Character, ICharacter } from "./character.interfaces";

export const SESSION_USER = 'current_user';

export enum Role {
    USER,
    ADMIN
}

export interface IUser {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
}

export interface IUserRegistration extends IUser{
    password: string;
}

export interface ILoggedInUser extends IUser {
    activeCharacter: ICharacter | null;
    role: Role;
}

export class LoggedInUser implements ILoggedInUser {
    username = '';
    firstname = '';
    lastname = '';
    email = '';
    activeCharacter = new Character();
    role = Role.USER;
}

export interface ILoginResponse {
    success: boolean;
    activeUser: ILoggedInUser;
}