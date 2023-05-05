var nav_width = "0"
var transition = false

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

  var side_nav = document.querySelector('.side_nav');

  if(window_skinny()){

    $(".side_nav a").css({"text-align": "center", "font-size": "40px"});
    if (side_nav.style.width == nav_width) {
      $(".side_nav").width("100vw");
      $("#start_button").fadeOut(50);
    }
    nav_width = "100vw";
  }

  else{
    $(".side_nav a").css({"text-align": "left", "font-size": "30px"});
    if (side_nav.style.width == nav_width) {
      $(".side_nav").width("250px");
      $("#start_button").fadeIn(50);
    }
    nav_width = "250px"
  }
}


function active_sn(){
  if (!transition){
    transition = true
    $('.hamburger').toggleClass('active');
    if ($('.side_nav').width() != 0) {
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
    setTimeout(function() {
      transition = false
    }, 160);
  }
};

$(document).ready(function() {
  resize_bg();
  $("body").css("opacity", "1");
});

$( window ).on( "resize", function(){
  resize_bg();
});

$('.hamburger').click(function() {
  active_sn();
});

$('#sb').click(function() {
  $('#login_form_box').css({"display":"block"});
  $('.modal').css({"z-index":"12"});
});

$('.home_button').click(function() {
  window.location.href = "/";
});

// When the user clicks anywhere outside of the modal, close it

$(document).click(function(event) {
  if (event.target == document.getElementById('login_form_box')) {
    $('#login_form_box').css({"display":"none"});
    $('.modal').css({"z-index":"9"});
  }
  else if (event.target == document.getElementById('sn')){
      active_sn();
  }
});


$('.x_container').click(function() {
  $('#login_form_box').css({"display":"none"});
  $('.modal').css({"z-index":"9"});
});



$("#login_form").submit(async function(event) {
  event.preventDefault();
  $("#login_error").html("<br>")
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
    const error = await response.text();
    $("#login_error").text(error)
  }
});
