import Pipe from './pipe';

class Board {
  constructor() {

    this.selectPos = [0, 0];
    this.grid = this._makegrid();
    console.log(this.selectPos);
    this.bindKeyHandlers();
    
  }

  _makegrid() {
    const grid = [];

    for (let i = 0; i < 8; i++) {
      grid.push(new Array(8));
    }

    return grid;
  }

  bindKeyHandlers() {
    document.addEventListener("keydown", function(e) {
      if (e.keyCode === 32) {
        console.log("select pos", this.selectPos);
      }
      const move = Board.MOVES[e.keyCode];

      if (move) {
        const moveX = (this.selectPos[0] + move[0]) % 8;
        const moveY = (this.selectPos[1] + move[1]) % 8;
        this.selectPos = [moveX, moveY];
        console.log(this.selectPos);
      }
    }.bind(this));
  }
}

Board.MOVES = {
  38: [0, -1],
  37: [-1, 0],
  40: [0, 1],
  39: [1, 0]
};

export default Board;
