
/* 
 *************************************
 * <!-- Mousewheel Interaction -->
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ){
		
		
		//Prevent this module from loading in other pages
		if ( !$( 'body' ).hasClass( 'page-mousewheel-eff' ) ) return false;
		
		
	    //Determine the direction of a jQuery scroll event
		//Fix an issue for mousewheel event is too fast.
		var lastAnimation     = 0,
			quietPeriod       = 500, //Do not change it
			animationTime     = 1000,//According to page transition animation changes
			scrollCount       = 0;
		
		$( document ).on( 'mousewheel', function( event ) { 

			event.preventDefault();//prevent page fom scrolling
			var delta = event.originalEvent.wheelDelta || -event.originalEvent.detail;
			scrollInit( event, delta );

		});
		
	
	
		
		
		/*
		 * Scroll initialize
		 *
		 * @param  {object} event        - The wheel event is fired when a wheel button of a pointing device (usually a mouse) is rotated. 
		 * @param  {string} delta        - Gets a value that indicates the amount that the mouse wheel has changed.
		 * @return {void}                - The constructor.
		 */
		function scrollInit( event, delta ) {
	
			var timeNow = new Date().getTime();
			// Cancel scroll if currently animating or within quiet period
			if( timeNow - lastAnimation < quietPeriod + animationTime) {
				event.preventDefault();
				return;
			}

			if (delta < 0) {
				//scroll down
				$( '#demo-mousewheel-interaction-status' ).text( 'Direction: down, Total: ' + scrollCount );

				scrollCount++;
				
			} else {
				//scroll up
				$( '#demo-mousewheel-interaction-status' ).text( 'Direction: up, Total: ' + scrollCount );

				scrollCount++;
			  
			}
			lastAnimation = timeNow;
		}
		

		
	};
		
      
    theme.mousewheelInteraction = {
        documentReady : documentReady        
    };  
    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );

