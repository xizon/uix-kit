
/* 
 *************************************
 * <!-- Pagination -->
 *************************************
 */
App = ( function ( App, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
		$( '.pagination-container li > span.current' ).each( function()  {
			$( this ).parent( 'li' ).addClass( 'active' );
		});
	};
	
		
    App.pagination = {
        documentReady : documentReady        
    };

    App.components.documentReady.push( documentReady );
    return App;

}( App, jQuery, window, document ) );

