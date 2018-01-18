
/*! 
 *************************************
 * 1. Header 
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var pageLoaded = function() {
	
		var $window      = $( window );

		
		$window.on( 'scroll touchmove', function() {

			//---
			if ( $window.scrollTop() > 120 ) {	
				$( '.header-area' ).addClass( 'spy-scroll-fixed' );
			}else{
				$( '.header-area' ).removeClass( 'spy-scroll-fixed' );
			};


		});	
		
		
		//Header initialize
		headerInit();
		
		$window.on('resize', function() {
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



		