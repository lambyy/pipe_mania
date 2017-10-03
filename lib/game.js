import Board from './board';
import Pipe from './pipe';

class Game {
  constructor(ctx) {

    this.ctx = ctx;
    this.board = new Board;
    // console.log(this.board.checkEmpty([0,0]));
    // console.log(this.board);
    // console.log(this.board.checkEmpty([0,0]));
    // console.log(this.board);
    this.board.placePipe([0,0], new Pipe({ 'down': '', 'right': '', 'img': 5 }));
    this.board.placePipe([1,0], new Pipe({ 'down': '', 'left': '', 'img': 2}));
    this.board.placePipe([0, 1], new Pipe({ 'up': '', 'right': '', 'img': 4 }));
    this.board.placePipe([1,1], new Pipe({ 'up': '', 'left': '', 'img': 0 }));
    this.board.placePipe([2,1], new Pipe({ 'down': '', 'right': '', 'img': 5 }));
    this.board.placePipe([2,0], new Pipe({ 'up': '', 'down': '', 'img': 1 }));
    this.bindKeyHandlers();
  }

  bindKeyHandlers() {
    document.addEventListener("keydown", function(e) {
      this.board.updateSelectedPos(e.keyCode);
      this.draw();
    }.bind(this));
  }

  draw() {
    // this.ctx.clearRect(0, 0, 500, 500);
    this.board.draw(this.ctx);
  }
}

export default Game;
