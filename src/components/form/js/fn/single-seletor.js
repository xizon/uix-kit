
/*
 * Render Single Selector
 *
 * @param  {String} controls                 - Wrapper of controls.
 * @return {Void}
 */
( function ( $ ) {
    'use strict';
    $.fn.UixRenderCustomSingleSel = function( options ) {
 
        // This is the easiest way to have default options.
        const settings = $.extend({
			controls    : '.uix-controls__single-sel'
        }, options );
 
        this.each( function() {
		

			$( settings.controls ).each(function(){

				const $this = $( this );
				const actived = $this.data( 'activated' );
				if( typeof actived === typeof undefined ) {
			

					// Initialize status
					//------------------------------------------
					$( this ).find( '> span' ).each( function()  {

						const targetID  = '#' + $( this ).parent().attr( 'data-targetid' );
						let	switchIDs = '';

						//add switch IDs
						$( this ).parent().find( '> span' ).each( function()  {
							if ( typeof $( this ).data( "switchid" ) != typeof undefined ) {
								switchIDs += $( this ).data( "switchid" ) + ',';
							}

						});

						$( this ).parent().attr( "data-switchids", switchIDs.replace(/,\s*$/, '' ) );


						//Set actived style from their values
						if ( $( targetID ).val() == $( this ).data( 'value' ) ) {
							$( this ).addClass( 'is-active' ).attr( 'aria-checked', true );
						} else {
							$( this ).removeClass( 'is-active' ).attr( 'aria-checked', false );
						}	


					});


					// Mouse events
					//------------------------------------------

					const singleSelItem = settings.controls + ' > span';

					/*
					* Initialize single switch
					*
					* @param  {Element} obj                 - Radio controls. 
					* @return {Void}
					*/
					const hideAllSingleSelItems = function( obj ) {
						obj.each( function( index )  {

							let $sel                = $( this ),
								defaultValue        = $( '#' + $sel.attr( 'data-targetid' ) ).val(),
								deffaultSwitchIndex = 0;

							//get default selected switch index
							$sel.find( '> span' ).each( function( index )  {

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

					hideAllSingleSelItems( $this );


					$( document ).off( 'click.FORM_SINGLE_SEL' ).on( 'click.FORM_SINGLE_SEL', singleSelItem, function( e ) {
						e.preventDefault();

						let $selector     = $( this ).parent(),
							$option       = $( this ),
							targetID      = '#' + $selector.data( "targetid" ),
							switchID      = '#' + $option.data( "switchid" ),
							curVal        = $option.data( 'value' );


						//Radio Selector
						$selector.find( '> span' ).removeClass( 'is-active' ).attr( 'aria-checked', false );
						$( targetID ).val( curVal );
						$option.addClass( 'is-active' ).attr( 'aria-checked', true );


						//Switch some options
						if ( typeof $option.data( "switchid" ) != typeof undefined ) {
							hideAllSingleSelItems( $selector );
							$( switchID ).show();
						}



						//Dynamic listening for the latest value
						$( targetID ).focus().blur();

					} );


					//------------------------------------------
			
					//Prevents front-end javascripts that are activated in the background to repeat loading.
					$this.data( 'activated', 1 );
			
				}//endif actived			
			
			
			});

		
			$( settings.controls ).each( function()  {


			});

			
		});
 
    };
 
}( jQuery ));
