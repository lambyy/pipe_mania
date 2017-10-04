import Game from './game';

document.addEventListener("DOMContentLoaded", function(){
  const board = document.getElementById("board");
  board.width = 600;
  board.height = 600;

  const ctx = board.getContext("2d");

  const start = document.getElementById("start");
  start.addEventListener("click", (e) => {
    e.preventDefault();
    start.disabled = true;
    const game = new Game(ctx);
    game.start();
  });
});
