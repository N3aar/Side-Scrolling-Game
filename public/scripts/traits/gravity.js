export default class Gravity {
  update(entity, { level }) {   
    entity.velocity.y += level.gravity
  }
}
