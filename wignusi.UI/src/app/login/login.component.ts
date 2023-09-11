import { Component } from '@angular/core';
import { AuthService } from '../api/services';
import { UserDto } from '../api/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: UserDto  = {
    username: '',
    password: ''
  }

  constructor(private authService: AuthService, private router: Router) { }

  login(user: UserDto) {
    this.authService.loginAuth({ body: user })
      .subscribe(response => {
        localStorage.setItem("authToken", response);
        this.router.navigate(['']);
      }, err => {
        console.log(err.value);
      });
  }




}
