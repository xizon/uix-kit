/* 
 *************************************
 * <!-- Back to Top -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.BACK_TO_TOP               = APP.BACK_TO_TOP || {};
	APP.BACK_TO_TOP.version       = '0.0.2';
    APP.BACK_TO_TOP.documentReady = function( $ ) {

		
		var $window      = $( window ),
			windowWidth  = $window.width(),
			windowHeight = $window.height(),
			$el          = $( '#uix-to-top' );


		//-------- Sticky button of back to top 
		//Note: Don't use Waypoint, because the Offset is wrong on calculating height of fixed element
		$( window ).on('scroll touchmove', function() {

			var scrollTop = $( this ).scrollTop(),
				spyTop    = windowHeight/2;

		
			if ( scrollTop >= spyTop ) {
				$el.addClass( 'active' );
			} else {
				$el.removeClass( 'active' );	
			}

		});


		//-------- Click event of back button
		$el.on( 'click', function( e ) {
			e.preventDefault();

			TweenMax.to( window, 0.5, {
				scrollTo: {
					y        : 0, //y: "max" --> vertical scroll to bottom
					autoKill : false
				},
				ease: Power2.easeOut
			});	

			
			
			
			
		});	
		
		//-------- Back To Top Trigger
		if ( $( '#uix-to-top' ).length == 0 ) {
			$( 'body' ).prepend( '<a href="#" id="uix-to-top"><i class="fa fa-level-up" aria-hidden="true"></i></a>' );
		}
		
			
		
		
    };

    APP.components.documentReady.push( APP.BACK_TO_TOP.documentReady );
    return APP;

}( APP, jQuery, window, document ) );



