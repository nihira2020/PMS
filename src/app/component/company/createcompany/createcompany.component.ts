import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CompanyService } from '../../../service/company.service';
import { Companies } from '../../../model/Companies';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-createcompany',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    ReactiveFormsModule,RouterLink
  ],
  templateUrl: './createcompany.component.html',
  styleUrl: './createcompany.component.css'
})
export class CreatecompanyComponent implements OnInit {

  title = 'Create Company'
  isedit = false;
  editcode!: string;
  editdata!:Companies;
  constructor(private builder: FormBuilder, private service: CompanyService,
    private router: Router, private toastr: ToastrService, private act:ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.editcode = this.act.snapshot.paramMap.get('id') as string;
    if (this.editcode != '' && this.editcode != null) {
      this.isedit = true
      this.title = 'Edit Customer';
      
      this.service.GetCompany(this.editcode).subscribe(item => {
        this.editdata = item;
        this.companyForm.setValue({
          id: this.editdata.id, name: this.editdata.companyName, email: this.editdata.contactEmail,
          phone: this.editdata.contactPhone,address:this.editdata.address
        })
      })
    }
  }

  companyForm = this.builder.group({
    id: this.builder.control(0),
    name: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.required),
    phone: this.builder.control('', Validators.required),
    address: this.builder.control('', Validators.required)
  })

  Savecompany() {
    if (this.companyForm.valid) {
      let _obj: Companies = {
        id:0,
        companyId: 0,
        companyName: this.companyForm.value.name as string,
        contactEmail: this.companyForm.value.email as string,
        contactPhone: this.companyForm.value.phone as string,
        address: this.companyForm.value.address as string,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      if (!this.isedit) {
        this.service.createCompany(_obj).subscribe(item => {
          // this._response = item;
          // if (this._response.result === 'pass') {
          this.toastr.success('Created successfully', 'Success');
          this.router.navigateByUrl('/company-list');
          // } else {
          //   this.toastr.error('Due to:' + this._response.message, 'Failed');
          // }
        })
      } else {
        _obj.companyId = parseInt(this.editcode);
        _obj.id = parseInt(this.editcode);
        this.service.updateCompany(_obj).subscribe(item => {
          // this._response = item;
          // if (this._response.result === 'pass') {
          this.toastr.success('Updated successfully', 'Success');
          this.router.navigateByUrl('/company-list');
          //} else {
          // this.toastr.error('Due to:' + this._response.message, 'Failed');
          //}
        })
      }
    }
  }
}


