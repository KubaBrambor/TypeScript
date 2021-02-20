export class User {
    public name;
    public surname;
    public email;
    public age;
    public gender;
    public adress;
    constructor(name:string, surname:string, email:string, age:number, gender:string, adress:object){
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.age = age;
        this.gender = gender;
        this.adress = adress;
    }

    presentUser(){
        console.log(`User ${this.name} ${this.surname}`)
    }
}
