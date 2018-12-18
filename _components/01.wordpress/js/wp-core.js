
/* 
 *************************************
 * <!-- WordPress Core Scripts -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.WP_CORE               = APP.WP_CORE || {};
	APP.WP_CORE.version       = '0.0.1';
    APP.WP_CORE.documentReady = function( $ ) {

		
		/* 
		 ---------------------------
		 Dropdown Categories
		 ---------------------------
		 */  
		  $( '#cat' ).on( 'change', function () {
			  var cvalue = $( this ).val();
			  if ( cvalue ) {
				  location.href = homeUrl + "/?cat=" + cvalue;
			  }
			  return false;
		  });
		

		
		
    };

    APP.components.documentReady.push( APP.WP_CORE.documentReady );
    return APP;

}( APP, jQuery, window, document ) );



