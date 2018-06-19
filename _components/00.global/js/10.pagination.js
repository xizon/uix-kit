
/* 
 *************************************
 * <!-- Pagination -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.PAGINATION               = APP.PAGINATION || {};
	APP.PAGINATION.version       = '0.0.1';
    APP.PAGINATION.documentReady = function( $ ) {

		$( '.pagination-container li > span.current' ).each( function()  {
			$( this ).parent( 'li' ).addClass( 'active' );
		});
		
    };

    APP.components.documentReady.push( APP.PAGINATION.documentReady );
    return APP;

}( APP, jQuery, window, document ) );



