import Board from './board';
import Pipe from './pipe';

class Game {
  constructor(ctx) {

    this.ctx = ctx;
    this.board = new Board;
    // console.log(this.board.checkEmpty([0,0]));
    // console.log(this.board);
    this.board.placePipe([0,0], new Pipe);
    // console.log(this.board.checkEmpty([0,0]));
    // console.log(this.board);
    // this.board.placePipe([0,0], new Pipe);
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
