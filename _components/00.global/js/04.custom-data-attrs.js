
/* 
 *************************************
 * <!-- Get all custom attributes of an element like "data-*" -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.GET_CUSTOM_ATTRS               = APP.GET_CUSTOM_ATTRS || {};
	APP.GET_CUSTOM_ATTRS.version       = '0.0.1';
    APP.GET_CUSTOM_ATTRS.documentReady = function( $ ) {

		$( '[data-my-custom-datas]' ).each( function() {
			var $this         = $( this );

			
			//Get all attributes of an element and push the new attributes like "data-*"
			var curAttrs        = $this.attr(),
				customPostData  = '';
			
			$.each( curAttrs, function( i, val ) {
				if ( i.indexOf( 'data-custom-field-' ) >= 0 ) {
					customPostData += '"' + i.replace( 'data-custom-field-', '' ) + '": ' + '"' + val + '", ';	
				}
				
			});
			customPostData  = customPostData.replace(/,\s*$/, '' );
			

		});
		
    };

    APP.components.documentReady.push( APP.GET_CUSTOM_ATTRS.documentReady );
    return APP;

}( APP, jQuery, window, document ) );



