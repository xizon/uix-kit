
/* 
 *************************************
 * <!-- Fullwidth List of Split -->
 *************************************
 */

APP = ( function ( APP, $, window, document ) {
    'use strict';
	

    APP.POST_LIST_SPLIT_FULLWIDTH               = APP.POST_LIST_SPLIT_FULLWIDTH || {};
	APP.POST_LIST_SPLIT_FULLWIDTH.version       = '0.0.2';
    APP.POST_LIST_SPLIT_FULLWIDTH.pageLoaded    = function() {

		var $window      = $( window ),
			windowWidth  = window.innerWidth,
			windowHeight = window.innerHeight;
		
		
		fullwidthListSplitInit( windowWidth );
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( window.innerWidth != windowWidth ) {

				// Update the window width for next time
				windowWidth = window.innerWidth;

				// Do stuff here
				fullwidthListSplitInit( windowWidth );
		

			}
		});
		
		
		
		function fullwidthListSplitInit( w ) {
			
			
			$( '.uix-list-split-imagery' ).each( function() {
				var imgH = $( this ).find( '.uix-list-split-imagery__img img' ).height();

				if ( imgH > 0 ) {
					$( this ).find( '.uix-list-split-imagery__info, .uix-list-split-imagery__img-container' ).css( 'height', imgH + 'px' );
				}

				if ( w <= 768 ) {
					$( this ).find( '.uix-list-split-imagery__info, .uix-list-split-imagery__img-container' ).css( 'height', 'auto' );
				}

			});	
		}
			    
		
    };

    APP.components.pageLoaded.push( APP.POST_LIST_SPLIT_FULLWIDTH.pageLoaded );
    return APP;

}( APP, jQuery, window, document ) );


