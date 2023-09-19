/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { AuthorRm } from '../../models/author-rm';

export interface GetByIdAuthor$Plain$Params {
  id: number;
}

export function getByIdAuthor$Plain(http: HttpClient, rootUrl: string, params: GetByIdAuthor$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<AuthorRm>> {
  const rb = new RequestBuilder(rootUrl, getByIdAuthor$Plain.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'text', accept: 'text/plain', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<AuthorRm>;
    })
  );
}

getByIdAuthor$Plain.PATH = '/Author/{id}';
