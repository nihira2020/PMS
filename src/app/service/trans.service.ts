import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../model/Transaction';

@Injectable({
  providedIn: 'root'
})
export class TransService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  SaveRentPay(trans:Transaction) {
    return this.http.post(this.apiUrl + 'pay-rent',trans);
  }

  SaveExpense(trans:Transaction) {
    return this.http.post(this.apiUrl + 'pay-expense',trans);
  }

}
