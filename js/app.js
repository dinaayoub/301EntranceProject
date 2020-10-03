//INTRO: This is my 301 Entrance Exam project Right now since i only had a few hours to build this project, 
//i'm just demonstrating the most important requirements for the 301 entrance exam as provided:
    //"need to provide the URL and the GitHub repository for an interactive website that you have created by hand, 
    //and from scratch, that is live on the internet. By "interactive" we mean that it uses vanilla JavaScript 
    //(specifically event listeners) to process and store user input and subsequently display new content to the user. 
    //In addition, the user input and new content must remain retrievable/viewable after a screen refresh."
//TO DO: implement the game mechanics to make cards invisible when you click two that are the same and end game when user gets all of them.

//Start the game board up with the basics
function populateGameBoard() {
    var gameBoardDiv = document.getElementById('gameBoardDiv');
    //Loop on the 16 images / "cards"
    for (var i = 0; i < 16; i++) {
        var cardDiv = document.createElement('div');
        //for cards at index 0, 4, 8, and 12 we want to clear float so they start on a new line
        if (i%4===0 && i!== 0) {
            //make the floating card start on a new line
            cardDiv.className = 'thumbnailImageDivClearFloat';
        } else {
            cardDiv.className = 'thumbnailImageDiv'; 
        }
        gameBoardDiv.appendChild(cardDiv);
        //use the DOM to create the html image
        var image = document.createElement('img');
        //add a property to the image object called "current index" and assign it the value i
        image.currentIndex = i;
        console.log(image.currentIndex);
        //set the image id to imageI where I is the current iteration
        image.id = 'image'+i;
        //add an event listener for on click to the image we are currently iterating on.
        image.addEventListener("click", onImageClick, false);
        //Now that we have that html image, let's find its equivalent game board (global variable) item
        //if the status of the game board item at i is hidden, then use the game board's hidden src and alt
        //a.k.a the card back. If it's visible, then show the image from the game board array which we 
        //populated with all the images. Otherwise, the status is = "invisible" so we should hide the card altogether.
        if (gameBoard.cards[i].status === 'Hidden') {
            //cardback is showing
            image.src = gameBoard.cards[i].hiddenSrc;
            image.alt = gameBoard.cards[i].hiddenAlt;
        } else if (gameBoard.cards[i].status === 'Visible') {
            //card is showing
            image.src = gameBoard.cards[i].visibleSrc;
            image.alt = gameBoard.cards[i].visibleAlt;
        } else {
            //card is invisible
            image.visible = false;
        }
        
        cardDiv.appendChild(image);
    }
}

//the on click listener
function onImageClick() {
    var currentImage = this;
    //check the game board at the current index, which we added to the image object during populateGameBoard
    //If it is visible, then show the card back, and if it is hidden then show the card. Otherwise (if it's invisible)
    //do nothing. 
    if (gameBoard.cards[currentImage.currentIndex].status === 'Visible') {
        showCardBack(this);
    } else if (gameBoard.cards[currentImage.currentIndex].status === 'Hidden') {
        switch (numberOfImagesShowing) {
            case 0:
                //if no cards are showing, then show this one
                showCard(this);
                //set the global variable indexOfFirstImageShowing to the index of the card the user clicked
                indexOfFirstImageShowing = this.currentIndex;
                //increment the number of images showing
                numberOfImagesShowing++;
                break;
            case 1:
                //if only 1 card is showing, then show this one
                showCard(this);
                //set the global variable indexOfSecondImageShowing to the index of the card the user clicked
                indexOfSecondImageShowing = this.currentIndex;
                //increment the number of images showing
                numberOfImagesShowing++;
                //after 2 seconds, hide both of the showing cards. 
                //Hide the first image
                var firstImage = document.getElementById('image' + indexOfFirstImageShowing);
                setTimeout(showCardBack, 2000, firstImage);
                setTimeout(showCardBack, 2000, this);
                //Hide the second image
                //showCardBack(this);
                numberOfImagesShowing = 0;
                break;
            default: 
                //If we already have two visible cards, do nothing. 
                break;
        }
    }
    //save the game board to the local storage using JSON by stringifying the gameBoard array. 
    //localStorage treats everything like a string so if we don't stringify it will fail to save the array properly
    localStorage.setItem('gameBoard',JSON.stringify(gameBoard));
}

