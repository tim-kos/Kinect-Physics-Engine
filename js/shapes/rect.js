var Rect = function(stage, width, height, mass, start, color) {
  this.stage = stage;

  this.width = width;
  this.height = height;
  this.mass = mass;
  this.startLoc = start || {x: 0, y: 0};
  this.myColor = color || '#000';

  this.obj = null;

  this.init();
};

Rect.prototype.init = function() {
  var self = this;

  this.obj = new Kinetic.Shape(function() {
    var context = this.getContext();
    context.beginPath();
    context.rect(self.startLoc.x, self.startLoc.y, self.width, self.height);
    context.fillStyle = self.myColor;
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = "black";
    context.stroke();
  });

  this.obj.x = this.startLoc.x;
  this.obj.y = this.startLoc.y;

  this.draggable = new Draggable(this);
};

Rect.prototype.update = function(timeDiff) {
  if (this.draggable.isDragging()) {
    this.draggable.handleMovement(timeDiff);
    return;
  }
};