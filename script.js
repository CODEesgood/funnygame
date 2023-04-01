//get the rules button element 
//document query selector, id rules button
//attach a event click event 
//console logs hello

const ruleButton = document.getElementById("rules-btn");
console.log(ruleButton);
ruleButton.addEventListener("click", displayRule);

function displayRule(e) {
  const rule = document.getElementById("rules");
  rule.classList.add("show");
  e.preventDefault();
}

const closeButton = document.getElementById("close-btn");
closeButton.addEventListener("click", closeRules);

function closeRules(e){
  const rule = document.getElementById("rules");
  rule.classList.remove("show");
  e.preventDefault();
}


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

class blockGenerator{
  //in the parathesis of our constructor we are going to add values we wish to 
  //initialize this object
  constructor(x, y) { //creates the object
    this.x = x;
    this.y = y;

  }

  draw(){ //will draw our object
    ctx.beginPath();
    ctx.fillStyle = "#F9825E"; 
    ctx.fillRect(this.x, this.y, 75, 28);
    ctx.stroke();
    ctx.restore();

  }
  
  disappear(){}
  
  }  

const blockArray = []

xpos = 50;
ypos = 50;
for (let i = 0; i < 21  ; i++) {
  const myBlock = new blockGenerator(xpos, ypos);
  blockArray.push(myBlock)
  xpos = xpos + 100;
  if (xpos >= 700) {
    xpos = 50;
    ypos = ypos + 65;
  }

}

function drawBlocks(){
  blockArray.forEach (block => block.draw());
}






const paddle ={
    x : canvas.width / 2 - 40,
    y : canvas.height - 20,
    w : 80,
    h : 10,
    speed : 8,
    dx : 0
};

function keyDown(e){
  if (e.key === 'Right' || e.key === 'ArrowRight') {
    paddle.dx = paddle.speed;
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.dx = -paddle.speed;
  }
}

function keyUp(e){
  if (e.key === 'Right' || e.key === 'ArrowRight'){
    paddle.dx = 0;  
  } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
    paddle.dx = 0;
  }
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);


function drawPuddle(){
  console.log(paddle.x)
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}

function movePuddle(){
  paddle.x += paddle.dx;

  // Wall detection
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }

  if (paddle.x < 0) {
    paddle.x = 0;
  }
}






const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4
};

function drawBall(){
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = '#0095dd';
  ctx.fill();
  ctx.closePath();
}



function moveBall(){
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Wall collision (right/left)
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1; // ball.dx = ball.dx * -1
  }

  // Wall collision (top/bottom)
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1;
  }

  // console.log(ball.x, ball.y);

  // Paddle collision
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }

  for (let i = 0; i < blockArray.length; i++) {
    if (
      ball.x - ball.size > blockArray[i].x && // left brick side check
      ball.x + ball.size < blockArray[i].x + 75 && // right brick side check
      ball.y + ball.size > blockArray[i].y && // top brick side check
      ball.y - ball.size < blockArray[i].y + 28 // bottom brick side check
    ) {
      ball.dy *= -1;
      let newBlocks = []
     
      blockArray.splice(i,1);

     // increaseScore();
    }
  }
  /*//Brick collision
  blockArray.forEach(brick => {
  
    
        if (
          ball.x - ball.size > brick.x && // left brick side check
          ball.x + ball.size < brick.x + brick.w && // right brick side check
          ball.y + ball.size > brick.y && // top brick side check
          ball.y - ball.size < brick.y + brick.h // bottom brick side check
        ) {
          ball.dy *= -1;
          blockArray.pop(brick);

         // increaseScore();
        }
      

  });
*/


}







function update(){
  movePuddle(); 
  moveBall();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPuddle();
  drawBlocks();
  drawBall();
  requestAnimationFrame(update);
}

update();



// class flakeGenerator{
//   constructor(x, y){
//     this.x = x;
//     this.y = y;
//   }
  
//   draw(){ //will draw our object
//     ctx.beginPath();
//     ctx.fillStyle = "#3c6c91"; 
//     ctx.fillRect(this.x, this.y, 75, 28);
//     ctx.stroke();
//     ctx.restore();

//   }
  
//   disappear(){}

// }


// const flakeArray = []

// xpos = 150;
// ypos = 150;
// for (let i = 0; i < 5  ; i++) {
//   const myBlock = new blockGenerator(xpos, ypos);
//   blockArray.push(myBlock)
//   xpos = xpos + 100;
//   if (xpos >= 700) {
//     xpos = 70;
//     ypos = ypos + 75;
//   }



// }

// flakeArray.forEach (flakes => flakes.draw());


//hw for March 17: 
//Make another class for the platform that we can control from side to side.
//copy and paste the same class, but use 

// https://www.w3schools.com/graphics/game_controllers.asp 
  


// ctx.beginPath();
// ctx.arc(400, 350, 120, 0, 1 * Math.PI);
// ctx.stroke();
// ctx.closePath();
// ctx.beginPath();
// ctx.arc(200, 200, 50, 0, 1 * Math.PI);
// ctx.stroke();
// ctx.closePath();
// ctx.beginPath();
// ctx.arc(200, 200, 50, 0, 1 * Math.PI);
// ctx.stroke();
// ctx.lineTo(500, 250);
// ctx.stroke();







