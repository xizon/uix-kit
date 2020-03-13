
/*
 * Hover Effect
 *
 * @param  {String} controls                 - Wrapper of controls.
 * @return {Void}
 */
( function ( $ ) {
    'use strict';
    $.fn.UixRenderControlsHover = function( options ) {
 
        // This is the easiest way to have default options.
        const settings = $.extend({
			controls    : '.js-uix-float-label'
        }, options );
 
        this.each( function() {
		
			$( settings.controls ).each( function(){

				const $this = $( this );


				// on focus add cladd active to label
				$this.on( 'focus', function() {
					$( this ).closest( 'div' ).find( 'label, .uix-controls__bar' ).addClass( 'is-active' );
				});


				//on blur check field and remove class if needed
				$this.on( 'blur change', function( e ) {
					if( $this.val() === '' || $this.val() === 'blank' ) {
						$( this ).closest( 'div' ).find( 'label' ).removeClass( 'is-active' );
					}	
					
					//----
					if( 
						$this.val() === '' || 
						$this.val() === 'blank' || 
						( $this.val() != '' && $this.val() != 'blank' ) 
					) {
						$( this ).closest( 'div' ).find( '.uix-controls__bar' ).removeClass( 'is-active' );
					}		

				});

				// if exist cookie value
				if( $this.val() != '' && $this.val() != 'blank') { 
				    $( this ).closest( 'div' ).find( 'label' ).addClass( 'is-active' );
				}

				

			});

			
		});
 
    };
 
}( jQuery ));
