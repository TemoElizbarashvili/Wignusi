import { Component, OnInit } from '@angular/core';

import { BookRm } from '../api/models';
import { BookService } from '../api/services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: BookRm[];
  currentPage: number = 1;
  showGanre = false;
  showPrice = false;
  showAuthor = false;
  onlySales = false;
  onlyAvialable = false;
  kakao = ''


  constructor(private bookService: BookService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.logInfo();
    this.route.paramMap
      .subscribe(params => {
        this.currentPage = +params.get('page');
      });
    this.bookService.getBooksForPageBook({ page: this.currentPage })
      .subscribe(response => {
        console.log(response);
        this.books = response;
      }, this.handleError)
  }


  handleError(err: any) {
    console.log(err);
  }

  onGanreClick() {
    this.showGanre = !this.showGanre;
  }

  onPriceClick() {
    this.showPrice = !this.showPrice;
  }

  onAuthorClick() { 
    this.showAuthor = !this.showAuthor;
  }

  logInfo() {
    setInterval(() => {
    }, 3000)
  }

}
