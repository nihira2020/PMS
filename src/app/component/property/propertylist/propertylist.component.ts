import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PropertyService } from '../../../service/property.service';
import { Properties } from '../../../model/Properties';

@Component({
  selector: 'app-propertylist',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatPaginatorModule, MatSortModule,
    MatButtonModule, CommonModule, MatFormFieldModule, MatInputModule
  ],
  templateUrl: './propertylist.component.html',
  styleUrl: './propertylist.component.css'
})
export class PropertylistComponent implements OnInit {

  propertyList: Properties[] = [];
  displayedColumns: string[] = ['name', 'address', 'type', 'bedroom', 'bathroom', 
    'size', 'purchasedate', 'value', 'rent', 'action'];

  dataSource!: MatTableDataSource<Properties>;
  constructor(private service: PropertyService, private router: Router,
    private toastr: ToastrService
  ) {

  }
  ngOnInit(): void {

    this.Loadallproperies();
  }

  Loadallproperies() {
    let sub = this.service.GetAllProperty().subscribe(item => {
      this.propertyList = item;
      this.dataSource = new MatTableDataSource(this.propertyList)
    })
  }

  AddProperty() {
    this.router.navigateByUrl('create-property')
  }
  EditProperty(propertyId: any) {
    this.router.navigateByUrl('update-property/' + propertyId)
  }
  RemoveProperty(propertyId: any) {
    if (confirm('Do you want delete this Property?')) {
      this.service.removeProperty(propertyId).subscribe(item => {
        this.toastr.success('Deleted successfully.')
        this.Loadallproperies();
      })
    }
  }

}