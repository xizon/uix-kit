
/* 
 *************************************
 * <!-- Show More Less -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.SHOW_MORELESS               = APP.SHOW_MORELESS || {};
	APP.SHOW_MORELESS.version       = '0.0.1';
    APP.SHOW_MORELESS.documentReady = function( $ ) {

		$( '.custom-more-text-link' ).on( 'click', function( e ) {
			e.preventDefault();
			$( this ).parent().prev( '.custom-more-text' ).toggleClass( 'show' );
			$( this ).find( '> span' ).first().toggle();
			$( this ).find( '> span' ).eq(1).toggle();
			

		});	
		
    };

    APP.components.documentReady.push( APP.SHOW_MORELESS.documentReady );
    return APP;

}( APP, jQuery, window, document ) );


