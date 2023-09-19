/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { UserRm } from '../../models/user-rm';

export interface GetAllAuth$Plain$Params {
}

export function getAllAuth$Plain(http: HttpClient, rootUrl: string, params?: GetAllAuth$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserRm>>> {
  const rb = new RequestBuilder(rootUrl, getAllAuth$Plain.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<UserRm>>;
    })
  );
}

getAllAuth$Plain.PATH = '/Auth/users';
