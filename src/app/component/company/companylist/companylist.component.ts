import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { CompanyService } from '../../../service/company.service';
import { MatButtonModule } from '@angular/material/button';
import { Companies } from '../../../model/Companies';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-companylist',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatDividerModule, MatTableModule,
    MatIconModule
  ],
  templateUrl: './companylist.component.html',
  styleUrl: './companylist.component.css'
})
export class CompanylistComponent implements OnInit {

  companyList!: Companies[];
  displayedColumns: string[] = ['info','action'];
  dataSource!: MatTableDataSource<Companies>;

  constructor(private router: Router, private service: CompanyService) {

  }
  ngOnInit(): void {
    this.Loadallcompany();
  }

  Addcompany() {
    this.router.navigateByUrl('/create-company');
  }

  Loadallcompany() {
    this.service.GetAllCompany().subscribe(item => {
      this.companyList = item;
      this.dataSource=new MatTableDataSource(this.companyList);
    })
  }

  updateCompany(companyId: number) {
    this.router.navigateByUrl('/update-company/' + companyId);
  }

  manageuser(companyId: number) {
    this.router.navigateByUrl('/company/' + companyId + '/persons');
  }

}
