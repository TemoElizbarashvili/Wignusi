import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartDto, CartRm } from '../api/models';
import { CartService } from '../api/services';
import { UserService } from '../Services/user.Service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  userId: number;
  deliveryPrice: number = 5;
  cartLines: CartRm[] = [];

 constructor(private cartService: CartService, private userService: UserService) { }

  ngOnInit(): void {
    if (this.userService.userId){
      this.userId = this.userService.userId;
    } else {
      this.userId = +localStorage.getItem('ID');
    }
  
    this.cartService.getCart({ userId: this.userId })
      .subscribe(response => {
        this.cartLines = response;
        console.log(response);
      });
  }


  calculateLinePrice(bookPrice: number, quantity: number) {
    return Math.round((bookPrice * quantity) * 100) / 100;
  }

  calculateTotalPriceWithDelivery() {
    let orderTotal = 0;
    this.cartLines.forEach(element => {
      orderTotal += this.calculateLinePrice(element.bookPrice, element.quantity);
    });
    return Math.round((orderTotal + +this.deliveryPrice) * 100) / 100;
  }

  calculateTotalPrice() {
    let orderTotal = 0;
    this.cartLines.forEach(element => {
      orderTotal += this.calculateLinePrice(element.bookPrice, element.quantity);
    });
    return Math.round((orderTotal) * 100) / 100;
  }

  calculateQuantities() {
    let totalQuantity = 0;
    this.cartLines.forEach(element => {
      totalQuantity += element.quantity;
    });
    return totalQuantity;
  }

  incrementCount(cartId: number) {
    let lienToChange = this.cartLines.find(c => c.cartId == cartId);
    lienToChange.quantity++;
  }

  decrementCount(cartId: number)  {
    let lienToChange = this.cartLines.find(c => c.cartId == cartId);
    
    if (lienToChange.quantity == 1) {
      this.cartService.deleteLineCart({cartId: cartId})
        .subscribe(() => {
          this.cartLines = this.cartLines.filter(c => c.cartId != cartId);
        });
    } else { 
      lienToChange.quantity--;
    }
  }

  async ngOnDestroy(): Promise<void> {
    this.cartLines.forEach( async c => {
      await this.cartService.editCart({ cartId: c.cartId, quantity: c.quantity }).
        subscribe(() => {

        });
    })
  }
}
