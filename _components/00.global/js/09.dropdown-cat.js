
/* 
 *************************************
 * <!-- Dropdown Categories -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.DROPDOWN_CAT               = APP.DROPDOWN_CAT || {};
	APP.DROPDOWN_CAT.version       = '0.0.1';
    APP.DROPDOWN_CAT.documentReady = function( $ ) {

		
		  $( '#cat' ).on( 'change', function () {
			  var cvalue = $( this ).val();
			  if ( cvalue ) {
				  location.href = homeUrl + "/?cat=" + cvalue;
			  }
			  return false;
		  });
		
    };

    APP.components.documentReady.push( APP.DROPDOWN_CAT.documentReady );
    return APP;

}( APP, jQuery, window, document ) );




