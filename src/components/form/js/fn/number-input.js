/*
 * Render Number Input
 *
 * @param  {String} controls                 - Wrapper of controls.
 * @return {Void}
 */
( function ( $ ) {
    'use strict';
    $.fn.UixRenderNumberInput = function( options ) {
 
        // This is the easiest way to have default options.
        const settings = $.extend({
			controls    : '.uix-controls__number'
        }, options );
 
        this.each( function() {
		

			$( settings.controls ).each(function(){

				const $this = $( this );
				const actived = $this.data( 'activated' );
				if( typeof actived === typeof undefined ) {


					// Mouse events
					//------------------------------------------
					$( document ).off( 'click.FORM_NUMBER_BTN_ADD' ).on( 'click.FORM_NUMBER_BTN_ADD', settings.controls + ' .uix-controls__number__btn--add', function( e ) {

						let step           = parseFloat( $( this ).data( 'step' ) ),
							decimals       = $( this ).data( 'decimals' ),
							$numberInput   = $( this ).closest( '.uix-controls__number' ).find( 'input[type="number"]' ),
							numberInputVal = parseFloat( $numberInput.val() ),
							max            = $numberInput.attr( 'max' );
						
						
						if ( typeof step === typeof undefined || isNaN( step ) ) step = 1;
						if ( typeof decimals === typeof undefined ) decimals = 0;
						if ( typeof max != typeof undefined && parseFloat( numberInputVal + step ) > max ) {
							step = 0;
						}
			
						
						numberInputVal = parseFloat( numberInputVal + step );
						
						
						$numberInput.val( numberInputVal.toFixed( decimals ) );
					});
			
					$( document ).off( 'click.FORM_NUMBER_BTN_REMOVE' ).on( 'click.FORM_NUMBER_BTN_REMOVE', settings.controls + ' .uix-controls__number__btn--remove', function( e ) {
			
						let step           = $( this ).data( 'step' ),
							decimals       = $( this ).data( 'decimals' ),
							$numberInput   = $( this ).closest( '.uix-controls__number' ).find( 'input[type="number"]' ),
							numberInputVal = parseFloat( $numberInput.val() ),
							min            = $numberInput.attr( 'min' );
			
						if ( typeof step === typeof undefined || isNaN( step ) ) step = 1;
						if ( typeof decimals === typeof undefined ) decimals = 0;
						if ( typeof min != typeof undefined && parseFloat( numberInputVal - step ) < min ) {
							step = 0;
						}
						
						numberInputVal -= step;	
			
						$numberInput.val( numberInputVal.toFixed( decimals ) );
					});
			


					//------------------------------------------

					//Prevents front-end javascripts that are activated in the background to repeat loading.
					$this.data( 'activated', 1 );

				}//endif actived			
		

			});
	
			
		});
 
    };
 
}( jQuery ));
