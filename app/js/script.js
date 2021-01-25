const container = document.getElementById('mainContainer');
const albumsURL = "https://jsonplaceholder.typicode.com/albums";
const photosURL = "https://jsonplaceholder.typicode.com/photos";
const sessionStorage = window.sessionStorage;
//modal trigger
document.addEventListener('DOMContentLoaded', function() {
    var options = {};
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, options);
  });

/* ---------------------------- starting app -----------------------------*/
getData(albumsURL)
.then((albums)=>{
    const upButton = document.getElementById('upButton');
    upButton.addEventListener('click', () => {  //move view to the top
        window.scrollTo(0,0);
    });
    const searchButton = document.getElementById('searchButton');   //trigger search functionality
    searchButton.addEventListener('click', () => {
        searchCards(albums);
    });
    createAlbumCards(albums);   //start creating album cards on main page
})
.catch(error => console.log(`Error message: ${error}`));

/*---------------- functions declarations for app purpose ----------------*/
//get data from server
async function getData(url){
    const response = await fetch(url);
    //checking response from server. Printing error if it's diffrent then 200.
    //it prevent from errors when request do not fails from resolve but has different status.
    if(!response.ok){
        console.error(`HTTP error! status: ${response.status}`);
    } else {
        const data = await response.json();
        return data;
    };
};
//clean view and create album cards
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
    for(let album of albums){
        const cardRow = document.createElement('div');
        cardRow.className = "row card_row albumCard";
        const cardCol = document.createElement('div');
        cardCol.className = "col s10 m7";
        const card = document.createElement('div');
        card.className = "card";
        const colorsArray = ['contentYellow', 'contentBlue', 'contentRed', 'contentGrey', 'contentLemon', 'contentIris', 'contentTeal', 'contentViolet']
        const color = colorsArray[Math.floor(Math.random()*colorsArray.length)];
        const cardContent = document.createElement('div');
        cardContent.className = `card-content albumContent ${color}`
        const cardTitle = document.createElement('p');
        cardTitle.innerText = album.title;
        cardTitle.className = "cardTitle";
        cardContent.appendChild(cardTitle);
        const cardButtonDiv = document.createElement('div');
        cardButtonDiv.className = "card-action";
        const cardButton = document.createElement('a');
        cardButton.className = "waves-effect waves-light cardButton";
        cardButton.addEventListener('click', printPhotoCards.bind(Object.create(null), albums, album.id, album.title));
        const cardButtonIcon = document.createElement('i');
        cardButtonIcon.className = "material-icons";
        cardButtonIcon.id = "albumButtonIcon";
        cardButtonIcon.innerText = "folder_open"
        cardButton.appendChild(cardButtonIcon);
        cardButtonDiv.appendChild(cardButton);
        card.appendChild(cardContent);
        card.appendChild(cardButtonDiv);
        cardCol.appendChild(card);
        cardRow.appendChild(card);
        container.appendChild(cardRow);
    };
};
//get data from server and open photos from album
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
    window.scrollTo(0, 0);  //scroll up the view
    for(let photo of photos){   //create cards
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
        cardContent.className = 'card-content photoContent'
        const cardTitle = document.createElement('span');
        cardTitle.innerText = photo.title;
        cardTitle.className = "card-title cardTitle";
        cardContent.appendChild(cardTitle);
        const cardButtonDiv = document.createElement('div');
        cardButtonDiv.className = "card-action";
        const cardButton = document.createElement('a');
        cardButton.className = "waves-effect waves-light modal-trigger zoomButton";
        cardButton.href=`#modal1`;
        cardButton.addEventListener('click', ()=> {
            document.getElementById('modalImg').src=photo.url;
        })
        const cardButtonIcon = document.createElement('i');
        cardButtonIcon.className = 'material-icons zoomIcon';
        cardButtonIcon.innerText = "zoom_in"
        cardButton.appendChild(cardButtonIcon);
        cardButtonDiv.appendChild(cardButton);
        card.appendChild(cardImage);
        card.appendChild(cardContent);
        card.appendChild(cardButtonDiv);
        cardCol.appendChild(card);
        cardRow.appendChild(card);
        container.appendChild(cardRow);
    };
};
//search functionality to match albums and photos by title
function searchCards(albums){   //get albums by default, as parameter, since we download or albums at the beginning
    const checkedAlbumsOption = document.getElementById('searchAlbumsRadio').checked;
    const checkedPhotosOption = document.getElementById('searchPhotosRadio').checked;
    if(checkedAlbumsOption){
        if(document.getElementById('subTitlePhotos')){
            document.getElementById('subTitlePhotos').remove();
        };
        if(!document.getElementById('backButton')){ //adding back button if not existed
            createBackButton(albums);
        };
        const matchedAlbums = searchCardsLogic(albums, 0.35);
        createAlbumCards(matchedAlbums);
    } else if(checkedPhotosOption){
        // check if photos are stored in session storage
        if(!sessionStorage.getItem('photos')){
            getData(photosURL)  //get photos to compare their titles for match
            .then((photos) => {
                if(document.getElementById('subTitlePhotos')){
                    document.getElementById('subTitlePhotos').remove();
                };
                if(!document.getElementById('backButton')){ //adding back button if not existed
                    createBackButton(albums);
                };
                const JSONphotos = JSON.stringify(photos);
                sessionStorage.setItem('photos', JSONphotos);
                const matchedPhotos = searchCardsLogic(photos, 0.55)
                console.log(matchedPhotos);
                createPhotoCards(matchedPhotos, albums, "Searched photos")
            });
        } else {    //if not, save photos in session storage
            const sessionPhotos = JSON.parse(sessionStorage.getItem('photos'));
            if(document.getElementById('subTitlePhotos')){
                document.getElementById('subTitlePhotos').remove();
            };
            if(!document.getElementById('backButton')){ //adding back button if not existed
                createBackButton(albums);
            };
            const matchedPhotos = searchCardsLogic(sessionPhotos, 0.55)
            console.log("from else session " + matchedPhotos);
            createPhotoCards(matchedPhotos, albums, "Searched photos")
        }
        
    };
};
/* logic with implemented "string-similarity" based on Dice's Coefficient
    https://www.npmjs.com/package/string-similarity */
