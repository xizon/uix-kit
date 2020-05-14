
/* 
 *************************************
 * <!-- Mousewheel Interaction -->
 *************************************
 */
import {
    templateUrl,
    homeUrl,
    ajaxUrl,
    browser,
    UixModuleInstance,
    UixGUID,
    UixMath,
    UixCssProperty
} from '@uixkit/core/_global/js';



export const MOUSEWHEEL_INTERACTION = ( ( module, $, window, document ) => {
	if ( window.MOUSEWHEEL_INTERACTION === null ) return false;
	
	
	
    module.MOUSEWHEEL_INTERACTION               = module.MOUSEWHEEL_INTERACTION || {};
    module.MOUSEWHEEL_INTERACTION.version       = '0.0.3';
    module.MOUSEWHEEL_INTERACTION.documentReady = function( $ ) {

		//Prevent this module from loading in other pages
		if ( !$( 'body' ).hasClass( 'mousewheel-interaction' ) ) return false;
		
		
	    //Determine the direction of a jQuery scroll event
		//Fix an issue for mousewheel event is too fast.
		const quietPeriod       = 500, //Do not change it
			  animationTime     = 1000;//According to page transition animation changes

        
        let lastAnimation = 0;
        let scrollCount = 0;
		let startY = 0;
        
		const onTouchStart = function ( e ) {
			const touches = e.touches;
			if ( touches && touches.length ) {
				startY = touches[0].pageY;
				
			}
		};

		
		const onDeviceWheel = function ( e ) {
			
			//Gets a value that indicates the amount that the mouse wheel has changed.
			let dir, delta, mobileDeltaY = null;
			
			const touches = e.touches;
			if ( touches && touches.length ) {
				mobileDeltaY = startY - touches[0].pageY;
			} else {
				delta = Math.max(-1, Math.min(1, (-e.deltaY)));
			}
			
		
			if ( mobileDeltaY != null ) {
				
				if ( mobileDeltaY >= 50 ) {
					//--- swipe up
				    dir = 'up';
				}
				if ( mobileDeltaY <= -50 ) {
					//--- swipe down
					dir = 'down';
				
				}	
			} else {
				if( delta < 0 ) { 
					//scroll down
					dir = 'down';

				} else {
					//scroll up
					dir = 'up';
				}	
			}

			scrollMoveInit( e, dir );

			
		};
		
	
		window.addEventListener( 'wheel', onDeviceWheel, browser.supportsPassive ? { passive: true } : false );
		window.addEventListener( 'touchstart', onTouchStart, browser.supportsPassive ? { passive: true } : false );
		window.addEventListener( 'touchmove', onDeviceWheel, browser.supportsPassive ? { passive: true } : false );
		
		
		
		/*
		 * Scroll initialize
		 *
		 * @param  {Event} event        - The wheel event is fired when a wheel button of a pointing device (usually a mouse) is rotated. 
		 * @param  {String} dir          - Gets a value that indicates the amount that the mouse wheel has changed.
		 * @return {Void}
		 */
		function scrollMoveInit( event, dir ) {
	
			const timeNow = new Date().getTime();
			// Cancel scroll if currently animating or within quiet period
			if( timeNow - lastAnimation < quietPeriod + animationTime) {
				return;
			}

			if ( dir == 'down' ) {
				//scroll down
				$( '#demo-mousewheel-interaction-status' ).html( 'Direction: down, Total: ' + scrollCount );

				scrollCount++;
				
			} else {
				//scroll up
				$( '#demo-mousewheel-interaction-status' ).html( 'Direction: up, Total: ' + scrollCount );

				scrollCount++;
			  
			}
			lastAnimation = timeNow;
		}
		
    };

    module.components.documentReady.push( module.MOUSEWHEEL_INTERACTION.documentReady );

	return class MOUSEWHEEL_INTERACTION {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );



