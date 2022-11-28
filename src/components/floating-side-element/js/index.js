
/* 
 *************************************
 * <!-- Floating Side Element -->
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


import '../scss/_style.scss';


export const FLOATING_SIDE_EL = ( ( module, $, window, document ) => {
	if ( window.FLOATING_SIDE_EL === null ) return false;
	
	
	
    module.FLOATING_SIDE_EL               = module.FLOATING_SIDE_EL || {};
    module.FLOATING_SIDE_EL.version       = '0.0.7';
    module.FLOATING_SIDE_EL.documentReady = function( $ ) {


		
		let documentHeight  = 0,
			$floatingSideEl = $( '.uix-floating-side-el' ),
			floatingOffset  = $floatingSideEl.offset();
		
		//Prevent this module from loading in other pages
		if ( $floatingSideEl.length == 0 ) return false;
		

		documentHeight = $( document ).height();
		
		//Init position
		TweenMax.to( $floatingSideEl, 0.3, {
			css: {
				marginTop  : -floatingOffset.top + ( $( window ).height() - $floatingSideEl.height() )/2
			}
		});	
		

		function scrollUpdate() {
			let sideBarHeight = $floatingSideEl.height(),
				scrolled      = $( window ).scrollTop();
            
            documentHeight = $( document ).height();

			if ( scrolled > floatingOffset.top ) {
				let newPosition = scrolled - floatingOffset.top,
					maxPosition = documentHeight - sideBarHeight;
				if ( newPosition > maxPosition ) {
					newPosition = maxPosition;
				}

				TweenMax.to( $floatingSideEl, 0.3, {
					css: {
						marginTop  : newPosition + ( window.innerHeight - sideBarHeight )/2
					}
				});		
			} else {

				TweenMax.to( $floatingSideEl, 0.3, {
					css: {
						marginTop  : 0
					}
				});	
			}
		}
		
		// Add function to the element that should be used as the scrollable area.
		const throttleFunc = UixThrottle(scrollUpdate, 5);
		window.removeEventListener('scroll', throttleFunc);
		window.removeEventListener('touchmove', throttleFunc);
		window.addEventListener('scroll', throttleFunc);
		window.addEventListener('touchmove', throttleFunc);
		throttleFunc();
		

		
    };

    module.components.documentReady.push( module.FLOATING_SIDE_EL.documentReady );
	

	return class FLOATING_SIDE_EL {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );

