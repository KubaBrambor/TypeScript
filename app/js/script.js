console.log("connected!")
console.log(stringSimilarity.findBestMatch('Kuba', ['Jakub', 'Kubek', 'Kubson']).bestMatch)

const container = document.getElementById('mainContainer');
const albumsURL = "https://jsonplaceholder.typicode.com/albums";
const photosURL = "https://jsonplaceholder.typicode.com/photos";

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



// (async function getData(albumUrl, photoUrl){
//     const [albumsResponse, photosResponse] = await Promise.all([
//         fetch(albumUrl),
//         fetch(photoUrl)
//     ]);
//     //checking response from server. Printing error if it's diffrent then 200.
//     //it prevent from errors when request do not fails from resolve but has different status.
//     if(!albumsResponse.ok || !photosResponse.ok){
//         console.error(`HTTP error! status: Albums ${albumsResponse.status} and Photos ${photosResponse.status}`);
//     } else {
//         const albums = await albumsResponse.json();
//         const photos = await photosResponse.json();
//         return {
//             albums,
//             photos
//         }
//     }
// })(albumsURL, photosURL)
getData(albumsURL)
.then((albums)=>{
    console.log(albums)
    const upButton = document.getElementById('upButton');
    upButton.addEventListener('click', () => {
        window.scrollTo(0,0);
    });
    const searchButton = document.getElementById('searchButton');
    searchButton.addEventListener('click', searchCards.bind(Object.create(null), albums))
    createAlbumCards(albums);
})
.catch(error => console.log(`Error message: ${error}`));

function createAlbumCards(albums){
    const cardElements = document.getElementsByClassName('card_row');
    //styling view part
    while(cardElements.length){ //cleaning container from cards
        cardElements[0].remove();
    };
    document.getElementById('mainTitle').innerText = "ALBUMS";  //changin main title to ALBUMS
    if(document.getElementById('subTitlePhotos')){  //checking if there is subtitle, if yes - delete it
        document.getElementById('subTitlePhotos').remove();
    };
    for(album of albums){
        // const photoAlbum = photos.filter(photo=>photo.albumId === album.id)
        const cardRow = document.createElement('div');
        cardRow.className = "row card_row albumCard";
        const cardCol = document.createElement('div');
        cardCol.className = "col s10 m7";
        const card = document.createElement('div');
        card.className = "card";
        // const cardImage = document.createElement('div');
        // cardImage.className = "card-image";
        // const cardImg = document.createElement('img');
        // cardImg.src = photoAlbum[0].thumbnailUrl;
        // cardImage.appendChild(cardImg);
        const colorsArray = ['contentYellow', 'contentBlue', 'contentRed', 'contentGrey', 'contentLemon', 'contentIris', 'contentTeal', 'contentViolet']
        const color = colorsArray[Math.floor(Math.random()*colorsArray.length)];
        const cardContent = document.createElement('div');
        cardContent.className = `card-content ${color}`
        const cardTitle = document.createElement('p');
        cardTitle.innerText = album.title;
        cardTitle.className = "cardTitle";
        cardContent.appendChild(cardTitle);
        const cardButtonDiv = document.createElement('div');
        cardButtonDiv.className = "card-action";
        const cardButton = document.createElement('button');
        cardButton.className = "waves-effect waves-light btn blue cardButton";
        cardButton.innerText = "OPEN";
        cardButton.addEventListener('click', printPhotoCards.bind(Object.create(null), albums, album.id, album.title));
        cardButtonDiv.appendChild(cardButton);
        // card.appendChild(cardImage);
        card.appendChild(cardContent);
        card.appendChild(cardButtonDiv);
        cardCol.appendChild(card);
        cardRow.appendChild(card);
        container.appendChild(cardRow);
    }
}

//open photos from album
function printPhotoCards(albums, albumId, albumTitle){
    getData(`${photosURL}?albumId=${albumId}`)
    .then((photos) => {
        createPhotoCards(photos, albums, albumTitle);
    });
};

