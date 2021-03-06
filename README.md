# Pipe Mania

[Live](https://lambyy.github.io/pipe_mania/)

Pipe Mania is a one-player puzzle game built with JavaScript and Canvas. The goal is to use pipe sections to connect a water source to its destination before time runs out and waters starts flowing.

![](https://github.com/lambyy/pipe_mania/blob/master/docs/Instructions.png)

## Features

### Pipes

Pipe sections are a key feature of this game. In Pipe Mania, there are six possible types of pipe sections that can appear. These sections all have different orientations but share the same behavior on the board. In order implement more modular code, I created a Pipe class that randomly generates the different sections. Each instance of Pipe keeps track of the two directions they can direct flow. To evaluate whether two Pipes form a valid connection, I wrote a method `#checkConnection` that will determine the outward flow direction of the Pipe and check if the other Pipe is capable of the complementary flow direction. For example, a Pipe that directs the flow down can only make a valid connection with a Pipe that can receive flow from an up direction.

``````
class Pipe {
  constructor(flow = Pipe.random()) {
    this.flow = flow;
    this.img = flow.img;
    this.fill = false;
  }

checkConnection(otherPipe) {
    const dir1 = this.getFlowDir('out');
    const dir2 = Pipe.complement(dir1);
    return otherPipe.flow.hasOwnProperty(dir2);
  }
}

Pipe.SECTIONS = [
  { 'up': '', 'down': '', 'img': 1 },
  { 'left': '', 'right': '', 'img': 0 },
  { 'up': '', 'left': '', 'img': 3 },
  { 'up': '', 'right': '', 'img': 4 },
  { 'down': '', 'left': '', 'img': 2},
  { 'down': '', 'right': '', 'img': 5 }
];
``````
### Board

The Board class in Pipe Mania handles the logic for tracking flow through Pipes, displaying the board, and determining completion of the round. Starting at the source, Board finds the next position on the grid that the current Pipe leads to. It then evaluates if the pipe at the next position forms a valid connection with the current Pipe using `Pipe#checkConnection`. If it does, Board repeats the evaluation for each subsequent Pipe until it reaches the destination or is unable to form a valid connection.

`````
checkWin(interval) {
    let flowDir = this.currentPipe.getFlowDir('out');
    let move = Pipe.MOVES[flowDir];
    let nextPos = [this.currentPos[0] + move[0], this.currentPos[1] + move[1]];
    let nextPipe;
    if (this.boundary(nextPos)) {
      nextPipe = this.grid[nextPos[0]][nextPos[1]];
    }

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
          return "winner";
        }
    } else {
      clearInterval(interval);
      return "game over";
    }
    return "continue";
  }
`````

### Game

The Game class joins together Pipes and Board to create Pipe Mania. Game keeps an array of the next three Pipe sections to be put on the Board. Using keyboard event listeners, Game updates the current selected position on the Board and determines whether the grid position is available for the player to place a new Pipe section. Game also controls the timer to countdown time until water begins flowing and calls Board to evaulate the result of the round once this time runs out. Based on the result from Board, Game allows players to continue on the to next level, retry a level, or play again starting from the first level.

``````
class Game {
  bindKeyHandlers() {
      document.addEventListener("keydown", function(e) {
        this.board.updateSelectedPos(e.keyCode);
        if (e.keyCode === 32 && !this.board.checkPos()) {
          this.board.placePipe(this.pipeQueue.shift());
          this.pipeQueue.push(new Pipe);
        }
        this.draw();
      }.bind(this));
    }
  }
  ``````
![](https://github.com/lambyy/pipe_mania/blob/master/docs/GameRound.png)
