import Board from './board';
import Pipe from './pipe';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.images = this._loadImages();

    this.level = 1;
    this.levelBoard = document.getElementById("level");
    this.scoreBoard = document.getElementById("score");
    this.result = document.getElementById("result");
    this.levelResult = document.getElementById("level-result");
    this.next = document.getElementById("next");
    this.target = document.getElementById("target");

    this.setupGame();
  }

  setupGame() {
    const sourcePos = this._randomSourcePos();
    const destinationPos = this._randomDestinationPos();

    this.board = new Board(this.images, sourcePos, destinationPos);
    this.pipeQueue = [new Pipe, new Pipe, new Pipe];
    this.board.placePipe(Pipe.source(), sourcePos);
    this.board.placePipe(Pipe.destination(), destinationPos);
    this.board.setCurrentPos();
    this.board.points = 0;
    this.scoreBoard.innerHTML = `Score: ${this.board.points}`;
    this.target.innerHTML = `Target: ${20 + 20 * this.level}`
    this.board.drawGrid(this.ctx);
    // this.board.drawDestinationBackground(this.ctx);
    this.draw();
  }



  _loadImages() {
    const images = [];
    for (let i = 0; i < 7; i++) {
      const img = document.getElementById(`pipe${i}`);
      images.push(img);
    }
    return images;
  }

  _randomSourcePos() {
    const y = Math.floor(Math.random() * 7);
    return [0, y];
  }

  _randomDestinationPos() {
    const x = Math.floor(Math.random() * 6) + 2;
    return [x, 7];
  }

  start() {
    this.bindKeyHandlers();
    this.board.points = 0;
    this.round();
  }

  round() {
    this.levelBoard.innerHTML = `Level ${this.level}`;
    this.draw();
    // referenced w3schools.com/howto/howto_js_progressbar.asp
    this.timerBar = document.getElementById("timerBar");
    let width = 1;
    this.timerInterval = setInterval(function() {
      if (width >= 100) {
        clearInterval(this.timerInterval);
      } else {
        width += 4;
        this.timerBar.style.width = width + '%';
      }
    }.bind(this), 1000);
    setTimeout(function() {
      this.checkWin();
    }.bind(this), 20000);
  }

  quickFinish() {
    clearInterval(this.timerInterval);
    clearInterval(this.flowInterval);
    this.checkWin(300);
  }

  checkWin(interval = 5000) {
    this.flowInterval = setInterval(function() {
      const won = this.board.checkWin(this.flowInterval);
      this.scoreBoard.innerHTML = `Score: ${this.board.points}`;
      this.draw();
      if (won === "winner") {
        if (this.board.points >= (20 + 20 * this.level)) {
          this.level += 1;
          this.levelResult.innerHTML = "Completed the level!";
          this.next.disabled = false;
          this.next.innerHTML = "Continue";
          this.result.classList.remove("hidden");
        } else {
          this.levelResult.innerHTML = `Needed ${20 + 20 * this.level} points to pass level!`;
          this.next.disabled = false;
          this.next.innerHTML = "Try Again!";
          this.result.classList.remove("hidden");
        }
      } else if (won === "game over") {
        this.level = 1;
        this.levelResult.innerHTML = "Game Over!";
        this.next.disabled = false;
        this.next.innerHTML = "Play Again";
        this.result.classList.remove("hidden");
      }
    }.bind(this), interval);
  }

  end() {
    clearInterval(this.timerInterval);
    clearInterval(this.flowInterval);
    // document.removeEventListener("keydown", this.bindFunction);
    this.ctx.clearRect(0, 0, 700, 500);
    this.timerBar.style.width = '1%';
  }

  bindKeyHandlers() {
    document.addEventListener("keydown", function(e) {
      this.board.updateSelectedPos(e.keyCode);
      if (e.keyCode === 32 && !this.board.checkPos()) {
        this.board.placePipe(this.pipeQueue.shift());
        this.pipeQueue.push(new Pipe);
      }
      this.draw();
    }.bind(this));
  }

  draw() {
    this.board.draw(this.ctx);

    this.pipeQueue.forEach( (pipe, y) => {
      const img = this.images[pipe.img];
      const xPos = 9 * Board.WIDTH;
      const yPos = y * Board.WIDTH + 1.5 * Board.WIDTH;
      this.ctx.clearRect(xPos, yPos, Board.WIDTH, Board.WIDTH);
      this.ctx.drawImage(img, xPos, yPos, Board.WIDTH, Board.WIDTH);
    });
  }
}

export default Game;
