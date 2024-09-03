
/* 
 *************************************
 * <!-- WordPress Core Scripts -->
 *************************************
 */
import {
    homeUrl,
    UixModuleInstance,
} from '@uixkit/core/_global/js';


import '../scss/_wp_core.scss';
import '../scss/_wp_blocks.scss';
import '../scss/_3rd_party_plugins.scss';

export const WP_CORE = ( ( module, $, window, document ) => {
	if ( window.WP_CORE === null ) return false;
	
	
	
    module.WP_CORE               = module.WP_CORE || {};
    module.WP_CORE.version       = '0.0.1';
    module.WP_CORE.documentReady = function( $ ) {

		/* 
		 ---------------------------
		 Pagination
		 ---------------------------
		 */  
		$( '.uix-pagination__container li > span.current' ).each( function()  {
			$( this ).parent( 'li' ).addClass( 'is-active' );
		});
		
		
		
		/* 
		 ---------------------------
		 Dropdown Categories
		 ---------------------------
		 */  
		  $( '#cat' ).on( 'change', function () {
			  const cvalue = $( this ).val();
			  if ( cvalue ) {
				  location.href = homeUrl + "/?cat=" + cvalue;
			  }
			  return false;
		  });


		
		
    };

    module.components.documentReady.push( module.WP_CORE.documentReady );

	return class WP_CORE {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );



