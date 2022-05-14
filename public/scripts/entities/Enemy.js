import Entity from "../Entity.js"
import Enemy from "../traits/enemy.js"
import Velocity from "../traits/velocity.js"

export default class EntityEnemy extends Entity {
  constructor (id, data, sprites) {
    super(id, data, sprites)
    this.velocity.setX(this.direction ? -3 : 3)

    this.addTrait(new Enemy())
    this.addTrait(new Velocity())
  }

  onAnimationEnd (gameContext) {
    if (this.state === 'hit') {
      return this.setState('kill')
    }

    if (this.state === 'kill') {
      return gameContext.level.deleteEntity(this.id)
    }
  }
}