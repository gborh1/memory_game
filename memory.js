//Add array of Gifs. Will append as other side of photo container
let imageArray = [
	'images/one.gif',
	'images/two.gif',
	'images/three.gif',
	'images/four.gif',
	'images/five.gif',
	'images/six.gif',
	'images/seven.gif',
	'images/eight.gif',
	'images/nine.gif',
	'images/ten.gif',
	'images/eleven.gif',
	'images/twelve.gif',
	'images/one.gif',
	'images/two.gif',
	'images/three.gif',
	'images/four.gif',
	'images/five.gif',
	'images/six.gif',
	'images/seven.gif',
	'images/eight.gif',
	'images/nine.gif',
	'images/ten.gif',
	'images/eleven.gif',
	'images/twelve.gif'
];

// Ramdomly match Gigs to containers and append.
//give it the img class to fit it in the div.
// Hide Gifs so they aren't visible until after animation.
//Skip the middle container where the counter will be

const allContainers = document.querySelectorAll('.photo-grid-item');

for (i = 0; i < allContainers.length; i++) {
	if (i === 12) {
		i++;
	}

	let indx = Math.floor(Math.random() * imageArray.length);

	let newImg = document.createElement('img');
	newImg.setAttribute('src', imageArray[indx]);
	newImg.classList.add('img');
	newImg.classList.add('hide');
	allContainers[i].append(newImg);

	imageArray.splice(indx, 1);
}

// define the middle container and give it a 0 value to start counting

let clickCounterContainer = document.getElementById('click-counter');
clickCounterContainer.innerText = '0';

//define elements on the intro page and the main element on the photogrid page

const photoGridContainer = document.querySelector('.photo-grid-container');
const introGrid = document.querySelector('.intro-grid');
const button = document.querySelector('.button');
const topScoreDisplay = document.querySelector('.number-score');

//hitting on the start button will hid the intro page and show the photogrid page

button.addEventListener('click', function(e) {
	photoGridContainer.classList.remove('hide');
	introGrid.classList.add('hide');
});

// define function to return back to intro page after game is over
function fromGridToIntro() {
	photoGridContainer.classList.add('hide');
	introGrid.classList.remove('hide');
}

//define fucntion to reset the grid once game is over
function resetBoard() {
	totalCounter = 0;
	flipCount = 0;
	clickCounterContainer.innerText = '0';
	for (let photo of photos) {
		photo.classList.remove('hide');
		photo.nextElementSibling.classList.add('hide');
	}
}

//set of all span containers holding emoji in front of cards
const photos = document.querySelectorAll('.my-text');

//definition for each pair of Gifs, conatainters and Emoji for each iteration of the game
// Gifs and Emojis are hidden. Containers are flipped for effect.

let firstGif = '';
let secondGif = '';
let photoContainerOne;
let photoContainerTwo;
let firstEmoji;
let secondEmoji;

// counter that gets reset to 0 after every pair is flipped.
let clickCounter = 0;
let totalCounter = 0; // total count of every legit click per round
let topScore = Infinity;
let flipCount = 0; //total count of cards permanently flipped

//put emoji span in a variable
//Add event listener for all the emoji spans

if (clickCounter === 0 || 1) {
	for (let photo of photos) {
		photo.addEventListener('click', function(e) {
			//define cards holding photos

			clickCounter += 1;

			//add value to the pairs of  containers and emojis every time through the loop
			if (clickCounter === 1) {
				photoContainerOne = e.target.parentElement;
				firstEmoji = e.target;
			} else if (clickCounter === 2) {
				photoContainerTwo = e.target.parentElement;
				secondEmoji = e.target;
			}

			//fucntion rotate the pair of cards 180 deg degrees slowly

			function rotateFirstCard() {
				photoContainerOne.classList.add('rotate');
			}
			function rotateSecondCard() {
				photoContainerTwo.classList.add('rotate');
			}

			//change the face of each pair of the cards by swapping the content

			function changeFirstCard() {
				firstEmoji.classList.toggle('hide');
				photoContainerOne.lastElementChild.classList.toggle('hide');
			}
			function changeSecondCard() {
				secondEmoji.classList.toggle('hide');
				photoContainerTwo.lastElementChild.classList.toggle('hide');
			}

			//remove the rotate animation for each card

			function removeFirstRotate() {
				photoContainerOne.classList.remove('rotate');
			}
			function removeSecondRotate() {
				photoContainerTwo.classList.remove('rotate');
			}

			//reapply the rotate animation
			function rotateFirstBack() {
				photoContainerOne.classList.add('rotate');
			}
			function rotateSecondBack() {
				photoContainerTwo.classList.add('rotate');
			}

			//hide the Give and Show the Emoji
			function changeCardOneBack() {
				firstEmoji.classList.toggle('hide');
				photoContainerOne.lastElementChild.classList.toggle('hide');
			}
			function changeCardTwoBack() {
				secondEmoji.classList.toggle('hide');
				photoContainerTwo.lastElementChild.classList.toggle('hide');
			}

			function resetClickCounter() {
				clickCounter = 0;
			}

			//Rotates and dispays gif of first card or second card.
			//After second card is rotated, both are rotated back
			if (clickCounter === 1) {
				rotateFirstCard();
				setTimeout(changeFirstCard, 400);
				firstGif = photoContainerOne.lastElementChild.getAttribute('src');
				totalCounter += 1;
				clickCounterContainer.innerText = totalCounter;
			} else if (clickCounter === 2) {
				rotateSecondCard();
				setTimeout(changeSecondCard, 400);
				secondGif = photoContainerTwo.lastElementChild.getAttribute('src');

				totalCounter += 1;
				clickCounterContainer.innerText = totalCounter;
				if (firstGif != secondGif) {
					setTimeout(removeFirstRotate, 900);
					setTimeout(removeSecondRotate, 900);

					setTimeout(rotateFirstBack, 1100);
					setTimeout(rotateSecondBack, 1100);

					setTimeout(changeCardOneBack, 1500);
					setTimeout(changeCardTwoBack, 1500);

					setTimeout(removeFirstRotate, 1900);
					setTimeout(removeSecondRotate, 1900);
				} else {
					flipCount = flipCount + 2;
				}

				setTimeout(resetClickCounter, 1500);
			}

			//  if all cards are flipped over, set top score, reset board, go to intro
			if (flipCount >= 24) {
				if (totalCounter < topScore) {
					topScore = totalCounter;
					topScoreDisplay.innerText = topScore;
					console.log(topScore);
				}
				setTimeout(fromGridToIntro, 3000);
				setTimeout(resetBoard, 3000);
			}
		});
	}
}
