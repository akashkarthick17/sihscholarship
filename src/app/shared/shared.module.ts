import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerModule } from './components/spinner/spinner.module';
import { ZepPaginationComponent } from './components/zep-pagination/zep-pagination.component';
import { TranslateModule } from '@ngx-translate/core';

import { FilterFieldComponent } from './components/filter-field/filter-field.component';
import { PageNotFoundPageComponent } from './components/page-not-found/page-not-found.page';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    ZepPaginationComponent,
    FilterFieldComponent,
    PageNotFoundPageComponent,
    TextEditorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule.forChild(),
    TranslateModule,
    QuillModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    TranslateModule,
    QuillModule,

    ZepPaginationComponent,
    FilterFieldComponent,
    PageNotFoundPageComponent,
    TextEditorComponent
  ]
})
export class SharedModule { }
