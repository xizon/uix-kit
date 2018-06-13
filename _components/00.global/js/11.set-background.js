
/* 
 *************************************
 * <!-- Specify a background image -->
 *************************************
 */
App = ( function ( App, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
		$( '[data-bg]' ).each( function() {
			var $this    = $( this ),
				config   = $this.data( 'bg' );


			if( typeof config === typeof undefined ) {
				config = {
					"src"      : "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
					"position" : "top left",
					"size"     : "cover",
					"repeat"   : "no-repeat",
					"fill"     : false,
				};
			}

			if ( config ) {

				var dataImg       = config.src,
					dataPos       = config.position,
					dataSize      = config.size,
					dataRepeat    = config.repeat;

				if( typeof dataPos === typeof undefined ) dataPos = 'top left';
				if( typeof dataSize === typeof undefined ) dataSize = 'cover';
				if( typeof dataRepeat === typeof undefined ) dataRepeat = 'no-repeat';
				

				if ( typeof dataImg != typeof undefined && dataImg != '' ) {

					if ( config.fill ) {
						//Show Image Under Text
						if ( Modernizr.cssanimations ) {
							$this.css( {
								'background'               : 'url('+dataImg+') '+dataRepeat+'',
								'background-size'          : dataSize,
								'-webkit-background-clip'  : 'text',
								'-webkit-text-fill-color'  : 'transparent',
							} );	
	
						}


					} else {

						$this.css( {
							'background-image'    : 'url('+dataImg+')',
							'background-position' : dataPos,
							'background-size'     : dataSize,
							'background-repeat'   : dataRepeat
						} );	
					}

				}	
				
				
			}
		

			

		});
		
	};
	
		
    App.setBG = {
        documentReady : documentReady        
    };

    App.components.documentReady.push( documentReady );
    return App;

}( App, jQuery, window, document ) );

