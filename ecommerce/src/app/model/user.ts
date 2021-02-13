export class User {
    public name;
    public surname;
    public age;
    public sex;
    public adress;
    constructor(name:string, surname:string, age:number, sex:string, adress:object){
        this.name = name;
        this.surname = surname;
        this.age = age;
        this.sex = sex;
        this.adress = adress;
    }

    presentUser(){
        console.log(`User ${this.name} ${this.surname}`)
    }
}
