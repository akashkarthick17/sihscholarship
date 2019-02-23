import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/core/services/authentication/authentication.service';
import { Logger } from 'app/core/services/logger/logger.service';
import { SessionService } from 'app/core/services/session/session.service';
import { Regex } from 'app/shared/constants/Regex';
import { CoreService } from 'app/core/services/core/core.service';

@Component({
  selector: 'zep-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private route: Router,
    private logger: Logger,
    private sessionService: SessionService,
    private coreService: CoreService,
    private formBuilder: FormBuilder
  ) {
    this.logger.debug('Intended URL: ', this.sessionService.intendedRoute);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.pattern(Regex.email)]],
      'password': ['', [Validators.required, Validators.pattern(Regex.password)]]
    });

    if (this.authService.isLoggedIn()) {
      this.navigateUserBasedOnSession();
    }
  }

  async login(loginForm: NgForm) {
    if (this.loginForm.valid) {
      try {
        const email = this.loginForm.get('email').value;
        const password = this.loginForm.get('password').value;

        await this.authService.login(email, password);
        loginForm.reset();
        this.navigateUserBasedOnSession();
      } catch (err) {
        this.coreService.displayError(err);
      }
    }
  }

  navigateUserBasedOnSession() {
    if (this.sessionService.intendedRoute) {
      this.logger.debug(`Routing to Intended Route: ${this.sessionService.intendedRoute}`);
    }
    this.route.navigate([this.sessionService.intendedRoute || '/organization']);
    this.sessionService.intendedRoute = null;
  }
}
