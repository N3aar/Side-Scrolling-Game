import { loadJSON } from "./Loaders.js"

export default class AudioManager {
  constructor() {
    this.context = new AudioContext()
    this.buffers = new Map()
    this.volume = {
      fx: 0.4,
      music: 0.2
    }
  }

  setAudio (name, buffer) {
    this.buffers.set(name, buffer)
  }

  async loadAudios () {
    const sounds = await loadJSON('json/assets', 'sounds')
    const promises = sounds.map(async sound => {
      const type = sound.type
      const volume = sound.volume
      const fetched = await fetch(`./public/sounds/${type}/${sound.name}.ogg`)
      const arrayBuffer = await fetched.arrayBuffer()
      const decode = await this.context.decodeAudioData(arrayBuffer)
      this.setAudio(sound.name, { type, buffer: decode, volume })
    })
    return Promise.all(promises)
  }

  play (name, loop = false) {
    const sound = this.buffers.get(name)
    const volume = sound.volume || this.volume[sound.type]
    const gainNode = this.context.createGain()
    const source = this.context.createBufferSource()

    source.connect(gainNode)
    gainNode.connect(this.context.destination)
    gainNode.gain.setValueAtTime(volume, this.context.currentTime)

    source.buffer = sound?.buffer
    source.loop = loop
    source.start(0)
  }
}
