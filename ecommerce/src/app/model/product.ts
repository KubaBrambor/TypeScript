export class Product {
    private _favourite:boolean = false;
    public amount:number = this.quantity>0 ? 1 : 0;
    public quantityArray = [...Array(this.quantity+1).keys()]
    constructor(public name:string, public prize:number, public imageURL:string, public onSale:boolean, public quantity:number){}

    get favourite():boolean {
        return this._favourite;
    }

    set favourite(value:boolean) {
        this._favourite = value;
    }

    inStock(){
        return this.quantity > 0;
    }

}
