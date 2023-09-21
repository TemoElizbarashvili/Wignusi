/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addBook } from '../fn/book/add-book';
import { AddBook$Params } from '../fn/book/add-book';
import { BookDto } from '../models/book-dto';
import { BookRm } from '../models/book-rm';
import { countOfBook } from '../fn/book/count-of-book';
import { CountOfBook$Params } from '../fn/book/count-of-book';
import { countOfBook$Plain } from '../fn/book/count-of-book-plain';
import { CountOfBook$Plain$Params } from '../fn/book/count-of-book-plain';
import { deleteBook } from '../fn/book/delete-book';
import { DeleteBook$Params } from '../fn/book/delete-book';
import { editBook } from '../fn/book/edit-book';
import { EditBook$Params } from '../fn/book/edit-book';
import { getAllBook } from '../fn/book/get-all-book';
import { GetAllBook$Params } from '../fn/book/get-all-book';
import { getAllBook$Plain } from '../fn/book/get-all-book-plain';
import { GetAllBook$Plain$Params } from '../fn/book/get-all-book-plain';
import { getBooksForPageBook } from '../fn/book/get-books-for-page-book';
import { GetBooksForPageBook$Params } from '../fn/book/get-books-for-page-book';
import { getBooksForPageBook$Plain } from '../fn/book/get-books-for-page-book-plain';
import { GetBooksForPageBook$Plain$Params } from '../fn/book/get-books-for-page-book-plain';
import { getByIdBook } from '../fn/book/get-by-id-book';
import { GetByIdBook$Params } from '../fn/book/get-by-id-book';
import { getByIdBook$Plain } from '../fn/book/get-by-id-book-plain';
import { GetByIdBook$Plain$Params } from '../fn/book/get-by-id-book-plain';
import { searchBook } from '../fn/book/search-book';
import { SearchBook$Params } from '../fn/book/search-book';
import { searchBook$Plain } from '../fn/book/search-book-plain';
import { SearchBook$Plain$Params } from '../fn/book/search-book-plain';

@Injectable({ providedIn: 'root' })
export class BookService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllBook()` */
  static readonly GetAllBookPath = '/Book/books';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllBook$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBook$Plain$Response(params?: GetAllBook$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookRm>>> {
    return getAllBook$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllBook$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBook$Plain(params?: GetAllBook$Plain$Params, context?: HttpContext): Observable<Array<BookRm>> {
    return this.getAllBook$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BookRm>>): Array<BookRm> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllBook()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBook$Response(params?: GetAllBook$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookRm>>> {
    return getAllBook(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllBook$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllBook(params?: GetAllBook$Params, context?: HttpContext): Observable<Array<BookRm>> {
    return this.getAllBook$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BookRm>>): Array<BookRm> => r.body)
    );
  }

  /** Path part for operation `getBooksForPageBook()` */
  static readonly GetBooksForPageBookPath = '/Book';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBooksForPageBook$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBooksForPageBook$Plain$Response(params?: GetBooksForPageBook$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookRm>>> {
    return getBooksForPageBook$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getBooksForPageBook$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBooksForPageBook$Plain(params?: GetBooksForPageBook$Plain$Params, context?: HttpContext): Observable<Array<BookRm>> {
    return this.getBooksForPageBook$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BookRm>>): Array<BookRm> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBooksForPageBook()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBooksForPageBook$Response(params?: GetBooksForPageBook$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookRm>>> {
    return getBooksForPageBook(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getBooksForPageBook$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBooksForPageBook(params?: GetBooksForPageBook$Params, context?: HttpContext): Observable<Array<BookRm>> {
    return this.getBooksForPageBook$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BookRm>>): Array<BookRm> => r.body)
    );
  }

  /** Path part for operation `editBook()` */
  static readonly EditBookPath = '/Book';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editBook()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  editBook$Response(params?: EditBook$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return editBook(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `editBook$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  editBook(params?: EditBook$Params, context?: HttpContext): Observable<void> {
    return this.editBook$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `addBook()` */
  static readonly AddBookPath = '/Book';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addBook()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addBook$Response(params?: AddBook$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return addBook(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addBook$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addBook(params?: AddBook$Params, context?: HttpContext): Observable<void> {
    return this.addBook$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `searchBook()` */
  static readonly SearchBookPath = '/Book/search';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchBook$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchBook$Plain$Response(params?: SearchBook$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookRm>>> {
    return searchBook$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `searchBook$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchBook$Plain(params?: SearchBook$Plain$Params, context?: HttpContext): Observable<Array<BookRm>> {
    return this.searchBook$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BookRm>>): Array<BookRm> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `searchBook()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchBook$Response(params?: SearchBook$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookRm>>> {
    return searchBook(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `searchBook$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  searchBook(params?: SearchBook$Params, context?: HttpContext): Observable<Array<BookRm>> {
    return this.searchBook$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BookRm>>): Array<BookRm> => r.body)
    );
  }

  /** Path part for operation `getByIdBook()` */
  static readonly GetByIdBookPath = '/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getByIdBook$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByIdBook$Plain$Response(params: GetByIdBook$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BookDto>> {
    return getByIdBook$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getByIdBook$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByIdBook$Plain(params: GetByIdBook$Plain$Params, context?: HttpContext): Observable<BookDto> {
    return this.getByIdBook$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<BookDto>): BookDto => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getByIdBook()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByIdBook$Response(params: GetByIdBook$Params, context?: HttpContext): Observable<StrictHttpResponse<BookDto>> {
    return getByIdBook(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getByIdBook$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getByIdBook(params: GetByIdBook$Params, context?: HttpContext): Observable<BookDto> {
    return this.getByIdBook$Response(params, context).pipe(
      map((r: StrictHttpResponse<BookDto>): BookDto => r.body)
    );
  }

  /** Path part for operation `deleteBook()` */
  static readonly DeleteBookPath = '/Book/delte/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteBook()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteBook$Response(params: DeleteBook$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteBook(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteBook$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteBook(params: DeleteBook$Params, context?: HttpContext): Observable<void> {
    return this.deleteBook$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `countOfBook()` */
  static readonly CountOfBookPath = '/Book/count';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `countOfBook$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  countOfBook$Plain$Response(params?: CountOfBook$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return countOfBook$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `countOfBook$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  countOfBook$Plain(params?: CountOfBook$Plain$Params, context?: HttpContext): Observable<number> {
    return this.countOfBook$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `countOfBook()` instead.
   *
   * This method doesn't expect any request body.
   */
  countOfBook$Response(params?: CountOfBook$Params, context?: HttpContext): Observable<StrictHttpResponse<number>> {
    return countOfBook(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `countOfBook$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  countOfBook(params?: CountOfBook$Params, context?: HttpContext): Observable<number> {
    return this.countOfBook$Response(params, context).pipe(
      map((r: StrictHttpResponse<number>): number => r.body)
    );
  }

}
