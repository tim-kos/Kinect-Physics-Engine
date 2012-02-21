$(function() {
  var game = new Game();
  game.init();

  $('.js_pause').click(function() {
    if (!$(this).is('.paused')) {
      $(this).addClass('paused');
      $(this).text('Resume');
      game.pause();
    } else {
      $(this).removeClass('paused');
      $(this).text('Pause');
      game.resume();
    }

    return false;
  });
});