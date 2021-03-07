import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, Form } from '@angular/forms';

@Component({
  selector: 'app-register-rx',
  templateUrl: './register-rx.component.html',
  styleUrls: ['./register-rx.component.css']
})
export class RegisterRXComponent {
  public registerForm: FormGroup; 
  public formBuilder: FormBuilder;
  constructor(private fb: FormBuilder) {
   }

  ngOnInit() {
    this.createForm();
  }

   createForm() {
     this.registerForm = this.fb.group({
        nameControl: [null, Validators.required],
        surnameControl: [null, Validators.required],
        emailControl: [null, [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]],
        ageControl: [null, Validators.required],
        genderControl: ['male'],
        streetControl: [null, [
          Validators.required,
          Validators.minLength(3)
        ]],
        postalCodeControl: [null, [
          Validators.required,
          Validators.pattern("^\\d{2}[- ]{0,1}\\d{3}$")
        ]],
        cityControl: [null, [
          Validators.required,
          Validators.minLength(2)
        ]]
      });
   };

  onSubmit() {
    console.log('Name COntrol Value', this.registerForm.value, this.registerForm)
  }
}
