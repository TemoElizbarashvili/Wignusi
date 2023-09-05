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
import { countOfBook } from '../fn/book/count-of-book';
import { CountOfBook$Params } from '../fn/book/count-of-book';
import { countOfBook$Plain } from '../fn/book/count-of-book-plain';
import { CountOfBook$Plain$Params } from '../fn/book/count-of-book-plain';
import { getBooksForPageBook } from '../fn/book/get-books-for-page-book';
import { GetBooksForPageBook$Params } from '../fn/book/get-books-for-page-book';
import { getBooksForPageBook$Plain } from '../fn/book/get-books-for-page-book-plain';
import { GetBooksForPageBook$Plain$Params } from '../fn/book/get-books-for-page-book-plain';

@Injectable({ providedIn: 'root' })
export class BookService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
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
