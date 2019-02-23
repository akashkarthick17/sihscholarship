import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerService } from './spinner.service';
import { SpinnerComponent } from './spinner.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SpinnerComponent
  ],
  providers: [
    SpinnerService
  ],
  exports: [
    SpinnerComponent
  ]
})
export class SpinnerModule {
  static forRoot() {
    return {
      ngModule: SpinnerModule,
      providers: [
        SpinnerService
      ]
    };
  }
  static forChild() {
    return {
      ngModule: SpinnerModule
    };
  }
 }
