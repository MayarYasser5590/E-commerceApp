import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormField } from "../../molecules/form-field/form-field";
import { CustomInput } from "../../atoms/custom-input/custom-input";
import { LibButton } from "../../atoms/lib-button/lib-button";

@Component({
  selector: 'lib-register',
  imports: [FormField, CustomInput, ReactiveFormsModule, LibButton],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

   private _FormBuilder = inject(FormBuilder);

  registerForm:FormGroup = this._FormBuilder.group({
    firstName:[null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]],
    lastName:[null , [Validators.required , Validators.minLength(3) , Validators.maxLength(20)]],
    email:[null , [Validators.required , Validators.email]],
    gender:[null , [Validators.required , Validators.pattern(/^(male|female)$/)]],
    phone:[null , [Validators.required ,  Validators.pattern(/^01[0125][0-9]{8}$/)]],
    password:[null , [Validators.required ,  Validators.minLength(8) ,  Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/)]],
    rePassword:[null ],
  } , {validators:this.confirmPassword})



    confirmPassword(g:AbstractControl){
    if(g.get('password')?.value  === g.get('rePassword')?.value ){
      return null
    }else{
      return {mismatch:true}
    }
  }


      submitRegisterForm() {
    if (this.registerForm.valid) {
      console.log('Register Form', this.registerForm.value);
    }
}

}
