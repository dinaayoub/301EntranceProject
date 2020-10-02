/*
function previousButtonOnClick() {
    previousButton.style.background = 'red';
    setImage(0);

}

function nextButtonOnClick() {
    nextButton.style.background = 'red';
    setImage(1);
}

function setImage(index) {
    var image = document.getElementById('mainImage');
    image.src = 'images/' + allImages[index].src;
    image.alt = 'images/' + allImages[index].alt;

}

function image() {
    var image = new Object();
    image.src = '';
    image.alt = '';
}

var allImages = new Array();

var rainbowImage = new image();
rainbowImage.src = 'rainbow.jpg';
rainbowImage.alt = 'Rainbow Flag';
allImages.push(rainbowImage);

var nightSkyImage = new image();
nightSkyImage.src = 'nightsky.jpg';
nightSkyImage.alt = 'Night Sky';
allImages.push(nightSkyImage);

var index = 0;

var previousButton = document.getElementById('previousButton');
var nextButton = document.getElementById('nextButton');
previousButton.addEventListener("click", previousButtonOnClick, false);
nextButton.addEventListener("click", nextButtonOnClick, false);
*/
/////////////////////////////////////////////////////////////////
//create the images
function createImageVariables() {
    var images = [];
    for (var i = 0; i < 16; i++) {
        images[i] = document.getElementById('image' + (i + 1));
        images[i].addEventListener("click", onImageClick, false);
        images[i].src = 'images/cardback.jpg';
        console.log(images[i]);
    }
    return images;
}

function onImageClick() {
    var currentImage = this.src;
    console.log(currentImage);
    if (currentImage.endsWith('images/rainbow.jpg')) {
        this.src = 'images/cardback.jpg'
    } else if (currentImage.endsWith('images/cardback.jpg')) {
        this.src = 'images/rainbow.jpg'
    }
}

var images = createImageVariables();