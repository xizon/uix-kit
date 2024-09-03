
/* 
 *************************************
 *  <!-- Sticky Elements -->
 *************************************
 */

import {
    UixModuleInstance,
    UixGUID,
    UixMath,
    UixDebounce,
    UixThrottle
} from '@uixkit/core/_global/js';


import '../scss/_style.scss';


export const STICKY_EL = ( ( module, $, window, document ) => {
	if ( window.STICKY_EL === null ) return false;
	
	
    module.STICKY_EL               = module.STICKY_EL || {};
    module.STICKY_EL.version       = '0.0.8';
    module.STICKY_EL.pageLoaded    = function() {


        let	windowWidth        = window.innerWidth,
            windowHeight       = window.innerHeight;
        
		const topSpacing   = ( windowWidth <= 768 ) ? 0 : $( '.uix-header__container' ).outerHeight( true ); //with margin
		
		
		//prepend a placeholder
		$( '.js-uix-sticky-el' ).each( function()  {

			const $el      = $( this ),
				  elHeight = $el.outerHeight( true ), //with margin
				  elClass  = $el.attr( 'class' ).replace( 'js-uix-sticky-el', ''),
				  tempID   = 'sticky-' + UixGUID.create();

			$el.attr( 'data-sticky-id', tempID );
			
			if ( ! $el.hasClass( 'is-placeholder' ) ) {
				$( '<div class="'+elClass+' is-placeholder"></div>' )
					.css({
						'height': elHeight + 'px',
						'width' : '100%',
						'display': 'none',
						'visibility': 'hidden'
					})
				    .attr( 'data-sticky-id', tempID )
					.insertBefore( $el );
			}

			
		});
		
		//  Initialize
		stickyInit( windowWidth );

		function windowUpdate() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( window.innerWidth != windowWidth ) {
				
				// Update the window width for next time
				windowWidth = window.innerWidth;
		
				// Do stuff here
				stickyInit( windowWidth );
		
		
			}
		}
		
		// Add function to the window that should be resized
		const debounceFuncWindow = UixDebounce(windowUpdate, 50);
		window.removeEventListener('resize', debounceFuncWindow);
		window.addEventListener('resize', debounceFuncWindow);
		
	
		/*
		 * Initialize Sticky Elements settings
		 *
		 * @param  {Number} w         - Returns width of browser viewport
		 * @return {Void}
		 */
		function stickyInit( w ) {
		
			
			if ( w > 768 ) {
		
				$( '.js-uix-sticky-el' ).each( function()  {
					const $el      = $( this ),
						  elTop    = $el.offset().top,
						  oWidth   = $el.width(),
						  clsID    = $el.data( 'sticky-id' ),
						  $ph      = $( '[data-sticky-id="'+clsID+'"].is-placeholder' );
					
		

					function scrollUpdate() {
						const scrolled   = $( window ).scrollTop(),
							  spyTop  = parseFloat( scrolled + window.innerHeight );


						//------
						if ( parseFloat( scrolled + topSpacing ) > elTop ) {
						  $el
							  .addClass( 'is-active' )
							  .css( {
								  'width': oWidth + 'px',
								  'top'  : topSpacing + 'px'
							  } );
						   $ph.css( 'display', 'block' );

						} else {
						  $el
							  .removeClass( 'is-active' )
							  .css( {
								  'top'  : 0
							  } );	
						  $ph.css( 'display', 'none' );
						}



						//------
						if ( typeof $el.data( 'stop-trigger' ) != typeof undefined && $( $el.data( 'stop-trigger' ) ).length > 0 ) {

							const diff      = typeof $el.data( 'stop-trigger-diff' ) != typeof undefined && $el.data( 'stop-trigger-diff' ).length > 0 ? UixMath.evaluate( $el.data( 'stop-trigger-diff' ).replace(/\s/g, '').replace(/\%\h/g, windowHeight ).replace(/\%\w/g, windowWidth ) ) : 0,
								  targetTop = $( $el.data( 'stop-trigger' ) ).offset().top - diff;


							//Detecting when user scrolls to bottom of div
							if ( spyTop >= targetTop ) {

									$el.css( {
										  'top'  : parseFloat( topSpacing - (spyTop - targetTop) ) + 'px'
									  } );

							} else {

								if ( $el.length > 0 && $el.position().top < topSpacing ) {
									$el.css( {
										  'top'  : topSpacing + 'px'
									  } );	

								}

							}
						}	

					}
					
					// Add function to the element that should be used as the scrollable area.
					const throttleFunc = UixThrottle(scrollUpdate, 5);
					window.removeEventListener('scroll', throttleFunc);
					window.removeEventListener('touchmove', throttleFunc);
					window.addEventListener('scroll', throttleFunc);
					window.addEventListener('touchmove', throttleFunc);
					throttleFunc();
					
					
					

				});//endif $( '.js-uix-sticky-el' )

				
				
			} else {
				$( '.js-uix-sticky-el' ).removeClass( 'is-active' );
				$( '[data-sticky-id].is-placeholder' ).css( 'display', 'none' );
				
			}// endif w > 768
			
			
		}
		
		
		


		
    };

    module.components.pageLoaded.push( module.STICKY_EL.pageLoaded );

	return class STICKY_EL {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );


