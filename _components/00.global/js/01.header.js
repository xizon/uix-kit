
/*! 
 *************************************
 * 1. Header 
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {
	

		//-------- Sticky header area
		var waypoints = $( '.header-area' ).waypoint({
			handler: function( direction ) {
				
				$( this.element ).toggleClass( 'spy-scroll-fixed', direction === 'down' );

			},
			offset: -120
		});
		
		
		
		//-------- Header initialize
		headerInit();
		
		$( window ).on('resize', function() {
			headerInit();

		});
		
		function headerInit() {
			$( '.header-inner.auto-height' ).css( 'height', $( '.header-area' ).outerHeight() + 'px' ); 
		}
		
		
    };

    theme.header = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );


		