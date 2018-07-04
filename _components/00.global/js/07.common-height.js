
/* 
 *************************************
 * <!-- Common Height -->
 
 *
 * Note: 
 *
 * Automatically sets the div height of the grid system to the height of the 
 * outer container when ".js-uix-common-height" class on ".row" or ".uix-core-grid__row" div.
 *
 *************************************
 */

APP = ( function ( APP, $, window, document ) {
    'use strict';
	

    APP.COMMON_HEIGHT               = APP.COMMON_HEIGHT || {};
	APP.COMMON_HEIGHT.version       = '0.0.1';
    APP.COMMON_HEIGHT.pageLoaded    = function() {

	    $( '.js-uix-common-height' ).commonHeight();
		
    };

    APP.components.pageLoaded.push( APP.COMMON_HEIGHT.pageLoaded );
    return APP;

}( APP, jQuery, window, document ) );




/* 
 *************************************
 * Associated Functions
 *************************************
 */

/*
 * Returns Common Height
 *
 * @param  {string} selector             - The current selector.
 * @return {void}                        - The constructor.
 */
( function ( $ ) {
    $.fn.commonHeight = function( options ) {

        // This is the easiest way to have default options.
        var settings = $.extend({
			selector : '[class*=col-], [class*=uix-core-grid__col-], [class*=uix-el-grid__col-]' //Bootstrap grid system and Custom seamless grid system
        }, options );
 
        this.each( function() {
			
			var $this        = $( this ),
				$window      = $( window ),
				windowWidth  = $window.width(),
				windowHeight = $window.height(),
				element      = $this,
				selectors    = settings.selector,
				maxHeight    = 0;


			element.children( selectors ).each( function() {
				var element = $( this ).children();
				if( element.hasClass( 'max-height' ) ) {
					maxHeight = element.outerHeight();
				} else {
					if ( element.outerHeight() > maxHeight )
					maxHeight = element.outerHeight();
				}
			});

			

			//No on mobile devices
			commonHeightInit( windowWidth );
			
			$window.on( 'resize', function() {
				// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
				if ( $window.width() != windowWidth ) {

					// Update the window width for next time
					windowWidth = $window.width();

					// Do stuff here
					commonHeightInit( windowWidth );


				}
			});

			
			function commonHeightInit( w ) {

				if ( w > 768 ) {
					element.children( selectors ).each( function() {
						$( this ).css( 'height', maxHeight );
					});	
				} else {
					element.children( selectors ).each( function() {
						$( this ).css( 'height', 'auto' );
					});		
				}


			}		
			

			
		});
 
    };
 
}( jQuery ));

