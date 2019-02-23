import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './pages/login/login.page';
import { RegisterPageComponent } from './pages/register/register.page';
import { BaseLandingPage } from './pages/landing/base-landing.page';

const routes: Routes = [
  {
    path: '',
    component: BaseLandingPage,
    children: [
      {
        path: 'login',
        component: LoginPageComponent,
      },
      {
        path: 'register',
        component: RegisterPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseRoutingModule { }
