import { Component, OnInit } from '@angular/core';


import { UserRm } from 'src/app/api/models';
import { AuthService } from 'src/app/api/services';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: UserRm[];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getAllAuth()
      .subscribe(response => this.users = response);
  }

  onDeleteUser(id: number) {
    this.authService.deleteAuth({id})
      .subscribe(_ => {});
    this.users = this.users.filter(u => u.id != id);
  }

}
