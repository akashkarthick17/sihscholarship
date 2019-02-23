import { Injectable } from '@angular/core';
import { Logger } from '../logger/logger.service';
import { User } from '../../../shared/models/user';


@Injectable()
export class SessionService {
  session: Map<string, any>;
  private _url: string;

  constructor(private logger: Logger) {
    this.initializeSession();
  }

  set intendedRoute(url: string) {
    this._url = url;
  }

  get intendedRoute() {
    return this._url;
  }

  initializeSession() {
    this.session = new Map();
  }

  clearSession() {
    this.session.clear();
  }

  setUser(user: User) {
    this.session.set('user', user);
  }

  getUser() {
    return this.session.get('user');
  }

  setSessionAttribute(key, value) {
    this.session.set(key, value);
  }

  getSessionAttribute(key: string) {
    return this.session.get(key);
  }

  setAccessToken(token: string) {
    this.session.set('AccessToken', token);
  }

  getAccessToken() {
    return this.session.get('AccessToken');
  }

  setIdToken(token: string) {
    this.session.set('IdToken', token);
  }

  getIdToken() {
    return this.session.get('IdToken');
  }
}
