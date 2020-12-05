export class Product {
    private _favourite:boolean = false;
    public amount:number = 1;
    constructor(public name:string, public prize:number, public imageURL:string, public onSale:boolean, public quantity:number){}

    get favourite():boolean {
        return this._favourite;
    }

    set favourite(value:boolean) {
        this._favourite = value;
    }

}
