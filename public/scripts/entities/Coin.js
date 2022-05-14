import Animation from "../Animation.js"
import { Vec2D } from "../Math.js"

export default class Coin {
  constructor (id, data, sprite) {
    const state = sprite.default
    this.id = id
    this.type = 'coin'
    this.state = 'default'
    this.direction = 0
    this.position = new Vec2D(data.x, data.y)
    this.size = new Vec2D(state.width[0], state.height)
    this.animation = new Animation(state.length, state.animationRate)
    this.animation.setStates(sprite)
  }

  draw ({ ctx, images }) {
    const frame = this.animation.getFrame(null, this)
    const image = images.coin
    ctx.drawImage(image, frame.x, frame.y, frame.w, frame.h, this.position.x, this.position.y, frame.w, frame.h)
  }
}
