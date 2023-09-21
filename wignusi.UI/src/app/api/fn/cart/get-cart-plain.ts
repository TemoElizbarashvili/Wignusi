/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { CartRm } from '../../models/cart-rm';

export interface GetCart$Plain$Params {
  userId?: number;
}

export function getCart$Plain(http: HttpClient, rootUrl: string, params?: GetCart$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<CartRm>>> {
  const rb = new RequestBuilder(rootUrl, getCart$Plain.PATH, 'get');
  if (params) {
    rb.query('userId', params.userId, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<CartRm>>;
    })
  );
}

getCart$Plain.PATH = '/Cart';
