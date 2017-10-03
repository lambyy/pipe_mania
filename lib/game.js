import Board from './board';
import Pipe from './pipe';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.board = new Board;
    this.pipeQueue = [new Pipe, new Pipe, new Pipe];

    // this.board.placePipe([0,0], new Pipe({ 'down': '', 'right': '', 'img': 5 }));
    // this.board.placePipe([1,0], new Pipe({ 'down': '', 'left': '', 'img': 2}));
    // this.board.placePipe([0, 1], new Pipe({ 'up': '', 'right': '', 'img': 4 }));
    // this.board.placePipe([1,1], new Pipe({ 'up': '', 'left': '', 'img': 0 }));
    // this.board.placePipe([2,1], new Pipe({ 'down': '', 'right': '', 'img': 5 }));
    // this.board.placePipe([2,0], new Pipe({ 'up': '', 'down': '', 'img': 1 }));
    this.bindKeyHandlers();
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
    // this.ctx.clearRect(0, 0, 500, 500);
    this.board.draw(this.ctx);
  }
}

export default Game;
