import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ValueAccessorBase } from 'app/shared/common/ValueAccessorBase';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import Quill from 'quill';

import ImageResize from 'quill-image-resize-module';
Quill.register('modules/imageResize', ImageResize);

@Component({
  selector: 'zep-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextEditorComponent),
      multi: true
    }
  ]
})
export class TextEditorComponent extends ValueAccessorBase<string> implements OnInit {
  @Input()
  style: any;
  modules: any;

  constructor() {
    super();

    this.modules = {
      formula: true,
      imageResize: {},
      toolbar: [
        [
          'bold',
          'italic',
          'underline',
          'strike',
          'blockquote',
          'code-block',
          { 'align': [] },
          { 'list': 'ordered' }, { 'list': 'bullet' },
          { 'script': 'sub' }, { 'script': 'super' },
          { 'header': [1, 2, 3, 4, 5, 6, false] },
          { 'color': [] }, { 'background': [] },
          { 'font': [] },
          { 'direction': 'rtl' },
          'formula',
          'image',
          'clean'
        ]
      ]
    };
  }

  ngOnInit() {
  }
}
