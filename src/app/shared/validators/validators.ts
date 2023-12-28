import { FormControl, ValidationErrors } from "@angular/forms";

// Expresiones regulares
export const firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";



export const cantbeStrider = (control : FormControl ): ValidationErrors | null => {
  //* Verificamos que efectivamente es un string para poder utilizar trim()
  let value: string  = "";
  if (typeof control.value === 'string') {
    value = control.value.trim().toLowerCase();
  }

  if ( value === 'strider'){
    return {
      noStrider: true,
    }
  }

  return null;
}
