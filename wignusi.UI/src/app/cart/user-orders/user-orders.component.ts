import { Component, OnInit } from '@angular/core';
import { OrderRm } from 'src/app/api/models';
import { OrderService } from 'src/app/api/services';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  orders: OrderRm[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getWithUserIdOrder({ userId: +localStorage.getItem('ID') })
      .subscribe(response => {
        this.orders = response;
        console.log(response);
      }, err => {
        console.error(err.message);
      });
  }

}
