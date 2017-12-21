
/*! 
 *************************************
 * 5. Overlay
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
    var documentReady = function( $ ) {
		
		$( '.overlay-bg' ).each(function() {
			
			var dataBgColor = $( this ).data( 'overlay-bg' ),
				dataBgOpacity = $( this ).data( 'overlay-opacity' );
			
			
			if( typeof dataBgColor != typeof undefined ) {
				
				if( typeof dataBgOpacity === typeof undefined ) { // If there is no data-xxx, save current source to it
					$( this ).attr( 'data-overlay-opacity', 1 );
					
				}
				
				$( this ).animate( { opacity: $( this ).data( 'overlay-opacity' ) }, 0 );
				
				$( this ).css( {
					'background-color': $( this ).data( 'overlay-bg' )
				} );
	
			}
			
			
			
		});		
	};
	
		
    theme.overlay = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );
