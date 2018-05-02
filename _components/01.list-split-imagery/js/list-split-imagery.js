
/* 
 *************************************
 * <!-- Fullwidth List of Split -->
 *************************************
 */
App = ( function ( App, $, window, document ) {
    'use strict';
   
   
    var pageLoaded = function() {
		
		var $window      = $( window ),
			windowWidth  = $window.width(),
			windowHeight = $window.height();
		
		
		fullwidthListSplitInit( windowWidth );
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( $window.width() != windowWidth ) {

				// Update the window width for next time
				windowWidth = $window.width();

				// Do stuff here
				fullwidthListSplitInit( windowWidth );
		

			}
		});
		
		
		
		function fullwidthListSplitInit( w ) {
			
			
			$( '.list-split-imagery-container' ).each( function() {
				var imgH = $( this ).find( '.imagery-background img' ).height();

				if ( imgH > 0 ) {
					$( this ).find( '.feature-text, .feature-imagery' ).css( 'height', imgH + 'px' );
				}

				if ( w <= 768 ) {
					$( this ).find( '.feature-text, .feature-imagery' ).css( 'height', 'auto' );
				}

			});	
		}
		

		
		
	};
		
    App.fullwidthListSplit = {
        pageLoaded : pageLoaded        
    };

    App.components.pageLoaded.push( pageLoaded );
    return App;

}( App, jQuery, window, document ) );


