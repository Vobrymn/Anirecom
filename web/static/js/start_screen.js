var loader = document.querySelector('.loader');

$(".start_button").click(function(){
  $(this).hide(); // hide the start button when clicked
  $(".hamburger").hide(); // hide the hamburger button when clicked
  loader.style.display = 'grid'; // show the loader as a grid
  background.style.transition = 'transform 2s';
  background.style.transform = 'scale(8)';
  sideNav.style.width = '0'; // close the navigation bar when clicking the start button
  setTimeout(() => {
    window.location.href = '';
  }, 1000);
});


function resize_sb(){
  if(window_ratio()){
    $("#sb").css("height", "6.0vh");
    $("#sb").css("width", "12.0vh");
    $("#sb").css("border-radius", "0.5vh");
    $("#sb").css("font-size", "3vh");
    //$("#sb").text(window.innerHeight + " " + window.innerWidth);
  }
  else{
    $("#sb").css("height", "3.375vw");
    $("#sb").css("width", "6.75vw");
    $("#sb").css("border-radius", "0.28vw");
    $("#sb").css("font-size", "1.69vw");
    //$("#sb").text(window.innerHeight + " " + window.innerWidth);
  }
}

$( window ).on( "resize", function(){
  resize_sb();
});

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
