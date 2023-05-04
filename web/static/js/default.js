var side_nav = document.querySelector('.side_nav');
var nav_width = $(".side_nav").width();

var login_form = document.getElementById('login_form');
var sn = document.getElementById('sn');


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
    if (side_nav.style.width === nav_width) {
      nav_width = "100vw";
      $(".side_nav").width(nav_width);
      $("#start_button").fadeOut(50);
    }
    nav_width = "100vw";
  }

  else{
    $(".side_nav a").css({"text-align": "left", "font-size": "30px"});
    if (side_nav.style.width === nav_width) {
      nav_width = "250px"
      $(".side_nav").width(nav_width);
      $("#start_button").fadeIn(50);
    }
    nav_width = "250px"
  }
}

function active_sn(){
  $('.hamburger').toggleClass('active');
  if (side_nav.style.width === nav_width) {
    $(".side_nav").width("0");
    $("#sb").fadeIn(50);
    $("#hb").fadeIn(50);
    $("#start_button").fadeIn(50);
    $('#sn').css({"display":"none"});
    $('.modal').css({"background-color":"rgba(65, 42, 19, 0.4)"});
  }
  else {
    $(".side_nav").width(nav_width);
    $("#sb").fadeOut(50);
    $("#hb").fadeOut(50);
    $('#sn').css({"display":"block"});
    $('.modal').css({"background-color":"rgba(65, 42, 19, 0.0)"});
    if(window_skinny()){
      $("#start_button").fadeOut(50);
    }
  }
};

$(document).ready(function() {
  resize_bg();
});

$( window ).on( "resize", function(){
  resize_bg();
});

$('.hamburger').click(function() {
  active_sn();
});

$('#sb').click(function() {
  $('#login_form').css({"display":"block"});
  $('.modal').css({"z-index":"12"});
});

$('.home_button').click(function() {
  window.location.href = "/";
});

// When the user clicks anywhere outside of the modal, close it

$(document).click(function(event) {
  if (event.target == login_form) {
    $('#login_form').css({"display":"none"});
    $('.modal').css({"z-index":"9"});
  }
  else if (event.target == sn){
    if (side_nav.style.width === nav_width) {
      active_sn();
    }
  }
});


$('.x_container').click(function() {
  $('#login_form').css({"display":"none"});
  $('.modal').css({"z-index":"9"});
});

$("#login_form").submit(async function(event) {
  event.preventDefault();

  // get the form data
  const formData = new FormData(event.target);

  // send a POST request to the server
  const response = await fetch('/login', {
    method: 'POST',
    body: formData
  });

  // handle the server response
  if (response.ok) {
    // success, redirect to the home page
    window.location.href = "/";
  } else {
    // error, update the form with the error message
    const errorMessage = await response.text();
    const errorElement = document.createElement("p");
    errorElement.textContent = errorMessage;
    event.target.prepend(errorElement);
  }
});

$("#register_form").submit(async function(event) {
  event.preventDefault();

  // get the form data
  const formData = new FormData(event.target);

  // send a POST request to the server
  const response = await fetch('/register', {
    method: 'POST',
    body: formData
  });

  // handle the server response
  if (response.ok) {
    // success, redirect to the home page
    window.location.href = "/";
  } else {
    // error, update the form with the error message
    const errorMessage = await response.text();
    const errorElement = document.createElement("p");
    errorElement.textContent = errorMessage;
    event.target.prepend(errorElement);
  }
});

