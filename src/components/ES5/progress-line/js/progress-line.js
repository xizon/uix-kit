/* 
 *************************************
 * <!-- Progress Line -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.PROGRESSLINE               = APP.PROGRESSLINE || {};
	APP.PROGRESSLINE.version       = '0.0.2';
    APP.PROGRESSLINE.documentReady = function( $ ) {

		var $obj                = $( '.uix-progress-line' ),
			$progressLineCircle = $obj.find( '.uix-progress-line__circle' ),
			progressLineRestore = function() {
				var k = 0;
				var progressLineAnimGo = setInterval( function() {
					$progressLineCircle.eq( k ).addClass( 'is-active' );
					$progressLineCircle.eq( k ).next( '.uix-progress-line__bar' ).addClass( 'is-active' );
					k++;


					if ( k == 10 ) {
						clearInterval( progressLineAnimGo );
					}


				}, 50 );
			};
		
		var waypoints = $('.uix-progress-line' ).waypoint({
			handler: function( direction ) {

				progressLineRestore();

				//Prevents front-end javascripts that are activated in the background to repeat loading.
				this.disable();


			},
			offset: '100%' //0~100%, bottom-in-view
		});

		
		$progressLineCircle.on( 'mouseenter', function() {
		
			var curIndex = $( this ).index()/2;
			
			$progressLineCircle.removeClass( 'is-active' );	
			$progressLineCircle.next( '.uix-progress-line__bar' ).removeClass( 'is-active' );	
			for ( var i = curIndex; i >= 0; i-- ) {
				$progressLineCircle.eq( i ).addClass('is-active');	
				$progressLineCircle.eq( i ).next( '.uix-progress-line__bar' ).addClass( 'is-active' );	
			}



		} );

		
		$progressLineCircle.parent().on( 'mouseleave', function() {
			progressLineRestore();
		} );
		
		
		//Adapt line width for different resolution
//		var plLength     = $progressLineCircle.length,
//			newPlW       = $obj.find( '.uix-progress-line__circle' ).first().width(),
//			plWrapperW   = $obj.width();
//
//		$obj.find( '.uix-progress-line__bar' ).css( 'width', parseFloat( plWrapperW - newPlW*plLength )/(plLength-1) + 'px' );
//		

		
    };

    APP.components.documentReady.push( APP.PROGRESSLINE.documentReady );
    return APP;

}( APP, jQuery, window, document ) );


