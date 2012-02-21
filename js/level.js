function Level(width, height) {
  this.stage = null;

  this.objects = [];
  this.width = width || 300;
  this.height = height || 300;
  this.physics = null;
  this.player = null;

  this.init();
}

Level.prototype.init = function() {
  this.stage = new Kinetic.Stage('container', this.width, this.height);

  this.objects.push(new Floor(this.width, this.height, '#060'));
  this.objects.push(new Curve());

  this._createBall(11, 5, 960, 300, '#00f', {x: 15, y: 18});

  var ball = this._createBall(80, 999999, 770, 160, '#333', {x: 0, y: 0});
  ball.gravity = null;

  this._createBall(44, 22, 360, 200, '#00f', {x: 15, y: 18});
  this._createBall(33, 16, 270, 160, '#0f0', {x: 0, y: 0});
  this._createBall(18, 9, 370, 260, '#ff0', {x: 0, y: 0});
  this._createBall(12, 6, 870, 360, '#f80', {x: 0, y: 33});
  this._createBall(90, 45, 470,  80, '#0ff', {x: 5, y: 3});

  this._createRect(200, 100, 20, {x: 45, y: 25}, '#f80');

  this.player = new Player(this.stage, 30, 15);
  this.objects.push(this.player);

  for (var i = 0; i < this.objects.length; i++) {
    this.stage.add(this.objects[i].obj);
  }

  this.physics = new Physics(this.objects, this.stage);
};

Level.prototype.update = function(timeDiff) {
  this.physics.update(timeDiff);
  this.stage.drawActors();
};

Level.prototype._createBall = function(r, mass, posX, posY, color, veloc) {
  var ball = new Ball(this.stage, r, mass, {x: posX, y: posY}, color, veloc);
  this.objects.push(ball);
  return ball;
};

Level.prototype._createRect = function(width, height, mass, loc, color) {
  var rect = new Rect(this.stage, width, height, mass, loc, color);
  this.objects.push(rect);
  return rect;
};