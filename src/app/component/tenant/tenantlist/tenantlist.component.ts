import { Component, OnInit } from '@angular/core';
import { Tenants } from '../../../model/Tenants';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TenatService } from '../../../service/tenat.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Companies } from '../../../model/Companies';
import { Properties } from '../../../model/Properties';
import { MatSelectModule } from '@angular/material/select';
import { PropertyService } from '../../../service/property.service';
import { CompanyService } from '../../../service/company.service';

@Component({
  selector: 'app-tenantlist',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatPaginatorModule, MatSortModule,
    MatButtonModule, CommonModule, MatFormFieldModule, MatInputModule,
    MatSelectModule],
  templateUrl: './tenantlist.component.html',
  styleUrl: './tenantlist.component.css'
})
export class TenantlistComponent implements OnInit {
  tenantList: Tenants[] = [];
  companyList: Companies[] = []
  propertyList: Properties[] = []
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'phone', 'rental', 'action'];

  dataSource!: MatTableDataSource<Tenants>;
  constructor(private service: TenatService, private router: Router,
    private toastr: ToastrService, private pservice: PropertyService,
    private Cservice: CompanyService
  ) {

  }
  ngOnInit(): void {
    this.loadallcompany();
    this.Loadalltenats();
  }

  Loadalltenats() {
    let sub = this.service.GetAllTenants().subscribe(item => {
      this.tenantList = item;
      this.dataSource = new MatTableDataSource(this.tenantList)
    })
  }

  AddTenant() {
    this.router.navigateByUrl('create-tenant')
  }
  EditTenant(tenantId: any) {
    this.router.navigateByUrl('update-tenant/' + tenantId)
  }
  RemoveTenant(tenantId: any) {
    if (confirm('Do you want delete this Tenant?')) {
      this.service.removeTenant(tenantId).subscribe(item => {
        this.toastr.success('Deleted successfully.')
        this.Loadalltenats();
      })
    }
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
      this.Loadalltenats();
    }

  }

  propertyChange(value: any) {
    let propertyId = value as number;
    let data = this.tenantList.filter(o => o.propertyId === propertyId);
      this.dataSource = new MatTableDataSource(data)
  }


}
