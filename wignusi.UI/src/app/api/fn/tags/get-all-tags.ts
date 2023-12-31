/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { TagRm } from '../../models/tag-rm';

export interface GetAllTags$Params {
}

export function getAllTags(http: HttpClient, rootUrl: string, params?: GetAllTags$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TagRm>>> {
  const rb = new RequestBuilder(rootUrl, getAllTags.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'text/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<TagRm>>;
    })
  );
}

getAllTags.PATH = '/Tags';
