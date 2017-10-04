import Game from './game';

document.addEventListener("DOMContentLoaded", function(){
  const board = document.getElementById("board");
  board.width = 600;
  board.height = 600;

  const ctx = board.getContext("2d");

  let game = new Game(ctx);
  const start = document.getElementById("start");
  const restart = document.getElementById("restart");
  start.addEventListener("click", (e) => {
    // console.log(e);
    e.preventDefault();
    start.disabled = true;
    game.start();
  });

  restart.addEventListener("click", (e) => {
    e.preventDefault();
    restart.disabled = true;
    game.end();
    game.setupGame();
    game.start();
    restart.disabled = false;
  });
});
