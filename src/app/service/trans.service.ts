import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../model/Transaction';
import { ReportSummary } from '../model/ReportList';

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

  GetReportList(tenantId:number){
    return this.http.get<ReportList[]>(this.apiUrl + 'transactions?tenantId='+tenantId);
  }

  GetReportSummary(tenantId:number){
    return this.http.get<ReportSummary>(this.apiUrl + 'totals/'+tenantId);
  }

  ComGetReportSummary(PropertyId:number){
    return this.http.get<ReportSummary>(this.apiUrl + 'totals/'+PropertyId);
  }

}
