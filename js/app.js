//create the images
function populateGameBoard() {
    var images = [];
    for (var i = 0; i < 16; i++) {
        images[i] = document.getElementById('image' + (i + 1));
        images[i].currentIndex = i;
        images[i].addEventListener("click", onImageClick, false);
        if (gameBoard[i].status === 'Hidden') {
            //cardback is showing
            images[i].src = gameBoard[i].hiddenSrc;
            images[i].alt = gameBoard[i].hiddenAlt;
        } else if (gameBoard[i].status === 'Visible') 
        {
            //card is showing
            images[i].src = gameBoard[i].visibleSrc;
            images[i].alt = gameBoard[i].visibleAlt;
        } else 
        {
            //card is invisible
            images[i].visible = false;
        }
    }
}

//the on click listener
function onImageClick() {
    var currentImage = this;
    if (gameBoard[currentImage.currentIndex].status === 'Visible') {
        showCardBack(this);
    } else if (gameBoard[currentImage.currentIndex].status === 'Hidden') {
        showCard(this);
        //setTimeout(showCardBack, 1000, this);
    }
    localStorage.setItem('gameBoard',JSON.stringify(gameBoard));
}

function showCard(image) {
    image.src = gameBoard[image.currentIndex].visibleSrc;
    image.alt = gameBoard[image.currentIndex].visibleAlt;
    gameBoard[image.currentIndex].status = 'Visible';
}

function showCardBack(image) {
    image.src = gameBoard[image.currentIndex].hiddenSrc;
    image.alt = gameBoard[image.currentIndex].hiddenAlt;
    gameBoard[image.currentIndex].status = 'Hidden';
}

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

function createGameBoard() {
    var cards = [];
    for (var i = 0; i < 16; i++) {
        cards[i] = new Object();
        cards[i].status = 'Hidden';
        cards[i].visibleSrc = imageNamesAndAlts[Math.floor(i/2)][0]; 
        cards[i].visibleAlt = imageNamesAndAlts[Math.floor(i/2)][1]; 
        cards[i].hiddenSrc = 'images/cardback.jpg';
        cards[i].hiddenAlt = 'Hidden Card ' + i;
    }
    localStorage.setItem('gameBoard',JSON.stringify(cards));
    return cards;
}

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
//var allImages =[];
var gameBoard = [];
if (!localStorage.hasOwnProperty('gameBoard')) {
    gameBoard = createGameBoard();
    shuffleCards();
    console.log(gameBoard);
} else {
    gameBoard = JSON.parse(localStorage.getItem('gameBoard'));
    console.log(gameBoard);
}

populateGameBoard();