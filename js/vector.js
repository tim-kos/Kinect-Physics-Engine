function Vector() {}

Vector.dot = function(a, b) {
  return ((a.x * b.x) + (a.y * b.y));
}

Vector.magnitude = function(a) {
  return Math.sqrt((a.x * a.x) + (a.y * a.y));
}

Vector.normalize = function(a) {
  var mag = Vector.magnitude(a);

  if (mag == 0) {
    return {x: 0, y: 0};
  }
  return {
    x: a.x / mag,
    y: a.y / mag
  };
}

Vector.add = function(a, b) {
  return {
    x: a.x + b.x,
    y: a.y + b.y
  };
}

Vector.substract = function(a, b) {
  return {
    x: a.x - b.x,
    y: a.y - b.y
  };
}

Vector.times = function(a, n) {
  return {
    x: a.x * n,
    y: a.y * n
  };
}

Vector.angleBetween = function(a, b) {
  return Math.acos(Vector.dot(a, b) / (Vector.magnitude(a) * Vector.magnitude(b)));
}

Vector.rotate = function(a, angle) {
  var ca = Math.cos(angle);
  var sa = Math.sin(angle);
  var rx = a.x * ca - a.y * sa;
  var ry = a.x * sa + a.y * ca;
  return {
    x: rx * -1,
    y: ry * -1
  };
}

Vector.invert = function(a) {
  return {
    x: a.x * -1,
    y: a.y * -1
  };
}

/*
 * this cross product function has been simplified by
 * setting x and y to zero because vectors a and b
 * lie in the canvas plane
 */
Vector.cross = function(a, b) {
  return {
    x: 0,
    y: 0,
    z: (a.x * b.y) - (b.x * a.y)
  };
}