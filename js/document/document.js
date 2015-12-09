
//Check to see if the window is top if not then display button
$(window).scroll(function(){
     "use strict";
    if ($(this).scrollTop() > 100) {
        $('.scrollTop').fadeIn('slow');
    } else {
        $('.scrollTop').fadeOut('slow');
    }
});

//Click event to scroll to top
$('.scrollTop').click(function(){
     "use strict";
    $('html, body').animate({scrollTop : 0},800);
    return false;
});

$('.mail-to').mailTo({
    'emailWho':'hello',
    'webAddress': 'inside-creative',
    'TLD': 'com'
});

$("img.lazy").lazyload({
     effect : "fadeIn"
});

 new WOW().init();

if (!Modernizr.svg) {
    $('img[src*="svg"]').attr('src', function() {
     return $(this).attr('src').replace('.svg', '.png');
    });
}