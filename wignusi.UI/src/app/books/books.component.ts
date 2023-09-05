import { Component, OnInit } from '@angular/core';

import { BookRm } from '../api/models';
import { BookService } from '../api/services';
import { ActivatedRoute } from '@angular/router';
import { GetBooksForPageBook$Params } from '../api/fn/book/get-books-for-page-book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: BookRm[];
  // showGanre = false;
  // showPrice = false;
  // showAuthor = false;
  numberOfPages: number = 1;
  params: GetBooksForPageBook$Params = {
    page: 1,
    pageSize: 24,
    title: null,
    authorName: null,
    publishedFrom: null,
    onlySales: false,
    onlyAvialables: false,
    ganre: null
  };


  constructor(private bookService: BookService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.logInfo();
    this.bookService.countOfBook().subscribe(response => {
      this.numberOfPages = parseInt((response/this.params.pageSize).toString());
      this.numberOfPages === 0 ? 1 : this.numberOfPages;
      console.log(this.numberOfPages);
    }, this.handleError)
    this.bookService.getBooksForPageBook(this.params)
      .subscribe(response => {
        this.books = response;
      }, this.handleError)
  }


  handleError(err: any) {
    console.log(err);
  }

  onGanreClick() {
    
  }

  onPriceClick() {
    
  }

  onAuthorClick() { 
    
  }

  search() {
    let searchParams: GetBooksForPageBook$Params = this.params;
    this.bookService.getBooksForPageBook(searchParams)
      .subscribe(response => {
        console.log(response);
        this.books = response;
      }, this.handleError);
  }

  createRange(number){
    // return new Array(number);
    return new Array(number).fill(0)
      .map((n, index) => index + 1);
  }

  logInfo() {
    setInterval(() => {
    }, 3000)
  }

  onPageChange(page: number) {
    this.params.page = page;
    this.search();
  }

  onNextPageClick() {
    this.params.page++;
    this.search();
  }

}
