var loader = document.querySelector('.loader');

$("#start_button").click(function(){
  $(this).hide(); // hide the start button when clicked
  $(".ui_bar").children().hide(); // hide the hamburger button when clicked
  $(".loader").css("display", "grid");// show the loader as a grid
  $(".background").css({"transition": "transform 2s","transform": "scale(8)"});
  $(".side_nav").width("0"); // close the navigation bar when clicking the start button
  setTimeout(() => {
    window.location.href = '/quiz';
  }, 1000);
});


function resize_sb(){
  if(window_ratio()){
    $("#start_button").css({"height": "6.0vh", "width": "12.0vh","border-radius": "0.5vh","font-size": "3vh"});
  }
  else{
    $("#start_button").css({"height": "3.375vw", "width": "6.75vw","border-radius": "0.28vw","font-size": "1.69vw"});
  }
}

$(document).ready(function() {
  resize_sb();
});

$( window ).on( "resize", function(){
  resize_sb();
});
