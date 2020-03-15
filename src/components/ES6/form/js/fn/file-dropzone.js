
/*
 * Render Custom File Dropzone
 *
 * @param  {String} controls                 - Wrapper of controls.
 * @return {Void}
 */
( function ( $ ) {
    'use strict';
    $.fn.UixRenderCustomFileDropzone = function( options ) {
 
        // This is the easiest way to have default options.
        const settings = $.extend({
			controls    : '.uix-controls__file-field-container'
        }, options );
 
        this.each( function() {
		
		
			$( settings.controls ).each( function()  {
				const $dropZone  = $( this ).find( 'input[type="file"]' );

				$( document ).on( 'dragover', function(e) {
					const timeout = window.dropZoneTimeout;
					if (!timeout) {
						$dropZone.addClass( 'in' );
					} else {
						clearTimeout(timeout);
					}
					let found = false,
					node = e.target;
					do {
						if (node === $dropZone[0]) {
							found = true;
							break;
						}
						node = node.parentNode;
					} while ( node != null );
					if (found) {
						$dropZone.addClass( 'hover' );
					} else {
						$dropZone.removeClass( 'hover' );
					}
					window.dropZoneTimeout = setTimeout(function() {
						window.dropZoneTimeout = null;
						$dropZone.removeClass( 'in hover' );
					}, 100 );
				});

				$dropZone.on( 'change', function( e ) {
					const input = $( this )[0];
					if ( input.files && input.files[0] ) {
						const reader = new FileReader();
						reader.onload = function( e ) {
							const imgData = e.target.result;
							const imgName = input.files[0].name;
							input.setAttribute( 'data-title', imgName );
							//console.log(e.target.result);
						}
						reader.readAsDataURL( input.files[0] );


					}

				});


			});

			
		});
 
    };
 
}( jQuery ));
