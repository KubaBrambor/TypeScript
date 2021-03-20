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
        nameControl: [null, [Validators.required, Validators.minLength(2)]],
        surnameControl: [null, [Validators.required, Validators.minLength(2)]],
        emailControl: [null, [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]],
        ageControl: [null, [
          Validators.required, 
          Validators.min(1),
          Validators.pattern("^[0-9]*$")
        ]],
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
  get name() { return this.registerForm.get('nameControl') };
  get surname() { return this.registerForm.get('surnameControl') };
  get postalCode() { return this.registerForm.get('postalCodeControl') };
  get email() { return this.registerForm.get('emailControl') };
  get age() { return this.registerForm.get('ageControl') };

  onSubmit() {
    console.log('Name COntrol Value', this.registerForm.value, this.registerForm)
  }
}
