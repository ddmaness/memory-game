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
    timeDisplay.textContent = (Math.floor(timer/60)) + ':' + seconds 
}


// randomly place the 8 variety of shapes onto the 16 cards in the play area
function populateBoard() {
    const cards = Array.prototype.slice.call(document.getElementsByClassName('card'));
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
        document.body.classList.add('checking');
        score++;
        setTimeout(function() {
            cardToMatch.element.parentNode.classList.remove('selected');
            target.parentNode.classList.remove('selected');
            cardToMatch.element = null;
            cardToMatch.html = null;
            scoreDisplay.textContent = 'Moves: ' + score;
            document.body.classList.remove('checking');
        },1000);
    }
    else {
        document.body.classList.add('checking');
        target.parentNode.classList.add('selected');
        matches++;
        score++;
        setTimeout(function() {
            cardToMatch.element.classList.add('matched');
            target.classList.add('matched')
            cardToMatch.element = null;
            cardToMatch.html = null;
            scoreDisplay.textContent = 'Moves: ' + score;
            document.body.classList.remove('checking');
        }, 1000);
    }
    if (matches === 8) {
        Array.prototype.slice.call(document.getElementsByClassName('selected')).forEach(function(elem) {
            setTimeout(function() {
                elem.classList.remove('selected');
            }, 200);
        })
        clearInterval(timeStamp);
    }
}

function reset() {
    document.getElementById('score').textContent = 'Moves: 0'
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
}

populateBoard();