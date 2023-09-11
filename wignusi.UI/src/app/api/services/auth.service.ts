/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { loginAuth } from '../fn/auth/login-auth';
import { LoginAuth$Params } from '../fn/auth/login-auth';
import { loginAuth$Plain } from '../fn/auth/login-auth-plain';
import { LoginAuth$Plain$Params } from '../fn/auth/login-auth-plain';
import { refreshTokenAuth } from '../fn/auth/refresh-token-auth';
import { RefreshTokenAuth$Params } from '../fn/auth/refresh-token-auth';
import { refreshTokenAuth$Plain } from '../fn/auth/refresh-token-auth-plain';
import { RefreshTokenAuth$Plain$Params } from '../fn/auth/refresh-token-auth-plain';
import { registerAuth } from '../fn/auth/register-auth';
import { RegisterAuth$Params } from '../fn/auth/register-auth';
import { registerAuth$Plain } from '../fn/auth/register-auth-plain';
import { RegisterAuth$Plain$Params } from '../fn/auth/register-auth-plain';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `registerAuth()` */
  static readonly RegisterAuthPath = '/Auth/register';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerAuth$Plain()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registerAuth$Plain$Response(params?: RegisterAuth$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return registerAuth$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerAuth$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registerAuth$Plain(params?: RegisterAuth$Plain$Params, context?: HttpContext): Observable<User> {
    return this.registerAuth$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `registerAuth()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registerAuth$Response(params?: RegisterAuth$Params, context?: HttpContext): Observable<StrictHttpResponse<User>> {
    return registerAuth(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `registerAuth$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  registerAuth(params?: RegisterAuth$Params, context?: HttpContext): Observable<User> {
    return this.registerAuth$Response(params, context).pipe(
      map((r: StrictHttpResponse<User>): User => r.body)
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
  loginAuth$Plain$Response(params?: LoginAuth$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return loginAuth$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loginAuth$Plain$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  loginAuth$Plain(params?: LoginAuth$Plain$Params, context?: HttpContext): Observable<string> {
    return this.loginAuth$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loginAuth()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  loginAuth$Response(params?: LoginAuth$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return loginAuth(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `loginAuth$Response()` instead.
   *
   * This method sends `application/*+json` and handles request body of type `application/*+json`.
   */
  loginAuth(params?: LoginAuth$Params, context?: HttpContext): Observable<string> {
    return this.loginAuth$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `refreshTokenAuth()` */
  static readonly RefreshTokenAuthPath = '/Auth/refresh-token';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `refreshTokenAuth$Plain()` instead.
   *
   * This method doesn't expect any request body.
   */
  refreshTokenAuth$Plain$Response(params?: RefreshTokenAuth$Plain$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return refreshTokenAuth$Plain(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `refreshTokenAuth$Plain$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  refreshTokenAuth$Plain(params?: RefreshTokenAuth$Plain$Params, context?: HttpContext): Observable<string> {
    return this.refreshTokenAuth$Plain$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `refreshTokenAuth()` instead.
   *
   * This method doesn't expect any request body.
   */
  refreshTokenAuth$Response(params?: RefreshTokenAuth$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return refreshTokenAuth(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `refreshTokenAuth$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  refreshTokenAuth(params?: RefreshTokenAuth$Params, context?: HttpContext): Observable<string> {
    return this.refreshTokenAuth$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
