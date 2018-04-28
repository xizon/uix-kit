
/* 
 *************************************
 * <!-- Specify a background image -->
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
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
	
		
    theme.setBG = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );

