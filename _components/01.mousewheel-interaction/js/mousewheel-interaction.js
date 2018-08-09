
/* 
 *************************************
 * <!-- Mousewheel Interaction -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.SCROLL_LOCK               = APP.SCROLL_LOCK || {};
	APP.SCROLL_LOCK.version       = '0.0.1';
    APP.SCROLL_LOCK.documentReady = function( $ ) {

		//Prevent this module from loading in other pages
		if ( !$( 'body' ).hasClass( 'page-mousewheel-eff' ) ) return false;
		
		
	    //Determine the direction of a jQuery scroll event
		//Fix an issue for mousewheel event is too fast.
		var lastAnimation     = 0,
			quietPeriod       = 500, //Do not change it
			animationTime     = 1000,//According to page transition animation changes
			scrollCount       = 0;
		
		$( document ).on( 'wheel', function( e ) { 

			var dir;
			//Gets a value that indicates the amount that the mouse wheel has changed.
			var delta = e.originalEvent.deltaY;
			
			if( delta > 0 ) { 
				//scroll down
				dir = 'down';
				
			} else {
				//scroll up
				dir = 'up';
			}
			
			scrollInit( e, dir );
			
			//prevent page fom scrolling
			return false;

		});
		
	
	
		
		
		/*
		 * Scroll initialize
		 *
		 * @param  {object} event        - The wheel event is fired when a wheel button of a pointing device (usually a mouse) is rotated. 
		 * @param  {string} dir          - Gets a value that indicates the amount that the mouse wheel has changed.
		 * @return {void}                - The constructor.
		 */
		function scrollInit( event, dir ) {
	
			var timeNow = new Date().getTime();
			// Cancel scroll if currently animating or within quiet period
			if( timeNow - lastAnimation < quietPeriod + animationTime) {
				event.preventDefault();
				return;
			}

			if ( dir == 'down' ) {
				//scroll down
				$( '#demo-mousewheel-interaction-status' ).html( 'Direction: &darr;&darr;&darr;&darr;&darr;&darr;&darr;&darr;&darr;&darr;&darr;&darr;&darr;&darr;&darr;, Total: ' + scrollCount );

				scrollCount++;
				
			} else {
				//scroll up
				$( '#demo-mousewheel-interaction-status' ).html( 'Direction: &uarr;&uarr;&uarr;&uarr;&uarr;&uarr;&uarr;&uarr;&uarr;&uarr;&uarr;&uarr;&uarr;&uarr;&uarr;, Total: ' + scrollCount );

				scrollCount++;
			  
			}
			lastAnimation = timeNow;
		}
		
    };

    APP.components.documentReady.push( APP.SCROLL_LOCK.documentReady );
    return APP;

}( APP, jQuery, window, document ) );



