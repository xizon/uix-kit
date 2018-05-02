
/* 
 *************************************
 * <!-- Specify a background image -->
 *************************************
 */
App = ( function ( App, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
		$( '[data-bg]' ).each( function() {
			var $this         = $( this ),
				dataImg       = $this.data( 'bg' ),
				dataPos       = $this.data( 'bg-position' ),
				dataSize      = $this.data( 'bg-size' ),
				dataRepeat    = $this.data( 'bg-repeat' );

			if( typeof dataPos === typeof undefined ) {
				dataPos = 'top left';
			}
			
			if( typeof dataSize === typeof undefined ) {
				dataSize = 'cover';
			}
			
			if( typeof dataRepeat === typeof undefined ) {
				dataRepeat = 'no-repeat';
			}	
			
			
			if ( typeof dataImg != typeof undefined && dataImg != '' ) {
				$this.css( {
					'background-image'    : 'url('+dataImg+')',
					'background-position' : dataPos,
					'background-size'     : dataSize,
					'background-repeat'   : dataRepeat
				} );
			}
			

		});
		
	};
	
		
    App.setBG = {
        documentReady : documentReady        
    };

    App.components.documentReady.push( documentReady );
    return App;

}( App, jQuery, window, document ) );

