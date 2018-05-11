/* 
 *************************************
 * <!-- Rotating Elements -->
 *************************************
 */
App = ( function ( App, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {

		if ( $( '#pointer' ).length > 0 ) {
			
			var pointer      = $( '#pointer' )[0],
				pointerBox   = pointer.getBoundingClientRect(),
				centerPoint  = window.getComputedStyle( pointer ).transformOrigin,
				centers      = centerPoint.split( ' ' ),
				mouseSpy     = false,
				mouseX,
				mouseY;


			if ( mouseSpy ) {
				$( document ).on( 'mousemove touchstart touchmove', function( e ) {
					var pointerEvent = e;
					if ( e.targetTouches && e.targetTouches[0] ) {
						e.preventDefault();
						pointerEvent = e.targetTouches[0];
						mouseX = pointerEvent.pageX;
						mouseY = pointerEvent.pageY;
					} else {
						mouseX = e.clientX;
						mouseY = e.clientY;
					}


					var centerY = pointerBox.top + parseInt(centers[1]) - window.pageYOffset,
						centerX = pointerBox.left + parseInt(centers[0]) - window.pageXOffset,
						radians = Math.atan2(mouseX - centerX, mouseY - centerY),
						degrees = (radians * (180 / Math.PI) * -1) + 180;


					pointer.style.transform = 'rotate(' + degrees + 'deg)';

				});

			}



			$( '[data-pointer-to-deg]' ).on( 'click', function( e ) {
				e.preventDefault();

				pointer.style.transform = 'rotate(' + $( this ).data( 'pointer-to-deg' ) + 'deg)';

			});
			
		}
			

		
    };

    App.rotatingElements = {
        documentReady : documentReady        
    };

    App.components.documentReady.push( documentReady );
    return App;

}( App, jQuery, window, document ) );


