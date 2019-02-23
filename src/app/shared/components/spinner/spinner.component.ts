import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpinnerService } from './spinner.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'zep-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy {

  private isSpinnerShown = false;
  private spinnerStateChangeSubscription;

  constructor(private spinnerService: SpinnerService) {
    this.spinnerStateChangeSubscription = this.spinnerService.spinnerStateChange.subscribe((value) => {
      this.isSpinnerShown = value;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.spinnerStateChangeSubscription.unsubscribe();
  }
}
