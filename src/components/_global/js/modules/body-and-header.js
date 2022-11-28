
/* 
 *************************************
 * <!-- Body And Header -->
 *************************************
 */
import {
    templateUrl,
    homeUrl,
    ajaxUrl,
    UixBrowser,
    UixModuleInstance,
    UixGUID,
    UixMath,
    UixCssProperty,
    UixDebounce,
    UixThrottle
} from '@uixkit/core/_global/js';


export const BODY_AND_HEADER = ( ( module, $, window, document ) => {
	if ( window.BODY_AND_HEADER === null ) return false;
	
	
	module.BODY_AND_HEADER               = module.BODY_AND_HEADER || {};
    module.BODY_AND_HEADER.version       = '0.0.8';
	module.BODY_AND_HEADER.documentReady = function( $ ) {


		//Prevent this module from loading in other pages
		if ( $( 'body' ).hasClass( 'onepage' ) ) return false;
		

        let	windowWidth        = window.innerWidth,
            windowHeight       = window.innerHeight;
        

		//-------- Header initialize
		headerInit( windowWidth );

		function headerInit( w ) {
			
			const $headerPlaceholder = $( '.uix-header__placeholder.js-uix-header__placeholder-autoheight' );
			
			if ( w > 768 ) {
				$headerPlaceholder.css( 'height', $( '.uix-header__container' ).outerHeight( true ) + 'px' ); 
				$( 'body' ).removeClass( 'is-mobile' );
			} else {
				$headerPlaceholder.css( 'height', 0 ); 
				$( 'body' ).addClass( 'is-mobile' );
			}
		}

		function windowUpdate() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( window.innerWidth != windowWidth ) {
				
				// Update the window width for next time
				windowWidth = window.innerWidth;

				// Do stuff here
				headerInit( windowWidth );


			}
		}

		// Add function to the window that should be resized
		const debounceFuncWindow = UixDebounce(windowUpdate, 50);
		window.removeEventListener('resize', debounceFuncWindow);
		window.addEventListener('resize', debounceFuncWindow);

		
		
		//-------- Sticky header area
		const $el = $( '.uix-header__container, .uix-header__placeholder' );
		function scrollUpdate() {
			const scrolled = $( window ).scrollTop(),
				  spyTop   = 220;
			
			if ( scrolled >= spyTop ) {
				$el.addClass( 'is-fixed' );
			} else {
				$el.removeClass( 'is-fixed' );	
			}
		}

		// Add function to the element that should be used as the scrollable area.
		const throttleFunc = UixThrottle(scrollUpdate, 5);
		window.removeEventListener('scroll', throttleFunc);
		window.removeEventListener('touchmove', throttleFunc);
		window.addEventListener('scroll', throttleFunc);
		window.addEventListener('touchmove', throttleFunc);
		throttleFunc();
				


	};

	module.components.documentReady.push( module.BODY_AND_HEADER.documentReady );

	return class BODY_AND_HEADER {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );


