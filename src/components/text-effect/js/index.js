

/* 
 *************************************
 * <!-- Text effect -->
 *************************************
 */
/**
 * module.TEXT_EFFECT
 * 
 * @requires ./examples/assets/js/min/anime.min.js
 * @example 

 //The data-text-eff attribute on the same page cannot be duplicated.

<h3 data-text-eff="letters-eff-flyInOut-1" data-text-eff-speed="800">Text Text</h3>
<h3 data-text-eff="letters-eff-flyInOut-2" data-text-eff-speed="800">Text Text</h3>
<h3 data-text-eff="letters-eff-flyInOut-3" data-text-eff-speed="800">Text Text</h3>
 
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
import UixTextEff from '@uixkit/core/text-effect/js/fn/text-anime';


import '../scss/_style.scss';


export const TEXT_EFFECT = ( ( module, $, window, document ) => {
	if ( window.TEXT_EFFECT === null ) return false;
	
    module.TEXT_EFFECT               = module.TEXT_EFFECT || {};
    module.TEXT_EFFECT.version       = '0.0.5';
    module.TEXT_EFFECT.pageLoaded    = function() {


		$( '[data-text-eff]' ).each( function( index )  {
			$( document ).UixTextEff( { selectors: '[data-text-eff="'+$( this ).data( 'text-eff' )+'"]', scrollSpy: true } );
		});   
		
    };

    module.components.pageLoaded.push( module.TEXT_EFFECT.pageLoaded );
	

	return class TEXT_EFFECT {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );




