import Game from './game';

document.addEventListener("DOMContentLoaded", function(){
  const board = document.getElementById("board");
  board.width = 600;
  board.height = 600;

  const ctx = board.getContext("2d");
  // ctx.fillStyle = "purple";
  // ctx.fillRect(0, 0, 500, 500);

  const game = new Game(ctx);
  game.draw();
});
