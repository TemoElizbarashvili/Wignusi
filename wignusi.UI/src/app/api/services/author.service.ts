/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addAuthor } from '../fn/author/add-author';
import { AddAuthor$Params } from '../fn/author/add-author';
import { AuthorRm } from '../models/author-rm';
import { deleteAuthor } from '../fn/author/delete-author';
import { DeleteAuthor$Params } from '../fn/author/delete-author';
import { editAuthor } from '../fn/author/edit-author';
import { EditAuthor$Params } from '../fn/author/edit-author';
import { getAllAuthor } from '../fn/author/get-all-author';
import { GetAllAuthor$Params } from '../fn/author/get-all-author';
import { getAllAuthor$Plain } from '../fn/author/get-all-author-plain';
import { GetAllAuthor$Plain$Params } from '../fn/author/get-all-author-plain';

@Injectable({ providedIn: 'root' })
export class AuthorService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllAuthor()` */
  static readonly GetAllAuthorPath = '/Author';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllAuthor$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAuthor$Plain$Response(params?: GetAllAuthor$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AuthorRm>>> {
    return getAllAuthor$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllAuthor$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAuthor$Plain(params?: GetAllAuthor$Plain$Params, context?: HttpContext): Observable<Array<AuthorRm>> {
    return this.getAllAuthor$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<AuthorRm>>): Array<AuthorRm> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllAuthor()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAuthor$Response(params?: GetAllAuthor$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AuthorRm>>> {
    return getAllAuthor(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllAuthor$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAuthor(params?: GetAllAuthor$Params, context?: HttpContext): Observable<Array<AuthorRm>> {
    return this.getAllAuthor$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<AuthorRm>>): Array<AuthorRm> => r.body)
    );
  }

  /** Path part for operation `editAuthor()` */
  static readonly EditAuthorPath = '/Author';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editAuthor()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  editAuthor$Response(params?: EditAuthor$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return editAuthor(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `editAuthor$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  editAuthor(params?: EditAuthor$Params, context?: HttpContext): Observable<void> {
    return this.editAuthor$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `addAuthor()` */
  static readonly AddAuthorPath = '/Author';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addAuthor()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addAuthor$Response(params?: AddAuthor$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return addAuthor(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addAuthor$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addAuthor(params?: AddAuthor$Params, context?: HttpContext): Observable<void> {
    return this.addAuthor$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `deleteAuthor()` */
  static readonly DeleteAuthorPath = '/Author';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAuthor()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAuthor$Response(params?: DeleteAuthor$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteAuthor(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteAuthor$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAuthor(params?: DeleteAuthor$Params, context?: HttpContext): Observable<void> {
    return this.deleteAuthor$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
