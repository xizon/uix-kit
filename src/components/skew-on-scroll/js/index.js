
/* 
 *************************************
 * <!-- Skew Based On Velocity of Scroll -->
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
    UixDebounce,
    UixThrottle
} from '@uixkit/core/_global/js';



export const SKEW_ON_SCROLL = ( ( module, $, window, document ) => {
	if ( window.SKEW_ON_SCROLL === null ) return false;
	
	
    module.SKEW_ON_SCROLL               = module.SKEW_ON_SCROLL || {};
    module.SKEW_ON_SCROLL.version       = '0.0.1';
    module.SKEW_ON_SCROLL.documentReady = function( $ ) {

		$( '.uix-skewscroll-container' ).each( function() {
		
			const $this    = $( this ),
				  $animObj = $this.find( 'p' ),
				  ease     = 0.15;
            
            let followY  = 0;

			
			TweenMax.set( $animObj, {
				transformOrigin: "center left"
			});

			TweenMax.ticker.addEventListener( 'tick', function() {
				followY += ( window.scrollY - followY) * ease;

				let dy = (window.scrollY - followY) / 20;
				
				dy = Math.min( Math.max(dy, -15), 15);
				TweenLite.set( $animObj, {
					skewY: dy
				});
			});
				
			
			
		});
		
		
    };

    module.components.documentReady.push( module.SKEW_ON_SCROLL.documentReady );
	

	return class SKEW_ON_SCROLL {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );


