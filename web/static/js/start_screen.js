const startButton = document.getElementById('sb');
const background = document.getElementById('start_screen_bg');


startButton.addEventListener('click', () => {
  image.style.transition = 'transform 1s';
  image.style.transform = 'scale(8) rotate(720deg)'; //add rotation along with scaling
  setTimeout(() => {
    window.location.href = 'quiz';
  }, 1000);
});

var ph = window.outerHeight;
var pw = window.outerWidth;
var sb = document.getElementById("sb");
    sb.style.height = String(ph * 0.05) + "px";
    sb.style.width = String(ph * 0.1) + "px";
    sb.style.fontSize = String(ph * 0.025) + "px";

    background.style.height = String(ph) + "px";

/*
this one doesn't spin the image. it just zooms in

const startButton = document.querySelector('.start-button');
const image = document.querySelector('.image');

startButton.addEventListener('click', () => {
  image.style.transition = 'transform 1s';
  image.style.transform = 'scale(8)';
  setTimeout(() => {
    window.location.href = 'menu.html';
  }, 1000);
});
*/