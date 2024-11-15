const board = document.getElementById('board');
const scores = document.getElementById('score');
const height = document.getElementById('height');

let snake_pos = [{x: 10, y: 10}];
const gridsize = 20;
let direction = "down";
let food = setFood();
let highScore = 0;


function drawSnake() {
    board.innerHTML = '';
    snake_pos.forEach((segment) => {
        const element = create('div', 'snake');
        setPos(element, segment);
        board.appendChild(element);
    });
}

function create(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}


function setPos(element, pos) {
    element.style.gridColumnStart = pos.x;
    element.style.gridRowStart = pos.y;
}

function drawFood() {
    const element = create('div', 'food');
    setPos(element, food);
    board.appendChild(element);
}


function setFood() {
    return {
        x: Math.floor(Math.random() * gridsize) + 1,
        y: Math.floor(Math.random() * gridsize) + 1
    };
}


function moveSnake() {
    const newHead = { ...snake_pos[0] };

    switch (direction) {
        case "right":
            newHead.x++;
            break;
        case "left":
            newHead.x--;
            break;
        case "up":
            newHead.y--;
            break;
        case "down":
            newHead.y++;
            break;
    }

    if (newHead.x > gridsize) newHead.x = 1;
    if (newHead.x < 1) newHead.x = gridsize;
    if (newHead.y > gridsize) newHead.y = 1;
    if (newHead.y < 1) newHead.y = gridsize;

    snake_pos.unshift(newHead);

    if (newHead.x === food.x && newHead.y === food.y) {
        food = setFood();
        updateScore();
    } else {
        snake_pos.pop();
    }

    checkCollision();
    drawSnake();
    drawFood();
}

function handleKeyPress(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction !== "down") direction = 'up';
            break;
        case 'ArrowRight':
            if (direction !== "left") direction = "right";
            break;
        case 'ArrowDown':
            if (direction !== "up") direction = "down";
            break;
        case 'ArrowLeft':
            if (direction !== "right") direction = "left";
            break;
    }
}

document.addEventListener('keydown', handleKeyPress);


function checkCollision() {
    const [head, ...body] = snake_pos;
    if (body.some(segment => segment.x === head.x && segment.y === head.y)) {
        resetGame();
    }
}


function resetGame() {
    updateHighScore();
    direction = "down";
    snake_pos = [{x: 10, y: 10}];
    food = setFood();
    drawSnake();
    drawFood();
    updateScore();

    const gameOverMessage = create('h2', 'R');
    gameOverMessage.textContent = 'GAME OVER!';
    board.appendChild(gameOverMessage);
}


function updateScore() {
    const currentScore = snake_pos.length - 1;
    scores.textContent = currentScore.toString().padStart(3, '0');
}


function updateHighScore() {
    const currentScore = snake_pos.length - 1;
    if (currentScore > highScore) {
        highScore = currentScore;
        height.textContent = highScore.toString().padStart(3, '0');
    }
}


drawSnake();
drawFood();
setInterval(moveSnake, 200); 