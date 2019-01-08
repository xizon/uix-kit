
/* 
 *************************************
 * <!-- Skew Based On Velocity of Scroll -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.SKEW_ON_SCROLL               = APP.SKEW_ON_SCROLL || {};
	APP.SKEW_ON_SCROLL.version       = '0.0.1';
    APP.SKEW_ON_SCROLL.documentReady = function( $ ) {

		$( '.uix-skewscroll-container' ).each( function() {
		
			var $this    = $( this ),
				$animObj = $this.find( 'p' ),
				followY  = 0,
				ease     = 0.15;

			
			TweenMax.set( $animObj, {
				transformOrigin: "center left"
			});

			TweenMax.ticker.addEventListener( 'tick', function() {
				followY += ( window.scrollY - followY) * ease;

				var dy = (window.scrollY - followY) / 20;
				
				dy = Math.min( Math.max(dy, -15), 15);
				TweenLite.set( $animObj, {
					skewY: dy
				});
			});
				
			
			
		});
		
		
    };

    APP.components.documentReady.push( APP.SKEW_ON_SCROLL.documentReady );
    return APP;

}( APP, jQuery, window, document ) );




