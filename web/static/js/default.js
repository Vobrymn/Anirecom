var nav_width = "0";
var transition = false;

if (logged_in){
  $("#register_sn").remove()
}
else{
  $(".ui_bar").append('<button id="sb" class="button">Sign in</button>');
  $("#settings_sn").remove()
  $("#history_sn").remove()
  $("#logout_sn").remove()
}

function window_ratio(){
  if(window.innerHeight / window.innerWidth > 2160 /3840){
    return true;
  } else {
    return false;
  }
}

function window_skinny() {
  if (window.innerHeight >= window.innerWidth * 1.5 || window.innerWidth < 475) {
    return true;
  } else {
    return false;
  }
}

function resize_bg() {
  if (window_ratio()) {
    $(".background").height("100vh");
    $(".background").width("auto");
  } else {
    $(".background").height("auto");
    $(".background").width("100vw");
  }
}

function resize_sn() {
  if (window_skinny()) {
    nav_width = "100vw";
    $(".side_nav a").css({ "text-align": "center", "font-size": "40px" });
    if ($(".side_nav").width() != 0) {
      $(".side_nav").width(nav_width);
      $("#start_button").fadeOut(50);
      $("#hb").fadeOut(50);
    }
  } else {
    nav_width = "250px";
    $(".side_nav a").css({ "text-align": "left", "font-size": "30px" });
    if ($(".side_nav").width() != 0) {
      $(".side_nav").width(nav_width);
      $("#start_button").fadeIn(50);
      $("#hb").fadeIn(50);
    }
  }
}

function active_sn() {
  if (!transition) {
    transition = true;
    $(".hamburger").toggleClass("active");
    if ($(".side_nav").width() != 0) {
      $(".side_nav").width("0");
      $("#sb").fadeIn(50);
      $("#start_button").fadeIn(50);
      $('#sn').hide()
      $('.modal').css({"background-color":"rgba(65, 42, 19, 0.4)"});
      $("#hb").fadeIn(50);
    }
    else {
      $(".side_nav").width(nav_width);
      $("#sb").fadeOut(50);
      
      $('#sn').show()
      $('.modal').css({"background-color":"rgba(65, 42, 19, 0.0)"});
      if(window_skinny()){
        $("#start_button").fadeOut(50);
        $("#hb").fadeOut(50);
      }
    }
    setTimeout(function() {
      transition = false
    }, 200);
  }
}

$(document).ready(function () {
  resize_bg();
  resize_sn();
});

$(window).on("resize", function () {
  resize_bg();
  resize_sn();
});

$(".hamburger").click(function () {
  active_sn();
});

$('#sb').click(function() {
  $('#login_form_box').show()
  $('.modal').css({"z-index":"12"});
});

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
  $('#login_form_box, #settings_popup, #change_color, #change_password').fadeOut(200);
  $('.modal').css({ "z-index": "9" });
  $('.side_nav').removeClass('settings-expanded');
  $('.side_nav').width("0");
  $("#start_button").fadeIn(50);
  $("#hb").fadeIn(50);
});



$("#login_form").submit(async function(event) {
  event.preventDefault();
  $("#login_error").html("<br>");
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
    $("#login_error").text(error);
  }
});

//settings stuff
$('#settings_sn').click(function() {
  $('.side_nav').addClass('settings-expanded');
  $('#settings_popup').fadeIn(200);
  $('.modal').css({"z-index": "9"});
  
  //set the change color button as default selected option
  $('#change_color').fadeIn(200);
  $('#change_password').hide();
});


$('#settings_popup .close').click(function() {
  $('#settings_popup').fadeOut(200);
  $('.modal').css({"z-index": "9"});
  $('.side_nav').css({"z-index": ""}).removeClass('settings-expanded');
});

$('.back-button').click(function() {
  $('.side_nav').removeClass('settings-expanded');
  $('#settings_popup').fadeOut(200);
  $('.modal').css({"z-index": "1"});
});

//display the change color pop up
$('.settings-option:nth-child(1)').click(function() {
  $('#change_password').hide();
  $('#change_color').fadeIn(200);
});

//display the chnage pw pop up
$('.settings-option:nth-child(2)').click(function() {
  $('#change_color').hide();
  $('#change_password').fadeIn(200);
});


//close pop ups
$('#change_color .close, #change_password .close').click(function() {
  $('#change_color, #change_password').fadeOut(200);
});



