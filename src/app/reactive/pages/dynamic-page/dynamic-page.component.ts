import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/service/validators.service';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {
  private fb = inject(FormBuilder)
  private validatorService = inject(ValidatorsService);

  public myForm: FormGroup = this.fb.group({
    name : ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required]
    ])
  })

  public newFavorite: FormControl = new FormControl('', Validators.required)

  isValidField( field: string ): boolean | null{
    return this.validatorService.isValidField(this.myForm, field);
  }

  isValidFieldInArray( formArray: FormArray, index: number){
    return formArray.controls[index].errors
    && formArray.controls[index].touched;
  }

  getFieldError( field: string ): string | null{
    return this.validatorService.getFieldError(this.myForm, field);
  }

  onAddToFavorites():void {
    if ( this.newFavorite.invalid ) return;
    const newGame = this.newFavorite.value;
    //this.favoriteGames.push( new FormControl( newGame, Validators.required))
    this.favoriteGames.push(
      this.fb.control( newGame, Validators.required)
    );

    this.newFavorite.reset();
  }

  //* Remueve la posicion del array, donde la posicion será un favoriteGame
  onDeleteFavorite ( index: number ):void {
    this.favoriteGames.removeAt(index);
  }


  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray;
  }

  onSubmit(): void {
    if (this.myForm.invalid){
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();

  }
}
