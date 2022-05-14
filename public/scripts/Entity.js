import Animation from "./Animation.js"
import { Vec2D } from "./Math.js"

const RIGHT = 0

export default class Entity {
  constructor (id, data, sprites) {
    const sprite = sprites[data.type][data.name] || sprites[data.type]
    const state = sprite[data.state]
    this.id = id
    this.type = data.type
    this.name = data.name
    this.speed = data.speed || 5
    this.state = data.state
    this.direction = data.direction || RIGHT
    this.size = new Vec2D(state.width[0], state.height)
    this.position = new Vec2D(data.x, data.y)
    this.velocity = new Vec2D(0, 0)
    this.traits = new Map()
    this.animation = new Animation(state.length, state.animationRate)
    this.animation.setStates(sprite)
  }

  update(gameContext) {
    this.traits.forEach(trait => {
      trait.update(this, gameContext)
    })
  }

  draw (gameContext) {
    const { ctx, images, level } = gameContext
    const frame = this.animation.getFrame(gameContext, this)
    const dy = this.position.y + level.gravity
    const image = images[this.type+'_'+this.name]
    ctx.drawImage(image, frame.x, frame.y, frame.w, frame.h, this.position.x, dy, frame.w, frame.h)
  }

  setDirection (direction) {
    this.direction = direction
  }

  setState (state) {
    if (state !== this.state) {
      this.state = state
      this.animation.setAnimation(state)
    }
  }

  addTrait(trait) {
    this.traits.set(trait.constructor.name, trait)
  }
}
