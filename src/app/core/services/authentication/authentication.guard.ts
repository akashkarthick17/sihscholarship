import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { Logger } from '../logger/logger.service';
import { SessionService } from '../session/session.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(private auth: AuthenticationService, private route: Router, private logger: Logger, private session: SessionService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.auth.isLoggedIn()) {
            return true;
        } else {
            this.logger.debug(`Access to Route: ${state.url} prevented. Re-routing to login page.`);
            this.session.intendedRoute = state.url;
            this.route.navigate(['/login']);
            return false;
        }
    }
}
