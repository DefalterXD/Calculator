const movingElement = document.querySelector('.calculator__object-round.red');

// GET coordinates of the cursor
function CursorCoordinates(page) {
    this.coordinateX = page.pageX;
    this.coordinateY = page.pageY;
}

// INIT for previous cursor position
let previousX = 0;
let previousY = 0;
// INIT pixel for the element to move relatively where cursor direction was
let coordinateXCount = 0;
let coordinateYCount = 0;
// INIT a start point of the inner element
let initialX = 0;
let initialY = 0;

// EVENT LISTENER for the cursor on the computer
window.addEventListener('mousemove', (event) => {
    const cursor = new CursorCoordinates(event);
    movingElement.style.position = 'relative';

    // IF on x cursor direction move to the right
    if (cursor.coordinateX > previousX) {
        coordinateXCount++;
    }
    // ELSE IF on x cursor direction move to the left
    else if (previousX > cursor.coordinateX) {
        coordinateXCount--;
    }

    // SET coordinate pixel bound to right:4 or right:-4 pixels
    coordinateXCount = Math.max(Math.min(coordinateXCount, 4), -4);

    // MOVE the inner element on X direction
    movingElement.style.left = initialX + coordinateXCount + 'px';

    // IF on y cursor direction move to the bottom
    if (cursor.coordinateY > previousY) {
        coordinateYCount++
    }
    // ELSE IF on y cursor direction move to the top 
    else if (previousY > cursor.coordinateY) {
        coordinateYCount--;
    }

    // SET coordinate pixel bound to top:4 or top:-4 pixels
    coordinateYCount = Math.max(Math.min(coordinateYCount, 4), -4);

    // MOVE the inner element on Y direction
    movingElement.style.top = initialY + coordinateYCount + 'px';

    // SET current position to previous  
    previousX = cursor.coordinateX;
    previousY = cursor.coordinateY;

});

// EVENT LISTENER for the touchpad on the phone
window.addEventListener('touchmove', (event) => {
    const touch = new CursorCoordinates(event.touches[0]);
    if (touch.coordinateX > previousX) {
        coordinateXCount++;
    }
    else if (previousX > touch.coordinateX) {
        coordinateXCount--;
    }

    coordinateXCount = Math.max(Math.min(coordinateXCount, 4), -4);

    movingElement.style.left = initialX + coordinateXCount + 'px';

    if (touch.coordinateY > previousY) {
        coordinateYCount++
    }
    else if (previousY > touch.coordinateY) {
        coordinateYCount--;
    }

    coordinateYCount = Math.max(Math.min(coordinateYCount, 4), -4);

    movingElement.style.top = initialY + coordinateYCount + 'px';

    previousX = touch.coordinateX;
    previousY = touch.coordinateY;
});