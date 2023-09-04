/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { BookRm } from '../models/book-rm';
import { getAllBook } from '../fn/book/get-all-book';
import { GetAllBook$Params } from '../fn/book/get-all-book';
import { getAllBook$Plain } from '../fn/book/get-all-book-plain';
import { GetAllBook$Plain$Params } from '../fn/book/get-all-book-plain';
import { getBooksForPageBook } from '../fn/book/get-books-for-page-book';
import { GetBooksForPageBook$Params } from '../fn/book/get-books-for-page-book';
import { getBooksForPageBook$Plain } from '../fn/book/get-books-for-page-book-plain';
import { GetBooksForPageBook$Plain$Params } from '../fn/book/get-books-for-page-book-plain';

@Injectable({ providedIn: 'root' })
export class BookService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllBook()` */
  static readonly GetAllBookPath = '/Book';

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
  static readonly GetBooksForPageBookPath = '/Book/{page}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getBooksForPageBook$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBooksForPageBook$Plain$Response(params: GetBooksForPageBook$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookRm>>> {
    return getBooksForPageBook$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getBooksForPageBook$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBooksForPageBook$Plain(params: GetBooksForPageBook$Plain$Params, context?: HttpContext): Observable<Array<BookRm>> {
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
  getBooksForPageBook$Response(params: GetBooksForPageBook$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookRm>>> {
    return getBooksForPageBook(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getBooksForPageBook$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getBooksForPageBook(params: GetBooksForPageBook$Params, context?: HttpContext): Observable<Array<BookRm>> {
    return this.getBooksForPageBook$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<BookRm>>): Array<BookRm> => r.body)
    );
  }

}
