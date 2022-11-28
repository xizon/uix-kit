
/* 
 *************************************
 * <!-- Retina Graphics for Website -->
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



export const RETINA = ( ( module, $, window, document ) => {
	if ( window.RETINA === null ) return false;
	
	
    module.RETINA               = module.RETINA || {};
    module.RETINA.version       = '0.0.1';
    module.RETINA.documentReady = function( $ ) {

		//Determine if you have retinal display
		let hasRetina  = false,
			rootRetina = (typeof exports === 'undefined' ? window : exports),
			mediaQuery = '(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)';
		
	
		if ( rootRetina.devicePixelRatio > 1 || rootRetina.matchMedia && rootRetina.matchMedia( mediaQuery ).matches ) {
			hasRetina = true;
		} 

		if ( hasRetina ) {
			//do something
			$( '[data-retina]' ).each( function() {
				$( this ).attr( {
					'src'     : $( this ).data( 'retina' ),
				} );
			});
		
		} 
			
		
    };

    module.components.documentReady.push( module.RETINA.documentReady );

	return class RETINA {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );

