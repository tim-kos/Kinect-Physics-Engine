var Floor = function(width, height, color) {
  this.obj = new Kinetic.Shape(function(){
    var canvas = this.getCanvas();
    var context = this.getContext();

    context.beginPath();
    context.rect(0, height - 50, width, height - 50);
    context.fillStyle = color;
    context.fill();
    context.lineWidth = 5;
  }, true);
};

Floor.prototype.update = function() {};