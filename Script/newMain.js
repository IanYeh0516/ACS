window.testButtonAction1 = function () {
  var player = document.getElementById('Player');
  player.setAttribute('animation-mixer', 'clip: Roll;');
  setTimeout(function() {
    player.setAttribute('animation-mixer', 'clip: Idle;');
  }, 1000);
  
}
window.testButtonAction2 = function () {
  var player = document.getElementById('Player');
  player.setAttribute('animation-mixer', 'clip: Run;');
  setTimeout(function() {
    player.setAttribute('animation-mixer', 'clip: Idle;');
  }, 1000);
  
}
window.testButtonAction3 = function () {
  var player = document.getElementById('Player');
  player.setAttribute('animation-mixer', 'clip: Spin;');
  setTimeout(function() {
    player.setAttribute('animation-mixer', 'clip: Idle;');
  }, 1000);
  
}
window.testButtonAction4 = function () {
  var player = document.getElementById('Player');
  player.setAttribute('animation-mixer', 'clip: Fear;');
  setTimeout(function() {
    player.setAttribute('animation-mixer', 'clip: Idle;');
  }, 1000);
}



