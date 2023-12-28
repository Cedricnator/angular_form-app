import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ValidatorsService } from '../../../shared/service/validators.service';

const rtx5090 = {
  name: 'RTX5090',
  price: 2500,
  inStorage: 2
}

@Component({
  templateUrl: './basic-page.component.html',
  styles: [
  ]
})
export class BasicPageComponent implements OnInit{
  private fb = inject(FormBuilder);
  private validatorsService = inject(ValidatorsService)

  ngOnInit(): void {
    this.myForm.reset( rtx5090 )
  }

  public myForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required, Validators.minLength(3)]],
    price: [0, [ Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  })

  onSave(): void{
    if( this.myForm.invalid ) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);

    this.myForm.reset({price: 0, inStorage: 0});
  }

  isValidField( field: string ): boolean | null{
    return this.validatorsService.isValidField(this.myForm, field);
  }

  getFieldError( field: string ): string | null{
    return this.validatorsService.getFieldError(this.myForm, field);
  }

}
