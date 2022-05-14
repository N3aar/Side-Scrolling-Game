import { InteractiveObject } from "../Objects.js"

export default class Chest extends InteractiveObject {
  onInteract (gameContext) {
    if (this.state === 'close') {
      this.setState('open')
      this.position.setY(302)
      gameContext.audioManager.play('key')
      gameContext.player.coins += 10
      gameContext.player.key = true
    }
  }
}