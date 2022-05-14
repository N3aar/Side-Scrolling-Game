import entityCollider from "./entityCollider.js"

const RIGHT = 0
const LEFT = 1

export default class Controls {
  update(entity, gameContext) {
    if (entity.state === 'hit' || entity.life <= 0) {
      return
    }

    const { keyboard, level } = gameContext
    const { keyStates } = keyboard

    if (keyStates.get('KeyW')) {
      const object = level.objects.find(obj => entityCollider.overlaps(entity, obj))
      console.log(level.objects)
      if (object) {
        object.onInteract(gameContext)
      }
    }

    if (!entity.jumping) {
      if (keyboard.keyStates.get('Space')) {
        entity.setState('jump')
        entity.jumping = true
        entity.velocity.y -= entity.jumpHeight
        gameContext.audioManager.play('jump')
      }
    } else if (entity.velocity.y > 0) {
      entity.setState('fall')
    }

    const right = keyStates.get('KeyD')
    const left = keyStates.get('KeyA')
    const direction = right || left

    if (direction) {
      const parsed = right ? RIGHT : LEFT
      entity.setDirection(parsed)

      if (!entity.jumping) {
        entity.setState('run')
      }
    } else {
      if (!entity.jumping) {
        entity.setState('idle')
      }

      return this.slowDown(entity)
    }

    if (right) {
      const toRight = entity.position.x < (level.area.x / 3)
      if (toRight) {
        return entity.velocity.x = entity.speed
      }

      this.slowDown(entity)

      return level.camera.move(gameContext.level, LEFT)
    }

    if (left) {
      const toLeft = entity.position.x > (level.area.x / 4)
      const atStart = level.camera.scrollOffset === 0 && entity.position.x > 0

      if ((toLeft || atStart)) {
        return entity.velocity.x = -entity.speed
      }

      this.slowDown(entity)

      if (entity.position.x < 0) {
        entity.position.x = 0
      }

      if (entity.position.x > 0) {
        return level.camera.move(gameContext.level, RIGHT)
      }
    }
  }

  slowDown (entity) {
    entity.velocity.x *= 0.9
  }
}
