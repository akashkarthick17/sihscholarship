import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { BaseService } from 'app/base/base.service';
import { Regex } from 'app/shared/constants/Regex';
import { CoreService } from './../../../core/services/core/core.service';
import { AppValidators } from './../../../shared/constants/AppValidators';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'zep-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private baseService: BaseService,
    private coreService: CoreService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.pattern(Regex.email)]],
      'username': ['', [Validators.required, Validators.pattern(Regex.username)]],
      'password': ['', [Validators.required, Validators.pattern(Regex.password)]],
      'confirmPassword': ['', [Validators.required]],
      'organizationName': ['', [Validators.required, Validators.pattern(Regex.organizationName)]],
      'firstName': ['', [Validators.required, Validators.pattern(Regex.firstName)]],
      'lastName': ['', [Validators.required, Validators.pattern(Regex.lastName)]],
      'phoneNumber': ['', [Validators.required, Validators.pattern(Regex.phoneNumber)]]
    }, {
        validators: AppValidators.confirmPasswordValidator
    });
  }

  async register(registrationForm: NgForm) {
    if (this.registerForm.valid) {
      try {
        const registrationData = {
          email: this.registerForm.get('email').value,
          userName: this.registerForm.get('username').value,
          organizationName: this.registerForm.get('organizationName').value,
          password: this.registerForm.get('password').value,
          firstName: this.registerForm.get('firstName').value,
          lastName: this.registerForm.get('lastName').value,
          phoneNumber: this.registerForm.get('phoneNumber').value
        };
        await this.baseService.register(registrationData);
        this.coreService.displaySuccess(this.translateService.instant('BASE.REGISTER.SUCCESSFUL_REGISTRATION'));
        registrationForm.reset();
      } catch (err) {
        this.coreService.displayError(err);
      }
    }
  }

}
