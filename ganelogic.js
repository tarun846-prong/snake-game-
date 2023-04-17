
```
// Define variables
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var score = document.getElementById("score");
var gameover = document.getElementById("game-over");
var finalscore = document.getElementById("final-score");
var restart = document.getElementById("restart-btn");

// Define constants
const BOX_SIZE = 20;
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 400;
const SNAKE_SPEED = 100; // in milliseconds

// Define initial state
var snake = [
  { x: 9, y: 3 },
  { x: 8, y: 3 },
  { x: 7, y: 3 }
];
var direction = "right";
var food = generateFood();
var isGameover = false;
var intervalId;

// Draw initial state
draw();

// Handle key presses
document.addEventListener("keydown", function(event) {
  if (event.keyCode === 37) { // left arrow
    if (direction !== "right") {
      direction = "left";
    }
  } else if (event.keyCode === 38) { // up arrow
    if (direction !== "down") {
      direction = "up";
    }
  } else if (event.keyCode === 39) { // right arrow
    if (direction !== "left") {
      direction = "right";
    }
  } else if (event.keyCode === 40) { // down arrow
    if (direction !== "up") {
      direction = "down";
    }
  }
});

// Start game loop
intervalId = setInterval(moveSnake, SNAKE_SPEED);

// Define game functions
function draw() {
  // Clear canvas
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  
  // Draw snake
  snake.forEach(function(pos) {
    ctx.fillStyle = "green";
    ctx.fillRect(pos.x * BOX_SIZE, pos.y * BOX_SIZE, BOX_SIZE, BOX_SIZE);
  });
  
  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x * BOX_SIZE, food.y * BOX_SIZE, BOX_SIZE, BOX_SIZE);
}

function moveSnake() {
  // Move snake
  var head = snake[0];
  if (direction === "right") {
    snake.unshift({ x: head.x + 1, y: head.y });
  } else if (direction === "left") {
    snake.unshift({ x: head.x - 1, y: head.y });
  } else if (direction === "up") {
    snake.unshift({ x: head.x, y: head.y - 1 });
  } else if (direction === "down") {
    snake.unshift({ x: head.x, y: head.y + 1 });
  }
  
  // Check for collision
  if (snake[0].x < 0 || snake[0].x >= CANVAS_WIDTH / BOX_SIZE ||
      snake[0].y < 0 || snake[0].y >= CANVAS_HEIGHT / BOX_SIZE ||
      snake.slice(1).some(function(pos) { return pos.x === snake[0].x && pos.y === snake[0].y; })) {
    gameOver();
    return;
  }
  
  // Check for food collision
  if (snake[0].x === food.x && snake[0].y === food.y) {
    snake.push(snake[snake.length - 1]);
    score.innerHTML = "Score: " + (snake.length - 3);
    food = generateFood();
  } else {
    snake.pop();
  }
  
  // Draw state
  draw();
}

function generateFood() {
  var foodPos;
  do {
    foodPos = {
      x: Math.floor(Math.random() * (CANVAS_WIDTH / BOX_SIZE)),
      y: Math.floor(Math.random() * (CANVAS_HEIGHT / BOX_SIZE))
    };
  } while (snake.some(function(pos) { return pos.x === foodPos.x && pos.y === foodPos.y; }));
  return foodPos;
}

function gameOver() {
  clearInterval(intervalId);
  isGameover = true;
  finalscore.innerHTML = (snake.length - 3);
  gameover.style.display = "block";
}

restart.addEventListener("click", function() {
  snake = [
    { x: 9, y: 3 },
    { x: 8, y: 3 },
    { x: 7, y: 3 }
  ];
  direction = "right";
  food = generateFood();
  score.innerHTML = "Score: 0";
  gameover.style.display = "none";
  isGameover = false;
  intervalId = setInterval(moveSnake, SNAKE_SPEED);
});

```