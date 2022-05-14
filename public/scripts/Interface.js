export default class Interface {
  constructor (uiData) {
    this.hearts = uiData.hearts
    this.coins = uiData.coins
    this.key = uiData.key
    this.numbers = uiData.numbers
  }

  draw (gameContext) {
    this.drawHearts(gameContext)
    this.drawCoins(gameContext)
    this.drawKey(gameContext)
  }

  drawHearts ({ ctx, images, player }) {
    const max = player.maxLife
    const life = player.life

    for (let i = 0; i < max; i++) {
      const heart = (i + 1) <= life ? this.hearts.full : this.hearts.empty
      const dx = (heart.width * i) + (2 * i) + 12
      ctx.drawImage(images.ui, heart.x, heart.y, heart.width, heart.height, dx, 13, heart.width, heart.height)
    }
  }

  drawCoins ({ ctx, images, player }) {
    ctx.drawImage(images.ui, this.coins.x, this.coins.y, this.coins.width, this.coins.height, 12, 48, this.coins.width, this.coins.height)

    const score = String(player.coins).padStart(3, '0')

    for (let i = 0; i < score.length; i++) {
      const number = this.numbers[score[i]]
      const dx = (this.numbers.width * i) + (2 * i) + 44
      ctx.drawImage(images.ui, number.x, number.y, this.numbers.width, this.numbers.height, dx, 55, this.numbers.width, this.numbers.height)
    }
  }

  drawKey ({ ctx, images, player }) {
    if (player.key) {
      ctx.drawImage(images.ui, this.key.x, this.key.y, this.key.width, this.key.height, 12, 82, this.key.width, this.key.height)
    }
  }
}