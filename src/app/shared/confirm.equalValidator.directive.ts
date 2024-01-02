import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';


@Directive({
    selector: '[appConfirmEqualValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: ConfirmEqualValidatorDirective,
        multi: true
    }]
})
export class ConfirmEqualValidatorDirective implements Validator {

    @Input()
    appConfirmEqualValidator!: string;

    validate(control: AbstractControl): { [key: string]: any } | null {
        const valuetoCompare = control.parent?.get(this.appConfirmEqualValidator); //here gets the password control
        if (valuetoCompare && valuetoCompare !== control.value) {
            return { 'notEqual': true };
        }
        return null;
    }
}