function Gravity(factor) {
  this.factor = factor;
  if (this.factor === undefined) {
    this.factor = 9.81; // px / m^2
  }
};

Gravity.prototype.takeEffect = function(obj, timeDiff) {
  var speedIncrementFromGravityEachFrame = this.factor * timeDiff / 1000;
  obj.velocity.y += speedIncrementFromGravityEachFrame;
  obj.x += obj.velocity.x;
  obj.y += obj.velocity.y;
};