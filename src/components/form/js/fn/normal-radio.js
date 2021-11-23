
/*
 * Render Normal Radio
 *
 * @param  {String} controls                 - Wrapper of controls.
 * @return {Void}
 */
( function ( $ ) {
    'use strict';
    $.fn.UixRenderNormalRadio = function( options ) {
 
        // This is the easiest way to have default options.
        const settings = $.extend({
			controls    : '.uix-controls__radio'
        }, options );
 
        this.each( function() {
		
		
			$( settings.controls ).each( function()  {
				
				const $this = $( this );

				// Initialize status
				//------------------------------------------
				$this.find( '> label' ).each( function()  {

					const targetID  = '#' + $( this ).parent().attr( "data-targetid" );
					let	switchIDs = '';

					//add switch IDs
					$( this ).parent().find( '> label' ).each( function()  {
						if ( typeof $( this ).data( "switchid" ) != typeof undefined ) {
							switchIDs += $( this ).data( "switchid" ) + ',';
						}

					});

					$( this ).parent().attr( "data-switchids", switchIDs.replace(/,\s*$/, '' ) );


					//Set actived style from their values
					if ( typeof $( this ).data( 'value' ) != typeof undefined ) {
						if ( $( targetID ).val() == $( this ).data( 'value' ) ) {
							$( this )
								.addClass( 'is-active' )
								.find( '[type="radio"]' ).prop( 'checked', true );

						} else {
							$( this )
								.removeClass( 'is-active' )
								.find( '[type="radio"]' ).prop( 'checked', false );
						}		
					} 



				});


				// Mouse events
				//------------------------------------------
				const normalRadioItem = settings.controls + ' > label';


				/*
				* Initialize single switch
				*
				* @param  {Element} obj                 - Radio controls. 
				* @return {Void}
				*/
				const hideAllNormalRadioItems = function( obj ) {
					obj.each( function( index )  {

						let $sel                = $( this ),
							defaultValue        = $( '#' + $sel.attr( "data-targetid" ) ).val(),
							deffaultSwitchIndex = 0;

						//get default selected switch index
						$sel.find( '> label' ).each( function( index )  {

							if ( defaultValue == $( this ).data( 'value' ) ) {
								deffaultSwitchIndex = index;
							}


						});


						if ( typeof $sel.data( 'switchids' ) != typeof undefined && $sel.data( 'switchids' ) != '' ) {
							const _switchIDsArr = $sel.data( 'switchids' ).split( ',' );
							_switchIDsArr.forEach( function( element, index ) {

								if ( deffaultSwitchIndex != index ) {
									$( '#' + element ).hide();
								} else {
									$( '#' + element ).show();
								}


							});



						}

					});

				};

				hideAllNormalRadioItems( $(settings.controls) );


				$( document ).off( 'click.FORM_NORMAL_RADIO' ).on( 'click.FORM_NORMAL_RADIO', normalRadioItem, function( e ) {

					const $selector     = $( this ).parent(),
						$option       = $( this ),
						targetID      = '#' + $selector.data( "targetid" ),
						switchID      = '#' + $option.data( "switchid" ),
						curVal        = $option.data( 'value' );


					//Radio Selector
					$selector.find( '> label' )
						.removeClass( 'is-active' )
						.find( '[type="radio"]' ).prop( 'checked', false );
					
					$( targetID ).val( curVal );
					$option
						.addClass( 'is-active' )
						.find( '[type="radio"]' ).prop( 'checked', true );
					



					//Switch some options
					if ( typeof $option.data( "switchid" ) != typeof undefined ) {
						hideAllNormalRadioItems( $selector );
						$( switchID ).show();
					}



					//Dynamic listening for the latest value
					$( targetID ).focus().blur();

				} );	


			});

			
		});
 
    };
 
}( jQuery ));
