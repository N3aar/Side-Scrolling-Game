import platformCollider from "./platformCollider.js"

export default class Enemy {
  update(entity, { level }) {
    const platform = level.platforms.find(platform => platformCollider.EntityIsOnPlatform(entity, platform))
    if (platform) {
      const inLeft = (entity.position.x - entity.velocity.y) <= platform.position.x
      const inRight = (entity.position.x + entity.size.x + entity.velocity.x) >= platform.position.x + platform.size.x

      if (inLeft || inRight) {
        entity.setDirection(1 - entity.direction)
        entity.velocity.x = -entity.velocity.x
      }
    }
  }
}
