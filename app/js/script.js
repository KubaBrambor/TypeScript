console.log("connected!")
console.log(stringSimilarity.findBestMatch('Kuba', ['Jakub', 'Kubek', 'Kubson']).bestMatch)

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
    console.log(photos)
    const upButton = document.getElementById('upButton');
    upButton.addEventListener('click', () => {
        window.scrollTo(0,0);
    });
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', searchCards.bind(Object.create(null), albums, photos))
    createAlbumCards(albums, photos);
})

function createAlbumCards(albums, photos){
    for(album of albums){
        const photoAlbum = photos.filter(photo=>photo.albumId === album.id)
        const cardRow = document.createElement('div');
        cardRow.className = "row card_row albumCard";
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

        cardButton.addEventListener('click', createPhotoCards.bind(Object.create(null), albums, photos, album.id))

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
function createPhotoCards(albums, photos, albumId){
    const albumCards = document.getElementsByClassName('card_row');
    const photosFiltered = photos.filter(photo=>photo.albumId===albumId)
    const backButton = document.createElement('button');
    
    backButton.className = "btn-floating btn-large waves-effect waves-light"
    backButton.id = "backButton";
    backButton.addEventListener('click', () => {
        const photoElements = document.getElementsByClassName('card_row');
        document.getElementById('mainTitle').innerText = "ALBUMS";
        document.getElementById('subTitlePhotos').remove();
        backButton.remove()

        while(photoElements.length){
            photoElements[0].remove();
        };
        window.scrollTo(0, 0);
        createAlbumCards(albums, photos);   
    })
    const backButtonIcon = document.createElement('i');
    backButtonIcon.className = "material-icons";
    backButtonIcon.id = "backButtonIcon";
    backButtonIcon.innerText = "arrow_back";
    const albumTitle = document.createElement('h5');
    albumTitle.id = 'subTitlePhotos'
    albumTitle.innerText = `Album title: "${albums[albumId-1].title}"`
    document.getElementById('mainTitle').innerText ="PHOTOS"
    console.log(photosFiltered)
    while(albumCards.length){
        albumCards[0].remove();
    };
    backButton.appendChild(backButtonIcon);
    container.appendChild(backButton);
    container.appendChild(albumTitle);
    window.scrollTo(0, 0);
    for(photo of photosFiltered){
        const cardRow = document.createElement('div');
        cardRow.className = "row card_row photoCard";
        const cardCol = document.createElement('div');
        cardCol.className = "col s10 m7";
        const card = document.createElement('div');
        card.className = "card";
        const cardImage = document.createElement('div');
        cardImage.className = "card-image";
        const cardImg = document.createElement('img');
        cardImg.src = photo.thumbnailUrl;
        cardImage.appendChild(cardImg);
        const cardContent = document.createElement('div');
        cardContent.className = 'card-content'
        const cardTitle = document.createElement('p');
        cardTitle.innerText = photo.title;
        cardTitle.className = "cardTitle";
        cardContent.appendChild(cardTitle);
        const cardButtonDiv = document.createElement('div');
        cardButtonDiv.className = "card-action";
        const cardButton = document.createElement('button');
        cardButton.className = "waves-effect waves-light btn blue photoButton";
        cardButton.innerText = "OPEN"
        cardButtonDiv.appendChild(cardButton);
        card.appendChild(cardImage);
        card.appendChild(cardContent);
        card.appendChild(cardButtonDiv);
        cardCol.appendChild(card);
        cardRow.appendChild(card);
        container.appendChild(cardRow);
    };
};

function searchCards(albums, photos){
    const cardElements = document.getElementsByClassName('card_row');
    const searchInputValue = document.getElementById('searchInputValidate').value;
    const albumsTitle = albums.map(album => album.title);
    const photosTitle = photos.map(photo => photo.title);
    console.log(`input: ${searchInputValue}, albumsTitle: ${albumsTitle}, photosTitle: ${photosTitle}`);
    stringSimilarity.findBestMatch(searchInputValue, albumsTitle);
    const albumsSimilarity = stringSimilarity.findBestMatch(searchInputValue, albumsTitle).ratings.filter(rating=>rating.rating>0.2);
    const albumsFound = [];
    while(cardElements.length){
        cardElements[0].remove();
    };
    console.dir(albumsSimilarity[0].target)
    for(albumSim of albumsSimilarity){
        console.log(`albumSim: ${albumSim.target}`)
        for(album of albums){
            if(album.title===albumSim.target){
                albumsFound.push(album);
            }
        }
    }
    console.log(albumsFound)
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

