export class Product {
    private _favourite:boolean = false;
    public amount:number = parseInt(this.quantity)>0 ? 1 : 0;
    public quantityArray = [...Array(parseInt(this.quantity)+1).keys()]
    constructor(public name:string, public prize:string, public imageURL:string, public onSale:boolean, public quantity:string){
        
    }
    
    get favourite():boolean {
        return this._favourite;
    }

    set favourite(value:boolean) {
        this._favourite = value;
    }

    // setFavourite(event){
    //     this.favourite= true;
    //     console.log('Added to favourite! ' + this.favourite)
    // }

    // removeFavourite(event){
    //     this.favourite = false;
    //     console.log('Removed from favourite! ' + this.favourite)
    // }

    inStock(){
        return parseInt(this.quantity) > 0;
    }

}
