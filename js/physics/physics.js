function Physics(objects, stage) {
  this.objects = objects;
  this.stage = stage;
}

Physics.prototype.update = function(timeDiff) {
  for (var i = 0; i < this.objects.length; i++) {
    this.objects[i].update(timeDiff);

    for (var j = 0; j < this.objects.length; j++) {
      if (j == i) continue;

      var obj1 = this.objects[i];
      var obj2 = this.objects[j];

      if (obj1 instanceof Ball && obj2 instanceof Ball) {
        BallToBallCollision.handle(obj1, obj2);
      }
      if (obj1 instanceof Ball && obj2 instanceof Curve) {
        BallToCurveCollision.handle(obj1, this.stage);
      }
      if (obj1 instanceof Player && obj2 instanceof Ball) {
        BallToBallCollision.handle(obj1, obj2);
      }
      if (obj1 instanceof Ball && obj2 instanceof Rect) {
        BallToRectCollision.handle(obj1, obj2, this.stage);
      }
      if (obj1 instanceof Player && obj2 instanceof Curve) {
        BallToCurveCollision.handle(obj1, this.stage);
      }
    }
  }
};