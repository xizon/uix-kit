/* 
 *************************************
 * <!-- Back to Top -->
 *************************************
 */
import {
    UixModuleInstance,
    UixThrottle
} from '@uixkit/core/_global/js';

import ScrollToPlugin from '@uixkit/plugins/GSAP/esm/ScrollToPlugin';

import '../scss/_style.scss';


export const BACK_TO_TOP = ( ( module, $, window, document ) => {
	if ( window.BACK_TO_TOP === null ) return false;
	
	
	
    module.BACK_TO_TOP               = module.BACK_TO_TOP || {};
    module.BACK_TO_TOP.version       = '0.1.0';
    module.BACK_TO_TOP.documentReady = function( $ ) {

		
		let	windowWidth        = window.innerWidth,
			windowHeight       = window.innerHeight;
		
		$( '<a href="#" id="uix-to-top"><i class="fa fa-arrow-up" aria-hidden="true"></i></a>' ).appendTo( 'body' );
		$.when( $( '#uix-to-top' ).length > 0).then( function() {
			
			//-------- Sticky button of back to top 
			const $el = $( '#uix-to-top' );
			function scrollUpdate() {
				const scrolled = $( window ).scrollTop(),
					  spyTop   = windowHeight/2;


				if ( scrolled >= spyTop ) {
					$el.addClass( 'is-active' );
				} else {
					$el.removeClass( 'is-active' );	
				}
			}
			
			// Add function to the element that should be used as the scrollable area.
			const throttleFunc = UixThrottle(scrollUpdate, 5);
			window.removeEventListener('scroll', throttleFunc);
			window.removeEventListener('touchmove', throttleFunc);
			window.addEventListener('scroll', throttleFunc);
			window.addEventListener('touchmove', throttleFunc);
			throttleFunc();


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


	