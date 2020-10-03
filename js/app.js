//INTRO: This is my 301 Entrance Exam project Right now since i only had a few hours to build this project, 
//i'm just demonstrating the most important requirements for the 301 entrance exam as provided:
    //"need to provide the URL and the GitHub repository for an interactive website that you have created by hand, 
    //and from scratch, that is live on the internet. By "interactive" we mean that it uses vanilla JavaScript 
    //(specifically event listeners) to process and store user input and subsequently display new content to the user. 
    //In addition, the user input and new content must remain retrievable/viewable after a screen refresh."
//TO DO: implement the game mechanics to make cards invisible and end game when user gets all of them.

//Start the game board up with the basics
function populateGameBoard() {
    var images = [];
    //Loop on the 16 images / "cards"
    for (var i = 0; i < 16; i++) {
        //use the DOM to get the html image by its name, including the number of the image
        images[i] = document.getElementById('image' + (i + 1));
        //add a property to the image object called "current index" and assign it the value i
        images[i].currentIndex = i;
        //add an event listener for on click to the image we are currently iterating on.
        images[i].addEventListener("click", onImageClick, false);
        //Now that we have that html image, let's find its equivalent game board (global variable) item
        //if the status of the game board item at i is hidden, then use the game board's hidden src and alt
        //a.k.a the card back. If it's visible, then show the image from the game board array which we 
        //populated with all the images. Otherwise, the status is = "invisible" so we should hide the card altogether.
        if (gameBoard[i].status === 'Hidden') {
            //cardback is showing
            images[i].src = gameBoard[i].hiddenSrc;
            images[i].alt = gameBoard[i].hiddenAlt;
        } else if (gameBoard[i].status === 'Visible') {
            //card is showing
            images[i].src = gameBoard[i].visibleSrc;
            images[i].alt = gameBoard[i].visibleAlt;
        } else {
            //card is invisible
            images[i].visible = false;
        }
    }
}

//the on click listener
function onImageClick() {
    var currentImage = this;
    //check the game board at the current index, which we added to the image object during populateGameBoard
    //If it is visible, then show the card back, and if it is hidden then show the card. Otherwise (if it's invisible)
    //do nothing. 
    if (gameBoard[currentImage.currentIndex].status === 'Visible') {
        showCardBack(this);
    } else if (gameBoard[currentImage.currentIndex].status === 'Hidden') {
        showCard(this);
        //This commented out code is to set a time out
        //setTimeout(showCardBack, 1000, this);
    }
    //save the game board to the local storage using JSON by stringifying the gameBoard array. 
    //localStorage treats everything like a string so if we don't stringify it will fail to save the array properly
    localStorage.setItem('gameBoard',JSON.stringify(gameBoard));
}

//The card was hidden and the user clicked on the cardback, so flip it over to show the card.
function showCard(image) {
    //use the game board to find the correct image to show, which will be at "currentIndex" - the property we added to each image object.
    image.src = gameBoard[image.currentIndex].visibleSrc;
    image.alt = gameBoard[image.currentIndex].visibleAlt;
    gameBoard[image.currentIndex].status = 'Visible';
}

//The card was showing and the user clicked it, so flip it over to hide it and show the card back.
function showCardBack(image) {
    //use the game board to find the correct image to show (card back), which will be at "currentIndex" - the property we added to each image object.
    image.src = gameBoard[image.currentIndex].hiddenSrc;
    image.alt = gameBoard[image.currentIndex].hiddenAlt;
    gameBoard[image.currentIndex].status = 'Hidden';
}

//We have 8 images, and 2 of each on the board. Shuffle the cards (gameBoard) such that it's randomized each time we play the game. 
function shuffleCards() {
    var index = gameBoard.length;
    var tempObject;
    var randomIndex;    
    while (index!==0) {
        randomIndex = Math.floor(Math.random()*index);
        index--;

        tempObject = gameBoard[index];
        gameBoard[index] = gameBoard[randomIndex];
        gameBoard[randomIndex] = tempObject;
    }
}

//Create the gameboard
function createGameBoard() {
    var cards = [];
    //For each of the 16 items in the cards array (gameBoard), we'll set it to hidden by default,
    //Populate it with the card backs in the hiddenSrc and hiddenAlt fields. 
    //Populate it with the actual card images visibleSrc and visibleAlt fields. 
    for (var i = 0; i < 16; i++) {
        cards[i] = new Object();
        cards[i].status = 'Hidden';
        //Use the math.floor to get i/2 floor such that we can populate the array with 16 images despite only having 8 images in the imageNamesAndAlts array. 
        cards[i].visibleSrc = imageNamesAndAlts[Math.floor(i/2)][0]; 
        cards[i].visibleAlt = imageNamesAndAlts[Math.floor(i/2)][1]; 
        cards[i].hiddenSrc = 'images/cardback.jpg';
        cards[i].hiddenAlt = 'Hidden Card ' + i;
    }
    //save the game board to the local storage using JSON by stringifying the cards array. 
    localStorage.setItem('gameBoard',JSON.stringify(cards));
    return cards;
}

//global variable with all of the images in the game and their alt text
var imageNamesAndAlts = [
    ['images/rainbow.jpg','Rainbow flag painting'],
    ['images/water.jpg','Water sound waves painting'],
    ['images/nightsky.jpg', 'Galaxies and stars painting'],
    ['images/aurora.jpg', 'Aurora borealis painting'],
    ['images/beach.jpg','Beach painting'],
    ['images/bipride.jpg','Abstract feminist / bi-pride painting'],
    ['images/desert.jpg', 'Night sky over the desert painting'],
    ['images/earth.jpg','Abstract Earth painting']
]
//global variable with the game board. 
var gameBoard = [];
//Check local storage first. If there is no gameBoard property, then populate the gameBoard from scratch
//otherwise, we already have a game board saved, the user hadn't finished the game so retrieve it from storage
if (!localStorage.hasOwnProperty('gameBoard')) {
    gameBoard = createGameBoard();
    shuffleCards();
    console.log(gameBoard);
} else {
    gameBoard = JSON.parse(localStorage.getItem('gameBoard'));
    console.log(gameBoard);
}

//Now that the gameBoard array is initialized, populate the html images with the correct info by calling populateGameBoard
populateGameBoard();

