
/* 
 *************************************
 * <!-- Get all custom attributes of an element like "data-*" -->
 *************************************
 */
import {
    UixModuleInstance,
} from '@uixkit/core/_global/js';

import '@uixkit/plugins/Miscellaneous/attrExt';

export const GET_CUSTOM_ATTRS = ( ( module, $, window, document ) => {
	if ( window.GET_CUSTOM_ATTRS === null ) return false;
	
	
	module.GET_CUSTOM_ATTRS               = module.GET_CUSTOM_ATTRS || {};
    module.GET_CUSTOM_ATTRS.version       = '0.0.1';
	module.GET_CUSTOM_ATTRS.documentReady = function( $ ) {


		$( '[data-my-custom-datas]' ).each( function() {
			const $this         = $( this );

			
			//Get all attributes of an element and push the new attributes like "data-*"
			let curAttrs        = $this.attr(),
				customPostData  = '';
			
			$.each( curAttrs, function( i, val ) {
				if ( i.indexOf( 'data-custom-field-' ) >= 0 ) {
					customPostData += '"' + i.replace( 'data-custom-field-', '' ) + '": ' + '"' + val + '", ';	
				}
				
			});
			customPostData  = customPostData.replace(/,\s*$/, '' );
			

		});


	};

	module.components.documentReady.push( module.GET_CUSTOM_ATTRS.documentReady );

	return class GET_CUSTOM_ATTRS {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );

