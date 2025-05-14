import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISpell, IMonster } from './models.component';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    private http: HttpClient
  ) { }

  getReferenceDocument(docName: string) {
    return this.http.get(environment.apiUrl + `/serveReferenceFile/${docName}`, { responseType: 'blob' });
  }

  retrieveAllSpells(): ISpell[] {
    let spells: ISpell[] = [];
    this.http.get(environment.apiUrl + '/retrieveAllSpells', {responseType: 'json'}).subscribe(spls=> {
      if (spls){
        spells = spls as ISpell[];
      }
    });
    return spells;
  }

  addSpellRecord(record: ISpell): boolean {
    let spellAddSuccess = false;
    this.http.post(environment.apiUrl + '/add/record/spell', {record}).subscribe(resp => {
      if (resp){
        spellAddSuccess =  true;
      }
    });
    return spellAddSuccess;
  }

  addMonsterRecord(record: IMonster): boolean {
    let monsterAddSuccess = false;
    this.http.post(environment.apiUrl + '/add/record/monster', { record }).subscribe(resp => {
      if (resp){
        monsterAddSuccess = true;
      }
    });
    return monsterAddSuccess;
  }

  retrieveAllMonsters(): IMonster[] {
    let mons: IMonster[] = [];
    this.http.get(environment.apiUrl + '/retrieveAllMonsters', {responseType: 'json'}).subscribe(monsters=> {
      if (monsters){
        mons = monsters as IMonster[];
      }
    });
    return mons;
  }

  uploadFile(file: File): boolean {
    const formData = new FormData();
    formData.append('file', file);
    let uploadSuccess = false;
    this.http.post(environment.apiUrl + '/uploadFile', formData).subscribe(resp => {
      if (resp){
        uploadSuccess = true;
      }
    });
    return uploadSuccess;
  }
}
