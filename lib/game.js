import Board from './board';

class Game {
  constructor() {

    this.board = new Board;
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
