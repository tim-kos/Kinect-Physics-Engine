function Player(stage, r, mass) {
  this.ball = new Ball(stage, r, mass, {x: 20, y: 20}, '#f00');
  this.radius = r;
  this.mass = mass;
  this.obj = this.ball.obj;
  this.initKeyboardEvents();
};

Player.prototype.update = function(timeDiff) {
  this.ball.update(timeDiff);
};

Player.prototype.initKeyboardEvents = function() {
  var self = this;

  $(document).keydown(function(e) {
    if (e.keyCode > 36 && e.keyCode < 41) {
      switch (e.keyCode) {
        case 37:
          self.obj.velocity.x -= 5;
          break;
        case 38:
          self.obj.velocity.y -= 5;
          break;
        case 39:
          self.obj.velocity.x += 5;
          break;
        case 40:
          self.obj.velocity.y += 5;
          break;
      }
    }
  });
};