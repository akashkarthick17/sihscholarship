import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpError } from 'app/shared/constants/http-error';
import { HttpRequestMethods } from '../../../shared/constants/http-request-methods';
import { IRequestOptions } from '../../../shared/constants/request-options';
import { Logger } from '../logger/logger.service';
import { SessionService } from '../session/session.service';
import { AppError } from './../../../shared/models/app-error';
import { SpinnerService } from './../../../shared/components/spinner/spinner.service';
import { environment } from 'environments/environment';

@Injectable()
export class HttpService {

  constructor(
    private http: HttpClient,
    private logger: Logger,
    private sessionService: SessionService,
    private spinnerService: SpinnerService
  ) {
  }

  async makeJsonRequest(
    baseURL: string, path: string,
    method: HttpRequestMethods,
    requestBody?: any,
    queryParams?: Object,
    requestHeaders?: HttpHeaders,
    hideSpinner?: boolean
  ) {
    const requestURL = environment.apiServerURL + baseURL + path;

    // Set Request Headers
    let headers: HttpHeaders = requestHeaders || new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    // Set Query Params
    let params: HttpParams = new HttpParams();
    if (queryParams) {
      for (const key in queryParams) {
        if (key && queryParams.hasOwnProperty(key)) {
          this.logger.debug(`${key} ${queryParams[key]}`);
          params = params.set(key, queryParams[key]);
        }
      }
    }

    // Set Request Options
    const requestOptions: IRequestOptions = {
      body: requestBody,
      headers,
      observe: 'response',
      params
    };

    if (!hideSpinner) {
      this.spinnerService.showSpinner();
    }

    try {
      const response: any = await this.http.request(method, requestURL, requestOptions).toPromise().then(res => res);
      this.logger.debug(`Response: `, response);
      const body = response.body;

      if (!hideSpinner) {
        this.spinnerService.hideSpinner();
      }

      if (body.isSuccess) {
        return response.body.data;
      } else {
        return Promise.reject(new AppError(body.error.code, body.error.description)); // add error message and code
      }
    } catch (err) {
      if (!hideSpinner) {
        this.spinnerService.hideSpinner();
      }

      const errorResponse: AppError = this.handleHttpError(err);
      return Promise.reject(errorResponse);
    }
  }

  async makeSecureJsonRequest(
    url: string,
    path: string,
    requestMethod: HttpRequestMethods,
    requestBody?: any,
    queryParams?: Object,
    requestHeaders?: HttpHeaders,
    hideSpinner?: boolean
  ) {
    requestHeaders = requestHeaders || new HttpHeaders();
    requestHeaders.append('Authorization', `Bearer ${this.sessionService.getAccessToken()}`);
    return this.makeJsonRequest(url, path, requestMethod, requestBody, queryParams, requestHeaders, hideSpinner);
  }

  async makeMultiPartRequest(
    baseURL: string, path: string,
    method: HttpRequestMethods,
    requestBody?: FormData,
    queryParams?: Object,
    requestHeaders?: HttpHeaders,
    hideSpinner?: boolean
  ) {
    const requestURL = environment.apiServerURL + baseURL + path;

    // Set Request Headers
    let headers: HttpHeaders = requestHeaders || new HttpHeaders();
    // headers = headers.set('Content-Type', 'multipart/form-data');

    // Set Query Params
    let params: HttpParams = new HttpParams();
    if (queryParams) {
      for (const key in queryParams) {
        if (key && queryParams.hasOwnProperty(key)) {
          this.logger.debug(`${key} ${queryParams[key]}`);
          params = params.set(key, queryParams[key]);
        }
      }
    }

    // Set Request Options
    const requestOptions: IRequestOptions = {
      body: requestBody,
      headers,
      observe: 'response',
      params
    };

    if (!hideSpinner) {
      this.spinnerService.showSpinner();
    }

    try {
      const response: any = await this.http.request(method, requestURL, requestOptions).toPromise().then(res => res);
      this.logger.debug(`Response: `, response);
      const body = response.body;

      if (!hideSpinner) {
        this.spinnerService.hideSpinner();
      }

      if (body.isSuccess) {
        return body.data;
      } else {
        return Promise.reject(new AppError(body.error.code, body.error.description)); // add error message and code
      }
    } catch (err) {
      if (!hideSpinner) {
        this.spinnerService.hideSpinner();
      }

      const errorResponse: AppError = this.handleHttpError(err);
      return Promise.reject(errorResponse);
    }
  }

  async makeSecureMultiPartRequest(
    url: string,
    path: string,
    requestMethod: HttpRequestMethods,
    requestBody?: FormData,
    queryParams?: Object,
    requestHeaders?: HttpHeaders,
    hideSpinner?: boolean
  ) {
    requestHeaders = requestHeaders || new HttpHeaders();
    requestHeaders.append('Authorization', `Bearer ${this.sessionService.getAccessToken()}`);
    return this.makeMultiPartRequest(url, path, requestMethod, requestBody, queryParams, requestHeaders, hideSpinner);
  }

  handleHttpError(err): AppError {
    switch (err.status) {
      case 400:
        return HttpError.BAD_REQUEST;
      case 401:
        return HttpError.UNAUTHORIZED;
      case 403:
        return HttpError.FORBIDDEN;
      case 404:
        return HttpError.NOT_FOUND;
      case 408:
        return HttpError.REQUEST_TIMEOUT;
      case 500:
        return HttpError.INTERNAL_SERVER_ERROR;
      case 502:
        return HttpError.BAD_GATEWAY;
      case 503:
        return HttpError.SERVICE_UNAVAILABLE;
      case 504:
        return HttpError.GATEWAY_TIMEOUT;
      default:
        return HttpError.BACK_END_ERROR;
    }
  }
}
