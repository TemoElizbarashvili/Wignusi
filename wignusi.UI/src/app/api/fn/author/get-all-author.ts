/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AuthorRm } from '../../models/author-rm';

export interface GetAllAuthor$Params {
}

export function getAllAuthor(http: HttpClient, rootUrl: string, params?: GetAllAuthor$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<AuthorRm>>> {
  const rb = new RequestBuilder(rootUrl, getAllAuthor.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<AuthorRm>>;
    })
  );
}

getAllAuthor.PATH = '/Author';
