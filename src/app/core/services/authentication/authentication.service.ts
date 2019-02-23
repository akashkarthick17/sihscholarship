import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ILoginResponse } from 'app/shared/models/login-response';
import { User } from 'app/shared/models/user';
import { environment } from 'environments/environment';
import { HttpService } from '../http/http.service';
import { Logger } from '../logger/logger.service';
import { SessionService } from '../session/session.service';
import { HttpRequestMethods } from './../../../shared/constants/http-request-methods';

@Injectable()
export class AuthenticationService {

  constructor(
    private http: HttpService,
    private logger: Logger,
    private sessionService: SessionService,
    private route: Router) {
  }

  async login(email: string, password: string) {
    const requestData = {
      email,
      password
    };

    try {
      const loginResponse: ILoginResponse = await this.http.makeJsonRequest(environment.loginServiceURL, 'login/tokens/authenticate',
        HttpRequestMethods.POST, requestData);
      this.logger.debug(loginResponse);
      this.sessionService.setUser(new User(loginResponse.user));
      this.sessionService.setAccessToken(loginResponse.accessToken);
      this.sessionService.setIdToken(loginResponse.idToken);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  isLoggedIn() {
    if (this.sessionService.getAccessToken()) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.sessionService.clearSession();
    this.route.navigate(['/']);
  }
}
