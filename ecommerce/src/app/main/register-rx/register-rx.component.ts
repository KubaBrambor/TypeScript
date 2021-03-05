import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-register-rx',
  templateUrl: './register-rx.component.html',
  styleUrls: ['./register-rx.component.css']
})
export class RegisterRXComponent {
  public nameControl = new FormControl();
  constructor() { }

  onSubmit() {
    console.log('Name COntrol Value', this.nameControl.value)
  }
}
