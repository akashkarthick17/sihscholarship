import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './core/services/authentication/authentication.guard';
import { PageNotFoundPageComponent } from './shared/components/page-not-found/page-not-found.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: './base/base.module#BaseModule'
  },
  {
    path: 'organization',
    loadChildren: './organization/organization.module#OrganizationModule',
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'students',
    loadChildren: './students/students.module#StudentsModule',
    canActivate: [AuthenticationGuard]
  },
  {
    path: '**',
    component: PageNotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
