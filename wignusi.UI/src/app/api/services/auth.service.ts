/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { deleteAuth } from '../fn/auth/delete-auth';
import { DeleteAuth$Params } from '../fn/auth/delete-auth';
import { getAllAuth } from '../fn/auth/get-all-auth';
import { GetAllAuth$Params } from '../fn/auth/get-all-auth';
import { getAllAuth$Plain } from '../fn/auth/get-all-auth-plain';
import { GetAllAuth$Plain$Params } from '../fn/auth/get-all-auth-plain';
import { loginAuth } from '../fn/auth/login-auth';
import { LoginAuth$Params } from '../fn/auth/login-auth';
import { loginAuth$Plain } from '../fn/auth/login-auth-plain';
import { LoginAuth$Plain$Params } from '../fn/auth/login-auth-plain';
import { LoginRm } from '../models/login-rm';
import { registerAuth } from '../fn/auth/register-auth';
import { RegisterAuth$Params } from '../fn/auth/register-auth';
import { UserRm } from '../models/user-rm';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getAllAuth()` */
  static readonly GetAllAuthPath = '/Auth/users';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllAuth$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAuth$Plain$Response(params?: GetAllAuth$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserRm>>> {
    return getAllAuth$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllAuth$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAuth$Plain(params?: GetAllAuth$Plain$Params, context?: HttpContext): Observable<Array<UserRm>> {
    return this.getAllAuth$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UserRm>>): Array<UserRm> => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllAuth()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAuth$Response(params?: GetAllAuth$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<UserRm>>> {
    return getAllAuth(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllAuth$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllAuth(params?: GetAllAuth$Params, context?: HttpContext): Observable<Array<UserRm>> {
    return this.getAllAuth$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<UserRm>>): Array<UserRm> => r.body)
    );
  }

  /** Path part for operation `registerAuth()` */
  static readonly RegisterAuthPath = '/Auth/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerAuth()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registerAuth$Response(params?: RegisterAuth$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return registerAuth(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerAuth$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registerAuth(params?: RegisterAuth$Params, context?: HttpContext): Observable<void> {
    return this.registerAuth$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `loginAuth()` */
  static readonly LoginAuthPath = '/Auth/login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loginAuth$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  loginAuth$Plain$Response(params?: LoginAuth$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<LoginRm>> {
    return loginAuth$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loginAuth$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  loginAuth$Plain(params?: LoginAuth$Plain$Params, context?: HttpContext): Observable<LoginRm> {
    return this.loginAuth$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<LoginRm>): LoginRm => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loginAuth()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  loginAuth$Response(params?: LoginAuth$Params, context?: HttpContext): Observable<StrictHttpResponse<LoginRm>> {
    return loginAuth(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loginAuth$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  loginAuth(params?: LoginAuth$Params, context?: HttpContext): Observable<LoginRm> {
    return this.loginAuth$Response(params, context).pipe(
      map((r: StrictHttpResponse<LoginRm>): LoginRm => r.body)
    );
  }

  /** Path part for operation `deleteAuth()` */
  static readonly DeleteAuthPath = '/Auth/delete/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteAuth()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAuth$Response(params: DeleteAuth$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteAuth(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteAuth$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteAuth(params: DeleteAuth$Params, context?: HttpContext): Observable<void> {
    return this.deleteAuth$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
