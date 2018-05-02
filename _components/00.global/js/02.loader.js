
/* 
 *************************************
 * <!-- Loader -->
 *************************************
 */
App = ( function ( App, $, window, document ) {
    'use strict';
    
    var pageLoaded = function() {
		// Remove loader
		$( '.loader' ).fadeOut();
		
    };

    App.loader = {
        pageLoaded : pageLoaded        
    };

    App.components.pageLoaded.push( pageLoaded );
    return App;

}( App, jQuery, window, document ) );



		