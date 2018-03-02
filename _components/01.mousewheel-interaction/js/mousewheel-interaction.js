
/*! 
 *************************************
 * Mousewheel Interaction
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ){
		
	    //Determine the direction of a jQuery scroll event
		//Fix an issue for mousewheel event is too fast.
		var oldDate       = new Date(),
			scrollCount   = 0;
		
		$( window ).on( 'mousewheel', function( event ) { 
			customMouseHandle( event ); 
		});

		function customMouseHandle( event ) {
			var newDate       = new Date(),
				scrollAllowed = true,
				wheel,
				scrollPos;

		

			if( wheel < 10 && ( newDate.getTime() - oldDate.getTime() ) < 50 ) {
				scrollPos -= event.deltaY*(10-wheel);
				wheel++;
			} else {
				if( ( newDate.getTime() - oldDate.getTime() ) > 50 ) {
					wheel = 0;
					scrollPos -= event.deltaY*30;
				}
				else {
					scrollAllowed = false;
				}
			}

			oldDate = new Date();

			if( scrollAllowed ) {
				
				scrollCount++;
				// do your stuff here
				if( event.originalEvent.wheelDelta > 0 ) {
					//Up
					$( '#demo-mousewheel-interaction-status' ).text( 'Direction: up, Total: ' + scrollCount );


				} else {
					//Down
					$( '#demo-mousewheel-interaction-status' ).text( 'Direction: down, Total: ' + scrollCount );

				}
				
				
			}
			
		}

		
	};
		
      
    theme.mousewheelInteraction = {
        documentReady : documentReady        
    };  
    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );

