// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  return  Math.floor(Math.random()*(max-min)) + min;
}

// function to draw a new ball on the canvas
function Ball(x, y, velX, velY, color, size) {
  this.x = x
  this.y = y
  this.velX = velX
  this.velY = velY
  this.color = color
  this.size = size
}

Ball.prototype.draw = function() {
  ctx.beginPath()
  ctx.fillStyle = this.color
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
  ctx.fill()
}

Ball.prototype.update = function() {
  if (this.y + this.size >= height)
    this.velY = -(this.velY)
  if (this.y - this.size <= 0)
    this.velY = -(this.velY)
  if (this.x + this.size >= width)
    this.velX = -(this.velX)
  if (this.x - this.size <= 0)
    this.velX = -(this.velX)    

  this.y += this.velY
  this.x += this.velX
}

Ball.prototype.detectCollision = function() {
  balls.forEach(ball => {
    if (ball === this) return 

    const dx = this.x - ball.x;
    const dy = this.y - ball.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.size + ball.size) {
      ball.color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
    }
  })
}

const numberOfBalls = 40
const balls = []
for (let i = 1; i <= numberOfBalls; i++) {
  let size = random(10, 20)
  const ball = new Ball(
    random(size, width - size), 
    random(size, height - size), 
    random(1, 7), 
    random(1, 7), 
    `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`,
    size
  )

  balls.push(ball)
}

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  balls.forEach(ball => {
    ball.draw()
    ball.update()
    ball.detectCollision()
  })

  requestAnimationFrame(loop)
}

loop()