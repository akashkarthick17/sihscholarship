import { FormGroup } from '@angular/forms';

export class AppValidators {
    public static confirmPasswordValidator(group: FormGroup) {
        const passwordControl = group.get('password');
        const confirmPasswordControl = group.get('confirmPassword');
console.log(passwordControl.value, confirmPasswordControl.value);
        const valuesMatch = passwordControl && confirmPasswordControl && (passwordControl.value === confirmPasswordControl.value);

        return valuesMatch ? null : { 'passwordsMatch': true };
    }
}