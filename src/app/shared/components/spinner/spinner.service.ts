import { Injectable } from '@angular/core';
import { Logger } from './../../../core/services/logger/logger.service';
import { Subject } from 'rxjs';

@Injectable()
export class SpinnerService {
  private count = 0;
  isSpinnerShown = false;
  spinnerStateChange: Subject<boolean> = new Subject<boolean>();

  constructor(private logger: Logger) { }

  async showSpinner() {
    this.count++;
    this.logger.debug('Spinner Count ' + this.count);
    if (!this.isSpinnerShown) {
      this.isSpinnerShown = true;
      this.spinnerStateChange.next(this.isSpinnerShown);
      this.logger.debug('Showing spinner...');
    }
  }

  hideSpinner() {
    this.count--;
    this.logger.debug('Spinner Count ' + this.count);
    if (this.count <= 0) {
      this.logger.debug('Closing spinner...');
      this.isSpinnerShown = false;
      this.spinnerStateChange.next(this.isSpinnerShown);
    }
  }
}
