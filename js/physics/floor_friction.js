function FloorFriction(factor) {
  this.factor = factor || 5;
}

FloorFriction.prototype.takeEffect = function(timeDiff, stage, obj) {
  var canvas = stage.getCanvas();
  var floorFrictionSpeedReduction = this.factor * timeDiff / 1000;

  if (obj.y == canvas.height - obj.radius) {
    if (obj.velocity.x > 0.1) {
      obj.velocity.x -= floorFrictionSpeedReduction;
    } else if (obj.velocity.x < -0.1) {
      obj.velocity.x += floorFrictionSpeedReduction;
    } else {
      obj.velocity.x = 0;
    }
  }
};