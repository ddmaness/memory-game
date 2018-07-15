// html to be added to the cards at random
const shapes = {
    square: '<div class="card"><div class="square"></div><div class="small-square"></div></div>',
    circle: '<div class="circle-card card"><div class="circle"></div><div class="circle-sun"></div></div>',
    hollowCircle: '<div class="card"><div class="hollow-circle"></div><div class="hollow-circle hollow-circle-1"></div><div class="hollow-circle hollow-circle-2"></div></div>',
    hollowSquare: '<div class="card"><div class="hollow-rect hollow-rect-1"></div><div class="hollow-rect hollow-rect-2"></div><div class="hollow-rect hollow-rect-3"></div><div class="hollow-rect hollow-rect-4"></div></div>',
    cone: '<div class="card"><div class="cone-circle"></div><div class="cone-triangle"></div></div>',
    triangle: '<div class="card"><div class="triangle-container"><div class="triangle triangle-1"></div><div class="triangle triangle-2"></div><div class="triangle triangle-3"></div></div></div>',
    x: '<div class="card"><div class="line left"></div><div class="line right"></div><div class="line right"></div><div class="line line-1 visible"></div><div class="line line-2 visible"></div><div class="line line-3 visible"></div><div class="line line-4 visible"></div><div class="line line-5 visible"></div></div>',
    moon: '<div class="card moon-card"><div class="moon"></div><div class="moon-cover petal-top"></div><div class="moon-cover petal-right"></div><div class="moon-cover petal-bottom"></div><div class="moon-cover"></div></div>'
}