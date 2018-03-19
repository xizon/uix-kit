
/*! 
 *************************************
 * Mousewheel Interaction
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ){
		
		
		//Prevent this module from loading in other pages
		if ( !$( 'body' ).hasClass( 'page-mousewheel-eff' ) ) return false;
		
		
	    //Determine the direction of a jQuery scroll event
		//Fix an issue for mousewheel event is too fast.
		var mousewheelTrigger = true,
			scrollCount       = 0;
		
		$( window ).on( 'mousewheel', function( event ) { 

			if ( mousewheelTrigger ) {

				if( event.originalEvent.wheelDelta < 0) {
					//scroll down
					$( '#demo-mousewheel-interaction-status' ).text( 'Direction: down, Total: ' + scrollCount );

					scrollCount++;
					
					//Prohibited scrolling trigger
					mousewheelTrigger = false;
					
					//Do something
					customMouseHandle();		
					

				} else {
					//scroll up
					$( '#demo-mousewheel-interaction-status' ).text( 'Direction: up, Total: ' + scrollCount );

					scrollCount++;
					
					//Prohibited scrolling trigger
					mousewheelTrigger = false;
					
					//Do something
					customMouseHandle();

				}	

			}

		});
	
		
		

		function customMouseHandle() {
			
			//Reset scrolling trigger
			setTimeout( function() {
				mousewheelTrigger = true;	
			}, 1500 );
			
			
		}

		
	};
		
      
    theme.mousewheelInteraction = {
        documentReady : documentReady        
    };  
    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );

