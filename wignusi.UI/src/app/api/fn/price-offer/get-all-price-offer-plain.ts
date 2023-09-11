/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { PriceOfferRm } from '../../models/price-offer-rm';

export interface GetAllPriceOffer$Plain$Params {
}

export function getAllPriceOffer$Plain(http: HttpClient, rootUrl: string, params?: GetAllPriceOffer$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PriceOfferRm>>> {
  const rb = new RequestBuilder(rootUrl, getAllPriceOffer$Plain.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<PriceOfferRm>>;
    })
  );
}

getAllPriceOffer$Plain.PATH = '/PriceOffer';
