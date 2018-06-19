
/* 
 *************************************
 * <!-- Fullwidth List of Split -->
 *************************************
 */

APP = ( function ( APP, $, window, document ) {
    'use strict';
	

    APP.POST_LIST_SPLIT_FULLWIDTH               = APP.POST_LIST_SPLIT_FULLWIDTH || {};
	APP.POST_LIST_SPLIT_FULLWIDTH.version       = '0.0.1';
    APP.POST_LIST_SPLIT_FULLWIDTH.pageLoaded    = function() {

		var $window      = $( window ),
			windowWidth  = $window.width(),
			windowHeight = $window.height();
		
		
		fullwidthListSplitInit( windowWidth );
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( $window.width() != windowWidth ) {

				// Update the window width for next time
				windowWidth = $window.width();

				// Do stuff here
				fullwidthListSplitInit( windowWidth );
		

			}
		});
		
		
		
		function fullwidthListSplitInit( w ) {
			
			
			$( '.list-split-imagery-container' ).each( function() {
				var imgH = $( this ).find( '.imagery-background img' ).height();

				if ( imgH > 0 ) {
					$( this ).find( '.feature-text, .feature-imagery' ).css( 'height', imgH + 'px' );
				}

				if ( w <= 768 ) {
					$( this ).find( '.feature-text, .feature-imagery' ).css( 'height', 'auto' );
				}

			});	
		}
			    
		
    };

    APP.components.pageLoaded.push( APP.POST_LIST_SPLIT_FULLWIDTH.pageLoaded );
    return APP;

}( APP, jQuery, window, document ) );