//The card was hidden and the user clicked on the cardback, so flip it over to show the card.
function showCard(image) {
    //use the game board to find the correct image to show, which will be at "currentIndex" - the property we added to each image object.
    image.src = gameBoard.cards[image.currentIndex].visibleSrc;
    image.alt = gameBoard.cards[image.currentIndex].visibleAlt;
    gameBoard.cards[image.currentIndex].status = 'Visible';
}

//The card was showing and the user clicked it, so flip it over to hide it and show the card back.
function showCardBack(image) {
    //use the game board to find the correct image to show (card back), which will be at "currentIndex" - the property we added to each image object.
    image.src = gameBoard.cards[image.currentIndex].hiddenSrc;
    image.alt = gameBoard.cards[image.currentIndex].hiddenAlt;
    gameBoard.cards[image.currentIndex].status = 'Hidden';
}

//We have 8 images, and 2 of each on the board. Shuffle the cards (gameBoard) such that it's randomized each time we play the game. 
function shuffleCards() {
    var index = gameBoard.cards.length;
    var tempObject;
    var randomIndex;    
    while (index!==0) {
        randomIndex = Math.floor(Math.random()*index);
        index--;

        tempObject = gameBoard.cards[index];
        gameBoard.cards[index] = gameBoard.cards[randomIndex];
        gameBoard.cards[randomIndex] = tempObject;
    }
}

function Card(cardStatus,visibleSource,visibleAlternate,hiddenSource,hiddenAlternate) {
    //Card object constructor 
    this.status = cardStatus;
    this.visibleSrc = visibleSource;
    this.visibleAlt = visibleAlternate;
    this.hiddenSrc = hiddenSource;
    this.hiddenAlt = hiddenAlternate;
}

function GameBoard() {
    //GameBoard object constructor. 
    this.cards = [];

    //For each of the 16 items in the cards array (gameBoard), we'll set it to hidden by default,
    //Populate it with the card backs in the hiddenSrc and hiddenAlt fields. 
    //Populate it with the actual card images visibleSrc and visibleAlt fields. 
    //Use the math.floor to get i/2 floor such that we can populate the array with 16 images despite only having 8 images in the imageNamesAndAlts array. 
    for (var i = 0; i < 16; i++) {
        this.cards[i] = new Card('Hidden',
        imageNamesAndAlts[Math.floor(i/2)][0],
        imageNamesAndAlts[Math.floor(i/2)][1], 
        'images/cardback.jpg',
        'Hidden Card ' + i);
    }
    //save the game board to the local storage using JSON by stringifying the cards array. 
    localStorage.setItem('gameBoard',JSON.stringify(this));
}

function resetGame() {
    localStorage.clear();
    location.reload();
}

var resetButton = document.getElementById('resetButton'); 
resetButton.addEventListener("click",resetGame,false);

var numberOfImagesShowing = 0;
var indexOfFirstImageShowing = -1;
var indexOfSecondImageShowing = -1;

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
var gameBoard;

//Check local storage first. If there is no gameBoard property, then populate the gameBoard from scratch
//otherwise, we already have a game board saved, the user hadn't finished the game so retrieve it from storage
if (!localStorage.hasOwnProperty('gameBoard')) {
    gameBoard = new GameBoard();
    shuffleCards();
} else {
    gameBoard = JSON.parse(localStorage.getItem('gameBoard'));
}

//Now that the gameBoard array is initialized, populate the html images with the correct info by calling populateGameBoard
populateGameBoard();