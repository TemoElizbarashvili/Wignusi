import { Component, OnInit } from '@angular/core';
import { OrderRm } from 'src/app/api/models';
import { OrderService } from 'src/app/api/services';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {
  orders: OrderRm[] = [];
  filter = '';

  constructor(private readonly orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getAllOrder()
      .subscribe(response => {
        this.orders = response;
      }, err => {
        console.log(err.message);
      });
  }

  onFilter(status: string) {
    if (status == 'all' && this.filter != '') {
      this.filter = '';
      this.orderService.getAllOrder()
      .subscribe(response => {
        this.orders = response;
      }, err => {
        console.log(err.message);
      });
    } else {
      this.orderService.filterOrder({status: status})
      .subscribe(response => {
        this.filter = status; 
        this.orders = response;
      }, err => {
        console.log(err.message);
      });
    }
  }

}
