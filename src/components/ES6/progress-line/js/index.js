/* 
 *************************************
 * <!-- Progress Line -->
 *************************************
 */
import {
    templateUrl,
	homeUrl,
	ajaxUrl,
    browser,
    UixModuleInstance,
	UixGUID,
	UixMath,
	UixCssProperty,
	UixApplyAsyncScripts,
	UixApplyAsyncAllScripts
} from '@uixkit/core/_global/js';


import '../scss/_style.scss';


export const PROGRESS_LINE = ( ( module, $, window, document ) => {
	
	
    module.PROGRESS_LINE               = module.PROGRESS_LINE || {};
	module.PROGRESS_LINE.version       = '0.0.2';
    module.PROGRESS_LINE.documentReady = function( $ ) {

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

    module.components.documentReady.push( module.PROGRESS_LINE.documentReady );
	

	return class PROGRESS_LINE {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );


