/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookRm } from '../../models/book-rm';

export interface SearchBook$Plain$Params {
  search?: string;
}

export function searchBook$Plain(http: HttpClient, rootUrl: string, params?: SearchBook$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookRm>>> {
  const rb = new RequestBuilder(rootUrl, searchBook$Plain.PATH, 'get');
  if (params) {
    rb.query('search', params.search, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<BookRm>>;
    })
  );
}

searchBook$Plain.PATH = '/Book/search';
