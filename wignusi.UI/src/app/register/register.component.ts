import { Component, Inject } from '@angular/core';
import { AuthService } from '../api/services';
import { UserDto } from '../api/models';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.Service';
import { observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: UserDto = {
    username: '',
    emailAddress: '',
    phone: '',
    password: '',
    role: 'Customer'
  } 

  constructor(private authService: AuthService, private router: Router,private userService: UserService) { }

  regiser(user: UserDto) { 
    
    this.userService.regiser(user);  
    this.router.navigate(['']);
  }

}
