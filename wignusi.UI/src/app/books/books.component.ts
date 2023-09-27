import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';

import { AuthorRm, BookRm, TagRm } from '../api/models';
import {  AuthorService, BookService, TagsService } from '../api/services';
import { GetBooksForPageBook$Params } from '../api/fn/book/get-books-for-page-book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, OnDestroy {
  subscription;
  books: BookRm[];
  tags: TagRm[];
  authors: AuthorRm[];
  numberOfPages: number = 1;
  searchText: string;
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


  constructor(private bookService: BookService, private route: ActivatedRoute, private tagService: TagsService, private authorService: AuthorService, 
    private router: Router) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe((params: Params) => {
      this.params.title = params['searchText'];
      this.params.page = isNaN(+params['page']) ? 1 : +params['page'];
      this.params.pageSize = isNaN(+params['pageSize']) ? 24 : +params['pageSize'];
      this.params.authorName = params['authorName'];
      this.params.onlySales = params['onlySales'];
      this.params.onlyAvialables = params['onlyAvialables'];
      this.params.ganre = params['ganre'];
    });
   
    this.bookService.getBooksForPageBook(this.params)
      .subscribe(response => {
        this.books = response;
      }, this.handleError);

    this.tagService.getAllTags().subscribe(response => {
      this.tags = response;
    }, this.handleError);
    this.authorService.getAllAuthor().subscribe(response => {
      this.authors = response;
    }, this.handleError);
    this.bookService.countOfBook().subscribe(response => {
      this.numberOfPages = parseInt((response/this.params.pageSize).toString());
      this.numberOfPages === 0 ? 1 : this.numberOfPages;
    }, this.handleError);
    
    this.subscription = this.router.events.subscribe( event => {
      if (event instanceof NavigationEnd) {
        this.updateParams();
      }
    })

  }


  handleError(err: any) {
    console.log(err);
  }

  updateParams() {
    this.route.queryParams.subscribe((params: Params) => {
      this.params.title = params['searchText'];
      this.params.page = params['page'] ?? 1;
      this.params.pageSize = params['pageSize'] ?? 24;
      this.params.authorName = params['authorName'];
      this.params.onlySales = params['onlySales'];
      this.params.onlyAvialables = params['onlyAvialables'];
      this.params.ganre = params['ganre'];
    });
    this.search();
  }

  updateTag(tag: string) {
    this.params.ganre = tag;
  }

  updateAuthor(author: string) {
    this.params.authorName = author;
  }

  search() {
    let searchParams: GetBooksForPageBook$Params = this.params;
    this.bookService.getBooksForPageBook(searchParams)
      .subscribe(response => {
        this.books = response;
      }, this.handleError);
  }

  createRange(number){
    return new Array(number).fill(0)
      .map((n, index) => index + 1);
  }

  onPageChange(page: number) {
    this.params.page = page;
    this.search();
  }

  onNextPageClick() {
    this.params.page++;
    this.search();
  }

  refreshFilter() {
    this.params = {
      page: 1,
      pageSize: 24,
      title: null,
      authorName: null,
      publishedFrom: null,
      onlySales: false,
      onlyAvialables: false,
      ganre: null
    };
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
