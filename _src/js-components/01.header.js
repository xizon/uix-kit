
/*! 
 *************************************
 * 1. Header 
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var pageLoaded = function() {
	

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
        pageLoaded : pageLoaded        
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );



		