
/* 
 *************************************
 * <!-- Body And Header -->
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


export const BODY_AND_HEADER = ( ( module, $, window, document ) => {
	if ( window.BODY_AND_HEADER === null ) return false;
	
	
	
	
	module.BODY_AND_HEADER               = module.BODY_AND_HEADER || {};
    module.BODY_AND_HEADER.version       = '0.0.4';
	module.BODY_AND_HEADER.documentReady = function( $ ) {


		//Prevent this module from loading in other pages
		if ( $( 'body' ).hasClass( 'onepage' ) ) return false;
		

		var $window      = $( window ),
			windowWidth  = window.innerWidth,
			windowHeight = window.innerHeight;

		//-------- Header initialize
		headerInit( windowWidth );
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( window.innerWidth != windowWidth ) {

				// Update the window width for next time
				windowWidth = window.innerWidth;

				// Do stuff here
				headerInit( windowWidth );
		

			}
		});
		function headerInit( w ) {
			
			var $headerPlaceholder = $( '.uix-header__placeholder.js-uix-header__placeholder-autoheight' );
			
			if ( w > 768 ) {
				$headerPlaceholder.css( 'height', $( '.uix-header__container' ).outerHeight( true ) + 'px' ); 
				$( 'body' ).removeClass( 'is-mobile' );
			} else {
				$headerPlaceholder.css( 'height', 0 ); 
				$( 'body' ).addClass( 'is-mobile' );
			}
		}
		
		
		
		//-------- Sticky header area
		//Note: Don't use Waypoint, because the Offset is wrong on calculating height of fixed element
		var $el = $( '.uix-header__container, .uix-header__placeholder' );
		$window.on( 'scroll.BODY_AND_HEADER touchmove.BODY_AND_HEADER', function() {

			var scrollTop = $( this ).scrollTop(),
				spyTop    = 220;
			
			if ( scrollTop >= spyTop ) {
				$el.addClass( 'is-fixed' );
			} else {
				$el.removeClass( 'is-fixed' );	
			}
			
		});


	};

	module.components.documentReady.push( module.BODY_AND_HEADER.documentReady );

	return class BODY_AND_HEADER {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );


