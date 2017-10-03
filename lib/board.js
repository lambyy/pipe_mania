class Board {
  constructor() {

    this.selectPos = [0, 0];
    this.grid = this._makegrid();
    // console.log(this.selectPos, this.grid[0][0]);
  }

  _makegrid() {
    const grid = [];

    for (let i = 0; i < 8; i++) {
      grid.push(["", "", "", "", "", "", "", ""]);
    }

    return grid;
  }

  placePipe(pos, pipe) {
    if (this.checkEmpty(pos)) {
      this.grid[pos[0]][pos[1]] = pipe;
    } else {
      console.log("Not empty");
    }
  }

  checkEmpty(pos) {
    console.log(this.grid[pos[0]][pos[1]] === "");
    return this.grid[pos[0]][pos[1]] === "";
  }

  updateSelectedPos(keyCode) {
    if (keyCode === 32) {
      console.log("select pos", this.selectPos);
    }
    const move = Board.MOVES[keyCode];

    if (move) {
      const moveX = (this.selectPos[0] + move[0]) % 8;
      const moveY = (this.selectPos[1] + move[1]) % 8;
      this.selectPos = [moveX, moveY];
      console.log(this.selectPos);
    }
  }

  drawGrid(ctx, x, y) {
    ctx.strokeStyle = 'blue';
    ctx.rect(x, y, Board.WIDTH, Board.WIDTH);
    ctx.stroke();
  }

  drawPipe(ctx, x, y) {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(x, y, Board.WIDTH, Board.WIDTH);
  }

  draw(ctx) {
    this.grid.forEach( (row, x) => {
      row.forEach( (column, y) => {
        if (column !== "") {
          this.drawPipe(ctx, Board.WIDTH * x, Board.WIDTH * y);
        } else {
          this.drawGrid(ctx, Board.WIDTH * x, Board.WIDTH * y);
        }
      });
    });
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    const x = this.selectPos[0] * Board.WIDTH;
    const y = this.selectPos[1] * Board.WIDTH;
    ctx.fillRect(x, y, Board.WIDTH, Board.WIDTH);
  }
}

Board.MOVES = {
  38: [0, -1],
  37: [-1, 0],
  40: [0, 1],
  39: [1, 0]
};

Board.WIDTH = 50;

export default Board;
