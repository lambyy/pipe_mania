class Pipe {
  constructor(flow = Pipe.random()) {
    this.flow = flow;
    this.img = flow.img;
    this.fill = false;
  }

  setFlowIn(dir) {
    this.flow[dir] = "in";
  }

  setFlowOut(dir) {
    this.flow[dir] = "out";
  }

  checkConnection(otherPipe) {
    const dir1 = this.getFlowDir('out');
    const dir2 = this.complement(dir1);
    return otherPipe.flow.hasOwnProperty(dir2);
  }

  getFlowDir(flow) {
    return Object.keys(this.flow).find(key => this.flow[key] === flow);
  }

  complement(dir) {
    switch (dir) {
      case 'up': return 'down';
      case 'down': return 'up';
      case 'left': return 'right';
      case 'right': return 'left';
      default: return "";
    }

  }

  static source() {
    return new Pipe({ 'right': 'out', img: 6 });
  }

  static destination() {
    return new Pipe({ 'up': 'in', img: 1 });
  }

  static random() {
    return Pipe.SECTIONS[Math.floor(Math.random() * Pipe.SECTIONS.length)];
  }
}

Pipe.SECTIONS = [
  { 'up': '', 'down': '', 'img': 1 },
  { 'left': '', 'right': '', 'img': 0 },
  { 'up': '', 'down': '', 'img': 1 },
  { 'left': '', 'right': '', 'img': 0 },
  { 'up': '', 'left': '', 'img': 3 },
  { 'up': '', 'right': '', 'img': 4 },
  { 'down': '', 'left': '', 'img': 2},
  { 'down': '', 'right': '', 'img': 5 }
];

Pipe.MOVES = {
  'up': [0, -1],
  'down': [0, 1],
  'left': [-1, 0],
  'right': [1, 0]
};

export default Pipe;
