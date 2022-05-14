export class Vec2D {
  constructor(x, y) {
    this.set(x, y)
  }

  set(x, y) {
    this.setX(x)
    this.setY(y)
  }

  setX (x) {
    this.x = x
  }

  setY (y) {
    this.y = y
  }
}
