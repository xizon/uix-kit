
/*! 
 *************************************
 * 6. Scroll Reveal
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {

		//Reversing Scroll Animations in CSS with Waypoints
		if ( Modernizr.cssanimations ) {
			
			var $scrollRevealElements = $( '.scroll-reveal' ),
				waypoints             = $scrollRevealElements.waypoint({
				handler: function( direction ) {

					//$( this.element ).toggleClass( 'animated fadeInUp', direction === 'down' );
					$( this.element ).addClass( 'animated fadeInUp' );

				},
				offset: '100%' //0~100%, bottom-in-view
			});

	
		}

		
		
	};
	
		
    theme.scrollReveal = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );