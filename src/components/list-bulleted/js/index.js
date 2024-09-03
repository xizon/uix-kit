
/* 
 *************************************
 * <!-- Bulleted List -->
 *************************************
 */
import {
    UixModuleInstance,
} from '@uixkit/core/_global/js';


import '../scss/_style.scss';


export const BULLETED_LIST = ( ( module, $, window, document ) => {
	if ( window.BULLETED_LIST === null ) return false;
	
	
	
    module.BULLETED_LIST               = module.BULLETED_LIST || {};
    module.BULLETED_LIST.version       = '0.0.1';
    module.BULLETED_LIST.documentReady = function( $ ) {


		// Icon bulleted lists
		$( '[data-list-bullet]' ).each( function() {
			const bullet = $( this ).attr( 'data-list-bullet' );
			$( this ).find( 'li' ).prepend( '<i class="'+bullet+'" aria-hidden="true"></i>' );
		});

		
    };

    module.components.documentReady.push( module.BULLETED_LIST.documentReady );
	

	return class BULLETED_LIST {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );


