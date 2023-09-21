import { Component, OnInit } from '@angular/core';
import { AuthService } from '../api/services';
import { LoginDto, UserDto } from '../api/models';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../Services/user.Service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  requestedUrl?: string = undefined;
  user: LoginDto  = {
    email: '',
    password: ''
  }

  constructor(private authService: AuthService, private router: Router, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.requestedUrl = p['requestedUrl']
    }, err => {
      console.log(err);
    }
    );
  }

  login(user: UserDto) {
    this.userService.login(user);  
    this.router.navigate([this.requestedUrl ?? '']);
  }

}
