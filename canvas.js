const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const beginningBoards = [
  [80, 0.5],
  [150, Math.random()],
  [250, Math.random()],
  [300, Math.random()],
  [370, Math.random()],
  [415, Math.random()],
  [500, Math.random()],
  [580, Math.random()],
];

// THE INVOKED FUNCTION ***
drawAll();
// ************************

function drawAll() {
  draw(beginningBoards);
}

function draw(beginningBoards) {
  let raf;
  const gravity = 0.14;
  const ball = {
    x: 200,
    y: 460,
    vx: 0,
    vy: 12,
    radius: 15,
    color: 'red',
    draw: function() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
    }
  };
  function redraw() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ball.vy += gravity;
    ball.x += ball.vx;
    ball.y += ball.vy;
    ball.draw();
    ball.vy += 0.14;
    ball.move = true;

   // ball bounces off bottom of canvas
    if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
      ball.vy = -ball.vy;
    }

    // ball wraps around to other side
    if (ball.x + ball.vx > canvas.width + 17) {
      ball.x = -17;
    } else if (ball.x + ball.vx < -17) {
      ball.x = canvas.width + 17;
    }

    // ball slows down itself from horizontal movement
    if (ball.vx < -0.2) {
      ball.vx += 0.2;
    } else if (ball.vx > 0.2) {
      ball.vx -= 0.2;
    } else {
      ball.vx = 0;
    }

    raf = window.requestAnimationFrame(redraw);

    const boardHeight = 10;
    const boardWidth = 95;
    const ystart = canvas.height - boardHeight;
    const xstart = 0;

    function drawBoard(y, x) {
      this.ypos = ystart - y;
      this.xpos = xstart + x;
      ctx.beginPath();
      ctx.rect(this.xpos, this.ypos, boardWidth, boardHeight);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
      if (ball.y > this.ypos - 15 && (ball.vy > 0)) {
        if(ball.x > this.xpos - 4 && ball.x < this.xpos +
          boardWidth + 4) {
            if (ball.y < this.ypos) {
              ball.vy = -ball.vy ;
          }
        }
      }
    }

    const xposMax = canvas.width - boardWidth;
    beginningBoards.forEach(coord => {
      drawBoard(coord[0], xposMax * coord[1]);
    });
  }

  raf = window.requestAnimationFrame(redraw);

  window.addEventListener("keydown", moveBall);

  function moveBall(e) {
    switch (e.keyCode) {
      case (37):
        ball.vx -= 4;
        break;
      case (39):
        ball.vx += 4;
        break;
      case (32):
        if (ball.move) {
          ball.move = false;
          window.cancelAnimationFrame(raf);
        } else if (ball.move === false) {
          ball.move = true;
          window.requestAnimationFrame(redraw);
        } break;
      default:
        return null;
    }
  }
  canvas.addEventListener('click', function(e) {
    if (ball.move) {
      ball.move = false;
      window.cancelAnimationFrame(raf);
    } else if (ball.move === false) {
      ball.move = true;
      window.requestAnimationFrame(redraw);
    }
   });
}

  //  canvas.addEventListener('mouseover', function(e) {
  //  }); 'mouseout' also a listener
