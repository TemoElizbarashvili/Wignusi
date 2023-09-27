import { Component, Input, OnInit } from '@angular/core';
import { OrderRm } from '../api/models';
import { OrderService } from '../api/services';

@Component({
  selector: 'app-order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit {
  @Input() order: OrderRm;
  isAdmin = false;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    let role = localStorage.getItem('role');
    if (role == 'Admin') {
      this.isAdmin = true;
    }
  }

  changeStatus(id: number, status: string)  {
    this.order.status = status;
    this.orderService.editOrder({ orderId: id, status: status })
      .subscribe(() => {
      }, err => {
        console.log(err.message);
      });
  }

}
