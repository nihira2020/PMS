import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Properties } from '../model/Properties';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  GetAllProperty() {
    return this.http.get<Properties[]>(this.apiUrl + 'properties');
  }

  GetProperty(propertyId: string) {
    return this.http.get<Properties>(this.apiUrl + 'properties/' + propertyId);
  }

  createProperty(propertyData: Properties) {
    return this.http.post(this.apiUrl + 'properties', propertyData);
  }

  updateProperty(propertyData: Properties) {
    return this.http.put(this.apiUrl + 'properties/' + propertyData.propertyId, propertyData);
  }

  removeProperty(propertyId: string) {
    return this.http.delete(this.apiUrl + 'properties/' + propertyId);
  }
}
