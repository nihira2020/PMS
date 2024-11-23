import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Companies } from '../model/Companies';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  GetAllCompany() {
    return this.http.get<Companies[]>(this.apiUrl + 'companies')
  }

  GetCompany(companyId: string) {
    return this.http.get<Companies>(this.apiUrl + 'companies/' + companyId)
  }

  createCompany(companyData: Companies) {
    console.log(companyData);
    return this.http.post(this.apiUrl + 'companies', companyData)
  }

  updateCompany(companyData: Companies) {
    return this.http.put(this.apiUrl + 'companies/' + companyData.companyId, companyData)
  }
}
