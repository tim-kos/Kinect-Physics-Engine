function LevelLimits(collisionDamper) {
  this.collisionDamper = collisionDamper;
}

LevelLimits.prototype.takeEffect = function(stage, obj) {
  var canvas = stage.getCanvas();

  // ceiling condition
  if (obj.y < obj.radius) {
    obj.y = obj.radius;
    obj.velocity.y *= -1;
    obj.velocity.y *= (1 - this.collisionDamper);
  }

  // floor condition
  if (obj.y > (canvas.height - obj.radius)) {
    obj.y = canvas.height - obj.radius;
    obj.velocity.y *= -1;
    obj.velocity.y *= (1 - this.collisionDamper);
  }

  // right wall condition
  if (obj.x > (canvas.width - obj.radius)) {
    obj.x = canvas.width - obj.radius;
    obj.velocity.x *= -1;
    obj.velocity.x *= (1 - this.collisionDamper);
  }

  // left wall condition
  if (obj.x < obj.radius) {
    obj.x = obj.radius;
    obj.velocity.x *= -1;
    obj.velocity.x *= (1 - this.collisionDamper);
  }
};