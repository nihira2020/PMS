import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Persons } from '../../../model/Persons';
import { PersonService } from '../../../service/person.service';

@Component({
  selector: 'app-createperson',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    ReactiveFormsModule, RouterLink, MatSelectModule, MatDatepickerModule],
  templateUrl: './createperson.component.html',
  styleUrl: './createperson.component.css'
})
export class CreatepersonComponent implements OnInit {

  title = 'Create Person'
  isedit = false;
  editcode!: string;
  editdata!: Persons;
  companyId = 0;
  //companylist!:Companies[];
  constructor(private builder: FormBuilder, private service: PersonService,
    private router: Router, private toastr: ToastrService, private act: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    //this.loadallcompany();
    this.editcode = this.act.snapshot.paramMap.get('id') as string;
    let _companycode = this.act.snapshot.paramMap.get('companyid') as string;
    if (_companycode != null && _companycode != '') {
      this.companyId = parseInt(_companycode);
    }
    if (this.editcode != '' && this.editcode != null) {
      this.isedit = true
      this.title = 'Edit Person';

      this.service.GetPerson(this.editcode).subscribe(item => {
        this.editdata = item;
        this.personForm.setValue({
          companyId: this.editdata.companyId,
          personId: this.editdata.personId,
          firstname: this.editdata.firstName,
          lastname: this.editdata.lastName,
          role: this.editdata.role,
          dob: this.editdata.dob,
          email: this.editdata.email,
          nationality: this.editdata.nationality
        })
      })
    }
  }


  personForm = this.builder.group({
    personId: this.builder.control(0),
    companyId: this.builder.control(this.companyId),
    firstname: this.builder.control('', Validators.required),
    lastname: this.builder.control('', Validators.required),
    role: this.builder.control('', Validators.required),
    dob: this.builder.control(new Date(), Validators.required),
    email: this.builder.control('', Validators.required),
    nationality: this.builder.control('', Validators.required)
  })

  Saveperson() {
    if (this.personForm.valid) {
      let _obj: Persons = {
        id: 0,
        personId: 0,
        companyId: this.companyId,
        firstName: this.personForm.value.firstname as string,
        lastName: this.personForm.value.lastname as string,
        nationality: this.personForm.value.nationality as string,
        role: this.personForm.value.role as string,
        email: this.personForm.value.email as string,
        dob: this.personForm.value.dob as Date,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      if (!this.isedit) {
        this.service.createPerson(_obj).subscribe(item => {
          // this._response = item;
          // if (this._response.result === 'pass') {
          this.toastr.success('Created successfully', 'Success');
          if(this.companyId>0){
            this.router.navigateByUrl('company/'+this.companyId+'/persons');
          }else{
            this.router.navigateByUrl('/person-list');
          }
          
          // } else {
          //   this.toastr.error('Due to:' + this._response.message, 'Failed');
          // }
        })
      } else {
        _obj.personId = parseInt(this.editcode);
        _obj.id = parseInt(this.editcode);
        this.service.updatePerson(_obj).subscribe(item => {
          // this._response = item;
          // if (this._response.result === 'pass') {
          this.toastr.success('Updated successfully', 'Success');
          if(this.companyId>0){
            this.router.navigateByUrl('company/'+this.companyId+'/persons');
          }else{
            this.router.navigateByUrl('/person-list');
          }
          //} else {
          // this.toastr.error('Due to:' + this._response.message, 'Failed');
          //}
        })
      }
    }
  }
}


