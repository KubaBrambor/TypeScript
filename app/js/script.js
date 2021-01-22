console.log("connected!")

let albums;
let photos;
const container = document.getElementById('mainContainer');
const albumsURL = "https://jsonplaceholder.typicode.com/albums";
const photosURL = "https://jsonplaceholder.typicode.com/photos";

// async function getData(url){
//     const response = await fetch(url);
//     //checking response from server. Printing error if it's diffrent then 200.
//     //it prevent from errors when request do not fails from resolve but has different status.
//     if(!response.ok){
//         console.error(`HTTP error! status: ${response.status}`);
//     } else {
//         const data = await response.json();
//         return data;
//     }
// }



(async function getData(albumUrl, photoUrl){
    const [albumsResponse, photosResponse] = await Promise.all([
        fetch(albumUrl),
        fetch(photoUrl)
    ]);
    //checking response from server. Printing error if it's diffrent then 200.
    //it prevent from errors when request do not fails from resolve but has different status.
    if(!albumsResponse.ok || !photosResponse.ok){
        console.error(`HTTP error! status: Albums ${albumsResponse.status} and Photos ${photosResponse.status}`);
    } else {
        const albums = await albumsResponse.json();
        const photos = await photosResponse.json();
        return {
            albums,
            photos
        }
    }
})(albumsURL, photosURL)
.then(({albums, photos})=>{
    console.log(albums)
    createAlbumCards(albums, photos);
})

function createAlbumCards(albums, photos){
    for(album of albums){
        const photoAlbum = photos.filter(photo=>photo.albumId === album.id)
        const cardRow = document.createElement('div');
        cardRow.className = "row albumCard";
        const cardCol = document.createElement('div');
        cardCol.className = "col s10 m7";
        const card = document.createElement('div');
        card.className = "card";
        const cardImage = document.createElement('div');
        cardImage.className = "card-image";
        const cardImg = document.createElement('img');
        cardImg.src = photoAlbum[0].thumbnailUrl;
        cardImage.appendChild(cardImg);
        const cardContent = document.createElement('div');
        cardContent.className = 'card-content'
        const cardTitle = document.createElement('p');
        cardTitle.innerText = album.title;
        cardTitle.className = "cardTitle";
        cardContent.appendChild(cardTitle);
        const cardButtonDiv = document.createElement('div');
        cardButtonDiv.className = "card-action";
        const cardButton = document.createElement('button');
        cardButton.className = "waves-effect waves-light btn blue cardButton";
        cardButton.innerText = "OPEN"

        cardButton.addEventListener('click', createPhotoCards)

        cardButtonDiv.appendChild(cardButton);
        card.appendChild(cardImage);
        card.appendChild(cardContent);
        card.appendChild(cardButtonDiv);
        cardCol.appendChild(card);
        cardRow.appendChild(card);
        container.appendChild(cardRow);
    }
}

//open photos from album
function createPhotoCards(albums, photos){
    const albumCards = document.getElementsByClassName('albumCard');
    while(albumCards.length){
        albumCards[0].remove();
    };


}

// (async function check(){
//     await getData("https://jsonplaceholder.typicode.com/albums")
//     .then(response =>    albums = response)
//     .catch(error => console.log(`Request to get albums faild to resolve. Message: ${error.message}`))
//     console.log(albums);
//     await getData("https://jsonplaceholder.typicode.com/photos")
//     .then(response => photos = response)
//     .catch(error => console.log(`Request to get photos faild to resolve. Message: ${error.message}`))
//     console.log(photos)
// })()

