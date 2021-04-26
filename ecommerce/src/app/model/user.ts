import { Pet } from './pet'

export class User {
    public pet: Pet[]
    constructor(public name:string, public surname:string, public email:string, public age:number, public gender:string, public adress:object){
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.age = age;
        this.gender = gender;
        this.adress = adress;
        this.pet = [];
    }

    set addPet(value){
        this.pet.push(value);
    }
    
    presentUser(){
        console.log(`User ${this.name} ${this.surname}`)
    }
}
