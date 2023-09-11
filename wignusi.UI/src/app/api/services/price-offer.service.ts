/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addPriceOffer } from '../fn/price-offer/add-price-offer';
import { AddPriceOffer$Params } from '../fn/price-offer/add-price-offer';
import { deletePriceOffer } from '../fn/price-offer/delete-price-offer';
import { DeletePriceOffer$Params } from '../fn/price-offer/delete-price-offer';
import { getAllPriceOffer } from '../fn/price-offer/get-all-price-offer';
import { GetAllPriceOffer$Params } from '../fn/price-offer/get-all-price-offer';
import { getAllPriceOffer$Plain } from '../fn/price-offer/get-all-price-offer-plain';
import { GetAllPriceOffer$Plain$Params } from '../fn/price-offer/get-all-price-offer-plain';
import { PriceOfferRm } from '../models/price-offer-rm';

@Injectable({ providedIn: 'root' })
export class PriceOfferService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllPriceOffer()` */
  static readonly GetAllPriceOfferPath = '/PriceOffer';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllPriceOffer$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPriceOffer$Plain$Response(params?: GetAllPriceOffer$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PriceOfferRm>>> {
    return getAllPriceOffer$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllPriceOffer$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPriceOffer$Plain(params?: GetAllPriceOffer$Plain$Params, context?: HttpContext): Observable<Array<PriceOfferRm>> {
    return this.getAllPriceOffer$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<PriceOfferRm>>): Array<PriceOfferRm> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllPriceOffer()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPriceOffer$Response(params?: GetAllPriceOffer$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PriceOfferRm>>> {
    return getAllPriceOffer(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllPriceOffer$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPriceOffer(params?: GetAllPriceOffer$Params, context?: HttpContext): Observable<Array<PriceOfferRm>> {
    return this.getAllPriceOffer$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<PriceOfferRm>>): Array<PriceOfferRm> => r.body)
    );
  }

  /** Path part for operation `addPriceOffer()` */
  static readonly AddPriceOfferPath = '/PriceOffer';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addPriceOffer()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addPriceOffer$Response(params?: AddPriceOffer$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return addPriceOffer(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addPriceOffer$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  addPriceOffer(params?: AddPriceOffer$Params, context?: HttpContext): Observable<void> {
    return this.addPriceOffer$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `deletePriceOffer()` */
  static readonly DeletePriceOfferPath = '/PriceOffer';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deletePriceOffer()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePriceOffer$Response(params?: DeletePriceOffer$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deletePriceOffer(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deletePriceOffer$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deletePriceOffer(params?: DeletePriceOffer$Params, context?: HttpContext): Observable<void> {
    return this.deletePriceOffer$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
