// html to be added to the cards at random
const shapes = {
    square: '<div class="square"></div><div class="small-square"></div>',
    circle: '<div class="circle"></div><div class="circle-sun"></div>',
    hollowSquare: '<div class="hollow-rect hollow-rect-1"></div><div class="hollow-rect hollow-rect-2"></div><div class="hollow-rect hollow-rect-3"></div><div class="hollow-rect hollow-rect-4"></div>',
    hollowCircle: '<div class="hollow-circle"></div><div class="hollow-circle hollow-circle-1"></div><div class="hollow-circle hollow-circle-2"></div>',
    cone: '<div class="cone-circle"></div><div class="cone-triangle"></div>',
    triangle: '<div class="triangle-container"><div class="triangle triangle-1"></div><div class="triangle triangle-2"></div><div class="triangle triangle-3"></div></div>',
    x: '<div class="line left"></div><div class="line right"></div><div class="line right"></div><div class="line line-1 visible"></div><div class="line line-2 visible"></div><div class="line line-3 visible"></div><div class="line line-4 visible"></div><div class="line line-5 visible"></div>',
    moon: '<div class="moon-card"><div class="moon"></div><div class="moon-cover petal-top"></div><div class="moon-cover petal-right"></div><div class="moon-cover petal-bottom"></div><div class="moon-cover"></div></div>'
}

let cardToMatch = null;

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
}

populateBoard();