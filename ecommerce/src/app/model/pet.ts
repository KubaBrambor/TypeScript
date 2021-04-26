export class Pet {
    constructor(public name:string, public species:string, public age:number){
        this.name = name;
        this.species = species;
        this.age = age;
    }

    get petName(){
        return this.name;
    }

    set petName(value){
        this.name = value;
    }
}