function searchCardsLogic(contentArray, ratingValue){
    let result = []; //array for matching albums
    let input = document.getElementById('searchInputValidate');
    const titlesArr = contentArray.map(content => content.title);
    console.log(`input: ${input.value}, albumsTitle: ${titlesArr}`);
    //similarity logic part
    const matchesArray = stringSimilarity.findBestMatch(input.value, titlesArr)
                            .ratings
                            .filter(rating=>rating.rating>ratingValue); //filtering objects from best match array with the closest match
    for(let match of matchesArray){  //searching for a best matched objects by their title
        for(content of contentArray){
            if(content.title===match.target){
                result.push(content);    //populating result array
            };
        };
    };
    input.value = "";  //clear search input
    return result;
};
//creating back buttons with their functionality
function createBackButton(albums){
    const backButton = document.createElement('button');
    backButton.className = "btn-floating btn-large waves-effect waves-light"
    backButton.id = "backButton";
    backButton.addEventListener('click', () => {
        backButtonFunctionality(backButton);
        createAlbumCards(albums);  
    });
    const backButtonIcon = document.createElement('i');
    backButtonIcon.className = "material-icons";
    backButtonIcon.id = "backButtonIcon";
    backButtonIcon.innerText = "arrow_back";
    backButton.appendChild(backButtonIcon);
    container.appendChild(backButton);
};
//back button functionality
function backButtonFunctionality(button){
    const photoElements = document.getElementsByClassName('card_row');
    const mainTitle = document.getElementById('mainTitle');
    mainTitle.innerText = "ALBUMS";
    const subTitle = document.getElementById('subTitlePhotos');
    if(subTitle){
        subTitle.remove();
    };
    button.remove();
    while(photoElements.length){
        photoElements[0].remove();
    };
    window.scrollTo(0, 0);   
};