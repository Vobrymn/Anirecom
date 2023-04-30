const image = document.querySelector('.image');
const hamburger = document.querySelector('.hamburger');
const sideNav = document.querySelector('.side_nav');

hamburger.addEventListener('click', () => {
    if (sideNav.style.width === '250px') {
      sideNav.style.width = '0';
    } else {
      sideNav.style.width = '250px';
    }
  });


$( window ).on( "resize", function(){
    $(".background").height("100vh");
    $(".hamburger").style.fontSize("2vh");
    
});
