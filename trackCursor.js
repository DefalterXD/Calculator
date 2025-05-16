const movingElement = document.querySelector('.calculator__object-round.red');

function CursorCoordinates(page) {
    this.coordinateX = page.pageX;
    this.coordinateY = page.pageY;
}

let previousX = 0;
let previousY = 0;
let coordinateXMove = 0;
let coordinateYMove = 0;
let initialX = 0;
let initialY = 0;

window.addEventListener('mousemove', (event) => {
    const cursor = new CursorCoordinates(event);
    movingElement.style.position = 'relative';

    if (cursor.coordinateX > previousX) {
        coordinateXMove++;
    }
    else if (previousX > cursor.coordinateX) {
        coordinateXMove--;
    }

    coordinateXMove = Math.max(Math.min(coordinateXMove, 4), -4);

    movingElement.style.left = initialX + coordinateXMove + 'px';

    if (cursor.coordinateY > previousY) {
        coordinateYMove++
    }
    else if (previousY > cursor.coordinateY) {
        coordinateYMove--;
    }

    coordinateYMove = Math.max(Math.min(coordinateYMove, 4), -4);

    movingElement.style.top = initialY + coordinateYMove + 'px';

    previousX = cursor.coordinateX;
    previousY = cursor.coordinateY;

});

window.addEventListener('touchmove', (event) => {
    const touch = new CursorCoordinates(event.touches[0]);
    if (touch.coordinateX > previousX) {
        coordinateXMove++;
    }
    else if (previousX > touch.coordinateX) {
        coordinateXMove--;
    }

    coordinateXMove = Math.max(Math.min(coordinateXMove, 4), -4);

    movingElement.style.left = initialX + coordinateXMove + 'px';

    if (touch.coordinateY > previousY) {
        coordinateYMove++
    }
    else if (previousY > touch.coordinateY) {
        coordinateYMove--;
    }

    coordinateYMove = Math.max(Math.min(coordinateYMove, 4), -4);

    movingElement.style.top = initialY + coordinateYMove + 'px';

    previousX = touch.coordinateX;
    previousY = touch.coordinateY;
});