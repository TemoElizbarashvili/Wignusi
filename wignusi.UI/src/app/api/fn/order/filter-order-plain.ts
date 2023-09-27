/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { OrderRm } from '../../models/order-rm';

export interface FilterOrder$Plain$Params {
  status?: string;
}

export function filterOrder$Plain(http: HttpClient, rootUrl: string, params?: FilterOrder$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<OrderRm>>> {
  const rb = new RequestBuilder(rootUrl, filterOrder$Plain.PATH, 'get');
  if (params) {
    rb.query('status', params.status, {});
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

filterOrder$Plain.PATH = '/filter';
