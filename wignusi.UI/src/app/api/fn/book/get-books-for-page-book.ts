/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookRm } from '../../models/book-rm';

export interface GetBooksForPageBook$Params {
  page: number;
}

export function getBooksForPageBook(http: HttpClient, rootUrl: string, params: GetBooksForPageBook$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<BookRm>>> {
  const rb = new RequestBuilder(rootUrl, getBooksForPageBook.PATH, 'get');
  if (params) {
    rb.path('page', params.page, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<BookRm>>;
    })
  );
}

getBooksForPageBook.PATH = '/Book/{page}';
