export default class Velocity {
  update(entity) {
    entity.position.x += entity.velocity.x
    entity.position.y += entity.velocity.y
  }
}
