
/* 
 *************************************
 * <!-- Floating Side Element -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.FLOATING_SIDE_EL               = APP.FLOATING_SIDE_EL || {};
	APP.FLOATING_SIDE_EL.version       = '0.0.1';
    APP.FLOATING_SIDE_EL.documentReady = function( $ ) {


		
		var documentHeight  = 0,
			$floatingSideEl = $( '.uix-floating-side-el' ),
			floatingOffset  = $floatingSideEl.offset();
		
		//Prevent this module from loading in other pages
		if ( $floatingSideEl.length == 0 ) return false;
		

		documentHeight = $( document ).height();
		
		//Init position
		TweenMax.to( $floatingSideEl, 0.3, {
			css: {
				marginTop  : -floatingOffset.top + ( $( window ).height() - $floatingSideEl.height() )/2
			}
		});	
		

		$( window ).on( 'scroll touchmove', function() {
			var sideBarHeight = $floatingSideEl.height(),
				scrollTop     = $( window ).scrollTop();

			if ( scrollTop > floatingOffset.top ) {
				var newPosition = scrollTop - floatingOffset.top,
					maxPosition = documentHeight - sideBarHeight;
				if ( newPosition > maxPosition ) {
					newPosition = maxPosition;
				}

				TweenMax.to( $floatingSideEl, 0.3, {
					css: {
						marginTop  : newPosition + ( window.innerHeight - sideBarHeight )/2
					}
				});		
			} else {

				TweenMax.to( $floatingSideEl, 0.3, {
					css: {
						marginTop  : 0
					}
				});	
			}
		});


		
    };

    APP.components.documentReady.push( APP.FLOATING_SIDE_EL.documentReady );
    return APP;

}( APP, jQuery, window, document ) );




