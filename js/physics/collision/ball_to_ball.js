function BallToBallCollision() {}

BallToBallCollision.collide = function(ball1, ball2) {
  // should be the combined move vector of both balls
  var movevec = ball1.obj.velocity;

  var xDiff = Math.abs(ball2.obj.x - ball1.obj.x);
  var yDiff = Math.abs(ball2.obj.y - ball1.obj.y);
  var dist = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  var sumRadii = ball1.obj.radius + ball2.obj.radius;

  if (Vector.magnitude(movevec) < dist - sumRadii) {
    return false;
  }

  // Early Escape test: if the length of the movevec is less
  // than distance between the centers of these circles minus
  // their radii, there's no way they can hit.
  var N = clone(movevec);
  Vector.normalize(N);

  // Find C, the vector from the center of the moving
  // circle A to the center of B
  var toCenter = {x: ball2.obj.x, y: ball2.obj.y};
  var myCenter = {x: ball1.obj.x, y: ball1.obj.y};
  var C = Vector.substract(toCenter, myCenter);

  // D = N . C = ||C|| * cos(angle between N and C)
  var D = Vector.dot(N, C);

  // Another early escape: Make sure that A is moving
  // towards B! If the dot product between the movevec and
  // B.center - A.center is less that or equal to 0,
  // A isn't isn't moving towards B
  if (D <= 0) {
    return false;
  }

  // Find the length of the vector C
  var lengthC = Vector.magnitude(C);

  var F = (lengthC * lengthC) - (D * D);

  // Escape test: if the closest that A will get to B
  // is more than the sum of their radii, there's no
  // way they are going collide
  var sumRadiiSquared = sumRadii * sumRadii;
  if (F >= sumRadiiSquared) {
    return false;
  }

  // We now have F and sumRadii, two sides of a right triangle.
  // Use these to find the third side, sqrt(T)
  var T = sumRadiiSquared - F;

  // If there is no such right triangle with sides length of
  // sumRadii and sqrt(f), T will probably be less than 0.
  // Better to check now than perform a square root of a
  // negative number.
  if (T < 0) {
    return false;
  }

  // Therefore the distance the circle has to travel along
  // movevec is D - sqrt(T)
  var distance = D - Math.sqrt(T);

  // Get the magnitude of the movement vector
  var mag = Vector.magnitude(movevec);

  // Finally, make sure that the distance A has to move
  // to touch B is not greater than the magnitude of the
  // movement vector.
  if (mag < distance) {
    return false;
  }
  return true;
};

BallToBallCollision.handle = function(ball1, ball2) {
  if (!BallToBallCollision.collide(ball1, ball2)) {
    return;
  }

  var toCenter = {x: ball2.obj.x, y: ball2.obj.y};
  var myCenter = {x: ball1.obj.x, y: ball1.obj.y};
  var n = Vector.normalize(Vector.substract(myCenter, toCenter));

  var v1 = ball1.obj.velocity;
  var v2 = ball2.obj.velocity;
  var a1 = Vector.dot(v1, n);
  var a2 = Vector.dot(v2, n);

  var optimizedP = (2.0 * (a1 - a2)) / (ball1.mass + ball2.mass);
  var v1New = Vector.substract(v1, Vector.times(n, optimizedP * ball2.mass));
  var v2New = Vector.add(v2, Vector.times(n, optimizedP * ball1.mass));

  ball1.obj.velocity.x = v1New.x;
  ball1.obj.velocity.y = v1New.y;

  ball2.obj.velocity.x = v2New.x;
  ball2.obj.velocity.y = v2New.y;
};