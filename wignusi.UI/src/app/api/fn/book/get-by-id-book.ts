/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookDto } from '../../models/book-dto';

export interface GetByIdBook$Params {
  id: string;
}

export function getByIdBook(http: HttpClient, rootUrl: string, params: GetByIdBook$Params, context?: HttpContext): Observable<StrictHttpResponse<BookDto>> {
  const rb = new RequestBuilder(rootUrl, getByIdBook.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BookDto>;
    })
  );
}

getByIdBook.PATH = '/{id}';
