import { Component, Input, OnInit } from '@angular/core';
import { BookRm } from '../api/models';
import { UserService } from '../Services/user.Service';
import { CartService } from '../api/services';
import { AddCart$Params } from '../api/fn/cart/add-cart';
import { AuthGuard } from '../Services/auth.guard';
import { ActivatedRoute, Router } from '@angular/router';


interface bookCardInfo {
  imageSrc: string;
  title: string;
  author: string;
  price: number;
}

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {
  @Input() book: BookRm;
  userId: number;

  constructor(private userService: UserService, private cartService: CartService, private authGuard: AuthGuard, private router: Router) { }

  ngOnInit(): void {
    this.userId = this.userService.userId;
    if (!this.userId) {
      this.userId = +localStorage.getItem('ID');
    }
  }


  addToCart(id) {
    if (localStorage.getItem('authToken')){
      const params: AddCart$Params = {
        body: {
          bookId: id,
          quantity: 1,
          userId: this.userId
        }
      };
      this.cartService.addCart(params)
      .subscribe(() => {
        console.log('Item Added to cart with id: ' + id + 'to user: ' + this.userId);
      });
    } else {
      this.router.navigate(['login', { requestedUrl: this.router.url }])
    }
  }
}
