const startButton = document.querySelector('.start-button');
const image = document.querySelector('.image');
const hamburger = document.querySelector('.hamburger');
const sideNav = document.querySelector('.side-nav');

startButton.addEventListener('click', () => {
  image.style.transition = 'transform 1s';
  image.style.transform = 'scale(8) rotate(720deg)'; //add rotation along with scaling
  setTimeout(() => {
    window.location.href = 'quiz';
  }, 1000);
});

var ph = window.outerHeight;
var pw = window.outerWidth;
var temp = document.getElementById("sb");
    temp.innerHTML = window.innerHeight + " " + ph;
    temp.style.height = String(ph * 0.05) + "px";
    temp.style.width = String(ph * 0.1) + "px";
    temp.style.fontSize = String(ph * 0.025) + "px";

var img = document.getElementById("ms-back");
    img.style.height = String(ph) + "px";

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


hamburger.addEventListener('click', () => {
  if (sideNav.style.width === '250px') {
    sideNav.style.width = '0';
  } else {
    sideNav.style.width = '250px';
  }
});