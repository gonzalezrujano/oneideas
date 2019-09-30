/*! Timeline Drop - by kickdrop.me */
(function() {
  jQuery(document).ready(function($) {
    var timelineAnimate;
    timelineAnimate = function(elem) {
      return $(".sboard.timeline.animated .timeline-row").each(function(i) {
        var bottom_of_object, bottom_of_window;
        bottom_of_object = $(this).position().top + $(this).outerHeight();
        bottom_of_window = $(window).scrollTop() + $(window).height();
        if (bottom_of_window > (bottom_of_object * 0.7) ) {
          return $(this).addClass("active");
        }
      });
    };
    timelineAnimate();
    return $(window).scroll(function() {
      return timelineAnimate();
    });
  });
}).call(this);