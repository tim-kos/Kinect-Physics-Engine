var Ball = function(stage, radius, mass, start, color, velocity) {
  this.stage = stage;

  this.radius = radius;
  this.mass = mass;
  this.startLoc = start || {x: 0, y: 0};
  this.myColor = color || '#000';
  this.startVelocity = velocity || {x: 0, y: 0};

  this.collisionDamper = 0.2; // 20% energy loss
  this.floorFriction = 5; // px / second^2

  this.gravity = new Gravity();
  this.levelLimits = new LevelLimits(this.collisionDamper);
  this.floorFriction = new FloorFriction(this.floorFriction);

  this.obj = null;

  this.init();
};

Ball.prototype.init = function() {
  var self = this;

  this.obj = new Kinetic.Shape(function() {
    var context = this.getContext();
    context.beginPath();
    context.arc(0, 0, self.radius, 0, 2 * Math.PI, false);
    context.fillStyle = self.myColor;
    context.fill();
  });

  this.obj.radius = this.radius;
  this.obj.velocity = this.startVelocity;
  this.obj.x = this.startLoc.x;
  this.obj.y = this.startLoc.y;

  this.draggable = new Draggable(this);
};

Ball.prototype.update = function(timeDiff) {
  if (this.draggable.isDragging()) {
    this.draggable.handleMovement(timeDiff);
    return;
  }

  if (!this.gravity) return;

  this.gravity.takeEffect(this.obj, timeDiff);
  this.levelLimits.takeEffect(this.stage, this.obj);
  this.floorFriction.takeEffect(timeDiff, this.stage, this.obj);

  // this.accelerate();
};

Ball.prototype.accelerate = function() {
  this.obj.velocity.x += 0.007 * this.obj.velocity.x;
  this.obj.velocity.y += 0.007 * this.obj.velocity.y;
};