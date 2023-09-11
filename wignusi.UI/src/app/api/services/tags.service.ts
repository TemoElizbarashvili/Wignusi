/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addTags } from '../fn/tags/add-tags';
import { AddTags$Params } from '../fn/tags/add-tags';
import { deleteTags } from '../fn/tags/delete-tags';
import { DeleteTags$Params } from '../fn/tags/delete-tags';
import { getAllTags } from '../fn/tags/get-all-tags';
import { GetAllTags$Params } from '../fn/tags/get-all-tags';
import { getAllTags$Plain } from '../fn/tags/get-all-tags-plain';
import { GetAllTags$Plain$Params } from '../fn/tags/get-all-tags-plain';
import { TagRm } from '../models/tag-rm';

@Injectable({ providedIn: 'root' })
export class TagsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllTags()` */
  static readonly GetAllTagsPath = '/Tags';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllTags$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTags$Plain$Response(params?: GetAllTags$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TagRm>>> {
    return getAllTags$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllTags$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTags$Plain(params?: GetAllTags$Plain$Params, context?: HttpContext): Observable<Array<TagRm>> {
    return this.getAllTags$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<TagRm>>): Array<TagRm> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllTags()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTags$Response(params?: GetAllTags$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<TagRm>>> {
    return getAllTags(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllTags$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllTags(params?: GetAllTags$Params, context?: HttpContext): Observable<Array<TagRm>> {
    return this.getAllTags$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<TagRm>>): Array<TagRm> => r.body)
    );
  }

  /** Path part for operation `addTags()` */
  static readonly AddTagsPath = '/Tags';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addTags()` instead.
   *
   * This method doesn't expect any request body.
   */
  addTags$Response(params?: AddTags$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return addTags(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addTags$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  addTags(params?: AddTags$Params, context?: HttpContext): Observable<void> {
    return this.addTags$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `deleteTags()` */
  static readonly DeleteTagsPath = '/Tags';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteTags()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTags$Response(params?: DeleteTags$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteTags(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteTags$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteTags(params?: DeleteTags$Params, context?: HttpContext): Observable<void> {
    return this.deleteTags$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
