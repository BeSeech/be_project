import {FormControl, ValidationErrors} from '@angular/forms';

export class CustomValidators {
  static between = (min: number, max: number) => {
    return (control: FormControl) => {
      const num = +control.value;
      if ( num < min || num > max ) {
        return {
          between: true
        };
      }
      return null;
    };
  }

}
