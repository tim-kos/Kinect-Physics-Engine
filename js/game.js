window.requestAnimFrame = (function(cb){
  return window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(cb) {
    window.setTimeout(cb, 1000 / 60);
  };
})();

var Game = function() {
  this.paused = false;
  this.width = window.innerWidth - 10;
  this.height = window.innerHeight * 0.9;
  this.level = null;
  this.frameCounter = 0;
};

Game.prototype.init = function() {
  this.level = new Level(this.width, this.height);

  var self = this;
  setInterval(function() {
    self.updateFps();
  }, 1000);

  var time = (new Date()).getTime();
  this.update(time);
};

Game.prototype.updateFps = function() {
  $('.fps span').text(this.frameCounter);
  this.frameCounter = 0;
};

Game.prototype.update = function(lastTime) {
  var time = (new Date()).getTime();
  var timeDiff = time - lastTime;
  this.frameCounter++;

  this.level.update(timeDiff);

  var self = this;

  if (!this.paused) {
    requestAnimFrame(function() {
      self.update(time);
    });
  }
};

Game.prototype.resume = function() {
  this.paused = false;
  var time = (new Date()).getTime();
  this.update(time);
};

Game.prototype.pause = function() {
  this.paused = true;
};