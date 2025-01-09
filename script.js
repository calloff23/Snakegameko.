const board = document.getElementById('game-board');
const boardSize = 10;
const cells = [];
let snake = [{ x: 0, y: 0 }];
let apple = { x: 3, y: 3 };
let direction = { x: 1, y: 0 };
let score = 0;

// Initialize Board
function initBoard() {
    for (let y = 0; y < boardSize; y++) {
        for (let x = 0; x < boardSize; x++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cells.push(cell);
            board.appendChild(cell);
        }
    }
    render();
}

// Render the game
function render() {
    cells.forEach(cell => cell.className = 'cell');
    snake.forEach(segment => {
        const index = segment.y * boardSize + segment.x;
        cells[index].classList.add('snake');
    });
    const appleIndex = apple.y * boardSize + apple.x;
    cells[appleIndex].classList.add('apple');
}

// Move the snake
function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    
    if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        alert('Game Over! Score: ' + score);
        window.location.reload();
        return;
    }
    
    snake.unshift(head);

    if (head.x === apple.x && head.y === apple.y) {
        score++;
        if (score === 100) {
            alert('Victory! You reached the maximum score of 100!');
            window.location.reload();
            return;
        }
        placeApple();
    } else {
        snake.pop();
    }

    render();
}

// Place a new apple
function placeApple() {
    do {
        apple.x = Math.floor(Math.random() * boardSize);
        apple.y = Math.floor(Math.random() * boardSize);
    } while (snake.some(segment => segment.x === apple.x && segment.y === apple.y));
}

// Handle swipe input
let touchStartX = 0;
let touchStartY = 0;

window.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

window.addEventListener('touchmove', e => e.preventDefault(), { passive: false });

window.addEventListener('touchend', e => {
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const deltaY = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0 && direction.x === 0) direction = { x: 1, y: 0 }; // Swipe Right
        else if (deltaX < 0 && direction.x === 0) direction = { x: -1, y: 0 }; // Swipe Left
    } else {
        if (deltaY > 0 && direction.y === 0) direction = { x: 0, y: 1 }; // Swipe Down
        else if (deltaY < 0 && direction.y === 0) direction = { x: 0, y: -1 }; // Swipe Up
    }
});

// Start the game
initBoard();
placeApple();
setInterval(moveSnake, 200);
