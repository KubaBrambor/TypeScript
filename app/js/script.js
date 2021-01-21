console.log("connected!")

let albums;
let photos;

async function getData(url){
    const response = await fetch(url);
    //checking response from server. Printing error if it's diffrent then 200.
    //it prevent from errors when request do not fails from resolve but has different status.
    if(!response.ok){
        console.error(`HTTP error! status: ${response.status}`);
    } else {
        const data = await response.json();
        return data;
    }
}

(async function check(){
    await getData("https://jsonplaceholder.typicode.com/albums")
    .then(response =>    albums = response)
    .catch(error => console.log(`Request to get albums faild to resolve. Message: ${error.message}`))
    console.log(albums);
    await getData("https://jsonplaceholder.typicode.com/photos")
    .then(response => photos = response)
    .catch(error => console.log(`Request to get photos faild to resolve. Message: ${error.message}`))
    console.log(photos)
})()

