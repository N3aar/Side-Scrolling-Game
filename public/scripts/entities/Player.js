import Entity from "../Entity.js"
import Controls from "../traits/controls.js"
import Velocity from "../traits/velocity.js"
import Gravity from "../traits/gravity.js"
import EntityFallOffMap from "../traits/entityFallOffMap.js"
import PlatformCollider from "../traits/platformCollider.js"
import entityCollider from "../traits/entityCollider.js"

export default class EntityPlayer extends Entity {
  constructor (id, data, sprites) {
    super(id, data, sprites)
    this.coins = 0
    this.jumping = true
    this.jumpHeight = 15
    this.invulnerable = false
    this.maxLife = 3
    this.life = 3
    this.key = false
    this.size.set(48, 56)

    this.addTrait(new Gravity())
    this.addTrait(new PlatformCollider())
    this.addTrait(new Velocity())
    this.addTrait(new entityCollider())
    this.addTrait(new Controls())
    this.addTrait(new EntityFallOffMap())
  }

  draw (gameContext) {
    const { ctx, images, level } = gameContext
    const frame = this.animation.getFrame(gameContext, this)
    const dy = this.position.y + level.gravity
    const image = images['player_'+this.name]

    if (this.invulnerable) {
      ctx.globalAlpha = 0.8
    }

    ctx.drawImage(image, frame.x, frame.y, frame.w, frame.h, this.position.x, dy, frame.w, frame.h)
    ctx.globalAlpha = 1
  }

  onColides (entity, gameContext) {
    const fn = this[entity.type]
    const exec = fn && fn.bind(this)

    if (exec) {
      exec(entity, gameContext)
    }
  }

  coin (entity, gameContext) {
    gameContext.level.deleteEntity(entity.id)
    gameContext.audioManager.play('coin')
    gameContext.player.coins++
  }

  enemy (entity, gameContext) {
    if (entity.state === 'hit' || entity.state === 'kill') {
      return
    }

    if (!this.invulnerable) {
      if (this.playerAboveEntity(entity)) {
        return this.killEnemy(entity, gameContext)
      }
  
      this.damage(entity, gameContext)
    }
  }

  killEnemy (entity, { audioManager }) {
    audioManager.play('bonk')
    this.bouncing(entity)
    entity.velocity.setX(0)
    entity.setState('hit')
  }

  damage (entity, { audioManager, level }) {
    audioManager.play('hurt')
    this.invulnerable = true
    this.life -= 1
    this.setState('hit')
    this.bouncing(entity)

    if (!this.life) {
      console.log('Game Over')
    }
  }

  bouncing (entity) {
    const direction = entity.position.x > this.position.x
    this.velocity.x = direction ? -4 : 4
    this.velocity.y = -10
    this.setDirection(Number(!direction))
  }

  onAnimationEnd () {
    if (this.state === 'hit') {
      this.velocity.set(0, 0)
      this.setState('idle')

      setTimeout(() => {
        this.invulnerable = false
      }, 1500)
    }
  }

  playerAboveEntity (entity) {
    return this.position.y + this.size.y - this.velocity.y <= entity.position.y
  }
}
