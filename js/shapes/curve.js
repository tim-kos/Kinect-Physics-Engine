var Curve = function() {
  this.obj = new Kinetic.Shape(function(){
    var canvas = this.getCanvas();
    var context = this.getContext();

    context.beginPath();
    context.moveTo(20, canvas.height - 100);
    context.bezierCurveTo(
      canvas.width * 0.01,
      -canvas.height * 0.3,
      canvas.width * 0.4,
      canvas.height * 1.4,
      canvas.width,
      canvas.height * 0.2
    );

    context.lineTo(canvas.width, canvas.height - 50);
    context.lineTo(20, canvas.height - 50);
    context.closePath();
    context.fillStyle = "#a00";
    context.fill();
  }, true);
};

Curve.prototype.update = function() {};