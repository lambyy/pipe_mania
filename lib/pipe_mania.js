import Game from './game';

document.addEventListener("DOMContentLoaded", function(){
  const board = document.getElementById("board");
  board.width = 650;
  board.height = 500;

  const ctx = board.getContext("2d");

  let game = new Game(ctx);
  const pipeMania = document.getElementById("pipe-mania");
  const instructions = document.getElementById("instructions");
  const content = document.getElementById("content");
  const timer = document.getElementById("timerProgress");
  const start = document.getElementById("start");
  const restart = document.getElementById("restart");
  const quickFinish = document.getElementById("quick-finish");

  start.addEventListener("click", (e) => {
    e.preventDefault();
    pipeMania.removeChild(instructions);
    timer.classList.remove("hidden");
    content.classList.remove("hidden");
    start.disabled = true;
    game.start();
  });

  restart.addEventListener("click", (e) => {
    e.preventDefault();
    game.end();
  });

  quickFinish.addEventListener("click", (e) => {
    e.preventDefault();
    game.finishLevel();
  });

  const result = document.getElementById("result");
  const next = document.getElementById("next");
  next.addEventListener("click", (e) => {
    e.preventDefault();
    result.classList.add("hidden");
    next.disabled = true;
    game.setupGame();
    game.round();
    game.disableRestart(false);
  });
});
