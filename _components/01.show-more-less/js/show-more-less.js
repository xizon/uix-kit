
/* 
 *************************************
 * <!-- Show More Less -->
 *************************************
 */
App = ( function ( App, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ){
		
		$( '.custom-more-text-link' ).on( 'click', function( e ) {
			e.preventDefault();
			$( this ).parent().prev( '.custom-more-text' ).toggleClass( 'show' );
			$( this ).find( '> span' ).first().toggle();
			$( this ).find( '> span' ).eq(1).toggle();
			

		});
		
	};
		
      
    App.showMoreLess = {
        documentReady : documentReady        
    };  
    App.components.documentReady.push( documentReady );
    return App;

}( App, jQuery, window, document ) );

