
/* 
 *************************************
 * <!-- Body And Header -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.BODY_AND_HEADER               = APP.BODY_AND_HEADER || {};
	APP.BODY_AND_HEADER.version       = '0.0.2';
    APP.BODY_AND_HEADER.documentReady = function( $ ) {

		//Prevent this module from loading in other pages
		if ( $( 'body' ).hasClass( 'onepage' ) ) return false;
		

		var $window      = $( window ),
			windowWidth  = $window.width(),
			windowHeight = $window.height();

		
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
			if ( w > 768 ) {
				
				$( '.uix-header__placeholder.uix-header__placeholder--auto-height' ).css( 'height', $( '.uix-header__container' ).outerHeight() + 'px' ); 
				
				$( 'body' ).removeClass( 'is-mobile' );
			} else {
				$( 'body' ).addClass( 'is-mobile' );
			}
		}
		
		


		
		//-------- Sticky header area
		//Note: Don't use Waypoint, because the Offset is wrong on calculating height of fixed element
		var $el = $( '.uix-header__container' );
		$window.on('scroll touchmove', function() {

			var scrollTop = $( this ).scrollTop(),
				spyTop    = 220;
			
			if ( scrollTop >= spyTop ) {
				$el.addClass( 'is-fixed' );
			} else {
				$el.removeClass( 'is-fixed' );	
			}
			
		});

		
    };

    APP.components.documentReady.push( APP.BODY_AND_HEADER.documentReady );
    return APP;

}( APP, jQuery, window, document ) );

