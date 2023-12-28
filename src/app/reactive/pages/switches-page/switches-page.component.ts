import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent implements OnInit{
  private fb = inject(FormBuilder);
  private validatorService = inject(ValidatorsService);

  public person = {
    gender : 'F',
    wantNotifications : false,
  }

  //* Establece por defecto las propiedades de person cuando se crea el componente.
  ngOnInit(): void {
    this.myForm.reset( this.person )
  }

  //* Formulario reactivo vinculado al html
  public myForm = this.fb.group({
    gender: [ 'M', Validators.required ],
    wantNotifications: [ true, Validators.required],
    termsAndConditions: [ false, Validators.requiredTrue ]
  })

  //* Marca todos los campos como incorrectos si son invalidos,
  //* obtiene por consola el valor del formulario y persona
  onSubmit(){
    if ( this.myForm.invalid ){
      this.myForm.markAllAsTouched();
      return;
    }

    const { termsAndConditions, ...newPerson } = this.myForm.value;

    this.person = newPerson as typeof this.person;
    console.log("Valores del formulario: ", this.myForm.value);
    console.log("Valores de persona: ", this.person)
  }

  //* Verifica si el campo es valido
  isValidField( field: string ): boolean | null{
    return this.validatorService.isValidField(this.myForm, field);
  }

  //* Obtiene el error del campo
  getFieldError( field: string ): string | null{
    return this.validatorService.getFieldError(this.myForm, field);
  }

}
