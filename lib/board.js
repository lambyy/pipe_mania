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
    this.dirt = document.getElementById("dirt")
  }

  _makeGrid() {
    const grid = [];

    for (let i = 0; i < 8; i++) {
      grid.push(["", "", "", "", "", "", "", ""]);
    }

    return grid;
  }

  placePipe(pipe, pos = this.selectPos) {
    // if (this.checkSelectedEmpty(pos)) {
    this.grid[pos[0]][pos[1]] = pipe;
    // } else {
    //   console.log("Not empty");
    // }
  }

  checkSelectedEmpty(pos = this.selectPos) {
    return this.grid[pos[0]][pos[1]] === "";
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

  checkWin() {
    let win = false;
    let currentPos = this.sourcePos;
    let currentPipe = this.grid[currentPos[0]][currentPos[1]];

    while (!win) {
      let flowDir = currentPipe.getFlowDir('out');
      let move = Pipe.MOVES[flowDir];
      let nextPos = [currentPos[0] + move[0], currentPos[1] + move[1]];
      console.log(nextPos);
      // debugger;
      let nextPipe = this.grid[nextPos[0]][nextPos[1]];

      if (nextPipe && currentPipe.checkConnection(nextPipe)) {
        nextPipe.resetFlow();
        console.log(nextPipe.flow);
        this.points += 10;
        if (nextPos[0] === this.destinationPos[0]
          && nextPos[1] === this.destinationPos[1]) {
            win = true;
          }
        let flowIn = Pipe.complement(flowDir);
        nextPipe.setFlowIn(flowIn);
        let flowOut = nextPipe.getFlowDir("");
        if (flowOut) {
          nextPipe.setFlowOut(flowOut);
        }
        nextPipe.fill = true;

        currentPos = nextPos;
        currentPipe = nextPipe;

      } else {
        return "game over";
      }
    }

    return "won";
  }

  drawGrid(ctx, x, y) {
    ctx.strokeStyle = 'black';
    ctx.rect(x, y, Board.WIDTH, Board.WIDTH);
    ctx.stroke();
    ctx.drawImage(this.dirt, x, y, Board.WIDTH, Board.WIDTH);
  }

  drawPipe(ctx, pipe, x, y) {
    if (pipe.fill) {
      ctx.fillStyle = '#6EAAE7';
      ctx.fillRect(x, y, Board.WIDTH, Board.WIDTH);
    }
    ctx.drawImage(this.images[pipe.img], x, y, Board.WIDTH, Board.WIDTH);
  }

  draw(ctx) {
    ctx.fillStyle = "#DF2A2A";
    const destinationX = this.destinationPos[0] * Board.WIDTH;
    const destinationY = this.destinationPos[1] * Board.WIDTH;
    ctx.fillRect(destinationX, destinationY, Board.WIDTH, Board.WIDTH);
    ctx.clearRect(this.prevSelect[0], this.prevSelect[1], Board.WIDTH, Board.WIDTH);
    this.grid.forEach( (row, x) => {
      row.forEach( (pipe, y) => {
        if (pipe !== "") {
          this.drawPipe(ctx, pipe, Board.WIDTH * x, Board.WIDTH * y);
        } else {
          this.drawGrid(ctx, Board.WIDTH * x, Board.WIDTH * y);
        }
      });
    });
    ctx.fillStyle = 'rgba(231, 110, 110, 0.5)';
    const x = this.selectPos[0] * Board.WIDTH;
    const y = this.selectPos[1] * Board.WIDTH;
    ctx.fillRect(x, y, Board.WIDTH, Board.WIDTH);
    this.prevSelect = [x, y];
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
