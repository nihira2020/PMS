import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Properties } from '../../../model/Properties';
import { PropertyService } from '../../../service/property.service';
import { MatSelectModule } from '@angular/material/select';
import { Companies } from '../../../model/Companies';
import { CompanyService } from '../../../service/company.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-createproperty',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    ReactiveFormsModule,RouterLink,MatSelectModule,MatDatepickerModule],
  templateUrl: './createproperty.component.html',
  styleUrl: './createproperty.component.css'
})
export class CreatepropertyComponent implements OnInit {

  title = 'Create Property'
  isedit = false;
  editcode!: string;
  editdata!: Properties;
  companylist!:Companies[];
  constructor(private builder: FormBuilder, private service: PropertyService,
    private router: Router, private toastr: ToastrService, private act: ActivatedRoute,
    private cservice:CompanyService
  ) {

  }

  ngOnInit(): void {
    this.loadallcompany();
    this.editcode = this.act.snapshot.paramMap.get('id') as string;
    if (this.editcode != '' && this.editcode != null) {
      this.isedit = true
      this.title = 'Edit Property';

      this.service.GetProperty(this.editcode).subscribe(item => {
        this.editdata = item;
        this.propertyForm.setValue({
          id: this.editdata.propertyId,
          propertyId: this.editdata.propertyId,
          companyId: this.editdata.companyId,
          name: this.editdata.name,
          address: this.editdata.address,
          type: this.editdata.type,
          bedrooms: this.editdata.bedrooms,
          bathrooms: this.editdata.bathrooms,
          size: this.editdata.size,
          purchaseDate: this.editdata.purchaseDate,
          value: this.editdata.value,
          rent: this.editdata.rent
        })
      })
    }
  }

  loadallcompany(){
    this.cservice.GetAllCompany().subscribe(item=>{
       this.companylist=item;
    });
  }

  propertyForm = this.builder.group({
    id: this.builder.control(0),
    propertyId: this.builder.control(0),
    companyId: this.builder.control(0),
    name: this.builder.control('', Validators.required),
    address: this.builder.control('', Validators.required),
    type: this.builder.control('', Validators.required),
    bedrooms: this.builder.control(0, Validators.required),
    bathrooms: this.builder.control(0, Validators.required),
    size: this.builder.control(0, Validators.required),
    purchaseDate: this.builder.control(new Date(), Validators.required),
    value: this.builder.control(0, Validators.required),
    rent: this.builder.control(0, Validators.required)
  })

  Saveproperty() {
    if (this.propertyForm.valid) {
      let _obj: Properties = {
        id: 0,
        propertyId: 0,
        companyId: this.propertyForm.value.companyId as number,
        name: this.propertyForm.value.name as string,
        address: this.propertyForm.value.address as string,
        type: this.propertyForm.value.type as string,
        bedrooms: this.propertyForm.value.bedrooms as number,
        bathrooms: this.propertyForm.value.bathrooms as number,
        size: this.propertyForm.value.size as number,
        purchaseDate: this.propertyForm.value.purchaseDate as Date,
        value: this.propertyForm.value.value as number,
        rent: this.propertyForm.value.rent as number,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      if (!this.isedit) {
        this.service.createProperty(_obj).subscribe(item => {
          // this._response = item;
          // if (this._response.result === 'pass') {
          this.toastr.success('Created successfully', 'Success');
          this.router.navigateByUrl('/property-list');
          // } else {
          //   this.toastr.error('Due to:' + this._response.message, 'Failed');
          // }
        })
      } else {
        _obj.propertyId = parseInt(this.editcode);
        _obj.id = parseInt(this.editcode);
        this.service.updateProperty(_obj).subscribe(item => {
          // this._response = item;
          // if (this._response.result === 'pass') {
          this.toastr.success('Updated successfully', 'Success');
          this.router.navigateByUrl('/property-list');
          //} else {
          // this.toastr.error('Due to:' + this._response.message, 'Failed');
          //}
        })
      }
    }
  }
}


