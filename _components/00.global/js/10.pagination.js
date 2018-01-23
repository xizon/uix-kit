
/*! 
 *************************************
 * 10. Pagination
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
		$( '.pagination-container li > span.current' ).each( function()  {
			$( this ).parent( 'li' ).addClass( 'active' );
		});
	};
	
		
    theme.Pagination = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );

