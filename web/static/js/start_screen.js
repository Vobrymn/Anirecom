var loader = document.querySelector('.loader');

$("#start_button").click(function(){
  $(this).hide(); // hide the start button 
  $(".ui_bar").hide(); // hide the ui bar
  $(".hamburger").hide(); // hide the hamburger button 
  $(".envelope_container").hide(); // hide info button
  $(".loader").css("display", "grid");// show the loader as a grid
  $(".background").css({"transition": "transform 2s","transform": "scale(8)"});
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

function resize_envelope(){
  if(window_ratio()){
    $("#envelope_container").css({"height": "3vh", "width": "6vh", "transform": "translate(-11.8vh, -8vh)"});
    $(".info_text").css("font-size", "1.2vh")
    $(".animated_mail .body").css("border-width", "0 0 3vh 6vh")
    $(".animated_mail .top_fold").css("border-width", "1.7vh 3vh 0 3vh")
    $(".animated_mail .left_fold").css("border-width", "1.6vh 0 1.5vh 3vh")
  }
  else{
    $("#envelope_container").css({"height": "1.6875vw", "width": "3.375vw", "transform": "translate(-6.6vw, -4.5vw)"});
    $(".info_text").css("font-size", "0.675vw")
    $(".animated_mail .body").css("border-width", "0 0 1.6875vw 3.375vw")
    $(".animated_mail .top_fold").css("border-width", "0.84375vw 1.6875vw 0 1.6875vw")
    $(".animated_mail .left_fold").css("border-width", "0.84375vw 0 0.84375vw 1.6875vw")
  }
}

$(document).ready(function() {
  resize_sb();
  resize_envelope()
  $("body").css("opacity", "1");
});

$( window ).on( "resize", function(){
  resize_sb();
  resize_envelope()
});

//envelope stuff
/*i used chatgpt to help me with the transitions, because initially the modal was above and messed up with the pop ups
i also initially wanted a different idea, but decided that the idea was not working (to have the letter "fly out", i'd have to import for that)
so i used some remaining code to make the transitions work*/
var envelopeContainer = document.getElementById('envelope_container');
var mailPopup = document.querySelector('.mail_popup');
var modal = document.getElementById('modal');

envelopeContainer.addEventListener('click', function () {
  if (mailPopup.classList.contains('active')) {
    mailPopup.classList.remove('active');
    mailPopup.classList.remove('opened');
    modal.classList.remove('fade-in');
    modal.classList.add('fade-out');
  } else {
    mailPopup.classList.add('active');
    setTimeout(function(){ mailPopup.classList.add('opened'); }, 100);
    modal.style.display = "block";
    setTimeout(function(){ modal.classList.remove('fade-out'); modal.classList.add('fade-in'); }, 50);
    mailPopup.scrollTop = 0;
  }
});

//makes sure that you're able to click on the pop up without the modal closing everything
mailPopup.addEventListener('click', function(e) {
  e.stopPropagation();
});


document.querySelector('.close_button').addEventListener('click', function() {
  mailPopup.classList.remove('active');
  mailPopup.classList.remove('opened');
  modal.classList.remove('fade-in');
  modal.classList.add('fade-out');
  setTimeout(function(){ modal.style.display = "none"; }, 0); //hide modal after transition, 0 for no delay
});


modal.addEventListener('click', function() {
  mailPopup.classList.remove('active');
  mailPopup.classList.remove('opened');
  modal.classList.remove('fade-in');
  modal.classList.add('fade-out');
  setTimeout(function(){ modal.style.display = "none"; }, 0);
});

//i used chatgpt for the smooth scroll behaviour
function toggleDropdown(event) {
  const dropdown = event.target.closest('.dropdown');
  const content = dropdown.querySelector('.dropdown_content');
  const icon = dropdown.querySelector('.dropdown_icon');

  if (content.style.display === 'none') {
    content.style.display = 'block'; //show the dropdown content
    icon.classList.add('active');
    content.scrollIntoView({ behavior: 'smooth' }); //when dropdown content is shown it smoothly "scrolls down"
  } else {
    content.style.display = 'none'; //hide the dropdown content
    icon.classList.remove('active'); //remove active class from the icon
  }
}

//for dropdowns in dropdowns
function toggleNestedDropdown(event) {
  event.stopPropagation(); //to stop each nested drop down from interfering with each other
  const nestedContent = event.target.nextElementSibling;
  const nestedIcon = event.target.querySelector('.nested_dropdown_icon');

  if (nestedContent.style.display === 'none') {
    nestedContent.style.display = 'block';
    nestedIcon.classList.add('active');
    nestedContent.scrollIntoView({ behavior: 'smooth' }); 
  } else {
    nestedContent.style.display = 'none';
    nestedIcon.classList.remove('active');
  }
}
