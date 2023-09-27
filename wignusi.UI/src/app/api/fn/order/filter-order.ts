/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OrderRm } from '../../models/order-rm';

export interface FilterOrder$Params {
  status?: string;
}

export function filterOrder(http: HttpClient, rootUrl: string, params?: FilterOrder$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OrderRm>>> {
  const rb = new RequestBuilder(rootUrl, filterOrder.PATH, 'get');
  if (params) {
    rb.query('status', params.status, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<OrderRm>>;
    })
  );
}

filterOrder.PATH = '/filter';
