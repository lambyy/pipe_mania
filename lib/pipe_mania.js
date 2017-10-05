import Game from './game';

document.addEventListener("DOMContentLoaded", function(){
  const board = document.getElementById("board");
  board.width = 600;
  board.height = 500;

  const ctx = board.getContext("2d");

  let game = new Game(ctx);
  const instructions = document.getElementById("instructions");
  const content = document.getElementById("content");
  const timer = document.getElementById("timerProgress");
  const start = document.getElementById("start");
  const restart = document.getElementById("restart");
  start.addEventListener("click", (e) => {
    e.preventDefault();
    instructions.classList.add("hidden");
    timer.classList.remove("hidden");
    content.classList.remove("hidden");
    restart.disabled = false;
    start.disabled = true;
    game.start();
  });

  restart.addEventListener("click", (e) => {
    e.preventDefault();
    restart.disabled = true;
    game.end();
    game.setupGame();
    game.round();
    restart.disabled = false;
  });
});
