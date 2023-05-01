var hamburger = document.querySelector('.hamburger');
var sideNav = document.querySelector('.side_nav');
var background = document.querySelector('.background');
var nav_width = '250px';

hamburger.addEventListener('click', () => {
    if (sideNav.style.width === nav_width) {
      sideNav.style.width = '0';
    } else {
      sideNav.style.width = nav_width;
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


function resize_bg(){
  if(window_ratio()){
    $(".background").height("100vh");
    $(".background").width("auto");
  }
  else{
    $(".background").height("auto");
    $(".background").width("100vw");
  } 
  
  if(window.innerHeight >= window.innerWidth * 1.25){;
    sideNav.style.textAlign = "center";
    sideNav.style.fontSize = "25px";
    if (sideNav.style.width === nav_width) {
      nav_width = "100vw";
      sideNav.style.width = nav_width;
    }
    nav_width = "100vw";
  }

  else{
    sideNav.style.textAlign = "left";
    sideNav.style.fontSize = "100px";
    if (sideNav.style.width === nav_width) {
      nav_width = "250px"
      sideNav.style.width = nav_width;
    }
    nav_width = "250px"
  }
}


$( window ).on( "resize", function(){
  resize_bg();
});