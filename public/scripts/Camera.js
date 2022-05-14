export default class Camera {
  constructor (speed) {
    this.scrollOffset = 0
    this.cloudSpeed = speed
  }

  move (level, direction) {
    const player = level.entities[0]
    const speed = direction ? -player.speed : player.speed

    this.scrollOffset += -speed
    level.background.position.x += speed / 2

    for (const generic of level.generics) {
      generic.position.x += speed
    }

    for (const object of level.objects) {
      object.position.x += speed
    }

    for (const platform of level.platforms) {
      platform.position.x += speed
    }

    for (const entity of level.entities) {
      if (entity.type !== 'player') {
        entity.position.x += speed
      }
    }
  }

  clouds (level) {
    for (let i = 0; i < level.clouds.length; i++) {
      const cloud = level.clouds[i]

      cloud.position.x -= this.cloudSpeed
      const distance = cloud.position.x < 0 && (cloud.position.x * -1)

      if (distance && distance >= cloud.size.x) {
        const n = 1 - i
        cloud.position.x = level.clouds[n].position.x + cloud.size.x + 150
      }
    }
  }
}