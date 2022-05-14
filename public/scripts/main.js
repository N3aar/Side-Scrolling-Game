import { loadJSON, loadImages } from "./Loaders.js"
import AudioManager from "./AudioManager.js"
import KeyboardHandler from "./Keyboard.js"
import Level from "./Level.js"
import Interface from "./Interface.js"

const characterSelector = document.querySelector('#character')
const startButton = document.querySelector('.start')
const canvas = document.querySelector('canvas')
const gameContext = {}

function update () {
  requestAnimationFrame(update)
  gameContext.level.draw(gameContext)
  gameContext.interface.draw(gameContext)
  gameContext.level.update(gameContext)
}

async function main () {
  const objects = await loadJSON('json/assets', 'objects')
  const sprites = await loadJSON('json/assets', 'entities')
  const uiData = await loadJSON('json/assets', 'ui')
  const levelData = await loadJSON('json/levels', 'level')

  const ctx = canvas.getContext('2d')
  const level = new Level(canvas.width, canvas.height)
  const audioManager = new AudioManager()
  const keyboard = new KeyboardHandler()
  const ui = new Interface(uiData)
  const images = await loadImages()

  levelData.entities[0].name = characterSelector.value
  keyboard.listen(window)
  keyboard.addKeys(['Space', 'KeyD', 'KeyA', 'KeyW'])
  level.loadLevel(levelData, objects, sprites)
  await audioManager.loadAudios()

  gameContext.ctx = ctx
  gameContext.audioManager = audioManager
  gameContext.images = images
  gameContext.level = level
  gameContext.interface = ui
  gameContext.images = images
  gameContext.player = level.entities[0]
  gameContext.keyboard = keyboard
  audioManager.play('warmth', true)

  update()
}

startButton.addEventListener('click', async () => {
  for (const element of [startButton, characterSelector]) {
    element.setAttribute('hidden', 'hidden')
  }

  main()
})
