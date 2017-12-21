
/*! 
 *************************************
 * 16. Dropdown Categories
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
		  $( '#cat' ).on( 'change', function () {
			  var cvalue = $( this ).val();
			  if ( cvalue ) {
				  location.href = homeUrl + "/?cat=" + cvalue;
			  }
			  return false;
		  });

	};
	
		
    theme.dropdownCat = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );
