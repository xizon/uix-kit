
/* 
 *************************************
 * <!-- Dropdown Categories -->
 *************************************
 */
App = ( function ( App, $, window, document ) {
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
	
		
    App.dropdownCat = {
        documentReady : documentReady        
    };

    App.components.documentReady.push( documentReady );
    return App;

}( App, jQuery, window, document ) );
