import Board from './board';
import Pipe from './pipe';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.images = this._loadImages();
    this.setupGame();

    this.bindKeyHandlers();
  }

  setupGame() {
    const sourcePos = this._randomSourcePos();
    const destinationPos = this._randomDestinationPos();

    this.board = new Board(this.images, sourcePos, destinationPos);
    this.pipeQueue = [new Pipe, new Pipe, new Pipe];
    this.board.placePipe(Pipe.source(), sourcePos);
    this.board.placePipe(Pipe.destination(), destinationPos);
    this.board.setCurrentPos();
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
      this.flowInterval = setInterval(function() {
        this.board.checkWin(this.flowInterval);
        this.draw();
      }.bind(this), 5000);
    }.bind(this), 20000);

  }

  end() {
    clearInterval(this.timerInterval);
    clearInterval(this.flowInterval);
    this.ctx.clearRect(0, 0, 600, 600);
    this.timerBar.style.width = '1%';
  }

  bindKeyHandlers() {
    document.addEventListener("keydown", function(e) {
      this.board.updateSelectedPos(e.keyCode);
      if (e.keyCode === 32) {
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
      const yPos = y * Board.WIDTH + Board.WIDTH;
      this.ctx.clearRect(xPos, yPos, Board.WIDTH, Board.WIDTH);
      this.ctx.drawImage(img, xPos, yPos, Board.WIDTH, Board.WIDTH);
    });
  }
}

export default Game;
