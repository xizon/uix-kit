
/* 
 *************************************
 * <!-- Specify a background image -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.SET_BG               = APP.SET_BG || {};
	APP.SET_BG.version       = '0.0.1';
    APP.SET_BG.documentReady = function( $ ) {

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

    APP.components.documentReady.push( APP.SET_BG.documentReady );
    return APP;

}( APP, jQuery, window, document ) );

