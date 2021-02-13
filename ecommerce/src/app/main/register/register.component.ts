import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public selected:string;
  constructor() {
    this.selected = "male";
   }

  ngOnInit() {
  }

  createUser(registerForm){
    if(registerForm.valid){
      console.log(registerForm)
    }
  }

}
