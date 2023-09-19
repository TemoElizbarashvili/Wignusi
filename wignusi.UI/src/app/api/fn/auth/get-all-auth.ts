/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserRm } from '../../models/user-rm';

export interface GetAllAuth$Params {
}

export function getAllAuth(http: HttpClient, rootUrl: string, params?: GetAllAuth$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserRm>>> {
  const rb = new RequestBuilder(rootUrl, getAllAuth.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<UserRm>>;
    })
  );
}

getAllAuth.PATH = '/Auth/users';
