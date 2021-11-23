
/*
 * Render Multiple Selector
 *
 * @param  {String} controls                 - Wrapper of controls.
 * @return {Void}
 */
( function ( $ ) {
    'use strict';
    $.fn.UixRenderCustomMultiSel = function( options ) {
 
        // This is the easiest way to have default options.
        const settings = $.extend({
			controls    : '.uix-controls__multi-sel'
        }, options );
 
        this.each( function() {
		
			$( settings.controls ).each(function(){

				const $this = $( this );
				const actived = $this.data( 'activated' );
				if( typeof actived === typeof undefined ) {


					// Initialize status
					//------------------------------------------
					$( this ).find( '> span' ).each( function()  {

						const targetID = '#' + $( this ).parent().attr( 'data-targetid' );

						if ( $( targetID ).val().indexOf( $( this ).data( 'value' ) ) >= 0 ) {
							$( this ).addClass( 'is-active' ).attr( 'aria-checked', true );
						} else {
							$( this ).removeClass( 'is-active' ).attr( 'aria-checked', false );
						}	

					});


					// Click Event of Multiple Selector
					//------------------------------------------
					const multiSel     = '.uix-controls__multi-sel',
						multiSelItem = multiSel + ' > span';

					$( document ).off( 'click.FORM_MULTI_SEL' ).on( 'click.FORM_MULTI_SEL', multiSelItem, function( e ) {
						e.preventDefault();

						let $selector     = $( this ).parent(),
							$option       = $( this ),
							targetID      = '#' + $selector.data( "targetid" ),
							curVal        = $option.data( 'value' ),
							tarVal        = $( targetID ).val() + ',',
							resVal        = '';



						$option.toggleClass( 'is-active' ).attr( 'aria-checked', function( index, attr ) {
							return attr == 'true' ? false : true;
						});

						if ( tarVal.indexOf( curVal + ',' ) < 0 ) {
							resVal = tarVal + curVal + ',';
						} else {
							resVal = tarVal.replace( curVal + ',', '' );
						}

						resVal = resVal
										.replace(/,\s*$/, '' )
										.replace(/^,/, '' );

						$( targetID ).val( resVal );


						//Dynamic listening for the latest value
						$( targetID ).focus().blur();

					} );


					//------------------------------------------

					//Prevents front-end javascripts that are activated in the background to repeat loading.
					$this.data( 'activated', 1 );

				}//endif actived			
		

			});
	
			
		});
 
    };
 
}( jQuery ));
