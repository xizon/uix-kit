/* 
 *************************************
 * <!-- Progress Line -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.PROGRESSLINE               = APP.PROGRESSLINE || {};
	APP.PROGRESSLINE.version       = '0.0.1';
    APP.PROGRESSLINE.documentReady = function( $ ) {

		var $progressLineCircle = $('.uix-progress-line .uix-progress-line__circle' );
		
		var waypoints = $('.uix-progress-line' ).waypoint({
			handler: function( direction ) {

				var k = 0;
				var progressLineAnimGo = setInterval( function() {
					$progressLineCircle.eq( k ).addClass( 'active' );
					$progressLineCircle.eq( k ).next( '.uix-progress-line__bar' ).addClass( 'active' );
					k++;


					if ( k == 10 ) {
						clearInterval( progressLineAnimGo );
					}


				}, 50 );


				//Prevents front-end javascripts that are activated in the background to repeat loading.
				this.disable();


			},
			offset: '100%' //0~100%, bottom-in-view
		});

		
		$progressLineCircle.on( 'mouseenter', function() {
		
			var curIndex = $( this ).index()/2;
			
			$progressLineCircle.removeClass( 'active' );	
			$progressLineCircle.next( '.uix-progress-line__bar' ).removeClass( 'active' );	
			for ( var i = curIndex; i >= 0; i-- ) {
				$progressLineCircle.eq( i ).addClass('active');	
				$progressLineCircle.eq( i ).next( '.uix-progress-line__bar' ).addClass( 'active' );	
			}



		} );

		
    };

    APP.components.documentReady.push( APP.PROGRESSLINE.documentReady );
    return APP;

}( APP, jQuery, window, document ) );


