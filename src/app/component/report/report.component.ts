import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Companies } from '../../model/Companies';
import { Properties } from '../../model/Properties';
import { Tenants } from '../../model/Tenants';
import { Router } from '@angular/router';
import { CompanyService } from '../../service/company.service';
import { ToastrService } from 'ngx-toastr';
import { TenatService } from '../../service/tenat.service';
import { PropertyService } from '../../service/property.service';
import { TransService } from '../../service/trans.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ReportSummary } from '../../model/ReportList';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    MatSelectModule, MatDatepickerModule, MatTableModule, CommonModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit {

  title = 'Tenant Financial Summary';
  companytitle = 'Company & Property Financial Summary';
  companyList: Companies[] = []
  propertyList: Properties[] = []
  compropertyList: Properties[] = []
  tenantList: Tenants[] = []
  reportList: ReportList[] = [];
  reportSummary: ReportSummary = {
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0
  };

  comreportSummary: ReportSummary = {
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0
  };
  displayedColumns: string[] = ['date', 'rent', 'charge'];
  dataSource!: MatTableDataSource<ReportList>;

  constructor(private Cservice: CompanyService,
    private router: Router, private toastr: ToastrService,
    private pservice: PropertyService, private tservice: TenatService,
    private service: TransService
  ) {
  }

  ngOnInit(): void {
    this.loadallcompany();
  }



  loadallcompany() {
    this.Cservice.GetAllCompany().subscribe(item => {
      this.companyList = item;
    })
  }

  companyChange(value: any) {
    let companyId = value as number;
    if (companyId > 0) {
      this.pservice.GetAllProperty().subscribe(item => {
        this.propertyList = item;
        this.propertyList = this.propertyList.filter(o => o.companyId == companyId);
      })
    } else {
      this.propertyList = [];
    }
    this.tenantList = [];
    this.clearReport();

  }

  comcompanyChange(value: any) {
    let companyId = value as number;
    if (companyId > 0) {
      this.pservice.GetAllProperty().subscribe(item => {
        this.compropertyList = item;
        this.compropertyList = this.compropertyList.filter(o => o.companyId == companyId);
      })
    } else {
      this.compropertyList = [];
    }
    this.ComclearReport();

  }
  

  propertyChange(value: any) {
    let propertyId = value as number;
    if (propertyId > 0) {
      this.tservice.GetAllTenants().subscribe(item => {
        this.tenantList = item;
        this.tenantList = this.tenantList.filter(o => o.propertyId == propertyId);
      })
    } else {
      this.tenantList = [];
    }
  }

  tenantChange(value: any) {
    let tenantId = value as number;
    if (tenantId > 0) {
      this.GetReportList(tenantId);
      this.GetReportSummary(tenantId);
    }else{
      this.clearReport();
    }
  }

  GetReportList(tenantId: number) {
    this.service.GetReportList(tenantId).subscribe(item => {
      this.reportList = item;
      this.dataSource = new MatTableDataSource(this.reportList);
    })
  }

  GetReportSummary(tenantId: number) {
    this.service.GetReportSummary(tenantId).subscribe(item => {
      this.reportSummary = item;
    })
  }

  ComGetReportSummary(propertyId: number) {
    this.service.ComGetReportSummary(propertyId).subscribe(item => {
      this.comreportSummary = item;
    })
  }

  clearReport() {
    this.reportList = [];
    this.dataSource = new MatTableDataSource(this.reportList);
    this.reportSummary = {
      totalIncome: 0,
      totalExpenses: 0,
      balance: 0
    };
  }

  compropertyChange(value: any) {
    let PropertyId = value as number;
    if (PropertyId > 0) {
      this.ComGetReportSummary(PropertyId);
    }else{
      this.ComclearReport();
    }
  }
  ComclearReport() {
    
    this.comreportSummary = {
      totalIncome: 0,
      totalExpenses: 0,
      balance: 0
    };
  }

}
