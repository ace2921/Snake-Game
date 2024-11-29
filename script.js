const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let direction = { x: 0, y: 0 }; 
let score = 0;

function drawGame() {
  updateSnake();
  if (checkGameOver()) {
    alert("Game Over! Your score: " + score);
    resetGame();
    return;
  }
  clearBoard();
  drawFood();
  drawSnake();
}

function clearBoard() {
  ctx.fillStyle = "greenyellow";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
  ctx.fillStyle = "blue";
  for (const segment of snake) {
    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
  }
}

function drawFood() {
  ctx.fillStyle = "green";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);
}

function updateSnake() {
  
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  
  
  if (head.x === food.x && head.y === food.y) {
    score++;
    snake.push({}); 
    placeFood();
  } else {
    snake.pop();
  }

  
  snake.unshift(head);
}

function placeFood() {
  food = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount),
  };
}

function checkGameOver() {
  const head = snake[0];

 
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    return true;
  }

  
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      return true;
    }
  }

  return false;
}

function resetGame() {
  snake = [{ x: 10, y: 10 }];
  direction = { x: 0, y: 0 };
  score = 0;
  placeFood();
}

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
});

setInterval(drawGame, 100); 
