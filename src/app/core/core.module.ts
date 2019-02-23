import { HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SpinnerModule } from 'app/shared/components/spinner/spinner.module';
import { SpinnerService } from 'app/shared/components/spinner/spinner.service';
import { AuthenticationGuard } from './services/authentication/authentication.guard';
import { AuthenticationService } from './services/authentication/authentication.service';
import { CoreService } from './services/core/core.service';
import { HttpService } from './services/http/http.service';
import { Logger } from './services/logger/logger.service';
import { SessionService } from './services/session/session.service';

@NgModule({
  imports: [
    HttpClientModule,
    SpinnerModule.forRoot()
  ],
  declarations: [],
  exports: [
    SpinnerModule
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parent: CoreModule) {
    if (parent) {
      throw new Error('Core module should be instantiated in the root only');
    }
  }


  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [
        Logger,
        HttpService,
        SessionService,
        AuthenticationService,
        CoreService,
        AuthenticationGuard
      ]
    };
  }
}
