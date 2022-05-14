import { Vec2D } from "./Math.js"
import { Platform } from "./Platform.js"
import { GenericObject } from "./Objects.js"
import Camera from "./Camera.js"
import Coin from "./entities/Coin.js"
import Player from "./entities/Player.js"
import Enemy from "./entities/Enemy.js"
import Door from "./objects/door.js"
import Chest from "./objects/chest.js"

export default class Level {
  constructor (width, height) {
    this.area = new Vec2D(width, height)
    this.camera = new Camera(0.3)
    this.entityId = 0
    this.gravity = 1
    this.background = {}
    this.platforms = []
    this.objects = []
    this.clouds = []
    this.generics = []
    this.entities = []
  }

  update (gameContext) {
    this.camera.clouds(this)

    for (const entity of this.entities) {
      if (entity.update) {
        entity.update(gameContext)
      }
    }
  }

  draw (gameContext) {
    this.background.draw(gameContext)

    for (const cloud of this.clouds) {
      cloud.draw(gameContext)
    }

    for (const platform of this.platforms) {
      platform.draw(gameContext)
    }

    for (const generic of this.generics) {
      generic.draw(gameContext)
    }

    for (const object of this.objects) {
      object.draw(gameContext)
    }

    for (let i = this.entities.length - 1; i >= 0; i--) {
      this.entities[i].draw(gameContext)
    }
  }

  deleteEntity (id) {
    const index = this.entities.findIndex(et => et.id === id)
    this.entities.splice(index, 1)
  }

  async loadLevel (levelData, objectData, spriteData) {
    const types = { 
      player: Player,
      enemy: Enemy,
      door: Door,
      chest: Chest
    }

    const platforms = levelData.platforms.map(platform => {
      const data = objectData.platforms[platform.type]
      return new Platform(platform.type, platform.x, platform.y, data.width, data.height, data.dx, data.dy)
    })

    const objects = levelData.objects.map(object => {
      const type = object.type
      const state = objectData[type][object.state]
      return new types[type](type, object.state, object.x, object.y, state.width, state.height)
    })

    objects.forEach(object => object.setStates(objectData[object.type]))

    const entities = levelData.entities.map(entity => new types[entity.type](this.entityId++, entity, spriteData))

    for (const coin of levelData.coins) {
      for (let i = 0; i < coin.size; i++) {
        const x = coin.x + (i * 55)
        entities.push(new Coin(this.entityId++, { x, y: coin.y }, spriteData.coin))
      }
    }

    const clouds = levelData.clouds.map(cloud => new GenericObject('clouds', cloud.x, cloud.y, 0, 0, objectData.clouds.width, objectData.clouds.height))

    const { x, y } = levelData.background
    const background = new GenericObject('background', x, y, objectData.background.width, objectData.background.height, 0, 0)

    const generics = levelData.generic.map((generic, i) => {
      const { dx, dy, width, height } = objectData.generic[i]
      return new GenericObject('generic', generic.x, generic.y, width, height, dx, dy)
    })

    this.platforms = platforms
    this.objects = objects
    this.background = background
    this.clouds = clouds
    this.generics = generics
    this.entities = entities
  }
}