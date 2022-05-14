export default class Animation {
  constructor (length, animationRate) {
    this.states = new Map()
    this.frame = 0
    this.length = length
    this.repeat = true
    this.rate = 0
    this.animationRate = animationRate || 3
  }

  getState (state) {
    return this.states.get(state)
  }

  getFrame (gameContext, entity) {
    this.rate++

    if (this.rate >= this.animationRate) {
      this.rate = 0
      this.nextFrame(gameContext, entity)
      this.setSizeByFrame(entity)
    }

    return this.getCurrentFrame(entity)
  }

  getCurrentFrame (entity) {
    const data = this.getState(entity.state)
    const width = data.width[this.frame] || data.width[0]
    const x = data.x[entity.direction][this.frame]
    const y = data.y[entity.direction]
    return { x, y, w: width, h: data.height }
  }

  setSizeByFrame (entity) {
    const data = this.getState(entity.state)
    const width = data.width[this.frame] || data.width[0]
    const acc = entity.size.y !== data.height
    const cy = acc && (entity.size.y > data.height ? entity.size.y - data.height : -(data.height - entity.size.y))

    entity.size.set(width, data.height)

    if (acc) {
      entity.position.setY(entity.position.y + cy)
    }
  }

  nextFrame (gameContext, entity) {
    this.frame++

    if (this.frame >= this.length) {
      this.frame = 0

      if (!this.repeat && entity.onAnimationEnd) {
        entity.onAnimationEnd(gameContext)
      }
    }
  }

  setAnimation (state) {
    const dataState = this.getState(state)
    this.frame = 0
    this.rate = 0
    this.animationRate = dataState.animationRate || 3
    this.length = dataState?.length
    this.repeat = !dataState.norepeat
  }

  setStates (states) {
    for (const state in states) {
      this.states.set(state, states[state])
    }
  }
}
