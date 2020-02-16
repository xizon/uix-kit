
/*
 * Fire Modal Dialog
 *
 * @param  {String} id                   - Modal's unique identifier.
 * @param  {Number|Boolean} height       - Custom modal height whick need a unit string. 
										   This attribute "data-modal-height" may not exist. Such as: 200px
 * @param  {Number|Boolean} width        - Custom modal width whick need a unit string. 
										   This attribute "data-modal-height" may not exist. Such as: 200px
 * @param  {Number} speed                - Delay Time when Full Screen Effect is fired.   
 * @param  {?Element|Boolean} btn          - Link or button that fires an event.
 * @param  {Boolean} lightbox            - Whether to enable the lightbox effect.
 * @param  {Number|Boolean} autoClose    - Specify auto-close time. This function is not enabled when this value is false.
 * @param  {Boolean} closeOnlyBtn        - Disable mask to close the window.
 * @return {Void}
 */	
( function ( $ ) {
    'use strict';
    $.fn.UixFireModalDialog = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			id           : 'demo',
			height       : false,
			width        : false,
			speed        : 500,
			btn          : false,
			lightbox     : true,
			autoClose    : false,
			closeOnlyBtn : false
        }, options );
		
 
        this.each( function() {

			if ( settings.id == '' ) return false;
			
			//Add modal mask to stage
			if ( $( '.uix-modal-mask' ).length == 0 ) {
				$( 'body' ).prepend( '<div class="uix-modal-mask"></div>' );
			}
			$.when( $( '.uix-modal-mask' ).length > 0 ).then( function() {
				
				if ( settings.closeOnlyBtn ) {
					$( '.uix-modal-mask' ).addClass( 'js-uix-disabled' );
				} else {
					$( '.uix-modal-mask' ).removeClass( 'js-uix-disabled' );
				}

				var dataID        = settings.id,
					dataH         = settings.height,
					dataW         = settings.width,
					linkBtn       = settings.btn,
					closeTime     = settings.autoClose,
					$obj          = $( '.uix-modal-box#'+dataID );

				// Initializate modal
				if ( linkBtn ) {
					linkBtn.attr( 'href', 'javascript:void(0)' );
					$obj.find( '.uix-modal-box__content' ).addClass( 'js-uix-no-fullscreen' );


					if ( linkBtn.data( 'video-win' ) ) {
						$obj.find( '.uix-modal-box__content > .uix-modal-box__body' ).css( 'overflow-y', 'hidden' );
					}

				}



				if ( $obj.length > 0 ) {


					// Locks the page
					$.scrollLock( true );


					if ( typeof dataH != typeof undefined && dataH != '' && dataH ) {
						$obj.css( {'height': dataH } );
					}

					if ( typeof dataW != typeof undefined && dataW != '' && dataW ) {
						$obj.css( {'width': dataW } );
					}

					
					//Enable the lightbox effect.
					if ( settings.lightbox ) {
						TweenMax.set( '.uix-modal-mask', {
							css: {
								opacity : 0,
								display : 'none'
							},
							onComplete : function() {

								TweenMax.to( this.target, 0.3, {
									css: {
										opacity    : 1,
										display    : 'block'
									}
								});		

							}
						});
	
					}

					$obj.addClass( 'is-active' );
					
					
					//auto close
					if ( closeTime && !isNaN( closeTime ) ) {
						window.setCloseModalDialog = setTimeout( function() {
							$( document ).closeModalDialog();
						}, closeTime );
					}
					
					
					
				}

				if ( $obj.hasClass( 'is-fullscreen' ) ) {
					setTimeout( function() {

						if ( !$obj.hasClass( 'is-video' ) ) {
							$obj.find( '.uix-modal-box__content > .uix-modal-box__body' ).css( 'overflow-y', 'scroll' );
						} else {
							$obj.find( '.uix-modal-box__content > .uix-modal-box__body' ).css( 'overflow-y', 'hidden' );
						}

					}, settings.speed );

				}	

			});
			
			
		});
 
    };
 
}( jQuery ));
