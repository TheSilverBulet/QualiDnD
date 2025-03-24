import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ISpell, IJutsu, IMonster } from './models.component';

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

  retrieveAllSpells(): any {
    return this.http.get(environment.apiUrl + '/retrieveAllSpells');
  }

  retrieveAllJutsu(): any {
    return this.http.get(environment.apiUrl + '/retrieveAllJutsu');
  }

  addJutsuRecord(record: IJutsu): any {
    return this.http.post(environment.apiUrl + '/add/record/jutsu', { record });
  }

  addSpellRecord(record: ISpell): any {
    return this.http.post(environment.apiUrl + '/add/record/spell', { record });
  }

  addMonsterRecord(record: IMonster): any {
    return this.http.post(environment.apiUrl + '/add/record/monster', { record });
  }

  retrieveAllMonsters(): any {
    return this.http.get(environment.apiUrl + '/retrieveAllMonsters');
  }

  uploadFile(file: File): any {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(environment.apiUrl + '/uploadFile', formData);
  }


}
