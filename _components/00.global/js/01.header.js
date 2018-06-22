
/* 
 *************************************
 * <!-- Header Area -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.HEADER               = APP.HEADER || {};
	APP.HEADER.version       = '0.0.1';
    APP.HEADER.documentReady = function( $ ) {

		//Prevent this module from loading in other pages
		if ( $( 'body' ).hasClass( 'onepage' ) ) return false;
		

		var $window      = $( window ),
			windowWidth  = $window.width(),
			windowHeight = $window.height();


		
		//-------- Sticky header area
		var waypoints = $( '.header-area' ).waypoint({
			handler: function( direction ) {
				
				$( this.element ).toggleClass( 'spy-scroll-fixed', direction === 'down' );
				$( '.header-inner' ).toggleClass( 'spy-scroll-fixed', direction === 'down' );

			},
			offset: -120
		});
		
		
		
		//-------- Header initialize
		headerInit( windowWidth );
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( $window.width() != windowWidth ) {

				// Update the window width for next time
				windowWidth = $window.width();

				// Do stuff here
				headerInit( windowWidth );
		

			}
		});
		function headerInit( w ) {
			if ( w > 768 ) $( '.header-inner.auto-height' ).css( 'height', $( '.header-area' ).outerHeight() + 'px' ); 
			
		}
		
		
    };

    APP.components.documentReady.push( APP.HEADER.documentReady );
    return APP;

}( APP, jQuery, window, document ) );


		