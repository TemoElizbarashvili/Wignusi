/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OrderRm } from '../../models/order-rm';

export interface GetWithUserIdOrder$Plain$Params {
  userId?: number;
}

export function getWithUserIdOrder$Plain(http: HttpClient, rootUrl: string, params?: GetWithUserIdOrder$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OrderRm>>> {
  const rb = new RequestBuilder(rootUrl, getWithUserIdOrder$Plain.PATH, 'get');
  if (params) {
    rb.query('userId', params.userId, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<OrderRm>>;
    })
  );
}

getWithUserIdOrder$Plain.PATH = '/user/orders';
