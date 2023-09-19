import { Component } from '@angular/core';
import { AuthService } from '../api/services';
import { LoginDto, UserDto } from '../api/models';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.Service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: LoginDto  = {
    email: '',
    password: ''
  }

  constructor(private authService: AuthService, private router: Router, private userService: UserService) { }

  login(user: UserDto) {
    this.userService.login(user);  
    this.router.navigate(['']);
  }

}
