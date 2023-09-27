import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CartRm, OrderDto } from '../api/models';
import { UserService } from '../Services/user.Service';
import { CartService, OrderService } from '../api/services';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartLines: CartRm[] = [];
  userId: number;
  orderForm = new FormGroup({
    name: new FormControl('', Validators.required),
    details: new FormControl('', Validators.required),
  });

  constructor(private userService: UserService, private cartService: CartService, private orderService: OrderService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    if (this.userService.userId){
      this.userId = this.userService.userId;
    } else {
      this.userId = +localStorage.getItem('ID');
    }

    await this.cartService.getCart({ userId: this.userId })
    .subscribe(response => {
      this.cartLines = response;
    });
  }


  calculateLinePrice(bookPrice: number, quantity: number) {
    return Math.round((bookPrice * quantity) * 100) / 100;
  }

  CalculateTotalPrice() { 
    let total = 0;
    this.cartLines.forEach(line => {
      total += (line.quantity * line.bookPrice);
    })
    return (Math.round((total) * 100) / 100) + 5;
  }

  async onSubmit() {
    let ids: number[] = [];
    this.cartLines.forEach(element => {
      ids.push(element.cartId);
    });
    const params: OrderDto = {
      name: this.orderForm.get('name').value,
      details: this.orderForm.get('details').value,
      status: 'Pending',
      userId: this.userId,
      orderTotal: this.CalculateTotalPrice(),
      lineIds: ids
    }

    await this.orderService.createOrder({ body: params })
      .subscribe(_ => {
        this.router.navigate(['/order-invoice']);
      },err => {
        console.log(err);
    });
      this.router.navigate(['/summary']);
  }
}
