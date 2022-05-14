import { Vec2D } from "./Math.js"

export class Platform {
  constructor (type, x, y, width, height, dx, dy) {
    this.type = type
    this.position = new Vec2D(x, y)
    this.size = new Vec2D(width, height)
    this.drawPosition = new Vec2D(dx, dy)
    this.color = 'blue'
  }

  draw ({ ctx, images }) {
    ctx.drawImage(images.platforms, this.drawPosition.x, this.drawPosition.y, this.size.x, this.size.y, this.position.x, this.position.y, this.size.x, this.size.y)
  }

  onColides (entity) {
    entity.velocity.y = 0
    entity.jumping = false
  }
}

export class BouncingPlatform extends Platform {
  constructor (x, y) {
    super(x, y)
    this.boucing = 25,
    this.color = 'green'
  }

  onColides (entity) {
    entity.velocity.y = -this.boucing
    entity.jumping = true
  }
}
