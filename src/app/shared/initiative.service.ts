import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IInitiative, IAttrUpdate } from './models.component';

@Injectable({
  providedIn: 'root'
})
export class InitiativeService {

  constructor(
    private http: HttpClient
  ) { }

  public getInitTable(): any {
    return this.http.get(environment.apiUrl + '/load/initiative');
  }

  public rollInitiative(miscBonus: number, username: string): any {
    const rollType = 'None';
    const obj = {
      username,
      miscBonus,
      rollType
    };
    return this.http.post<any>(environment.apiUrl + `/roll/initiative/PC`, obj);
  }

  public rollInitiativeAdv(miscBonus: number, username: string): any {
    const rollType = 'advantage';
    const obj = {
      username,
      miscBonus,
      rollType
    };
    return this.http.post<any>(environment.apiUrl + '/roll/initiative/PC', obj);
  }

  public rollInitiativeDis(miscBonus: number, username: string): any {
    const rollType = 'disadvantage';
    const obj = {
      username,
      miscBonus,
      rollType
    };
    return this.http.post<any>(environment.apiUrl + '/roll/initiative/PC', obj);
  }

  public rollNpcInitiative(npcDexBonus: number, npcName: string, npcHealth: number): any {
    const rollType = 'None';
    const obj = {
      npcName,
      npcDexBonus,
      npcHealth,
      rollType
    };
    return this.http.post<any>(environment.apiUrl + `/roll/initiative/NPC`, obj);
  }

  public rollNpcInitiativeAdv(npcDexBonus: number, npcName: string, npcHealth: number): any {
    const rollType = 'advantage';
    const obj = {
      npcName,
      npcDexBonus,
      npcHealth,
      rollType
    };
    return this.http.post<any>(environment.apiUrl + '/roll/initiative/NPC', obj);
  }

  public rollNpcInitiativeDis(npcDexBonus: number, npcName: string, npcHealth: number): any {
    const rollType = 'disadvantage';
    const obj = {
      npcName,
      npcDexBonus,
      npcHealth,
      rollType
    };
    return this.http.post<any>(environment.apiUrl + '/roll/initiative/NPC', obj);
  }

  public conclude(): any {
    return this.http.get(environment.apiUrl + '/table/clear');
  }

  public nextCreature(): any {
    return this.http.get(environment.apiUrl + '/table/nextCreature');
  }

  public updateHealth(data: IAttrUpdate): any {
    return this.http.get(environment.apiUrl + `/table/adjust/${data.creature.username}/${data.attributeValue}`);
  }

  public deleteCreature(creature: IInitiative): any {
    return this.http.delete(environment.apiUrl + `/table/delete/${creature.username}`);
  }

  public retrieveEntityInfo(creature: IInitiative): any {
    return this.http.get(environment.apiUrl + `/table/describe/${creature.username}`);
  }
}
