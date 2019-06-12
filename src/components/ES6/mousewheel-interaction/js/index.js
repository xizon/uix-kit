
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
	UixCssProperty,
	UixApplyAsyncScripts,
	UixApplyAsyncAllScripts
} from '@uixkit/core/_global/js';



export const MOUSEWHEEL_INTERACTION = ( ( module, $, window, document ) => {
	
	
    module.MOUSEWHEEL_INTERACTION               = module.MOUSEWHEEL_INTERACTION || {};
	module.MOUSEWHEEL_INTERACTION.version       = '0.0.2';
    module.MOUSEWHEEL_INTERACTION.documentReady = function( $ ) {

		//Prevent this module from loading in other pages
		if ( !$( 'body' ).hasClass( 'mousewheel-interaction' ) ) return false;
		
		
	    //Determine the direction of a jQuery scroll event
		//Fix an issue for mousewheel event is too fast.
		var lastAnimation     = 0,
			quietPeriod       = 500, //Do not change it
			animationTime     = 1000,//According to page transition animation changes
			scrollCount       = 0;
		
		var startY = 0;
		var onTouchStart = function ( e ) {
			var touches = e.touches;
			if ( touches && touches.length ) {
				startY = touches[0].pageY;
				
			}
		};

		
		var onDeviceWheel = function ( e ) {
			
			//Gets a value that indicates the amount that the mouse wheel has changed.
			var dir, delta, mobileDeltaY = null;
			
			var touches = e.touches;
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
		
		
		window.addEventListener( 'wheel', onDeviceWheel, { passive: true } );
		window.addEventListener( 'touchstart', onTouchStart, { passive: true } );
		window.addEventListener( 'touchmove', onDeviceWheel, { passive: true } );
		
		
		
		/*
		 * Scroll initialize
		 *
		 * @param  {Object} event        - The wheel event is fired when a wheel button of a pointing device (usually a mouse) is rotated. 
		 * @param  {String} dir          - Gets a value that indicates the amount that the mouse wheel has changed.
		 * @return {Void}
		 */
		function scrollMoveInit( event, dir ) {
	
			var timeNow = new Date().getTime();
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



