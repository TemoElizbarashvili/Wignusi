/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PriceOfferRm } from '../../models/price-offer-rm';

export interface GetAllPriceOffer$Params {
}

export function getAllPriceOffer(http: HttpClient, rootUrl: string, params?: GetAllPriceOffer$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PriceOfferRm>>> {
  const rb = new RequestBuilder(rootUrl, getAllPriceOffer.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<PriceOfferRm>>;
    })
  );
}

getAllPriceOffer.PATH = '/PriceOffer';
