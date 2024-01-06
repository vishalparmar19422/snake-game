//Variable and constants
//x is column and y is row
let Score = 0;
let isGameOver = false;
let h1 = document.querySelector("h1");
let h2 = document.querySelector("h2");
let board = document.querySelector(".board");
let snake = [{ x: 4, y: 4 }];
let food = { x: 10, y: 10 };
let direc = { x: 0, y: 0 };
let lastPaintTime = 0;
let speed = 10;
let gameOverMusic = new Audio("./music/gameover.wav");
let eat = new Audio("./music/eat.wav");
let bg = new Audio("./music/music.mp3");
bg.volume = 0.3;

//game loop
function gameLoop(ctime) {
  window.requestAnimationFrame(gameLoop);

  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  board.innerHTML = "";
  if (isGameOver === false) {
    main();
  }
}

//functions of game

//press enter to play again
function pressKey() {
  h1.classList.add("bigScore");
  h2.style.visibility=("visible");
  window.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      isGameOver = false;
      Score = 0;
      document.querySelector(".score").innerHTML = `Score:${Score}`;
    }
  });
}

//collision
function isCollide() {
  if (
    snake[0].x > 18 ||
    snake[0].x <= 0 ||
    snake[0].y <= 0 ||
    snake[0].y > 18
  ) {
    gameOver();
  }
  for (let i = 1; i < snake.length - 1; i++) {
    if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
      gameOver();
    }
  }
}

//gameOver
function gameOver() {
  isGameOver = true;
  bg.pause();
  bg.currentTime = 0;
  gameOverMusic.play();
  snake = [{ x: 4, y: 4 }];
  food = { x: 10, y: 10 };
  direc = { x: 0, y: 0 };
  pressKey();
}

function main() {
  h1.classList.remove("bigScore");
  h2.style.visibility=("hidden");


  snake.forEach((ele, index) => {
    let snakeElement = document.createElement("div");
    snakeElement.style.gridColumnStart = ele.x;
    snakeElement.style.gridRowStart = ele.y;
    if (snake[0] === ele) {
      snakeElement.classList.add("snakeHead");
    } else {
      snakeElement.classList.add("snakeBody");
    }
    board.appendChild(snakeElement);
  });
  //drAW FOOD

  let foodElement = document.createElement("div");
  foodElement.style.gridColumnStart = food.x;
  foodElement.style.gridRowStart = food.y;
  foodElement.classList.add("food");
  board.appendChild(foodElement);

  //cheking for collision
  isCollide();

  //moving snake
  for (let i = snake.length - 2; i >= 0; i--) {
    snake[i + 1] = { ...snake[i] };
  }
  snake[0].x += direc.x;
  snake[0].y += direc.y;

  //increasing sanke if food is eaten
  if (snake[0].x === food.x && snake[0].y === food.y) {
    Score++;
    document.querySelector(".score").innerHTML = `Score:${Score}`;
    eat.play();
    snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y });

    let fy = Math.floor(Math.random() * 18 + 1);
    let fx = Math.floor(Math.random() * 18 + 1);

    food.x = fx;
    food.y = fy;
  }
}

//logic

window.requestAnimationFrame(gameLoop);
window.addEventListener("keydown", (e) => {
  // direc = { x: 1, y: 0 };
  console.log(e.key);

  switch (e.key) {
    case "w":
      bg.play();

      direc.x = 0;
      direc.y = -1;
      break;
    case "a":
      bg.play();

      direc.x = -1;
      direc.y = 0;
      break;
    case "s":
      bg.play();

      direc.x = 0;
      direc.y = 1;
      break;
    case "d":
      bg.play();
      direc.x = 1;
      direc.y = 0;
      break;

    default:
      break;
  }
});
