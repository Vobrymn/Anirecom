$('.hamburger').click(function() {
    if (sideNav.style.width === nav_width) {
      $(".side_nav").width("0");
      $(".login_button").fadeIn(50);
      $(".home_button").fadeIn(50);
    } else {
      $(".side_nav").width(nav_width);
      $(".login_button").fadeOut(50);
      $(".home_button").fadeOut(50);
    }
  });

$('.login_button').click(function() {
  window.location.href = "/login";
});

$('.home_button').click(function() {
  window.location.href = "/";
});
  

function window_ratio(){
  if(window.innerHeight / window.innerWidth > 2160 /3840){;
    return true;
  }
  else{
    return false;
  }
}

var sideNav = document.querySelector('.side_nav');
var nav_width = $(".side_nav").width();

function resize_bg(){
  if(window_ratio()){
    $(".background").height("100vh");
    $(".background").width("auto");
  }
  else{
    $(".background").height("auto");
    $(".background").width("100vw");
  } 
  
  if(window.innerHeight >= window.innerWidth * 1.5 || window.innerWidth < 475){;
    $(".side_nav a").css({"text-align": "center", "font-size": "40px"});
    if (sideNav.style.width === nav_width) {
      nav_width = "100vw";
      $(".side_nav").width(nav_width);
    }
    nav_width = "100vw";
  }

  else{
    $(".side_nav a").css({"text-align": "left", "font-size": "25px"});
    if (sideNav.style.width === nav_width) {
      nav_width = "250px"
      $(".side_nav").width(nav_width);
    }
    nav_width = "250px"
  }
}

$(document).ready(function() {
  resize_bg();
});

$( window ).on( "resize", function(){
  resize_bg();
});