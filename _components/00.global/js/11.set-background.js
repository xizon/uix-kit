
/* 
 *************************************
 * <!-- Specify a background image -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.SET_BG               = APP.SET_BG || {};
	APP.SET_BG.version       = '0.0.3';
    APP.SET_BG.documentReady = function( $ ) {

		
        var $window      = $( window ),
		    windowWidth  = $window.width(),
		    windowHeight = $window.height();

        
		//  Initialize
		setBGInit( windowWidth, windowHeight );
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( $window.width() != windowWidth ) {

				// Update the window width for next time
				windowWidth  = $window.width();
				windowHeight = $window.height();

				// Do stuff here
				setBGInit( windowWidth, windowHeight );
		

			}
		});
		
	
		/*
		 * Initialize background using "data-bg" attribute.
		 *
		 * @param  {number} w         - Returns width of browser viewport
		 * @param  {number} h         - Returns height of browser viewport
		 * @return {void}             - The constructor.
		 */
		function setBGInit( w, h ) {
			
			$( '[data-bg]' ).each( function() {
				var $this    = $( this ),
					config   = $this.data( 'bg' );


				if( typeof config === typeof undefined ) {
					config = {
						"src"      : "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
						"position" : "top left",
						"size"     : "cover",
						"repeat"   : "no-repeat",
						"fill"     : false,
						"parallax" : 0
					};
				}

				if ( config ) {

					var dataImg       = config.src,
						dataPos       = config.position,
						dataSize      = config.size,
						dataRepeat    = config.repeat,
						dataParallax  = config.parallax;

					if( typeof dataPos === typeof undefined ) dataPos = 'top left';
					if( typeof dataSize === typeof undefined ) dataSize = 'cover';
					if( typeof dataRepeat === typeof undefined ) dataRepeat = 'no-repeat';


					if ( typeof dataImg != typeof undefined && dataImg != '' ) {

						if ( config.fill ) {
							//Show Image Under Text
							if ( Modernizr.cssanimations ) {
								$this.css( {
									'background'               : 'url('+dataImg+') '+dataRepeat+'',
									'background-size'          : dataSize,
									'-webkit-background-clip'  : 'text',
									'-webkit-text-fill-color'  : 'transparent',
								} );	

							}


						} else {

							$this.css( {
								'background-image'    : 'url('+dataImg+')',
								'background-position' : dataPos,
								'background-size'     : dataSize,
								'background-repeat'   : dataRepeat
							} );	
						}


						//Using parallax
						if ( dataParallax && typeof dataParallax != typeof undefined && dataParallax != 0 ) {

							$this.bgParallax( "50%", dataParallax );	
						}


					}	


				}




			});
	
			
		}
		
		

		
    };

    APP.components.documentReady.push( APP.SET_BG.documentReady );
    return APP;

}( APP, jQuery, window, document ) );






/*
Plugin: jQuery Parallax
Version 1.1.3
Author: Ian Lunn
Twitter: @IanLunn
Author URL: http://www.ianlunn.co.uk/
Plugin URL: http://www.ianlunn.co.uk/plugins/jquery-parallax/

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
*/

(function( $ ){
	var $window = $(window);
	var windowHeight = $window.height();

	$window.resize(function () {
		windowHeight = $window.height();
	});

	$.fn.bgParallax = function(xpos, speedFactor, outerHeight) {
		var $this = $(this);
		var getHeight;
		var firstTop;
		var paddingTop = 0;
		
		//get the starting position of each element to have parallax applied to it		
		$this.each( function(){
		    firstTop = $this.offset().top;
		});

		if (outerHeight) {
			getHeight = function(jqo) {
				return jqo.outerHeight(true);
			};
		} else {
			getHeight = function(jqo) {
				return jqo.height();
			};
		}
			
		// setup defaults if arguments aren't specified
		if (arguments.length < 1 || xpos === null) xpos = "50%";
		if (arguments.length < 2 || speedFactor === null) speedFactor = 0.1;
		if (arguments.length < 3 || outerHeight === null) outerHeight = true;
		
		// function to be called whenever the window is scrolled or resized
		function update(){
			var pos = $window.scrollTop();				

			$this.each( function(){
				var $element = $(this);
				var top = $element.offset().top;
				var height = getHeight($element);

				// Check if totally above or totally below viewport
				if (top + height < pos || top > pos + windowHeight) {
					return;
				}

				$this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
			});
		}		

		$window.bind('scroll', update).resize(update);
		update();
	};
})(jQuery);


