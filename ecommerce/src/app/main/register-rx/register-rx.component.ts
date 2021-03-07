import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-rx',
  templateUrl: './register-rx.component.html',
  styleUrls: ['./register-rx.component.css']
})
export class RegisterRXComponent {
  public registerForm: FormGroup = new FormGroup({
    nameControl: new FormControl(null, Validators.required),
    surnameControl: new FormControl(null, Validators.required),
    emailControl: new FormControl(null, [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    ageControl: new FormControl(null, Validators.required),
    genderControl: new FormControl('male'),
    streetControl: new FormControl(null, [
      Validators.required,
      Validators.minLength(3)
    ]),
    postalCodeControl: new FormControl(null, [
      Validators.required,
      Validators.pattern("^\\d{2}[- ]{0,1}\\d{3}$")
    ]),
    cityControl: new FormControl(null, [
      Validators.required,
      Validators.minLength(2)
    ])
  })
  constructor() { }

  onSubmit() {
    console.log('Name COntrol Value', this.registerForm.value)
  }
}
