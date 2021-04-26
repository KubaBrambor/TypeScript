import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, Form, FormArray } from '@angular/forms';
import { User } from '../../model/user';
import { Pet } from '../../model/pet'
@Component({
  selector: 'app-register-rx',
  templateUrl: './register-rx.component.html',
  styleUrls: ['./register-rx.component.css']
})
export class RegisterRXComponent {
  public registerForm: FormGroup;
  private user: User;
  constructor(private fb: FormBuilder) {
   }

  ngOnInit() {
    this.createForm();
    this.user = new User('John', 'Barbecue', 'j.barbecue@gmail.com', 35, 'male', 
                        {street: 'Route 66', postalCode: '40-444', city: 'Los Angeles'})
  }

   createForm() {
     this.registerForm = this.fb.group({
        name: [null, [Validators.required, Validators.minLength(2)]],
        surname: [null, [Validators.required, Validators.minLength(2)]],
        email: [null, [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
        ]],
        age: [null, [
          Validators.required, 
          Validators.min(1),
          Validators.pattern("^[0-9]*$")
        ]],
        gender: ['male'],
        street: [null, [
          Validators.required,
          Validators.minLength(3)
        ]],
        postalCode: [null, [
          Validators.required,
          Validators.pattern("^\\d{2}[- ]{0,1}\\d{3}$")
        ]],
        city: [null, [
          Validators.required,
          Validators.minLength(2)
        ]],
        pet: this.fb.array([])
      });
   };
  get name() { return this.registerForm.get('name') };
  get surname() { return this.registerForm.get('surname') };
  get postalCode() { return this.registerForm.get('postalCode') };
  get email() { return this.registerForm.get('email') };
  get age() { return this.registerForm.get('age') };
  get pet(): FormArray { return this.registerForm.get('pet') as FormArray };

  addPet() {
    this.pet.push(this.fb.group({
      name: ['', Validators.required],
      species: ['', Validators.required],
      age: [0, Validators.required]
    }))
  }

  removePet(index: number){
    this.pet.removeAt(index);
  }

  flatObj(object_to_flat){
    const flat_object = {};
    function getNestedObj(obj){
        Object.keys(obj).forEach(key => {
            if(typeof obj[key] !== 'object'){
                flat_object[key] = obj[key]
            } else {
                let nested_obj = obj[key];
                getNestedObj(nested_obj);
            };
        });
    };
    getNestedObj(object_to_flat);
    return flat_object;
  };

  loadUserFromServer() {
    console.log(this.user);
    let userFormModel = Object.assign({}, this.flatObj(this.user));
    this.registerForm.setValue(userFormModel);
  }

  patchUserFormServer() {
    console.log(this.user);
    let userFormModel = Object.assign({}, this.user);
    this.registerForm.patchValue(userFormModel);
  }

  onSubmit() {
    let formValue = this.registerForm.value
    console.log('Name COntrol Value', formValue)
    let user = new User(formValue.name, formValue.surname, formValue.email, formValue.age, formValue.gender, 
      {'street':formValue.street,
      'postalCode': formValue.postalCode,
      'city': formValue.city})
    let pets = [];
    for(let x of formValue.pet){
      let pet = new Pet(x.name, x.species, x.age)
      pets.push(pet);
    }
    user.addPet = pets;
    console.log(user)
    
  }

}
