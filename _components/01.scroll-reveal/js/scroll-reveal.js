
/* 
 *************************************
 * <!-- Scroll Reveal -->
 *************************************
 */
App = ( function ( App, $, window, document ) {
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
	
		
    App.scrollReveal = {
        documentReady : documentReady        
    };

    App.components.documentReady.push( documentReady );
    return App;

}( App, jQuery, window, document ) );