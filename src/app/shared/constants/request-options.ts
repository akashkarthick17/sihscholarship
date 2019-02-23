import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpObserve } from '@angular/common/http/src/client';

export interface IRequestOptions {
    body?: any;
    headers?: HttpHeaders;
    reportProgress?: boolean;
    observe?: HttpObserve;
    params?: HttpParams;
    responseType?: 'json';
    withCredentials?: boolean;
};
