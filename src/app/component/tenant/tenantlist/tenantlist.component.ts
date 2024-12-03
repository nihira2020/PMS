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

@Component({
  selector: 'app-tenantlist',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatPaginatorModule, MatSortModule,
    MatButtonModule, CommonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './tenantlist.component.html',
  styleUrl: './tenantlist.component.css'
})
export class TenantlistComponent implements OnInit {
  tenantList: Tenants[] = [];
  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'phone', 'rental', 'action'];

  dataSource!: MatTableDataSource<Tenants>;
  constructor(private service: TenatService, private router: Router,
    private toastr: ToastrService
  ) {

  }
  ngOnInit(): void {
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

}
