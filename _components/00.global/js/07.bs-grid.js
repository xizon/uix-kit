

/*! 
 *************************************
 * 7. Multiple columns full height for Bootstrap 3.x
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {
		

		var $window      = $( window ),
			windowWidth  = $window.width(),
			windowHeight = $window.height();


		// Close the menu on window change
		$window.on( 'resize', function() {
			windowWidth  = $window.width();
			if ( windowWidth > 768 ) {
				rowColInit( false ); 
			} else {
				rowColInit( true ); 
			}
		} );

		if ( windowWidth > 768 ) {
			rowColInit( false ); 
		} else {
			rowColInit( true ); 
		}


		function rowColInit( reset ) {


			$( '.row.full-height' ).each( function()  {
				var h = ( !reset ) ? $( this ).height() + 'px' : 'auto';
				$( this ).find( '> div' ).css( 'height', h );
			});


		}

		
		

    };

    theme.rowFullheight = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );


