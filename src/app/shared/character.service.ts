import { Injectable } from '@angular/core';
import { ICharacter } from './models.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const modMap: Map<number, number> =
  new Map([
    [0, -5],
    [2, -4],
    [4, -3],
    [6, -2],
    [8, -1],
    [10, 0],
    [12, 1],
    [14, 2],
    [16, 3],
    [18, 4],
    [18, 4],
    [20, 5],
    [22, 6],
    [24, 7],
    [26, 8],
    [28, 9],
    [30, 10]
  ]);

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  public convertABSToMod(score: number): number {
    if (score % 2 === 1) {
      score = score - 1;
    }
    return modMap.get(score);
  }

  public getDashboardCharacter(): any {
    return this.http.get(environment.apiUrl + `/getDashboardChar/${JSON.parse(sessionStorage.getItem('currentUser')).username}`);
  }

  public createCharacter(newCharacter): any {
    return this.http.post(environment.apiUrl + `/${JSON.parse(sessionStorage.getItem('currentUser')).username}/character/create`, { newCharacter });
  }

  public getUserChars(): any {
    return this.http.get(environment.apiUrl + `/getAllCharacters/${JSON.parse(sessionStorage.getItem('currentUser')).username}`);
  }

  public deleteCharacter(characterName: string): any {
    return this.http.delete(environment.apiUrl + `/deleteCharacter/${characterName}/${JSON.parse(sessionStorage.getItem('currentUser')).username}`);
  }

  public makeCharacterActive(characterName: string): any {
    return this.http.get(environment.apiUrl + `/makeActive/${JSON.parse(sessionStorage.getItem('currentUser')).username}/${characterName}`);
  }

  public updateCharacter(character: ICharacter): any {
    return this.http.post(environment.apiUrl + `/${JSON.parse(sessionStorage.getItem('currentUser')).username}/character/update`, { character });
  }
}
