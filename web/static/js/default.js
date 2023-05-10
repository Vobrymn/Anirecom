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
}

function resize_sn(){
  if(window_skinny()){
    nav_width = "100vw";
    $(".side_nav a").css({"text-align": "center", "font-size": "40px"});
    if ($('.side_nav').width() != 0) {
      $(".side_nav").width(nav_width);
      $("#start_button").fadeOut(50);
    }
    
  }

  else{
    nav_width = "250px"
    $(".side_nav a").css({"text-align": "left", "font-size": "30px"});
    if ($('.side_nav').width() != 0) {
      $(".side_nav").width(nav_width);
      $("#start_button").fadeIn(50);
    }
    
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
      $('#sn').hide()
      $('.modal').css({"background-color":"rgba(65, 42, 19, 0.4)"});
    }
    else {
      $(".side_nav").width(nav_width);
      $("#sb").fadeOut(50);
      $("#hb").fadeOut(50);
      $('#sn').show()
      $('.modal').css({"background-color":"rgba(65, 42, 19, 0.0)"});
      if(window_skinny()){
        $("#start_button").fadeOut(50);
      }
    }
    setTimeout(function() {
      transition = false
    }, 200);
  }
};

$(document).ready(function() {
  resize_bg();
  resize_sn();

  if (logged_in){
    $("#register_sn").hide()
  }
  else{
    $("#settings_sn").hide()
    $("#history_sn").hide()
    $("#logout_sn").hide()
  }

  $("body").css("opacity", "1");
});

$( window ).on( "resize", function(){
  resize_bg();
  resize_sn();
});

$('.hamburger').click(function() {
  active_sn();
});

$('#sb').click(function() {
  $('#login_form_box').show()
  $('.modal').css({"z-index":"12"});
});

$('.home_button').click(function() {
  window.location.href = "/";
});

// When the user clicks anywhere outside of the modal, close it

$(document).click(function(event) {
  if (event.target == document.getElementById('login_form_box')) {
    $('#login_form_box').hide()
    $('.modal').css({"z-index":"9"});
    $("#username").val("")
    $("#password").val("")
  }
  else if (event.target == document.getElementById('sn')){
      active_sn();
  }
});


$('.x_container').click(function() {
  $('#login_form_box').hide()
  $('.modal').css({"z-index":"9"});
  $("#username").val("")
  $("#password").val("")
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
    location.reload()

  } else {
    // error, update the form with the error message
    const error = await response.text();
    $("#login_error").text(error)
  }
});

