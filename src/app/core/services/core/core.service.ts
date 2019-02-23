import { AppError } from './../../../shared/models/app-error';
import { Injectable } from '@angular/core';

@Injectable()
export class CoreService {

  constructor() { }

  displaySuccess(message) {
    alert(message);
  }

  displayError(err) {
    alert(JSON.stringify(err));
  }
}
