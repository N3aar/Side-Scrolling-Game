const PRESSED = true
const RELEASED = false

export default class KeyboardHandler {
  constructor () {
    this.keyStates = new Map()
    this.keyMap = new Set()
  }

  listen (window) {
    window.addEventListener('keydown', event => this.handleEvent(event))
    window.addEventListener('keyup', event => this.handleEvent(event))
  }

  addKeys (keys) {
    for (const key of keys) {
      this.keyMap.add(key)
    }
  }

  handleEvent (event) {
    const { code } = event

    if (!this.keyMap.has(code)) {
      return
    }

    event.preventDefault()

    const keyState = event.type === 'keydown' ? PRESSED : RELEASED

    if (this.keyStates.get(code) === keyState) {
      return
    }

    this.keyStates.set(code, keyState)
  }
}
