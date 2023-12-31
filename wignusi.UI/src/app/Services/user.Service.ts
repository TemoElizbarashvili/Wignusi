import { Injectable, OnInit } from "@angular/core";
import { Subject } from "rxjs";

import { LoginDto, UserDto } from "../api/models";
import { AuthService } from "../api/services";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class UserService implements OnInit{ 
    logedIn$ = new Subject<boolean>();
    isAdmin$ = new Subject<boolean>();
    currentEmail: string; 
    userId: number;
    Role: string = 'Customer';
    isValid = true;

    constructor(private authService: AuthService, private router: Router) { }
 
    ngOnInit(): void {
      
    } 

    setEmail(email: string){
        this.logedIn$.next(true);
        if (this.Role === "Admin") {
          this.isAdmin$.next(true);
        }
        this.isAdmin$.next(false);
        this.currentEmail = email;
    }

    removeEmail() {
        this.logedIn$.next(false);
        this.isAdmin$.next(false);
        this.currentEmail = null;
        this.Role = null;
        this.userId = null;
        localStorage.removeItem("authToken");
        localStorage.removeItem("role");
        localStorage.removeItem("ID");
    }
    
    regiser(user: UserDto) { 
      this.authService.registerAuth({ body: user })
          .subscribe( () => (console.log("rata rata??") ), err => console.log(err));
      const loginDto: LoginDto = {
          email: user.emailAddress,
          password: user.password
      };
      this.login(loginDto);
    }

    login(user: LoginDto, requestedUrl?: string) : boolean {
      this.authService.loginAuth({ body: user })
        .subscribe(response => {
          if (response) { 
            localStorage.setItem("authToken", response.token);
            localStorage.setItem("role", response.role);
            localStorage.setItem("ID", response.id.toString());
            this.Role = response.role;
            this.setEmail(user.email);
            this.userId = response.id;
            response.role === "Admin" ? this.isAdmin$.next(true) : this.isAdmin$.next(false);
            this.router.navigate([requestedUrl ?? '']);
            return true;
          } else { 
            return false;
          }
          }, err => {
            return false;
        });
        return false;
    }
}