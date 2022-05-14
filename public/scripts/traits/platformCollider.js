export default class platformCollider {
  update(entity, gameContext) {
    for (const platform of gameContext.level.platforms) {
      if (platformCollider.EntityIsOnPlatform(entity, platform)) {
        platform.onColides(entity, gameContext)
      }
    }
  }

  static EntityIsOnPlatform (entity, platform) {
    const entity_height = entity.position.y + entity.size.y
    const entity_width = entity.position.x + entity.size.x

    const entity_velocity = entity_height + entity.velocity.y
    const platform_width = platform.position.x + platform.size.x

    const entityAbovePlatform = entity_height <= platform.position.y && entity_velocity >= platform.position.y
    const entityOnPlatform = entity_width >= platform.position.x && entity.position.x <= platform_width

    return entityOnPlatform && entityAbovePlatform
  }
}
