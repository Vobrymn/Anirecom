var nav_width = "0";
var transition = false;

if (logged_in){
  $("#register_sn").remove()
}
else{
  $(".ui_bar").append('<button id="sb" class="button">Sign in</button>');
  $("#logout_sn").remove()
  $("#settings").remove()
  $("#settings_sn").remove()
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
      $("#hb").fadeIn(50);
      $("#back_button").fadeIn(50);
      $("#refresh_button").fadeIn(50);
      $('#sn').hide()    
    }
    else {
      $(".side_nav").width(nav_width);
      $("#sb").fadeOut(50);
      $("#back_button").fadeOut(50);
      $("#refresh_button").fadeOut(50);
      $('#sn').show()
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
  $('.modal').css({"z-index":"14"});
  $('.modal').css({"background-color":"rgba(65, 42, 19, 0.4)"});
});

$(document).click(function(event) {
  if (event.target == document.getElementById('login_form_box')) {
    $('#login_form_box').hide()
    $('.modal').css({"z-index":"9"});
    $('.modal').css({"background-color":"rgba(65, 42, 19, 0.0)"});
    $("#username").val("")
    $("#password").val("")
  }
  else if (event.target == document.getElementById('sn')){
    $('.side_nav').removeClass('settings-expanded');
    $('#settings_popup').fadeOut(200);
    $('.modal').css({"z-index": "9"});
    active_sn();
    reset_pwd_form();
  }
  else if (event.target == document.getElementById('settings')){
    $('.side_nav').removeClass('settings-expanded');
    $("#settings").fadeOut(100)
    reset_pwd_form();
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



$("#login_form").submit(function(event) {
  event.preventDefault();
  $("#login_error").html("<br>");

  // Get the form data
  const formData = new FormData(event.target);

  // Send an AJAX POST request to the server
  $.ajax({
    url: '/login',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    success: function() {
      // Success, reload the page
      location.reload();
    },
    error: function(xhr, textStatus, error) {
      // Error, update the form with the error message
      $("#login_error").text(xhr.responseText);
    }
  });
});

//settings stuff
$('#settings_sn').click(function() {
  $('.side_nav').addClass('settings-expanded');
  reset_pwd_form();
  $('.modal').css({"z-index": "9"});
  
  //set the change color button as default selected option
  document.getElementById('color1').value = rgba_to_hex(colour_1);
  document.querySelector('.color_input:nth-of-type(1)').style.backgroundColor = colour_1;
  document.getElementById('color2').value = rgba_to_hex(colour_2);
  document.querySelector('.color_input:nth-of-type(2)').style.backgroundColor = colour_2;
});

$('.back-button').click(function() {
  $('.side_nav').removeClass('settings-expanded');
  reset_pwd_form();
  $('#settings_popup').fadeOut(200);
  $('.modal').css({"z-index": "1"});
});

//display the change color pop up
$('.settings-option:nth-child(1)').click(function() {
  document.getElementById('color1').value = rgba_to_hex(colour_1);
  document.querySelector('.color_input:nth-of-type(1)').style.backgroundColor = colour_1;
  document.getElementById('color2').value = rgba_to_hex(colour_2);
  document.querySelector('.color_input:nth-of-type(2)').style.backgroundColor = colour_2;
  active_sn();
  $('#settings').show();
  reset_pwd_form();
  $('#settings_popup').fadeIn(200);
  $('#change_password').hide();
  $('#change_color').fadeIn(200);
});

//display the change pw pop up
$('.settings-option:nth-child(2)').click(function() {
  active_sn();
  $('#settings').show();
  reset_pwd_form();
  $('#settings_popup').fadeIn(200);
  $('#change_color').hide();
  $('#change_password').fadeIn(200);
});

//change colour
function myColor1() {
  // Get the value returned by the first color picker
  var col1 = document.getElementById('color1').value;
  // Set the color as background for the first .maincolor div
  document.querySelector('.color_input:nth-of-type(1)').style.backgroundColor = hexToRgba(col1, 0.9);
}

function myColor2() {
  // Get the value returned by the second color picker
  var col2 = document.getElementById('color2').value;
  // Set the color as background for the second .maincolor div
  document.querySelector('.color_input:nth-of-type(2)').style.backgroundColor = hexToRgba(col2, 0.9);
}

// When the user interacts with the first color picker, call myColor1() function
document.getElementById('color1').addEventListener('input', myColor1);

// When the user interacts with the second color picker, call myColor2() function
document.getElementById('color2').addEventListener('input', myColor2);

function hexToRgba(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16);
  var g = parseInt(hex.slice(3, 5), 16);
  var b = parseInt(hex.slice(5, 7), 16);
  rgba_val = "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")"
  console.log(rgba_val)
  return rgba_val;
}

function rgba_to_hex(rgbaColor) {
  
  function rgbaToHex(r, g, b, a) {
    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);
    a = Math.round(a * 255);

    var hexR = r.toString(16).padStart(2, '0');
    var hexG = g.toString(16).padStart(2, '0');
    var hexB = b.toString(16).padStart(2, '0');

    return "#" + hexR + hexG + hexB;
  }
  var match = rgbaColor.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/);

  if (match) {
    var r = parseInt(match[1]);
    var g = parseInt(match[2]);
    var b = parseInt(match[3]);
    var a = parseFloat(match[4]) || 1;

    var hexColor = rgbaToHex(r, g, b, a);
    return hexColor
  }
}


