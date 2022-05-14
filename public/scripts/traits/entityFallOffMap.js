export default class EntityFallOffMap {
  update(entity, gameContext) {
    if (entity.position.y > gameContext.level.area.y && entity.life > 0) {
      entity.life = 0
      entity.velocity.y = 0
      gameContext.audioManager.play('death')
      gameContext.state = 'GAMEOVER'
    }
  }
}
