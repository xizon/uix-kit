
/*
 * Render Custom Radio, Checkbox and Toggle 
 *
 * @param  {String} radioWrapper             - Wrapper of the radio.
 * @param  {String} toggle                   - Toggle of the checkbox.
 * @param  {String} checkboxWrapper          - Wrapper of the checkbox.
 * @return {Void}
 */
( function ( $ ) {
    'use strict';
    $.fn.UixRenderCustomRadioCheckbox = function( options ) {
 
        // This is the easiest way to have default options.
        const settings = $.extend({
			radioWrapper    : '.uix-controls__radio',
			toggle          : '.uix-controls__toggle',
			checkboxWrapper : '.uix-controls__checkbox'
        }, options );
 
        this.each( function() {
			
			const $this              = $( this );
            
			const customRadio        = settings.radioWrapper,
				  customToggle       = settings.toggle,
				  customCheckbox     = settings.checkboxWrapper;


			$( customRadio ).find( 'input[type="radio"]' ).each( function() {
				const dataExist = $( this ).data( 'exist' );
				if ( typeof dataExist === typeof undefined && dataExist != 1 ) {
					$( '<span class="uix-controls__radio-trigger"></span>' ).insertAfter( $( this ) );

					//Prevent the form from being initialized again
					$( this ).data( 'exist', 1 );	
				}

			});


			$( customToggle ).find( 'input[type="checkbox"]' ).each( function() {
				let dataExist = $( this ).data( 'exist' ),
					$obj      = $( this ).closest( '.uix-controls' ),
					offText   = $obj.data( 'off-text' ),
					onText    = $obj.data( 'on-text' );
				
				if ( typeof dataExist === typeof undefined && dataExist != 1 ) {
					$( '<span class="uix-controls__toggle-trigger" data-off-text="'+offText+'" data-on-text="'+onText+'"></span>' ).insertAfter( $( this ) );
					//hide or display a associated div
					const targetID = '#' + $obj.attr( 'data-targetid' );
					if ( $( this ).is( ':checked' ) ) {
						$obj.addClass( 'is-active' ).attr( 'aria-checked', true );
						$( targetID ).show();
					} else {
						$obj.removeClass( 'is-active' ).attr( 'aria-checked', false );
						$( targetID ).hide();
					}
					
					
					//Prevent the form from being initialized again
					$( this ).data( 'exist', 1 );	
				}


			});

			$( customCheckbox ).find( 'input[type="checkbox"]' ).each( function() {
				const dataExist = $( this ).data( 'exist' ),
					$obj      = $( this ).closest( '.uix-controls' );
				
				if ( typeof dataExist === typeof undefined && dataExist != 1 ) {
					$( '<span class="uix-controls__checkbox-trigger"></span>' ).insertAfter( $( this ) );

					//hide or display a associated div
					const targetID = '#' + $obj.attr( 'data-targetid' );
					if ( $( this ).is( ':checked' ) ) {
						$obj.addClass( 'is-active' ).attr( 'aria-checked', true );
						$( targetID ).show();
					} else {
						$obj.removeClass( 'is-active' ).attr( 'aria-checked', false );
						$( targetID ).hide();
					}
					
					//Prevent the form from being initialized again
					$( this ).data( 'exist', 1 );	
				}


			});

			
			
		});
 
    };
 
}( jQuery ));