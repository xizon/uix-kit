
/*
 * Create Line Effect on Click
 *
 * @param  {String} controls                 - Wrapper of controls.
 * @return {Void}
 */
( function ( $ ) {
    'use strict';
    $.fn.UixRenderControlsLineEff = function( options ) {
 
        // This is the easiest way to have default options.
        const settings = $.extend({
			controls    : '.uix-controls.uix-controls--line'
        }, options );
 
        this.each( function() {
			
			const $this              = $( this );
			const customControls     = settings.controls;


			$( customControls ).each( function() {
				const dataExist = $( this ).data( 'exist' );
				if ( typeof dataExist === typeof undefined && dataExist != 1 ) {
					$( '<ins class="uix-controls__bar"></ins><ins class="uix-controls__basic-bar"></ins>' ).insertAfter( $( this ).find( 'label' ) );
					
					
					//Multiple Selector or Single Selector
					if ( $( this ).hasClass( 'uix-controls__multi-sel' ) || $( this ).hasClass( 'uix-controls__single-sel' ) ) {
						
						$( this ).find( '> span' ).each( function()  {
							$( this ).prepend( '<ins class="uix-controls__bar"></ins><ins class="uix-controls__basic-bar"></ins>' );
						});
						
					}
					
					//Custom Input Number
					if ( $( this ).hasClass( 'uix-controls__number' ) ) {
						$( this ).prepend( '<ins class="uix-controls__bar"></ins><ins class="uix-controls__basic-bar"></ins>' );
					}
					
			

					//Prevent the form from being initialized again
					$( this ).data( 'exist', 1 );	
				}

			});

			
			
			
		});
 
    };
 
}( jQuery ));