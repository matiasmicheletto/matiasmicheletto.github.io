/* --------------------------------------------------------------------------
 * javascript handle initialization
      1. To top Jquery
      2. Testimonial Slider
 *
 * -------------------------------------------------------------------------- */

(function($){

	"use strict";
	
	var themeApp = {
		
		//----------- 1. To top Jquery ----------- 
		theme_scrollUP:function() {
		   
		$(document).scroll(function () {
			var toTop = $('.to-top');

			if ($(this).scrollTop() > 400) {
				toTop.fadeIn();
			} else {
				toTop.fadeOut();
			}
		});
		},

		//----------- 2. Testimonial Slider ----------- 
		theme_testimonial_scroll:function() {
			UIkit.on('domready.uk.dom', function() {
			//Change slideshow on focuschange of slider
			var slideshow = UIkit.slideshow('#idz-slideshow');
				$('#idz-slider').on('focusitem.uk.slider', function(event, index, item, slider) {
				  slideshow.show($(item).data('ukSlideshowItem'));
				});
			});
		},

		theme_init:function(){
			themeApp.theme_scrollUP();
			themeApp.theme_testimonial_scroll();
		}
		
	}//end themeApp
	

	jQuery(document).ready(function($){
		themeApp.theme_init();
    });
	
})(jQuery);