$("#save_button").click(function(event) {
  // Get the form data
  const formData = new FormData();
  formData.append("colour_1", hexToRgba(document.getElementById('color1').value, 0.9))
  formData.append("colour_2", hexToRgba(document.getElementById('color2').value, 0.9))
  // Send an AJAX POST request to the server

  $.ajax({
    url: '/change_colour',
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    success: function() {
      // Success, reload the page
      location.reload();
    },
    error: function(xhr, textStatus, error) {
      // Error, update the form with the error message
    }
  });
});

function reset_pwd_form(){
  $("#old_password").val("")
  $("#new_password").val("")
  $("#confirm_password").val("")
  $("password_error").text("default")
  $("#password_error").css("opacity","0")
}


let valid_p = false

function check_password(e){
    const log = $(this).val();
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    switch($(this).attr("id")){
        
        case "new_password":
            if (log.length < 8) {
                valid_p = false;
                if (log != ""){
                    $("#password_error").text("Password must be at least 8 characters")
                    $("#password_error").css("opacity","1")
                }
                else{
                    $("#password_error").text("default")
                    $("#password_error").css("opacity","0")
                }
            } 
            else {
                valid_p = true;
                $("#password_error").text("default")
                $("#password_error").css("opacity","0")
            }
        break;

        case "confirm_password":
            if (log == $("#new_password").val()) {
                $("#password_error").text("default")
                $("#password_error").css("opacity","0")
            } 
            else {
                $("#password_error").text("Passwords must match")
                $("#password_error").css("opacity","1")
            }
        break;

            default:
    }
}

$("#new_password").on("input", check_password)
$("#confirm_password").on("input", check_password)

$("#password_form").submit(function(event) {
    event.preventDefault();
    console.log("start")

    if (!valid_p){
        $("#password_error").text("Password must be at least 8 characters")
        $("#password_error").css("opacity","1")
        return
    }
    else if (!($("#new_password").val() == $("#confirm_password").val())){
        $("#password_error").text("Passwords must match")
        $("#password_error").css("opacity","1")
        return
    }

    if (valid_p && $("#new_password").val() == $("#confirm_password").val() && logged_in) {
      const formData = new FormData(event.target);
  
      // Send an AJAX POST request to the server
      $.ajax({
        url: '/change_pwd',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function() {
          // Success, redirect to the home page
          location.reload();
        },
        error: function(xhr, textStatus, error) {
          // Error, update the form with the error message
          $("#password_error").text(xhr.responseText);
          $("#password_error").css("opacity","1")
        }
      });
    }
});