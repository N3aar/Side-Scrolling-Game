export async function loadJSON (url, name) {
  const fetched = await fetch(`public/${url}/${name}.json`)
  return fetched.json()
}

function createImage (imageName) {
  const image = new Image()
  image.src = `./public/images/${imageName}.png`
  return image
}

export async function loadImages () {
  const names = await loadJSON('images', 'names')
  const imgs = names.map(name => createImage(name))
  const images = {}

  for (const i in imgs) {
    images[names[i]] = imgs[i]
  }

  return images
}
