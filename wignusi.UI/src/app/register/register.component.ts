import { Component } from '@angular/core';
import { AuthService } from '../api/services';
import { UserDto } from '../api/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: UserDto = {
    username: '',
    password: ''
  }

  constructor(private authService: AuthService, private router: Router) { }

  regiser(user: UserDto) { 
    this.authService.registerAuth({ body: user })
      .subscribe(_ => ({}), err => console.log(err.message));
    this.authService.loginAuth({ body: user })
      .subscribe(response => {
        localStorage.setItem("authToken", response);
        this.router.navigate(['']);
      });
      
  }

}
