/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { LoginDto } from '../../models/login-dto';
import { LoginRm } from '../../models/login-rm';

export interface LoginAuth$Params {
      body?: LoginDto
}

export function loginAuth(http: HttpClient, rootUrl: string, params?: LoginAuth$Params, context?: HttpContext): Observable<StrictHttpResponse<LoginRm>> {
  const rb = new RequestBuilder(rootUrl, loginAuth.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/*+json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<LoginRm>;
    })
  );
}

loginAuth.PATH = '/Auth/login';
