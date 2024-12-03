import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Tenants } from '../model/Tenants';

@Injectable({
  providedIn: 'root'
})
export class TenatService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  GetAllTenants() {
    return this.http.get<Tenants[]>(this.apiUrl + 'tenants');
  }

  GetTenant(tenantId: string) {
    return this.http.get<Tenants>(this.apiUrl + 'tenants/' + tenantId);
  }

  createTenant(tenantData: Tenants) {
    return this.http.post(this.apiUrl + 'tenants', tenantData);
  }

  updateTenant(tenantData: Tenants) {
    return this.http.put(this.apiUrl + 'tenants/' + tenantData.tenantId, tenantData);
  }

  removeTenant(tenantId: string) {
    console.log(tenantId);
    return this.http.delete(this.apiUrl + 'tenants/' + tenantId);
  }
}
