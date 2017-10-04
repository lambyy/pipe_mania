import Board from './board';
import Pipe from './pipe';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.images = this._loadImages();
    this.board = new Board(this.images);
    this.pipeQueue = [new Pipe, new Pipe, new Pipe];
    this.bindKeyHandlers();
    this.board.placePipe(Pipe.source());
  }

  _loadImages() {
    const images = [];
    for (let i = 0; i < 7; i++) {
      const img = document.createElement("img");
      img.src = `./assets/${i}.png`;
      images.push(img);
    }
    return images;
  }

  bindKeyHandlers() {
    document.addEventListener("keydown", function(e) {
      this.board.updateSelectedPos(e.keyCode);

      if (e.keyCode === 32 && this.board.checkSelectedEmpty()) {
        this.board.placePipe(this.pipeQueue.shift());
        this.pipeQueue.push(new Pipe);
      }
      this.draw();
    }.bind(this));
  }

  draw() {
    // this.ctx.clearRect(0, 0, 500, 500);
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
