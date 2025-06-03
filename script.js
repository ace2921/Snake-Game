// const canvas = document.getElementById("game");
// const ctx = canvas.getContext("2d");
// const gridSize = 20;
// const tileCount = canvas.width / gridSize;

// let snake = [{ x: 10, y: 10 }];
// let food = { x: 5, y: 5 };
// let direction = { x: 0, y: 0 }; 
// let score = 0;

// function drawGame() {
//   updateSnake();
//   if (checkGameOver()) {
//     alert("Game Over! Your score: " + score);
//     resetGame();
//     return;
//   }
//   clearBoard();
//   drawFood();
//   drawSnake();
// }

// function clearBoard() {
//   ctx.fillStyle = "greenyellow";
//   ctx.fillRect(0, 0, canvas.width, canvas.height);
// }

// function drawSnake() {
//   ctx.fillStyle = "blue";
//   for (const segment of snake) {
//     ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
//   }
// }

// function drawFood() {
//   ctx.fillStyle = "green";
//   ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
// }

// function updateSnake() {
  
//   const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  
  
//   if (head.x === food.x && head.y === food.y) {
//     score++;
//     snake.push({}); 
//     placeFood();
//   } else {
//     snake.pop();
//   }

  
//   snake.unshift(head);
// }

// function placeFood() {
//   food = {
//     x: Math.floor(Math.random() * tileCount),
//     y: Math.floor(Math.random() * tileCount),
//   };
// }

// function checkGameOver() {
//   const head = snake[0];

 
//   if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
//     return true;
//   }

  
//   for (let i = 1; i < snake.length; i++) {
//     if (snake[i].x === head.x && snake[i].y === head.y) {
//       return true;
//     }
//   }

//   return false;
// }

// function resetGame() {
//   snake = [{ x: 10, y: 10 }];
//   direction = { x: 0, y: 0 };
//   score = 0;
//   placeFood();
// }

// document.addEventListener("keydown", (e) => {
//   switch (e.key) {
//     case "ArrowUp":
//       if (direction.y === 0) direction = { x: 0, y: -1 };
//       break;
//     case "ArrowDown":
//       if (direction.y === 0) direction = { x: 0, y: 1 };
//       break;
//     case "ArrowLeft":
//       if (direction.x === 0) direction = { x: -1, y: 0 };
//       break;
//     case "ArrowRight":
//       if (direction.x === 0) direction = { x: 1, y: 0 };
//       break;
//   }
// });


const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const highScoreElement = document.getElementById('high-score');

// Game settings
const gridSize = 20;
const tileCount = canvas.width / gridSize;
const tileSize = canvas.width / tileCount;

// Snake and food
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;
let highScore = localStorage.getItem('highScore') ? parseInt(localStorage.getItem('highScore')) : 0;
let gameSpeed = 100;
let gameLoop;

// Initialize high score display
highScoreElement.textContent = highScore;

// Draw the game
function drawGame() {
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = '#0f0';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, tileSize - 2, tileSize - 2);
    });

    // Draw food
    ctx.fillStyle = '#f00';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, tileSize - 2, tileSize - 2);

    // Move snake
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    // Check if snake ate food
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreElement.textContent = score;
        food = { x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount) };
    } else {
        snake.pop();
    }

    // Check for collisions (walls or self)
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        clearInterval(gameLoop);
        // Update high score if current score is higher
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highScore', highScore);
            highScoreElement.textContent = highScore;
        }
        alert('Game Over! Score: ' + score + '\nHigh Score: ' + highScore);
        resetGame();
    }
}

// Reset the game
function resetGame() {
    snake = [{ x: 10, y: 10 }];
    food = { x: 15, y: 15 };
    dx = 0;
    dy = 0;
    score = 0;
    scoreElement.textContent = score;
    gameLoop = setInterval(drawGame, gameSpeed);
}

// Handle key presses
document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (dy !== 1) { dx = 0; dy = -1; }
            break;
        case 'ArrowDown':
            if (dy !== -1) { dx = 0; dy = 1; }
            break;
        case 'ArrowLeft':
            if (dx !== 1) { dx = -1; dy = 0; }
            break;
        case 'ArrowRight':
            if (dx !== -1) { dx = 1; dy = 0; }
            break;
    }
});

// Start the game
resetGame();
    
// Set the game loop to draw the game every 100 milliseconds
setInterval(drawGame, 100);
