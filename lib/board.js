import Pipe from './pipe';

class Board {
  constructor(images, sourcePos, destinationPos) {

    this.grid = this._makeGrid();
    this.selectPos = [0, 0];
    this.prevSelect = [0, 0];
    this.sourcePos = sourcePos;
    this.destinationPos = destinationPos;
    this.points = 0;
    this.images = images;
    this.dirt = document.getElementById("dirt");
  }

  _makeGrid() {
    const grid = [];

    for (let i = 0; i < 8; i++) {
      grid.push(["", "", "", "", "", "", "", ""]);
    }

    return grid;
  }

  setCurrentPos() {
    this.currentPos = this.sourcePos;
    this.currentPipe = this.grid[this.currentPos[0]][this.currentPos[1]];
  }

  placePipe(pipe, pos = this.selectPos) {
    if (!this.checkPos()) {
    this.grid[pos[0]][pos[1]] = pipe;
    } else {
      console.log("Can't put here");
    }
  }

  checkPos(pos = this.selectPos) {
    const source = Board.posEquals(pos, this.sourcePos);
    const destination = Board.posEquals(pos, this.destinationPos);
    return (source || destination);
  }

  updateSelectedPos(keyCode) {
    if (keyCode === 32) {
      console.log("select pos", this.selectPos);
    }
    const move = Board.MOVES[keyCode];

    if (move) {
      let moveX = (this.selectPos[0] + move[0]) % 8;
      let moveY = (this.selectPos[1] + move[1]) % 8;
      if (moveX < 0) moveX = 7;
      if (moveY < 0) moveY = 7;
      this.selectPos = [moveX, moveY];
      console.log(this.selectPos);
    }
  }

  checkWin(interval) {

    let flowDir = this.currentPipe.getFlowDir('out');
    let move = Pipe.MOVES[flowDir];
    let nextPos = [this.currentPos[0] + move[0], this.currentPos[1] + move[1]];
    let nextPipe = this.grid[nextPos[0]][nextPos[1]];

    if (nextPipe && this.currentPipe.checkConnection(nextPipe)) {
      nextPipe.resetFlow();
      this.points += 10;
      let flowIn = Pipe.complement(flowDir);
      nextPipe.setFlowIn(flowIn);
      let flowOut = nextPipe.getFlowDir("");
      if (flowOut) {
        nextPipe.setFlowOut(flowOut);
      }
      nextPipe.fill = true;

      this.currentPos = nextPos;
      this.currentPipe = nextPipe;

      if (nextPos[0] === this.destinationPos[0]
        && nextPos[1] === this.destinationPos[1]) {
          clearInterval(interval);
          console.log("winner");
          return "winner";
        }
    } else {
      clearInterval(interval);
      console.log("game over");
      return "game over";
    }
    return "continue";
  }

  drawGrid(ctx) {
    this.grid.forEach( (row, x) => {
      row.forEach( (pipe, y) => {
        const xPos = x * Board.WIDTH;
        const yPos = y * Board.WIDTH;
        const width = Board.WIDTH;
        // ctx.strokeStyle = 'black';
        // ctx.rect(xPos, yPos, width, width);
        // ctx.stroke();
        ctx.drawImage(this.dirt, xPos, yPos, width, width);
      });
    });
  }

  drawPipe(ctx, pipe, x, y) {
    let fillColor = 'white';
    if (this.checkPos([x, y])) {
      fillColor = '#DF2A2A';
    } else if (pipe.fill) {
      fillColor = '#6EAAE7';
    }
    const width = Board.WIDTH;
    const xPos = x * width;
    const yPos = y * width;
    ctx.fillStyle = fillColor;
    ctx.fillRect(xPos, yPos, width, width);
    ctx.drawImage(this.images[pipe.img], xPos, yPos, width, width);
  }

  drawDestinationBackground(ctx) {
    ctx.fillStyle = "#DF2A2A";
    const destinationX = this.destinationPos[0] * Board.WIDTH;
    const destinationY = this.destinationPos[1] * Board.WIDTH;
    ctx.fillRect(destinationX, destinationY, Board.WIDTH, Board.WIDTH);
  }

  draw(ctx) {
    const width = Board.WIDTH;
    ctx.clearRect(this.prevSelect[0], this.prevSelect[1], width, width);
    ctx.drawImage(this.dirt, this.prevSelect[0], this.prevSelect[1], width, width);
    this.grid.forEach( (row, x) => {
      row.forEach( (square, y) => {
        if (square !== "") {
          this.drawPipe(ctx, square, x, y);
        }
      });
    });
    ctx.fillStyle = 'rgba(231, 110, 110, 0.5)';
    const x = this.selectPos[0] * width;
    const y = this.selectPos[1] * width;
    ctx.fillRect(x, y, width, width);
    this.prevSelect = [x, y];
  }

  static posEquals(pos1, pos2) {
    return (pos1[0] === pos2[0] && pos1[1] === pos2[1]);
  }
}

Board.MOVES = {
  38: [0, -1],
  37: [-1, 0],
  40: [0, 1],
  39: [1, 0]
};

Board.WIDTH = 60;

export default Board;
