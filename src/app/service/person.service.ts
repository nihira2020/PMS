import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Persons } from '../model/Persons';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  GetAllPersons() {
    return this.http.get<Persons[]>(this.apiUrl + 'persons');
  }
  GetAllPersonsbyCompany(CompanyId: any) {
    return this.http.get<Persons[]>(this.apiUrl + 'persons?companyId=' + CompanyId);
  }

  GetPerson(personId: string) {
    return this.http.get<Persons>(this.apiUrl + 'persons/' + personId);
  }

  createPerson(personData: Persons) {
    return this.http.post(this.apiUrl + 'persons', personData);
  }

  updatePerson(personData: Persons) {
    return this.http.put(this.apiUrl + 'persons/' + personData.personId, personData);
  }

  removePerson(personId: string) {
    return this.http.delete(this.apiUrl + 'persons/' + personId);
  }
}
