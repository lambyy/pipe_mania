import Board from './board';
import Pipe from './pipe';

class Game {
  constructor() {

    this.board = new Board;
    console.log(this.board.checkEmpty([0,0]));
    console.log(this.board);
    this.board.placePipe([0,0], new Pipe);
    console.log(this.board.checkEmpty([0,0]));
    console.log(this.board);
  }
}

export default Game;

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("board");
  canvasEl.width = 500;
  canvasEl.height = 500;

  const ctx = canvasEl.getContext("2d");
  ctx.fillStyle = "purple";
  ctx.fillRect(0, 0, 500, 500);

  new Game();
});
