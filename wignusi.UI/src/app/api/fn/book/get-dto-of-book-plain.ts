/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { BookDto } from '../../models/book-dto';

export interface GetDtoOfBook$Plain$Params {
  id?: string;
}

export function getDtoOfBook$Plain(http: HttpClient, rootUrl: string, params?: GetDtoOfBook$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<BookDto>> {
  const rb = new RequestBuilder(rootUrl, getDtoOfBook$Plain.PATH, 'get');
  if (params) {
    rb.query('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<BookDto>;
    })
  );
}

getDtoOfBook$Plain.PATH = '/bookDto';
