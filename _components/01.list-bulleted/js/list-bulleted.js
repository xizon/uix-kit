
/* 
 *************************************
 * <!-- Bulleted List -->
 *************************************
 */
App = ( function ( App, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		

		// Icon bulleted lists
		$( '[data-list-bullet]' ).each( function() {
			var bullet = $( this ).attr( 'data-list-bullet' );
			$( this ).find( 'li' ).prepend( '<i class="'+bullet+'" aria-hidden="true"></i>' );
		});

		
	
		
	};
	
		
    App.bulletedList = {
        documentReady : documentReady        
    };

    App.components.documentReady.push( documentReady );
    return App;

}( App, jQuery, window, document ) );
