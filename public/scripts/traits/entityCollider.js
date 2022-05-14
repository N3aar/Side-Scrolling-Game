export default class entityCollider {
  update(entity, gameContext) {
    for (const target of gameContext.level.entities) {
      if (target.id !== entity.id && entityCollider.overlaps(entity, target)) {
        entity.onColides(target, gameContext)
      }
    }
  }

  static overlaps (entity, target) {
    const entity_width = entity.position.x + entity.size.x
    const entity_height = entity.position.y + entity.size.y

    const target_width = target.position.x + target.size.x
    const target_height = target.position.y + target.size.y

    const overlapW = entity.position.x < target_width && entity_width > target.position.x
    const overlapH = entity.position.y < target_height && entity_height > target.position.y

    return overlapW && overlapH
  }
}