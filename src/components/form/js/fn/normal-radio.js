
/*
 * Render Normal Radio Status
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
				$( this ).find( '> label' ).each( function()  {

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
			});

			
		});
 
    };
 
}( jQuery ));
