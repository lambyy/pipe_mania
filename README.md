# Pipe Mania

### Background & Overview

Pipe mania is a one-player puzzle game. The goal of the game is to connect a water source to its destination before time runs out and waters starts flowing. Players drop pipe sections onto the board in order to direct the flow. The longer the circuit, the more points the player scores. 

Pipe sections are randomly generated and a queue of the next three sections can be seen on the side of the grid. The player can navigate the board using arrow keys and spacebar to place the section. Pipe sections can not overlap or be discarded. Once time runs out, water begins flowing through the pipes until it reaches its destination or a dead end. The player completes the level if they are able to connect to the destination and score a minimum number of points with their circuit.

### Functionality & MVP

In Pipe Mania, players will be able to:

* Nagivate the board using arrow keys & select a position to drop pipe sections using spacebar
* See a queue of the next three pipe sections
* Score points for each section of pipe used in their circuit
* Restart the game

The game will:

* Randomly generate pipe sections in the queue
* Randomly generate source and destination positions
* Determine if pipes are properly connected and declare if the player has won

### Wireframes

This app will have a single screen showing the board, a timer, the pipe section queue, the player's score and the level. A modal with the game instructions will pop up upon loading and will close when the player chooses 'start'. Once the game starts, the player has the option to restart the game, or hit 'finish' to increase the flow rate and complete the level.

![](https://github.com/lambyy/pipe_mania/blob/master/assets/Gameplay.png)

### Architecture & Technologies

This project will be implemented using:

* Vanilla JS for overall structure and game logic
* HTML5 Canvas for DOM manipulation and rendering
* Webpack to bundle and serve up various scripts

### Implementation Timeline

Day 1: Setup project with necessary Node modules, including configuring webpack and creating a package.json file. Write a basic entry file. Start building basic `board.js` with navigation and selection.

Day 2: Finish building `board.js` and rendering it to the screen. Create `pipe.js` pieces that handle pipe flow direction logic and has 6 variations of pipe sections.

Day 3: Combine `board.js` and `pipe.js` into a `game.js` file. `game.js` handles pipe flow logic, whether pipe sections are properly connected to allow flow.

Day 4: Put it all together, including calculating score, timer and level.


