import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  haveToken = false;

  ngOnInit(): void {
    var token = localStorage.getItem("authToken");
    console.log("init");
    if (token){
      this.haveToken = true;
    } else {
      this.haveToken = false;
    }
    console.log(this.haveToken);
  }

  logout(){
    localStorage.removeItem("authToken");
    this.haveToken = false;
  }

}
