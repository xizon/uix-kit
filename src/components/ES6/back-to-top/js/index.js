/* 
 *************************************
 * <!-- Back to Top -->
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
    UixCssProperty
} from '@uixkit/core/_global/js';


import '../scss/_style.scss';


export const BACK_TO_TOP = ( ( module, $, window, document ) => {
	if ( window.BACK_TO_TOP === null ) return false;
	
	
	
    module.BACK_TO_TOP               = module.BACK_TO_TOP || {};
    module.BACK_TO_TOP.version       = '0.0.5';
    module.BACK_TO_TOP.documentReady = function( $ ) {

		
		const $window          = $( window );
		let	windowWidth        = window.innerWidth,
			windowHeight       = window.innerHeight;
		
		$( '<a href="#" id="uix-to-top"><i class="fa fa-arrow-up" aria-hidden="true"></i></a>' ).appendTo( 'body' );
		$.when( $( '#uix-to-top' ).length > 0).then( function() {
			
			//-------- Sticky button of back to top 
			//Note: Don't use Waypoint, because the Offset is wrong on calculating height of fixed element
			const $el = $( '#uix-to-top' );
			
			$window.on( 'scroll.BACK_TO_TOP touchmove.BACK_TO_TOP', function() {

				const scrollTop = $( this ).scrollTop(),
					  spyTop    = windowHeight/2;


				if ( scrollTop >= spyTop ) {
					$el.addClass( 'is-active' );
				} else {
					$el.removeClass( 'is-active' );	
				}

			});

			

			//-------- Click event of back button
			$el.off( 'click' ).on( 'click', function( e ) {
				e.preventDefault();

				TweenMax.to( window, 0.5, {
					scrollTo: {
						y        : 0, //y: "max" --> vertical scroll to bottom
						autoKill : false
					},
					ease: Power2.easeOut
				});	
				
				return false;


			});	
	
			
		});
		
	
		
		
    };

    module.components.documentReady.push( module.BACK_TO_TOP.documentReady );
	

	return class BACK_TO_TOP {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );


	