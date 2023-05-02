function window_ratio(){
  if(window.innerHeight / window.innerWidth > 2160 /3840){
    return true;
  }
  else{
    return false;
  }
}

function window_skinny(){
  if(window.innerHeight >= window.innerWidth * 1.5 || window.innerWidth < 475){
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
  
  if(window_skinny()){
    $(".side_nav a").css({"text-align": "center", "font-size": "40px"});
    if (sideNav.style.width === nav_width) {
      nav_width = "100vw";
      $(".side_nav").width(nav_width);
      $("#start_button").fadeOut(50);
    }
    nav_width = "100vw";
  }

  else{
    $(".side_nav a").css({"text-align": "left", "font-size": "30px"});
    if (sideNav.style.width === nav_width) {
      nav_width = "250px"
      $(".side_nav").width(nav_width);
      $("#start_button").fadeIn(50);
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

$('.hamburger').click(function() {
  if (sideNav.style.width === nav_width) {
    $(".side_nav").width("0");
    $("#sb").fadeIn(50);
    $("#hb").fadeIn(50);
    $("#start_button").fadeIn(50);
  } 
  else {
    $(".side_nav").width(nav_width);
    $("#sb").fadeOut(50);
    $("#hb").fadeOut(50);
    if(window_skinny()){
      $("#start_button").fadeOut(50);
    }
  }
});

$('#sb').click(function() {
  $('#login_form').css({"display":"block"});
});

$('.home_button').click(function() {
window.location.href = "/";
});

var modal = document.getElementById('login_form');

// When the user clicks anywhere outside of the modal, close it
document.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

