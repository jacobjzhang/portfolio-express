function collapseNavbar() {
    var $window = $(window);
    if ($window.scrollTop() > 100) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
}

$(window).scroll(collapseNavbar);
$(document).ready(collapseNavbar);

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// For self description effect after the typing.
$('.intro-text').delay(2000).queue(function(){
    $(this).addClass("animated tada");
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
  if ($(this).attr('class') != 'dropdown-toggle active' && $(this).attr('class') != 'dropdown-toggle') {
    $('.navbar-toggle:visible').click();
  }
});

$(window).resize(function() {
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
	var newSW = $(window).width();
    var newSH = $(window).height();
    if (!isMobile) {
    	$(".intro").css("background-size", "cover");
    } else {
        $(".intro").css("height", "600px");
    }
    $(".intro").width(newSW).height(newSH);
});