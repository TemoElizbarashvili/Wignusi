import { Component, OnInit } from '@angular/core';

import { AuthorRm, BookRm, TagRm } from '../api/models';
import { AuthService, AuthorService, BookService, TagsService } from '../api/services';
import { ActivatedRoute, Params } from '@angular/router';
import { GetBooksForPageBook$Params } from '../api/fn/book/get-books-for-page-book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

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


  constructor(private bookService: BookService, private route: ActivatedRoute, private tagService: TagsService, private authorService: AuthorService) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.searchText = params['searchText'];
    })
    if (this.searchText) {
      this.bookService.searchBook({ search: this.searchText })
        .subscribe(result => {
          this.books = result;
          console.log(this.searchText);
        }, this.handleError);
    } else {
      this.bookService.getBooksForPageBook(this.params)
      .subscribe(response => {
        this.books = response;
      }, this.handleError);
    }

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
    
  }


  handleError(err: any) {
    console.log(err);
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
        console.log(response);
        this.books = response;
      }, this.handleError);
  }

  createRange(number){
    // return new Array(number);
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

}
