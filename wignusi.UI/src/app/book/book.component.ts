import { Component, OnInit } from '@angular/core';
import { BookService, CartService } from '../api/services';
import { ActivatedRoute, Router } from '@angular/router';
import { BookRm } from '../api/models';
import { UserService } from '../Services/user.Service';
import { AddCart$Params } from '../api/fn/cart/add-cart';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  bookId: string;
  book: BookRm;
  quantity = 1;

  constructor(private bookService: BookService, private route: ActivatedRoute,
     private cartService: CartService, 
     private userService: UserService,
     private router: Router) { }

    ngOnInit(): void {
    this.route.paramMap.subscribe(response => {
      this.bookId = response.get("id");
    }, err => {
      console.error(err);
    });
    this.bookService.getByIdBook({ id: this.bookId })
      .subscribe(response => {
      this.book = response;
    });    
  }

  incrementQuantity() {
    if (this.quantity < 100){
      this.quantity++;
    }
  }

  decrementQuantity() { 
    if(this.quantity > 1){
      this.quantity--;
    }
  }

  onSubmit() {
    let userId = this.userService.userId;
    if (!userId) {
      userId = +localStorage.getItem('ID');
    }
    
    if (localStorage.getItem('authToken')){
      const params: AddCart$Params = {
        body: {
          bookId: this.bookId,
          quantity: this.quantity,
          userId: userId
        }
      };
      this.cartService.addCart(params)
      .subscribe(_ => {});
    } else {
      this.router.navigate(['login', { requestedUrl: this.router.url }]);
    }
  }

}
