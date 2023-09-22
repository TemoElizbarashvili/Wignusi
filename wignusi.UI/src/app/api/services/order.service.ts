/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { createOrder } from '../fn/order/create-order';
import { CreateOrder$Params } from '../fn/order/create-order';
import { editOrder } from '../fn/order/edit-order';
import { EditOrder$Params } from '../fn/order/edit-order';
import { getAllOrder } from '../fn/order/get-all-order';
import { GetAllOrder$Params } from '../fn/order/get-all-order';
import { getAllOrder$Plain } from '../fn/order/get-all-order-plain';
import { GetAllOrder$Plain$Params } from '../fn/order/get-all-order-plain';
import { OrderRm } from '../models/order-rm';

@Injectable({ providedIn: 'root' })
export class OrderService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllOrder()` */
  static readonly GetAllOrderPath = '/Order';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllOrder$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllOrder$Plain$Response(params?: GetAllOrder$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OrderRm>>> {
    return getAllOrder$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllOrder$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllOrder$Plain(params?: GetAllOrder$Plain$Params, context?: HttpContext): Observable<Array<OrderRm>> {
    return this.getAllOrder$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<OrderRm>>): Array<OrderRm> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllOrder()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllOrder$Response(params?: GetAllOrder$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OrderRm>>> {
    return getAllOrder(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllOrder$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllOrder(params?: GetAllOrder$Params, context?: HttpContext): Observable<Array<OrderRm>> {
    return this.getAllOrder$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<OrderRm>>): Array<OrderRm> => r.body)
    );
  }

  /** Path part for operation `editOrder()` */
  static readonly EditOrderPath = '/Order';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `editOrder()` instead.
   *
   * This method doesn't expect any request body.
   */
  editOrder$Response(params?: EditOrder$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return editOrder(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `editOrder$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  editOrder(params?: EditOrder$Params, context?: HttpContext): Observable<void> {
    return this.editOrder$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `createOrder()` */
  static readonly CreateOrderPath = '/Order';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createOrder()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createOrder$Response(params?: CreateOrder$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return createOrder(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createOrder$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  createOrder(params?: CreateOrder$Params, context?: HttpContext): Observable<void> {
    return this.createOrder$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
