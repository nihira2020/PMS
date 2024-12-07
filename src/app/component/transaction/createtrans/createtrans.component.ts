import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-createtrans',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    ReactiveFormsModule, MatSelectModule, MatDatepickerModule],
  templateUrl: './createtrans.component.html',
  styleUrl: './createtrans.component.css'
})
export class CreatetransComponent implements OnInit {
  title = 'Rent Pay'
  companyList: Companies[] = []
  propertyList: Properties[] = []
  tenantList: Tenants[] = []

  constructor(private builder: FormBuilder, private service: CompanyService,
    private router: Router, private toastr: ToastrService,
    private pservice: PropertyService, private tservice: TenatService
  ) {

  }

  ngOnInit(): void {
    this.loadallcompany();
  }



  loadallcompany() {
    this.service.GetAllCompany().subscribe(item => {
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
    if (tenantId != '' && tenantId!='0') {
      this.tservice.GetTenant(tenantId).subscribe(item => {
       let tendata=item;
       if(tendata!=null){
        this.tranForm.controls['rent'].setValue(tendata.rentAmount)
       }
      })
    } else {
      this.tranForm.controls['rent'].setValue(0)
    }
  }

  tranForm = this.builder.group({
    companyId: this.builder.control(0),
    propertyId: this.builder.control(0, Validators.required),
    tenantId: this.builder.control(0, Validators.required),
    rent: this.builder.control(0, Validators.required)
  })

  SaveTrans() {
    // if (this.personForm.valid) {
    //   let _obj: Persons = {
    //     id: 0,
    //     personId: 0,
    //     companyId: this.companyId,
    //     firstName: this.personForm.value.firstname as string,
    //     lastName: this.personForm.value.lastname as string,
    //     nationality: this.personForm.value.nationality as string,
    //     role: this.personForm.value.role as string,
    //     email: this.personForm.value.email as string,
    //     dob: this.personForm.value.dob as Date,
    //     createdAt: new Date(),
    //     updatedAt: new Date()
    //   }
    // this.service.createPerson(_obj).subscribe(item => {
    //   this.toastr.success('Created successfully', 'Success');
    //   this.RedirectToList();
    // })
    // }
  }

  RedirectToList() {

    this.router.navigateByUrl('/person-list');

  }
}
