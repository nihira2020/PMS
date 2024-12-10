import { Component, effect, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../../service/company.service';
import { Companies } from '../../../model/Companies';
import { Properties } from '../../../model/Properties';
import { Tenants } from '../../../model/Tenants';
import { PropertyService } from '../../../service/property.service';
import { TenatService } from '../../../service/tenat.service';
import { Transaction } from '../../../model/Transaction';
import { TransService } from '../../../service/trans.service';

@Component({
  selector: 'app-createtrans',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    ReactiveFormsModule, MatSelectModule, MatDatepickerModule],
  templateUrl: './createtrans.component.html',
  styleUrl: './createtrans.component.css'
})
export class CreatetransComponent implements OnInit {
  title = 'Rent Pay';
  companyList: Companies[] = []
  propertyList: Properties[] = []
  tenantList: Tenants[] = []
  currentRoute = signal('')

  constructor(private builder: FormBuilder, private Cservice: CompanyService,
    private router: Router, private toastr: ToastrService,
    private pservice: PropertyService, private tservice: TenatService,
    private service: TransService
  ) {
    effect(() => {
      this.currentRoute.set(this.router.url);
    })
  }

  ngOnInit(): void {
    this.currentRoute.set(this.router.url);
    if (this, this.currentRoute() === '/expense') {
      this.title = 'Expense';
    } else {
      this.title = 'Rent Pay';
    }
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
    let tenantId = value as string;
    if (tenantId != '' && tenantId != '0') {
      this.tservice.GetTenant(tenantId).subscribe(item => {
        let tendata = item;
        if (tendata != null) {
          this.tranForm.controls['amount'].setValue(tendata.rentAmount)
        }
      })
    } else {
      this.tranForm.controls['amount'].setValue(0)
    }
  }

  tranForm = this.builder.group({
    companyId: this.builder.control(0),
    propertyId: this.builder.control(0, Validators.required),
    tenantId: this.builder.control(0, Validators.required),
    amount: this.builder.control(0, Validators.required),
    expense: this.builder.control(0, Validators.required)
  })

  SaveTrans() {
    if (this.tranForm.valid) {
      let _obj: Transaction = {
        id: 0,
        TranId: 0,
        companyId: this.tranForm.value.companyId as number,
        propertyId: this.tranForm.value.propertyId as number,
        tenantId: this.tranForm.value.tenantId as number,
        amount: this.tranForm.value.amount as number,
        complaintCharge: this.tranForm.value.expense as number,
      }
      if (this.title === 'Expense') {
        _obj.amount=0;
        this.service.SaveExpense(_obj).subscribe(item => {
          this.toastr.success('Saved successfully', 'Success');
          this.RedirectToList();
        })
      } else {
        _obj.complaintCharge=0;
        this.service.SaveRentPay(_obj).subscribe(item => {
          this.toastr.success('Saved successfully', 'Success');
          this.RedirectToList();
        })
      }
    }
  }

  RedirectToList() {
    this.tranForm.reset();
    // this.router.navigateByUrl('/person-list');

  }
}
