var hamburger = document.querySelector('.hamburger');
var sideNav = document.querySelector('.side_nav');
var background = document.querySelector('.background');

hamburger.addEventListener('click', () => {
    if (sideNav.style.width === '15vw') {
      sideNav.style.width = '0';
    } else {
      sideNav.style.width = '15vw';
    }
  });
  

function window_ratio(){
  if(window.innerHeight / window.innerWidth > 2160 /3840){;
    return true;
  }
  else{
    return false;
  }
}


function resize_elements(){
  if(window_ratio()){
    $(".background").height("100vh");
    $(".background").width("auto");
  }
  else{
    $(".background").height("auto");
    $(".background").width("100vw");
   
  } 
  if(window.innerHeight >= window.innerWidth){
    $(".hamburger").height("2vw");
    $(".hamburger").width("2vw");
    $(".hamburger").css("font-size, 2vw");
  }
  else{
    $(".hamburger").height("2vh");
    $(".hamburger").width("2vh");
    $(".hamburger").css("font-size, 2vh");
  }
}


$( window ).on( "resize", function(){
  resize_elements();
});