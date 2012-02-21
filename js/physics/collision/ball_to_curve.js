function BallToCurveCollision() {}

BallToCurveCollision.collide = function(ball, stage) {
  var context = stage.getPropsLayer().getContext();
  var testPoints = 20;
  for (var n = 0; n < testPoints + 1; n++) {
    var angle = (n / testPoints) * (2 * Math.PI);
    var offsetX = ball.radius * Math.cos(angle);
    var offsetY = ball.radius * Math.sin(angle);
    var testX = ball.obj.x + offsetX;
    var testY = ball.obj.y + offsetY;

    if (context.isPointInPath(testX, testY)) {
      return true;
    }
  }
  return false;
};

BallToCurveCollision.handle = function(ball, stage) {
  var propsContext = stage.getPropsLayer().getContext();
  var curveDamper = 0.05; // 5% energy loss

  if (!BallToCurveCollision.collide(ball, stage)) {
    return;
  }

  if (!propsContext.isPointInPath(ball.obj.x, ball.obj.y)) {
    return;
  }

  var normal = BallToCurveCollision.normal(ball, stage);

  var angleToNormal = Vector.angleBetween(normal, Vector.invert(ball.obj.velocity));
  var crossProduct = Vector.cross(normal, ball.obj.velocity);
  var polarity = crossProduct.z > 0 ? 1 : -1;
  var collisonAngle = polarity * angleToNormal * 2;
  var collisionVector = Vector.rotate(ball.obj.velocity, collisonAngle);

  ball.obj.velocity.x = collisionVector.x;
  ball.obj.velocity.y = collisionVector.y;
  ball.obj.velocity.x *= (1 - curveDamper);
  ball.obj.velocity.y *= (1 - curveDamper);

  // bubble ball up to the surface of the curve
  while (propsContext.isPointInPath(ball.obj.x, ball.obj.y)) {
    ball.obj.x += normal.x;

    if (ball.obj.velocity.y > 0.1) {
      ball.obj.y += normal.y;
    } else {
      // nudge ball even less to prevent bouncing at rest
      ball.obj.y += normal.y / 10;
    }
  }
};

BallToCurveCollision.normal = function(ball, stage) {
  var context = stage.getPropsLayer().getContext();
  var totalX = 0;
  var totalY = 0;

  // check various points around the center point
  // to determine the normal vector
  var testPoints = 20;
  var angle = (2 * Math.PI) / testPoints;
  for (var n = 0; n < testPoints + 1; n++) {
    var offsetX = ball.radius * Math.cos(n * angle);
    var offsetY = ball.radius * Math.sin(n * angle);
    var testX = ball.obj.x + offsetX;
    var testY = ball.obj.y + offsetY;

    if (!context.isPointInPath(testX, testY)) {
      totalX += offsetX;
      totalY += offsetY;
    }
  }

  var normal = {x: totalX, y: totalY};
  if (totalX === 0 && totalY === 0) {
    normal = {x: 0, y: -1};
  }
  return Vector.normalize(normal);
};