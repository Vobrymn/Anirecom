const startButton = document.querySelector('.start-button');
const image = document.querySelector('.image');
const hamburger = document.querySelector('.hamburger');
const sideNav = document.querySelector('.side-nav');
const loader = document.querySelector('.loader');

startButton.addEventListener('click', () => {
  startButton.style.display = 'none'; // hide the start button when clicked
  hamburger.style.display = 'none'; // hide the hamburger button when clicked
  loader.style.display = 'grid'; // show the loader as a grid
  image.style.transition = 'transform 1s';
  image.style.transform = 'scale(8)';
  sideNav.style.width = '0'; // close the navigation bar when clicking the start button
  setTimeout(() => {
    window.location.href = 'questionnare.html';
  }, 1000);
});

hamburger.addEventListener('click', () => {
  if (sideNav.style.width === '250px') {
    sideNav.style.width = '0';
  } else {
    sideNav.style.width = '250px';
  }
});

var ph = window.outerHeight;
var pw = window.outerWidth;
var temp = document.getElementById("sb");
    temp.innerHTML = ph * 0.5;
    temp.style.height = String(ph * 0.05) + "px";
    temp.style.width = String(ph * 0.1) + "px";
    temp.style.fontSize = String(ph * 0.025) + "px";

var img = document.getElementById("ms-back");
    img.style.height = String(ph * 1) + "px";


/*
startButton.addEventListener('click', () => {
  image.style.transition = 'transform 1s';
  image.style.transform = 'scale(8) rotate(720deg)';
  startButton.style.display = 'none'; //hide the start button when zooming in
  hamburger.style.display = 'none'; //hide the hamburger button when zooming in
  sideNav.style.width = '0'; //close the navigation bar when clicking the start button
  setTimeout(() => {
    window.location.href = 'menu.html';
  }, 1000);
});
*/
