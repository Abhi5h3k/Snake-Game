const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//create the unit
const box = 32; //px

//load images
const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

const gameOver = new Image();
gameOver.src = "img/abhi-game-over.png";

const playAgain = new Image();
playAgain.src = "img/abhi-play-again.png";

const snakeHead = new Image();
snakeHead.src = "img/s3.png";

const snakeScale = new Image();
snakeScale.src = "img/scale.png";

//load audio files
const dead =  new Audio();
const eat =  new Audio();
const up =  new Audio();
const left =  new Audio();
const right =  new Audio();
const down =  new Audio();
const over =  new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
left.src = "audio/left.mp3";
right.src = "audio/right.mp3";
down.src = "audio/down.mp3";
over.src = "audio/game-over.mp3";

//create the snake
let snake = [];
snake[0] = {
  x : 9 * box,
  y : 10 * box
}

//create the food
let food = {
  x: Math.floor(Math.random()*17+1) * box,
  y: Math.floor(Math.random()*15+3) * box
}

//create the score var
let score = 0;

//control the snake
let d;
document.addEventListener("keydown", direction);

function direction(event){
  let key = event.keyCode;
  if( key == 37 && d != "RIGHT"){
    left.play();
    d = "LEFT";
  } else if( key == 38 && d != "DOWN"){
    up.play();
    d = "UP";
  } else if( key == 39 && d != "LEFT"){
    d = "RIGHT";
    right.play();
	
  } else if( key == 40 && d != "UP"){
    d = "DOWN";
    down.play();
  }
  else if( key == 32){
    location.reload();
  }
}

//check collision function
function collision(head, array){
  for(let i = 0; i < array.length; i++){
    if(head.x == array[i].x && head.y == array[i].y){
      return true;
    }
  }
  return false;
}

//draw everything to the canvas
function draw() {
  ctx.drawImage(ground,0,0);
  
  for(let i = 0; i < snake.length; i++){
    
	if(i==0)
	ctx.drawImage(snakeHead,snake[i].x, snake[i].y,30,30);
	else{
    ctx.drawImage(snakeScale,snake[i].x, snake[i].y,30,30);
	}
    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  ctx.drawImage(foodImg, food.x, food.y);

  //old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  //which direction
  if(d == "LEFT") snakeX -= box;
  if(d == "UP") snakeY -= box;
  if(d == "RIGHT") snakeX += box;
  if(d == "DOWN") snakeY += box;

  //if the snake eats the food
  if(snakeX == food.x && snakeY == food.y){
    score++;
    eat.play();
    food = {
      x: Math.floor(Math.random()*17+1) * box,
      y: Math.floor(Math.random()*15+3) * box
    }
    //we don't remove the tail
  }else{
    //remove the tail
    snake.pop();
  }


  //add new head
  let newHead = {
    x : snakeX,
    y : snakeY
  }

  //game over
  if(snakeX < box || snakeX > 17*box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)) {
    clearInterval(game);
    dead.play();
	over.play();

   	ctx.drawImage(gameOver,3 * box, 7*box);
	ctx.drawImage(playAgain,5 * box,10 *box,300	,50);
  }

  snake.unshift(newHead);

  ctx.fillStyle = "white";
  ctx.font = "45px Change one";
  ctx.fillText(score,2*box,1.6*box);
  
}

// call draw function every 100 ms
let game = setInterval(draw,100);

