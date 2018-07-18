// html to be added to the cards at random
const shapes = {
    square: '<div class="square"></div><div class="small-square"></div>',
    circle: '<div class="circle"></div><div class="circle-sun"></div>',
    hollowSquare: '<div class="hollow-rect hollow-rect-1"></div><div class="hollow-rect hollow-rect-2"></div><div class="hollow-rect hollow-rect-3"></div><div class="hollow-rect hollow-rect-4"></div>',
    hollowCircle: '<div class="hollow-circle"></div><div class="hollow-circle hollow-circle-1"></div><div class="hollow-circle hollow-circle-2"></div>',
    cone: '<div class="cone-circle"></div><div class="cone-triangle"></div>',
    triangle: '<div class="triangle-container"><div class="triangle triangle-1"></div><div class="triangle triangle-2"></div><div class="triangle triangle-3"></div></div>',
    x: '<div class="line left"></div><div class="line right"></div><div class="line right"></div><div class="line line-1"></div><div class="line line-2"></div><div class="line line-3"></div><div class="line line-4"></div><div class="line line-5"></div>',
    moon: '<div class="moon-card"><div class="moon"></div><div class="moon-cover petal-top"></div><div class="moon-cover petal-right"></div><div class="moon-cover petal-bottom"></div><div class="moon-cover"></div></div>'
}

// Capture first card clicked to match later
let cardToMatch = {
    element: null,
    html: null,
};

// Track number of guesses
let score = 0;

// Track number of successful matches
let matches = 0;

// Track seconds passed
let timer = 0;

// Initialize timer
let timeStamp = setInterval(time, 1000);

// Parse and display playtime
function time() {
    timer++;
    const timeDisplay = document.getElementById('timer');
    const seconds = timer % 60 > 9 ? timer % 60 : '0' + timer % 60;
    const minutes = Math.floor(timer/60) > 9 ? Math.floor(timer/60) : '0' + Math.floor(timer/60);
    // Display time in 00:00 format
    timeDisplay.textContent = minutes + ':' + seconds;
}

// Displays appropiate number of stars based on number of guesses (3 for less than 16, 2 for less than 24, or 1 if more)
function starChecker() {
    if (score > 16 && score < 24) {
        document.getElementById('stars').innerHTML = '&#9733; &#9733; &#9734;';
    }
    else if (score >= 24) {
        document.getElementById('stars').innerHTML = '&#9733; &#9734; &#9734;';
    }
}

// Capture data from and apply animation to the first card clicked
function firstCardClicked(target) {
    cardToMatch.html = target.innerHTML;
    cardToMatch.element = target;
    target.parentNode.classList.add('selected');
}

// Handle an incorrect match when second card is clicked
function noMatch(target, scoreDisplay) {
    // trigger animations for incorrect guess
    target.parentNode.classList.add('selected');
    target.classList.add('incorrect');
    cardToMatch.element.classList.add('incorrect');
    document.body.classList.add('checking');
    // increment score and display appropriate number of stars
    score++;
    starChecker();
    // reverse card flip animation, update score-board, and reset first card data to null
    setTimeout(function() {
        cardToMatch.element.parentNode.classList.remove('selected');
        target.parentNode.classList.remove('selected');
        target.classList.remove('incorrect');
        cardToMatch.element.classList.remove('incorrect');
        cardToMatch.element = null;
        cardToMatch.html = null;
        scoreDisplay.textContent = 'Moves: ' + score;
        document.body.classList.remove('checking');
    },1000);
}

// Handle a correct guess when second card is clicked
function match(target, scoreDisplay) {
    // apply card flip animation when second card is clicked
    document.body.classList.add('checking');
    target.parentNode.classList.add('selected');
    target.classList.add('correct');
    cardToMatch.element.classList.add('correct');
    // iterate score and match counters, then check for and display stars
    matches++;
    score++;
    starChecker();
    // trigger correct guest animation for shapes in cards, reset first card data to null, update scoreboard
    setTimeout(function() {
        cardToMatch.element.classList.add('matched');
        target.classList.add('matched');
        cardToMatch.element = null;
        cardToMatch.html = null;
        scoreDisplay.textContent = 'Moves: ' + score;
        document.body.classList.remove('checking');
    }, 200);
}

// Stop timer and display modal when all matches have been discovered
function win(target) {
    clearInterval(timeStamp);
    setTimeout(function() {
        setTimeout(function() {
            Array.prototype.slice.call(document.getElementsByClassName('selected')).forEach(function(elem) {
                elem.classList.remove('selected');
            });
        }, 2000);
        document.getElementById('results-guesses').textContent = 'Guesses: ' + score;
        document.getElementById('results-time').textContent = 'Time: ' + document.getElementById('timer').textContent;
        document.getElementById('results-stars').innerHTML = document.getElementById('stars').innerHTML;
        document.getElementById('results').classList.toggle('win');
    }, 3000);
}

// Randomly place the 8 variety of shapes onto the 16 cards in the play area
function populateBoard() {
    const cards = Array.prototype.slice.call(document.getElementsByClassName('card'));
    cards.forEach(function(elem) {
        // Check to see if 'correct' class is present and remove (PopulateBoard was called by 'Play Again' button)
        if (elem.classList.contains('correct')){
            elem.classList.remove('correct');
        }
    })
    setTimeout(function() {
        Array.prototype.slice.call(document.getElementsByClassName('matched')).forEach(function(elem) {
            elem.classList.remove('matched');
        });
    }, 300);
    let cardIndex = 0;
    // Create an array containing the html for two of each shape to be placed on the cards
    const shapesArr = [];
    for (let shape in shapes) {
        if (shapes.hasOwnProperty(shape)) {
            for (let i = 0; i < 2; i++) {
                shapesArr.push(shapes[shape]);
            }
        }
    }
    // Place shapes onto random cards
    while (shapesArr.length !== 0) {
        const index = Math.floor(Math.random() * shapesArr.length);
        const htmlToAdd = shapesArr.splice(index, 1);
        cards[cardIndex].innerHTML =  htmlToAdd;
        cardIndex++;
    }
    // Place and event listener for clicks on each card
    const cardFronts = Array.prototype.slice.call(document.getElementsByClassName('card-front'));
    cardFronts.forEach(function(elem){
        elem.addEventListener('click', clickCard, true);
    });
    const resetBtns = Array.prototype.slice.call(document.getElementsByClassName('reset'));
    resetBtns.forEach(function(elem){
        elem.addEventListener('click', reset);
    })
}

//Handle card clicks
function clickCard(e) {
    const scoreDisplay = document.getElementById('score');
    const target = e.target.nextElementSibling;
    // Check to see if card has already been clicked and terminate function if so
    if (target === cardToMatch.element || target.classList.contains('matched')) {
        return;
    }
    // Check to see if this is the first card clicked and handle it if it is
    else if (cardToMatch.element === null) {
        firstCardClicked(target);
        return;
    }
    // Check to see if the second card clicked is a mismatch and handle it if it is
    else if (target.innerHTML !== cardToMatch.html) {
        noMatch(target, scoreDisplay);
        return;
    }
    // If second card is a match, handle it and check to see if is the last match
    else {
        match(target, scoreDisplay);
    }
    if (matches === 8) {
        win();
    }
}

// Reset Game to starting values
function reset(e) {
    if (e.target.classList.contains('restart')) {
        Array.prototype.slice.call(document.getElementsByClassName('selected')).forEach(function(elem) {
            elem.classList.remove('selected');
        });
        document.getElementById('timer').textContent = '00:00';
        clearInterval(timeStamp);

    }
    document.getElementById('score').textContent = 'Moves: 0';
    document.getElementById('stars').innerHTML = '&#9733; &#9733; &#9733;';
    score = 0;
    matches = 0;
    timer = 0;
    cardToMatch.element = null;
    cardToMatch.html = null;
    timeStamp = setInterval(time, 1000);
    setTimeout(function() {
        populateBoard();
    }, 500);
    if (!e.target.classList.contains('restart')) {
        document.getElementById('results').classList.toggle('win');
    }
}

// Establish initial gameboard
populateBoard();