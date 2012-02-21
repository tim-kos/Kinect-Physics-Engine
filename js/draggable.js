function Draggable(obj) {
  this.obj = obj.obj;
  this.dd = {
    mouseX: 0,
    mouseY: 0,
    mouseOffsetX: 0,
    mouseOffsetY: 0,
    lastMouseX: 0,
    lastMouseY: 0,
    offsetX: 0,
    offsetY: 0,
    isDragging: false
  };
  this.init();
}

Draggable.prototype.init = function() {
  var self = this;

  this.obj.on("mousedown", function() {
    var mousePos = self.obj.stage.getMousePos();
    var mouseX = mousePos.x;
    var mouseY = mousePos.y;

    self.dd.isDragging = true;
    self.dd.offsetX = mouseX - self.obj.x;
    self.dd.offsetY = mouseY - self.obj.y;
    self.obj.velocity = {x: 0, y: 0};
  });

  this.obj.on('mouseup', function() {
    self.dd.isDragging = false;
    self.dd.mouseOffsetX = 0;
    self.dd.mouseOffsetY = 0;
  }, false);

  this.obj.on("mouseover", function() {
    document.body.style.cursor = "pointer";
  });

  this.obj.on("mouseout", function(){
    document.body.style.cursor = "default";
  });
};

Draggable.prototype.handleMovement = function(timeDiff) {
  var mousePos = this.obj.stage.getMousePos();

  if (mousePos !== null) {
    var mouseX = mousePos.x;
    var mouseY = mousePos.y;

    var c = 0.06 * timeDiff;
    this.obj.velocity = {
      x: c * (mouseX - this.dd.lastMouseX),
      y: c * (mouseY - this.dd.lastMouseY)
    };

    this.dd.lastMouseX = mouseX;
    this.dd.lastMouseY = mouseY;
    this.dd.mouseOffsetX = mouseX - this.dd.offsetX;
    this.dd.mouseOffsetY = mouseY - this.dd.offsetY;
    this.obj.x = mouseX - this.dd.offsetX;
    this.obj.y = mouseY - this.dd.offsetY;
  }
};

Draggable.prototype.isDragging = function() {
  return this.dd.isDragging;
};