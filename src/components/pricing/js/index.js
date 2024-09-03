/* 
 *************************************
 * <!-- Pricing -->
 *************************************
 */
import {
    UixModuleInstance,
    UixDebounce,
} from '@uixkit/core/_global/js';


import '../scss/_style.scss';


export const PRICING = ( ( module, $, window, document ) => {
	if ( window.PRICING === null ) return false;
	
	
	
    module.PRICING               = module.PRICING || {};
    module.PRICING.version       = '0.0.3';
    module.PRICING.documentReady = function( $ ) {

		
		let	windowWidth        = window.innerWidth,
			windowHeight       = window.innerHeight;

		
		//-------- Pricing initialize
		pricingInit( windowWidth );

		function windowUpdate() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( window.innerWidth != windowWidth ) {
				
				// Update the window width for next time
				windowWidth = window.innerWidth;
		
				// Do stuff here
				pricingInit( windowWidth );
		
		
			}
		}
		
		// Add function to the window that should be resized
		const debounceFuncWindow = UixDebounce(windowUpdate, 50);
		window.removeEventListener('resize', debounceFuncWindow);
		window.addEventListener('resize', debounceFuncWindow);
		
		
		function pricingInit( w ) {
			//Initialize the height
			$( '.uix-price' ).each( function(){


					//returns new id
					const $this            = $( this );
                
                    const $initHeight      = $this.find( '.js-uix-init-height' );
                
					let	priceBGH         = [],
						priceBGH_excerpt = [];

					$initHeight.each( function( index ) {
						//Screen protection of height
						$( this ).find( '.uix-price__outline, .uix-price__excerpt' ).css( 'height', 'auto' );

						const tempheight = $( this ).height();
						const tempheight_excerpt = $( this ).find( '.uix-price__excerpt' ).height();
						priceBGH.push( tempheight );
						priceBGH_excerpt.push( tempheight_excerpt );


					} );

					const priceBGH_Max = Math.max.apply( Math, priceBGH );


					if ( priceBGH_Max > 0 ) {
						if ( w > 768 ){

							// Initialize the height of all columns
							$initHeight.find( '.uix-price__outline' ).css( 'height', priceBGH_Max + 'px' );

							// Actived columns
							$initHeight.find( '.uix-price__outline.is-active' ).each( function() {

								const ty = Math.abs( parseInt( $( this ).css('transform').split(',')[5]));
								if ( !isNaN(ty) ) {
									$( this ).css( 'height', priceBGH_Max + ty*2 + 'px' );
								}

							});	



						} else {
							$initHeight.find( '.uix-price__outline' ).css( 'height', 'auto' );


						}


						// Actived columns
						$initHeight.find( '.uix-price__outline.is-active' ).each( function() {

							const textColor = $( this ).closest( '.uix-price__outline--hover' ).data( 'tcolor' ),
								  btnColor  = $( this ).closest( '.uix-price__outline--hover' ).data( 'bcolor' );

							$( this ).css( 'background-color', btnColor );
							$( this ).find( '.uix-btn' ).removeClass( 'uix-btn__bg--primary' ).addClass( 'uix-btn__bg--secondary' );


						});	



					}


			});
		}
		
		
		
    };

    module.components.documentReady.push( module.PRICING.documentReady );
	

	return class PRICING {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );


