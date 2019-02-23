import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganizationDashboardPage } from './pages/organization-dashboard/organization-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: OrganizationDashboardPage
    // children: [
    //   {
    //     path: 'user',
    //     loadChildren: './user/user.module#UserModule'
    //   },
    //   {
    //     path: 'questions',
    //     loadChildren: './questions/questions.module#QuestionsModule'
    //   }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule { }
