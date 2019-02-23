import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationRoutingModule } from './organization-routing.module';
import { TemplateComponent } from './components/template/template.component';
import { OrganizationDashboardPage } from './pages/organization-dashboard/organization-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    OrganizationRoutingModule,
  ],
  declarations: [
    OrganizationDashboardPage,
    TemplateComponent
  ],
  exports: [
    OrganizationDashboardPage,
    TemplateComponent
  ]
})
export class OrganizationModule { }
