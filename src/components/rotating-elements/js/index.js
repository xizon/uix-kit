/* 
 *************************************
 * <!-- Rotating Elements -->
 *************************************
 */
import {
    templateUrl,
    homeUrl,
    ajaxUrl,
    UixBrowser,
    UixModuleInstance,
    UixGUID,
    UixMath,
    UixCssProperty,
    UixDebounce,
    UixThrottle
} from '@uixkit/core/_global/js';



export const ROTATING_EL = ( ( module, $, window, document ) => {
	if ( window.ROTATING_EL === null ) return false;
	
	
	
    module.ROTATING_EL               = module.ROTATING_EL || {};
    module.ROTATING_EL.version       = '0.0.2';
    module.ROTATING_EL.documentReady = function( $ ) {


		$( '[data-pointer-to-deg]' ).each( function()  {

			const $this  = $( this );
            
			let	config = $this.data( 'pointer-to-deg' );


			if ( typeof config === typeof undefined ) {
				config = false;
			}

			if ( config ) {

				if ( $( config.target ).length == 0 ) return false;
				
				
				const pointer      = $( config.target )[0],
					  pointerBox   = pointer.getBoundingClientRect(),
					  centerPoint  = window.getComputedStyle( pointer ).transformOrigin,
					  centers      = centerPoint.split( ' ' );
                
                let mouseX, mouseY;


				if ( config.mouseSpy ) {
					$( document ).on( 'mousemove touchstart touchmove', function( e ) {
						let pointerEvent = e;
						if ( e.targetTouches && e.targetTouches[0] ) {
							e.preventDefault();
							pointerEvent = e.targetTouches[0];
							mouseX = pointerEvent.pageX;
							mouseY = pointerEvent.pageY;
						} else {
							mouseX = e.clientX;
							mouseY = e.clientY;
						}


						const centerY = pointerBox.top + parseInt(centers[1]) - window.pageYOffset,
							  centerX = pointerBox.left + parseInt(centers[0]) - window.pageXOffset,
							  radians = Math.atan2(mouseX - centerX, mouseY - centerY),
							  degrees = (radians * (180 / Math.PI) * -1) + 180;


						pointer.style.transform = 'rotate(' + degrees + 'deg)';

					});

				}

				
				$this.off( 'click' ).on( 'click', function( e ) {
					e.preventDefault();

					pointer.style.transform = 'rotate(' + config.deg + 'deg)';

				});
				

			}
			
			
		});
		

			
		
    };

    module.components.documentReady.push( module.ROTATING_EL.documentReady );
	

	return class ROTATING_EL {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );


