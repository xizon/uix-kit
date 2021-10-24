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
    UixDebounce,
    UixThrottle
} from '@uixkit/core/_global/js';


import '../scss/_style.scss';


export const PROGRESS_LINE = ( ( module, $, window, document ) => {
	if ( window.PROGRESS_LINE === null ) return false;
	
	
	
    module.PROGRESS_LINE               = module.PROGRESS_LINE || {};
    module.PROGRESS_LINE.version       = '0.0.3';
    module.PROGRESS_LINE.documentReady = function( $ ) {

		const $obj                = $( '.uix-progress-line' ),
			  $progressLineCircle = $obj.find( '.uix-progress-line__circle' ),
			  progressLineRestore = function() {
				let k = 0;
				const progressLineAnimGo = setInterval( function() {
					$progressLineCircle.eq( k ).addClass( 'is-active' );
					$progressLineCircle.eq( k ).next( '.uix-progress-line__bar' ).addClass( 'is-active' );
					k++;


					if ( k == 10 ) {
						clearInterval( progressLineAnimGo );
					}


				}, 50 );
			};
		
        
        //
		$progressLineCircle.on( 'mouseenter', function() {
		
			const curIndex = $( this ).index()/2;
			
			$progressLineCircle.removeClass( 'is-active' );	
			$progressLineCircle.next( '.uix-progress-line__bar' ).removeClass( 'is-active' );	
			for ( let i = curIndex; i >= 0; i-- ) {
				$progressLineCircle.eq( i ).addClass('is-active');	
				$progressLineCircle.eq( i ).next( '.uix-progress-line__bar' ).addClass( 'is-active' );	
			}



		} );

		
		$progressLineCircle.parent().on( 'mouseleave', function() {
			progressLineRestore();
		} );
		
		
		//Adapt line width for different resolution
//		const plLength     = $progressLineCircle.length,
//			  newPlW       = $obj.find( '.uix-progress-line__circle' ).first().width(),
//			  plWrapperW   = $obj.width();
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


