/* 
 *************************************
 * <!-- Back to Top -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.BACK_TO_TOP               = APP.BACK_TO_TOP || {};
	APP.BACK_TO_TOP.version       = '0.0.1';
    APP.BACK_TO_TOP.documentReady = function( $ ) {

		// Add button to body for back to top
		if ( $( '#toTop' ).length == 0 ) {
			$( 'body' ).prepend( '<a href="#" id="toTop"><span id="toTopHover"></span></a>' );
		}
		
		
		// Sticky button of back to top 
		var waypoints = $( '#toTop' ).waypoint({
			handler: function( direction ) {
				
				$( this.element ).toggleClass( 'active', direction === 'down' );

			},
			offset: -120
		});
		
		
		$( '#toTop' ).on( 'click', function( e ) {
			e.preventDefault();
			
			TweenMax.to( window, 0.5, {
				scrollTo: {
					y: 0
				},
				ease: Power2.easeOut
			});	

		});
		
		
    };

    APP.components.documentReady.push( APP.BACK_TO_TOP.documentReady );
    return APP;

}( APP, jQuery, window, document ) );



