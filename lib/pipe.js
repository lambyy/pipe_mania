class Pipe {
  constructor(flow = Pipe.random()) {
    this.flow = flow;
  }

  setFlowIn(dir) {
    this.flow[dir] = "in";
  }

  setFlowOut(dir) {
    this.flow[dir] = "out";
  }

  checkMatch(otherPipe) {
    const dir1 = this.getFlowDir('out');
    const dir2 = otherPipe.getFlowDir('in');
    return this.complement(dir1, dir2);
  }

  getFlowDir(flow) {
    return Object.keys(this.flow).find(key => this.flow[key] === flow);
  }

  complement(dir1, dir2) {
    const move1 = Pipe.MOVES[dir1];
    const move2 = Pipe.MOVES[dir2];
    return ( move1[0] + move2[0] === 0 && move1[1] + move2[1] === 0 );
  }

  static source() {
    return new Pipe({ 'right': 'out' });
  }

  static destination() {
    return new Pipe({ 'up': 'in' });
  }

  static random() {
    return Pipe.SECTIONS[Math.floor(Math.random() * Pipe.SECTIONS.length)];
  }
}

Pipe.SECTIONS = [
  { 'up': '', 'down': '' },
  { 'left': '', 'right': '' },
  { 'up': '', 'left': '' },
  { 'up': '', 'right': '' },
  { 'down': '', 'left': '' },
  { 'down': '', 'right': '' }
];

Pipe.MOVES = {
  'up': [0, -1],
  'down': [0, 1],
  'left': [-1, 0],
  'right': [1, 0]
};

export default Pipe;
