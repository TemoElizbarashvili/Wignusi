/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addCart } from '../fn/cart/add-cart';
import { AddCart$Params } from '../fn/cart/add-cart';
import { CartRm } from '../models/cart-rm';
import { deleteCart } from '../fn/cart/delete-cart';
import { DeleteCart$Params } from '../fn/cart/delete-cart';
import { deleteLineCart } from '../fn/cart/delete-line-cart';
import { DeleteLineCart$Params } from '../fn/cart/delete-line-cart';
import { editCart } from '../fn/cart/edit-cart';
import { EditCart$Params } from '../fn/cart/edit-cart';
import { getCart } from '../fn/cart/get-cart';
import { GetCart$Params } from '../fn/cart/get-cart';
import { getCart$Plain } from '../fn/cart/get-cart-plain';
import { GetCart$Plain$Params } from '../fn/cart/get-cart-plain';

@Injectable({ providedIn: 'root' })
export class CartService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getCart()` */
  static readonly GetCartPath = '/Cart';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCart$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCart$Plain$Response(params?: GetCart$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CartRm>>> {
    return getCart$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCart$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCart$Plain(params?: GetCart$Plain$Params, context?: HttpContext): Observable<Array<CartRm>> {
    return this.getCart$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CartRm>>): Array<CartRm> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCart()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCart$Response(params?: GetCart$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CartRm>>> {
    return getCart(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCart$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCart(params?: GetCart$Params, context?: HttpContext): Observable<Array<CartRm>> {
    return this.getCart$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<CartRm>>): Array<CartRm> => r.body)
    );
  }

  /** Path part for operation `editCart()` */
  static readonly EditCartPath = '/Cart';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editCart()` instead.
   *
   * This method doesn't expect any request body.
   */
  editCart$Response(params?: EditCart$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return editCart(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `editCart$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  editCart(params?: EditCart$Params, context?: HttpContext): Observable<void> {
    return this.editCart$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `addCart()` */
  static readonly AddCartPath = '/Cart';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addCart()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addCart$Response(params?: AddCart$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return addCart(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addCart$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addCart(params?: AddCart$Params, context?: HttpContext): Observable<void> {
    return this.addCart$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `deleteCart()` */
  static readonly DeleteCartPath = '/Cart';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteCart()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCart$Response(params?: DeleteCart$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteCart(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteCart$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCart(params?: DeleteCart$Params, context?: HttpContext): Observable<void> {
    return this.deleteCart$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `deleteLineCart()` */
  static readonly DeleteLineCartPath = '/{cartId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteLineCart()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteLineCart$Response(params: DeleteLineCart$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteLineCart(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteLineCart$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteLineCart(params: DeleteLineCart$Params, context?: HttpContext): Observable<void> {
    return this.deleteLineCart$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
