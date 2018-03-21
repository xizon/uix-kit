

/*! 
 *************************************
 * 7. Initialize the height of each column of the grid system
 *
 * Note: 
 *
 * Automatically sets the div height of the grid system to the height of the 
 * outer container when ".full-height" class on ".row" or ".seamless-grid-container" div.
 *
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var pageLoaded = function() {
		

		var $window      = $( window ),
			windowWidth  = $window.width(),
			windowHeight = $window.height();

		
		rowColInit( windowWidth ); 
		
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( $window.width() != windowWidth ) {

				// Update the window width for next time
				windowWidth = $window.width();

				// Do stuff here
				rowColInit( windowWidth ); 
		

			}
		});
		

		function rowColInit( w ) {

			
			//Bootstrap grid system
			$( '.row.full-height' ).each( function()  {
				var h = ( w > 768 ) ? $( this ).height() + 'px' : 'auto';
				$( this ).find( '> div' ).css( 'height', h );
			});
			
			//Custom seamless grid system
			$( '.seamless-grid-container.full-height, .seamless-grid.full-height' ).each( function()  {
				var h = ( w > 768 ) ? $( this ).height() + 'px' : 'auto';
				$( this ).find( 'div[class*="seamless-col-"]' ).css( 'height', h );
				
			});
						


		}
		
		

    };

    theme.rowFullheight = {
        pageLoaded : pageLoaded        
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );



