
/* 
 *************************************
 * <!-- Counter -->
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
import UixCountTo from '@uixkit/core/counter/js/fn/count-to';

import '../scss/_style.scss';


export const COUNTER = ( ( module, $, window, document ) => {
	
	
    module.COUNTER               = module.COUNTER || {};
    module.COUNTER.version       = '0.0.2';
    module.COUNTER.documentReady = function( $ ) {

		var waypoints = $( '[data-counter-number]' ).waypoint({
			handler: function( direction ) {

				$( this.element ).UixCountTo();

				//Prevents front-end javascripts that are activated in the background to repeat loading.
				this.disable();


			},
			offset: '100%' //0~100%, bottom-in-view
		});

		
    };

    module.components.documentReady.push( module.COUNTER.documentReady );
	

	return class COUNTER {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );
