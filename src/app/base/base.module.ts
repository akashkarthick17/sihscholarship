import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseRoutingModule } from './base-routing.module';
import { LoginPageComponent } from './pages/login/login.page';
import { RegisterPageComponent } from './pages/register/register.page';
import { BaseLandingPage } from './pages/landing/base-landing.page';
import { SharedModule } from './../shared/shared.module';
import { BaseService } from './base.service';

@NgModule({
  imports: [
    CommonModule,
    BaseRoutingModule,
    SharedModule
  ],
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
    BaseLandingPage
  ],
  providers: [
    BaseService
  ]
})
export class BaseModule { }
