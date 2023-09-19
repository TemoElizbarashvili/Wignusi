import { Component,  OnInit } from '@angular/core';
import { UserService } from '../Services/user.Service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  observable = this.userService.logedIn$;
  adminObservable = this.userService.isAdmin$;
  searchText: string = '';

  constructor(private userService: UserService, private router: Router) { }
  
  ngOnInit(): void {
    this.observable.subscribe(result => {
      this.isLoggedIn = result;
    });

    this.adminObservable.subscribe(result => {
      this.isAdmin = result;
    });

    const token = localStorage.getItem("authToken");
    if (token){
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }

    
    const role = localStorage.getItem("role");
    if (role){
      if (role == "Admin"){
        this.isAdmin = true;
      }
    } else {
      this.isAdmin = false;
    }
   
  }

  logout(){
    this.userService.removeEmail();
    this.isLoggedIn = false
    this.isAdmin = false;
  }


}
