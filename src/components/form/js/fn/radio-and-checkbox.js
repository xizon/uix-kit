
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


			$( settings.checkboxWrapper ).each(function(){

				const $this = $( this );
				const actived = $this.data( 'activated' );
				if( typeof actived === typeof undefined ) {
			
					// Initialize status
					//------------------------------------------  
					$( settings.checkboxWrapper ).find( 'input[type="checkbox"]' ).each( function() {
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
			

					
					// Mouse events
					//------------------------------------------
					$( document ).on( 'change', settings.toggle + ' [type="checkbox"]', function( e ) {
						//hide or display a associated div
						const $obj      = $( this ).closest( '.uix-controls' ),
							targetID  = '#' + $obj.attr( 'data-targetid' );
						
						if ( this.checked ) {
							$obj.addClass( 'is-active' ).attr( 'aria-checked', true );
							$( targetID ).show();
						} else {
							$obj.removeClass( 'is-active' ).attr( 'aria-checked', false );
							$( targetID ).hide();
						}
						
					});



					//------------------------------------------
			
					//Prevents front-end javascripts that are activated in the background to repeat loading.
					$this.data( 'activated', 1 );
			
				}//endif actived			
			
			
			});

			

			$( settings.toggle ).each(function(){

				const $this = $( this );
				const actived = $this.data( 'activated' );
				if( typeof actived === typeof undefined ) {
			
					// Initialize status
					//------------------------------------------  
					$( settings.toggle ).find( 'input[type="checkbox"]' ).each( function() {
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

					
					// Mouse events
					//------------------------------------------
					$( document ).on( 'change', settings.checkboxWrapper + ' [type="checkbox"]', function( e ) {
						//hide or display a associated div
						const $obj      = $( this ).closest( '.uix-controls' ),
							targetID  = '#' + $obj.attr( 'data-targetid' );
						
						if ( this.checked ) {
							$obj.addClass( 'is-active' ).attr( 'aria-checked', true );
							$( targetID ).show();
						} else {
							$obj.removeClass( 'is-active' ).attr( 'aria-checked', false );
							$( targetID ).hide();
						}
						
					});


			
			
					//------------------------------------------
			
					//Prevents front-end javascripts that are activated in the background to repeat loading.
					$this.data( 'activated', 1 );
			
				}//endif actived			
			
			
			});

			
			$( settings.radioWrapper ).each(function(){

				const $this = $( this );
				const actived = $this.data( 'activated' );
				if( typeof actived === typeof undefined ) {
			
					// Initialize status
					//------------------------------------------  
					$( settings.radioWrapper ).find( 'input[type="radio"]' ).each( function() {
						const dataExist = $( this ).data( 'exist' );
						if ( typeof dataExist === typeof undefined && dataExist != 1 ) {
							$( '<span class="uix-controls__radio-trigger"></span>' ).insertAfter( $( this ) );
			
							//Prevent the form from being initialized again
							$( this ).data( 'exist', 1 );	
						}
			
					});
			
					//------------------------------------------
			
					//Prevents front-end javascripts that are activated in the background to repeat loading.
					$this.data( 'activated', 1 );
			
				}//endif actived			
			
			
			});
			


			
		});
 
    };
 
}( jQuery ));