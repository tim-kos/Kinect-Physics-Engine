function BallToRectCollision() {}

BallToRectCollision.collide = function(ball, rect, stage) {
  var context = stage.getPropsLayer().getContext();
  var testPoints = 20;
  for (var n = 0; n < testPoints + 1; n++) {
    var angle = (n / testPoints) * (2 * Math.PI);
    var offsetX = ball.radius * Math.cos(angle);
    var offsetY = ball.radius * Math.sin(angle);
    var testX = ball.obj.x + offsetX;
    var testY = ball.obj.y + offsetY;

    if (this._inRect(testX, testY, rect)) {
      return true;
    }
  }
  return false;
};

BallToRectCollision._inRect = function(x, y, rect) {
  var xMatches = x >= rect.startLoc.x && x <= rect.startLoc.x + rect.width;
  var yMatches = y >= rect.startLoc.y && y <= rect.startLoc.y + rect.height;
  return xMatches && yMatches;
};

BallToRectCollision.handle = function(ball, rect, stage) {
  if (!BallToRectCollision.collide(ball, rect, stage)) {
    return;
  }
};