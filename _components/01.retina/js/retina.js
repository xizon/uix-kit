
/* 
 *************************************
 * <!-- Retina Graphics for Website -->
 *************************************
 */
App = ( function ( App, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
		//Determine if you have retinal display
		var hasRetina  = false,
			rootRetina = (typeof exports === 'undefined' ? window : exports),
			mediaQuery = '(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)';
	
		if ( rootRetina.devicePixelRatio > 1 || rootRetina.matchMedia && rootRetina.matchMedia( mediaQuery ).matches ) {
			hasRetina = true;
		} 

		if ( hasRetina ) {
			//do something
			$( '[data-retina]' ).each( function() {
				$( this ).attr( {
					'src'     : $( this ).data( 'retina' ),
				} );
			});
		
		} 
		
		
	
		
	};
	
		
    App.retina = {
        documentReady : documentReady        
    };

    App.components.documentReady.push( documentReady );
    return App;

}( App, jQuery, window, document ) );
