import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';
import { EmailValidatorService } from 'src/app/shared/validators/email.validator.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {
  private fb = inject(FormBuilder)
  private validatorService = inject(ValidatorsService);
  private emailValidator = inject(EmailValidatorService);

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.validatorService.firstNameAndLastnamePattern)]],
    //email: [[''] , [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [new EmailValidator()]],
    email: ['' , [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [ this.emailValidator ]],
    username: ['', [Validators.required, this.validatorService.cantbeStrider ]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],
  }, {
    validators: [
      this.validatorService.isFieldOneEqualFieldTwo('password', 'password2')
    ]
    
  })

  isValidField( field: string){
    this.validatorService.isValidField(this.myForm, field);
  }

  onSubmit(){
    this.myForm.markAllAsTouched();
    console.log(this.myForm.value);
  }
}
