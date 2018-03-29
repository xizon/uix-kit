
/* 
 *************************************
 * <!-- Show More Less -->
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ){
		
		$( '.custom-more-text-link' ).on( 'click', function( e ) {
			e.preventDefault();
			$( this ).parent().prev( '.custom-more-text' ).toggleClass( 'show' );
			$( this ).find( '> span' ).first().toggle();
			$( this ).find( '> span' ).eq(1).toggle();
			

		});
		
	};
		
      
    theme.showMoreLess = {
        documentReady : documentReady        
    };  
    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );

