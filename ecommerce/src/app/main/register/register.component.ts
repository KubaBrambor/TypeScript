import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public selected:string;
  public nameEmptyInput:string;
  constructor() {
    this.selected = "male";
   }

  ngOnInit() {
  }

  createUser(registerForm){
    console.log(registerForm)
    if(registerForm.valid){
      const name = registerForm.form.controls.registerUser.controls.userName.value;
      const surname = registerForm.form.controls.registerUser.controls.userSurname.value;
      const email = registerForm.form.controls.registerUser.controls.userEmail.value;
      const age = registerForm.form.controls.registerUser.controls.userAge.value;
      const gender = registerForm.form.controls.registerUser.controls.userSex.value;
      const street = registerForm.form.controls.registerUser.controls.userStreet.value;
      const postal_code = registerForm.form.controls.registerUser.controls.userPostalCode.value;
      const city = registerForm.form.controls.registerUser.controls.userCity.value;
      const adress = {
        street:street,
        postal_code:postal_code,
        city:city
      }
      registerForm.reset()
      console.log(new User(name, surname, email, age, gender, adress));
    } else {
      // if(registerForm.form.controls.registerUser.controls.userName.value === ""){
      //   this.nameEmptyInput = ""
      // }
    }
  }

}
