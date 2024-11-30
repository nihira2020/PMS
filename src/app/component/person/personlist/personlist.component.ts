import { Component, OnInit } from '@angular/core';
import { Persons } from '../../../model/Persons';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PersonService } from '../../../service/person.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-personlist',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatPaginatorModule, MatSortModule,
    MatButtonModule, CommonModule, MatFormFieldModule, MatInputModule
  ],
  templateUrl: './personlist.component.html',
  styleUrl: './personlist.component.css'
})
export class PersonlistComponent implements OnInit {

  personList: Persons[] = [];
  displayedColumns: string[] = ['name', 'email', 'role', 'dob', 'action'];
  companyId: any;

  dataSource!: MatTableDataSource<Persons>;
  constructor(private service: PersonService, private router: Router,
    private toastr: ToastrService, private act: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    this.companyId = this.act.snapshot.paramMap.get('companyid') as string;
    if (this.companyId != null && this.companyId != '') {
      this.LoadallpersonsforCompany(this.companyId);
    } else {
      this.Loadallpersons();
    }

  }

  Loadallpersons() {
    let sub = this.service.GetAllPersons().subscribe(item => {
      this.personList = item;
      this.dataSource = new MatTableDataSource(this.personList)
    })
  }

  LoadallpersonsforCompany(companyId: any) {
    let sub = this.service.GetAllPersonsbyCompany(companyId).subscribe(item => {
      this.personList = item;
      this.personList=this.personList.filter(o=>o.companyId==companyId);
      this.dataSource = new MatTableDataSource(this.personList)
    })
  }

  AddPerson() {
    if (this.companyId != null && this.companyId != '') {
      this.router.navigateByUrl('company/' + this.companyId + '/create-person')
    } else {
      this.router.navigateByUrl('create-person')
    }

  }
  EditPerson(personId: any) {
    if (this.companyId != null && this.companyId != '') {
      this.router.navigateByUrl('company/' + this.companyId + '/update-person/' + personId)
    } else {
      this.router.navigateByUrl('update-person/' + personId)
    }

  }
  RemovePerson(personId: any) {
    if (confirm('Do you want delete this Person?')) {
      this.service.removePerson(personId).subscribe(item => {
        this.toastr.success('Deleted successfully.')
        this.Loadallpersons();
      })
    }
  }

}
