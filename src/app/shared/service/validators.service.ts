
import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors, FormGroup, AbstractControl } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class ValidatorsService {
  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  cantbeStrider = ( control : FormControl ): ValidationErrors | null => {
    //* verificar si es un string, para utilizar trim()
    const value = typeof control.value === 'string' ? control.value.trim().toLowerCase() : "";
    return value === 'strider' ? { noStrider: true } : null;
  }

  public isValidField( form: FormGroup, field: string ){
    return form.controls[field].errors && form.controls[field].touched;
  }

  getFieldError( form: FormGroup, field: string ): string | null{
    if ( !form.controls[field] ) return null;
    const errors = form.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch( key ){
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength } caracters.`;
      }
    }

    return null;
  }

  isFieldOneEqualFieldTwo( field1: string, field2: string ){
    return ( FormGroup: AbstractControl ): ValidationErrors | null  => {
      const fieldValue1 = FormGroup.get(field1)?.value;
      const fieldValue2 = FormGroup.get(field2)?.value;

      if (fieldValue1 !== fieldValue2){
        FormGroup.get(field2)?.setErrors({ notEqual: true});
        return { notEqual: true };
      }
      FormGroup.get(field2)?.setErrors(null);
      return null;

    }
  }

}
