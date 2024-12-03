import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { usercred } from '../../../model/usercred';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule,MatButtonModule,
    MatInputModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(private builder: FormBuilder, private service: UserService, private toastr: ToastrService,
    private router: Router) {

  }
  ngOnInit(): void {
    localStorage.clear();
    

  }


  _loginform = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  })

  proceedlogin() {

    if (this._loginform.valid) {
      let _obj: usercred = {
        username: this._loginform.value.username as string,
        password: this._loginform.value.password as string
      }
      // this.service.Proceedlogin(_obj).subscribe(item => {
      //   this._response = item;
      //   localStorage.setItem('token', this._response.token);
      //   localStorage.setItem('username', _obj.username);
      //   localStorage.setItem('userrole', this._response.userRole);
      //   this.service.Loadmenubyrole(this._response.userRole).subscribe(item=>{
      //     this.service._menulist.set(item);
      //   })

      //   this.router.navigateByUrl('/');
      // }, error => {
      //   this.toastr.error('Failed to login', error.error.title)
      // });
        localStorage.setItem('role', 'superadmin');
        localStorage.setItem('username','adminuser');
        this.router.navigateByUrl('/');
    }

  }

}
