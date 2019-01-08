/* 
 *************************************
 * <!-- Pricing -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.PRICING               = APP.PRICING || {};
	APP.PRICING.version       = '0.0.2';
    APP.PRICING.documentReady = function( $ ) {

		
		var $window      = $( window ),
			windowWidth  = window.innerWidth,
			windowHeight = window.innerHeight;

		
		//-------- Pricing initialize
		pricingInit( windowWidth );
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( window.innerWidth != windowWidth ) {

				// Update the window width for next time
				windowWidth = window.innerWidth;

				// Do stuff here
				pricingInit( windowWidth );
		

			}
		});
		
		
		
		function pricingInit( w ) {
			//Initialize the height
			$( '.uix-price' ).each( function(){


					//returns new id
					var $this            = $( this ),
						priceBGH         = Array(),
						priceBGH_excerpt = Array(),
						$initHeight      = $this.find( '.js-uix-init-height' );

					$initHeight.each( function( index ) {
						//Screen protection of height
						$( this ).find( '.uix-price__outline, .uix-price__excerpt' ).css( 'height', 'auto' );

						var tempheight = $( this ).height();
						var tempheight_excerpt = $( this ).find( '.uix-price__excerpt' ).height();
						priceBGH.push( tempheight );
						priceBGH_excerpt.push( tempheight_excerpt );


					} );

					var priceBGH_Max = Math.max.apply( Math, priceBGH );


					if ( priceBGH_Max > 0 ) {
						if ( w > 768 ){

							// Initialize the height of all columns
							$initHeight.find( '.uix-price__outline' ).css( 'height', priceBGH_Max + 'px' );

							// Actived columns
							$initHeight.find( '.uix-price__outline.active' ).each( function() {

								var ty = Math.abs( parseInt( $( this ).css('transform').split(',')[5]));
								if ( !isNaN(ty) ) {
									$( this ).css( 'height', priceBGH_Max + ty*2 + 'px' );
								}

							});	



						} else {
							$initHeight.find( '.uix-price__outline' ).css( 'height', 'auto' );


						}


						// Actived columns
						$initHeight.find( '.uix-price__outline.active' ).each( function() {

							var textColor = $( this ).closest( '.uix-price__outline--hover' ).data( 'tcolor' ),
								btnColor  = $( this ).closest( '.uix-price__outline--hover' ).data( 'bcolor' );

							$( this ).css( 'background-color', btnColor );
							$( this ).find( '.uix-btn' ).removeClass( 'uix-btn__bg--primary' ).addClass( 'uix-btn__bg--secondary' );


						});	



					}


			});
		}
		
		
		
    };

    APP.components.documentReady.push( APP.PRICING.documentReady );
    return APP;

}( APP, jQuery, window, document ) );


