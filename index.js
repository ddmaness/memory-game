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

let cardToMatch = {
    element: null,
    html: null,
};

let score = 0;

let matches = 0;

let timer = 0;

let timeStamp = setInterval(time, 1000);

function time() {
    const timeDisplay = document.getElementById('timer');
    timer++;
    const seconds = timer % 60 > 9 ? timer % 60 : '0' + timer % 60;
    const minutes = Math.floor(timer/60) > 9 ? Math.floor(timer/60) : '0' + Math.floor(timer/60);
    timeDisplay.textContent = minutes + ':' + seconds 
}

function starChecker() {
    if (score > 16 && score < 24) {
        document.getElementById('stars').innerHTML = '&#9733; &#9733; &#9734;'
    }
    else if (score >= 24) {
        document.getElementById('stars').innerHTML = '&#9733; &#9734; &#9734;'
    }
}

// randomly place the 8 variety of shapes onto the 16 cards in the play area
function populateBoard() {
    const cards = Array.prototype.slice.call(document.getElementsByClassName('card'));
    cards.forEach(function(elem) {
        if (elem.classList.contains('correct')){
            elem.classList.remove('correct');
        }
    })
    let cardIndex = 0;
    const shapesArr = [];
    for (let shape in shapes) {
        for (let i = 0; i < 2; i++) {
            shapesArr.push(shapes[shape]);
        }
    }
    while (shapesArr.length !== 0) {
        const index = Math.floor(Math.random() * shapesArr.length);
        const htmlToAdd = shapesArr.splice(index, 1);
        cards[cardIndex].innerHTML =  htmlToAdd;
        cardIndex++;
    }
    const cardFronts = Array.prototype.slice.call(document.getElementsByClassName('card-front'));
    cardFronts.forEach(function(elem){
        elem.addEventListener('click', matchCheck, true);
    });
}

function matchCheck(e) {
    const scoreDisplay = document.getElementById('score');
    const target = e.target.nextElementSibling;
    if (target === cardToMatch.element || target.classList.contains('matched')) {
        return;
    }
    else if (cardToMatch.element === null) {
        cardToMatch.html = target.innerHTML;
        cardToMatch.element = target;
        target.parentNode.classList.add('selected');
    }
    else if (target.innerHTML !== cardToMatch.html) {
        target.parentNode.classList.add('selected');
        target.classList.add('incorrect');
        cardToMatch.element.classList.add('incorrect');
        document.body.classList.add('checking');
        score++;
        starChecker();
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
    else {
        document.body.classList.add('checking');
        target.parentNode.classList.add('selected');
        target.classList.add('correct');
        cardToMatch.element.classList.add('correct');
        matches++;
        score++;
        starChecker();
        setTimeout(function() {
            cardToMatch.element.classList.add('matched');
            target.classList.add('matched')
            cardToMatch.element = null;
            cardToMatch.html = null;
            scoreDisplay.textContent = 'Moves: ' + score;
            document.body.classList.remove('checking');
        }, 200);
    }
    if (matches === 8) {
        setTimeout(function() {
            setTimeout(function() {
                Array.prototype.slice.call(document.getElementsByClassName('selected')).forEach(function(elem) {
                    elem.classList.remove('selected');
                });
            }, 2000);
            clearInterval(timeStamp);
            document.getElementById('results-guesses').textContent = 'Guesses: ' + score;
            document.getElementById('results-time').textContent = 'Time: ' + document.getElementById('timer').textContent;
            document.getElementById('results-stars').innerHTML = document.getElementById('stars').innerHTML;
            document.getElementById('results').classList.toggle('win');
        }, 4000);
    }
}

function reset() {
    document.getElementById('score').textContent = 'Moves: 0'
    document.getElementById('stars').innerHTML = '&#9733; &#9733; &#9733;'
    score = 0;
    matches = 0;
    timer = 0;
    cardToMatch.element = null;
    cardToMatch.html = null;
    Array.prototype.slice.call(document.getElementsByClassName('matched')).forEach(function(elem) {
        elem.classList.remove('matched');
    });
    timeStamp = setInterval(time, 1000);
    populateBoard();
    document.getElementById('results').classList.toggle('win');
}

populateBoard();