//creating cards
function createPhotoCards(photos, albums, albumTitle){
    console.log(photos);
    const albumCards = document.getElementsByClassName('card_row');
    if(!document.getElementById('backButton')){ //adding back button if not existed
        createBackButton(albums);  
    };
    const subTitle = document.createElement('h5');  //create current album title
    subTitle.id = 'subTitlePhotos'
    subTitle.innerText = `Album title: "${albumTitle}"`
    container.appendChild(subTitle);
    document.getElementById('mainTitle').innerText ="PHOTOS"    //change main title
    while(albumCards.length){   //cleaning container from album cards
        albumCards[0].remove();
    };
    window.scrollTo(0, 0);  //scroll view up
    for(photo of photos){   //create cards
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

function searchCards(albums){   //get albums by default, as parameter, since we download or albums at the beginning
    const checkedAlbumsOption = document.getElementById('searchAlbumsRadio').checked;
    const checkedPhotosOption = document.getElementById('searchPhotosRadio').checked;
    let searchInputValue = document.getElementById('searchInputValidate');
    let result = []; //array for matching albums
    if(checkedAlbumsOption){
        if(document.getElementById('subTitlePhotos')){
            document.getElementById('subTitlePhotos').remove();
        };
        if(!document.getElementById('backButton')){ //adding back button if not existed
            createBackButton(albums);
        };
        const matchedAlbums = searchCardsLogic(albums, 0.35);
        createAlbumCards(matchedAlbums);
        // const albumsTitle = albums.map(album => album.title);
        // console.log(`input: ${searchInputValue.value}, albumsTitle: ${albumsTitle}`);
        // //similarity logic part
        // const albumsSimilarity = stringSimilarity.findBestMatch(searchInputValue.value, albumsTitle)
        //                         .ratings
        //                         .filter(rating=>rating.rating>0.35); //filtering objects from best match array with the closest match
        // for(albumSim of albumsSimilarity){  //searching for a best matched objects by their title
        //     for(album of albums){
        //         if(album.title===albumSim.target){
        //             result.push(album);    //populating result array
        //         };
        //     };
        // };
        // if(!document.getElementById('backButton')){ //adding back button if not existed
        //     createBackButton(albums);
        // };
        // createAlbumCards(result);  //creating albums cards by results
        // result = [];    //clear result array
        // searchInputValue.value = "";  //clear search input
    } else if(checkedPhotosOption){
        console.log('PHOTOS CHECKED')
        getData(photosURL)
        .then((photos) => {
            if(document.getElementById('subTitlePhotos')){
                document.getElementById('subTitlePhotos').remove();
            };
            if(!document.getElementById('backButton')){ //adding back button if not existed
                createBackButton(albums);
            };
            const matchedPhotos = searchCardsLogic(photos, 0.7)
            console.log(matchedPhotos);
            createPhotoCards(matchedPhotos, albums, "Searched photos")
        })
        
    }
}

function searchCardsLogic(contentArray, ratingValue){
    let result = []; //array for matching albums
    let input = document.getElementById('searchInputValidate');
    const titlesArr = contentArray.map(content => content.title);
    console.log(`input: ${input.value}, albumsTitle: ${titlesArr}`);
    //similarity logic part
    const matchesArray = stringSimilarity.findBestMatch(input.value, titlesArr)
                            .ratings
                            .filter(rating=>rating.rating>ratingValue); //filtering objects from best match array with the closest match
    for(match of matchesArray){  //searching for a best matched objects by their title
        for(content of contentArray){
            if(content.title===match.target){
                result.push(content);    //populating result array
            };
        };
    };
    input.value = "";  //clear search input
    return result;
};

function createBackButton(albums){
    const backButton = document.createElement('button');
    backButton.className = "btn-floating btn-large waves-effect waves-light"
    backButton.id = "backButton";
    backButton.addEventListener('click', () => {
        const photoElements = document.getElementsByClassName('card_row');
        document.getElementById('mainTitle').innerText = "ALBUMS";
        if(document.getElementById('subTitlePhotos')){
            document.getElementById('subTitlePhotos').remove();
        };
        backButton.remove();

        while(photoElements.length){
            photoElements[0].remove();
        };
        window.scrollTo(0, 0);
        createAlbumCards(albums);   
    });
    const backButtonIcon = document.createElement('i');
    backButtonIcon.className = "material-icons";
    backButtonIcon.id = "backButtonIcon";
    backButtonIcon.innerText = "arrow_back";
    backButton.appendChild(backButtonIcon);
    container.appendChild(backButton);
};


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

