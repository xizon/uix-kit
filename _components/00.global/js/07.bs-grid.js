

/*! 
 *************************************
 * 7. Multiple columns full height for Bootstrap 3.x
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

			$( '.row.full-height' ).each( function()  {
				var h = ( w > 768 ) ? $( this ).height() + 'px' : 'auto';
				$( this ).find( '> div' ).css( 'height', h );
			});


		}
		
		

    };

    theme.rowFullheight = {
        pageLoaded : pageLoaded        
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );



