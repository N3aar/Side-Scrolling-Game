import { InteractiveObject } from "../Objects.js"

export default class Door extends InteractiveObject {
  onInteract ({ player }) {
    if (player.key && this.state === 'close') {
      player.key = false
      this.setState('open')
      console.log('Congratulations')
    }
  }
}