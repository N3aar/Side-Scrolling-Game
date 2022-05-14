import { Vec2D } from "./Math.js"

export class GenericObject {
  constructor (type, x, y, width, height, dx, dy) {
    this.type = type
    this.position = new Vec2D(x, y),
    this.size = new Vec2D(width, height)

    if (dy >= 0 && dx >= 0) {
      this.drawPosition = new Vec2D(dx, dy)
    }
  }

  draw ({ ctx, images }) {
    ctx.drawImage(images[this.type], this.drawPosition.x, this.drawPosition.y, this.size.x, this.size.y, this.position.x, this.position.y, this.size.x, this.size.y)
  }
}

export class InteractiveObject extends GenericObject {
  constructor (type, state, x, y, width, height) {
    super(type, x, y, width, height)
    this.state = state
    this.states = new Map()
  }

  draw ({ ctx, images }) {
    const state = this.getState()
    ctx.drawImage(images.objects, state.x, state.y, state.width, state.height, this.position.x, this.position.y, state.width, state.height)
  }

  setState (state) {
    const data = this.getState(state)
    const acc = this.size.y !== data.height
    const cy = acc && (this.size.y > data.height ? this.size.y - data.height : -(data.height - this.size.y))

    this.state = state
    this.size.set(data.width, data.height)

    if (acc) {
      this.position.setY(this.position.y + cy)
    }
  }

  getState (state = this.state) {
    return this.states.get(state)
  }

  setStates (states) {
    for (const name in states) {
      this.states.set(name, states[name])
    }
  }
}
