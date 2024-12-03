import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Tenants } from '../../../model/Tenants';
import { Properties } from '../../../model/Properties';
import { TenatService } from '../../../service/tenat.service';
import { ToastrService } from 'ngx-toastr';
import { PropertyService } from '../../../service/property.service';

@Component({
  selector: 'app-createtenant',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    ReactiveFormsModule,RouterLink,MatSelectModule,MatDatepickerModule],
  templateUrl: './createtenant.component.html',
  styleUrl: './createtenant.component.css'
})
export class CreatetenantComponent implements OnInit {
  title = 'Create Tenant'
  isedit = false;
  editcode!: string;
  editdata!: Tenants;
  propertylist!:Properties[];
  constructor(private builder: FormBuilder, private service: TenatService,
    private router: Router, private toastr: ToastrService, private act: ActivatedRoute,
    private pservice:PropertyService
  ) {

  }

  ngOnInit(): void {
    this.loadallproperties();
    this.editcode = this.act.snapshot.paramMap.get('id') as string;
    if (this.editcode != '' && this.editcode != null) {
      this.isedit = true
      this.title = 'Edit Tenant';

      this.service.GetTenant(this.editcode).subscribe(item => {
        this.editdata = item;
        this.tenantForm.setValue({
          id: this.editdata.tenantId,
          tenantId: this.editdata.tenantId,
          propertyId: this.editdata.propertyId,
          firstname: this.editdata.firstName,
          lastname: this.editdata.lastName,
          email: this.editdata.email,
          phone: this.editdata.phone,
          rental: this.editdata.rentAmount,
        })
      })
    }
  }

  loadallproperties(){
    this.pservice.GetAllProperty().subscribe(item=>{
       this.propertylist=item;
    });
  }

  tenantForm = this.builder.group({
    id: this.builder.control(0),
    tenantId: this.builder.control(0),
    propertyId: this.builder.control(0),
    firstname: this.builder.control('', Validators.required),
    lastname: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.required),
    phone: this.builder.control('', Validators.required),
    rental: this.builder.control(0, Validators.required)
  })

  Savetenant() {
    if (this.tenantForm.valid) {
      let _obj: Tenants = {
        id: 0,
        tenantId: 0,
        firstName: this.tenantForm.value.firstname as string,
        lastName: this.tenantForm.value.lastname as string,
        email: this.tenantForm.value.email as string,
        phone: this.tenantForm.value.phone as string,
        rentAmount: this.tenantForm.value.rental as number,
        createdAt: new Date(),
        updatedAt: new Date(),
        propertyId: this.tenantForm.value.propertyId as number
      }

      if (!this.isedit) {
        this.service.createTenant(_obj).subscribe(item => {
          // this._response = item;
          // if (this._response.result === 'pass') {
          this.toastr.success('Created successfully', 'Success');
          this.router.navigateByUrl('/tenant-list');
          // } else {
          //   this.toastr.error('Due to:' + this._response.message, 'Failed');
          // }
        })
      } else {
        _obj.tenantId = parseInt(this.editcode);
        _obj.id = parseInt(this.editcode);
        this.service.updateTenant(_obj).subscribe(item => {
          // this._response = item;
          // if (this._response.result === 'pass') {
          this.toastr.success('Updated successfully', 'Success');
          this.router.navigateByUrl('/tenant-list');
          //} else {
          // this.toastr.error('Due to:' + this._response.message, 'Failed');
          //}
        })
      }
    }
  }
}
