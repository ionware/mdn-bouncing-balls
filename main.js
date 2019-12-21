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
class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x
    this.y = y
    this.velX = velX
    this.velY = velY
    this.color = color
    this.size = size
  }

  draw() {
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
    ctx.fill()
  }

  update() {
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

  detectCollision(balls) {
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

  static getBalls(amount = 20) {
    const balls = []

    for (let i = 1; i <= amount; i++) {
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

    return balls
  }
}

function loop(balls) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  balls.forEach(ball => {
    ball.draw()
    ball.update()
    ball.detectCollision(balls)
  })

  requestAnimationFrame(() => loop(balls))
}

loop(Ball.getBalls(15))
