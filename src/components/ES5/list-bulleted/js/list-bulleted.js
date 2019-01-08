
/* 
 *************************************
 * <!-- Bulleted List -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.BULLETED_LIST               = APP.BULLETED_LIST || {};
	APP.BULLETED_LIST.version       = '0.0.1';
    APP.BULLETED_LIST.documentReady = function( $ ) {


		// Icon bulleted lists
		$( '[data-list-bullet]' ).each( function() {
			var bullet = $( this ).attr( 'data-list-bullet' );
			$( this ).find( 'li' ).prepend( '<i class="'+bullet+'" aria-hidden="true"></i>' );
		});

		
    };

    APP.components.documentReady.push( APP.BULLETED_LIST.documentReady );
    return APP;

}( APP, jQuery, window, document ) );


