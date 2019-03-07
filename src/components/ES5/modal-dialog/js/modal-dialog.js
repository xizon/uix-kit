
/* 
 *************************************
 * <!-- Modal Dialog -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.MODAL_DIALOG               = APP.MODAL_DIALOG || {};
	APP.MODAL_DIALOG.version       = '0.0.9';
    APP.MODAL_DIALOG.documentReady = function( $ ) {

		//Get the -webkit-transition-duration property
		var getTransitionDuration = function( el, withDelay ) {
			
			if ( typeof el === typeof undefined ) {
				return 0;
			}
			
			
			var style    = window.getComputedStyle(el),
				duration = style.webkitTransitionDuration,
				delay    = style.webkitTransitionDelay; 

			if ( typeof duration != typeof undefined ) {
				// fix miliseconds vs seconds
				duration = (duration.indexOf("ms")>-1) ? parseFloat(duration) : parseFloat(duration)*1000;
				delay = (delay.indexOf("ms")>-1) ? parseFloat(delay) : parseFloat(delay)*1000;

				if ( withDelay ) {
					 return (duration + delay);
				} else {
					return duration;
				}	
			} else {
				return 0;
			}
			

		};
		
		//Delay Time when Full Screen Effect is fired.
		var modalSpeed = getTransitionDuration( $( '.uix-modal-box:first' )[0] );
		
		
		/*
		  * Unbind that one in a safe way that won't accidentally unbind other click handlers.
		  * In order to trigger other custom Modal Dialog events.
			
			$( '#element' ).off( 'click.MODAL_DIALOG' );
			$( '#element' ).off( 'click.MODAL_DIALOG_CLOSE' );
			
		*/
		
	
		//Add modal mask to stage
		if ( $( '.uix-modal-mask' ).length == 0 ) {
			$( 'body' ).prepend( '<div class="uix-modal-mask"></div>' );
		}
		
	    
		$( document ).on( 'click.MODAL_DIALOG', '[data-modal-id]', function() {

			var dataH         = $( this ).data( 'modal-height' ),
				dataW         = $( this ).data( 'modal-width' ),
				lightbox      = $( this ).data( 'modal-lightbox' ),
				closeTime     = $( this ).data( 'modal-close-time' ),
				closeOnlyBtn  = $( this ).data( 'modal-close-onlybtn' );
			
			if ( typeof dataH === typeof undefined ) {
				dataH = false;
			}

			if ( typeof dataW === typeof undefined ) {
				dataW = false;
			}
			if ( typeof lightbox === typeof undefined ) {
				lightbox = true;
			}
			if ( typeof closeTime === typeof undefined ) {
				closeTime = false;
			}	
			if ( typeof closeOnlyBtn === typeof undefined ) {
				closeOnlyBtn = false;
			}		

			
			
			$( document ).UixFireModalDialog( {
				id           : $( this ).data( 'modal-id' ),
				height       : dataH,
				width        : dataW,
				speed        : modalSpeed,
				btn          : $( this ),
				lightbox     : lightbox,
				autoClose    : closeTime,
				closeOnlyBtn : closeOnlyBtn
			});

			return false;
		
		});
	
		$( document ).on( 'click.MODAL_DIALOG_CLOSE', '.uix-modal-box .uix-modal-box__close, .uix-modal-mask:not(.js-uix-disabled)', function() {
			
			//btn
			if ( $( this ).hasClass( 'uix-modal-box__close' ) ) {
				$( this ).parent().removeClass( 'active' );
			}
			
			$( document ).UixCloseModalDialog();
			
			
			return false;
			
		});
		
    };

    APP.components.documentReady.push( APP.MODAL_DIALOG.documentReady );
    return APP;

}( APP, jQuery, window, document ) );


		

/*
 * Fire Modal Dialog
 *
 * @param  {String} id                   - Modal's unique identifier.
 * @param  {Number|Boolean} height       - Custom modal height whick need a unit string. 
										   This attribute "data-modal-height" may not exist. Such as: 200px
 * @param  {Number|Boolean} width        - Custom modal width whick need a unit string. 
										   This attribute "data-modal-height" may not exist. Such as: 200px
 * @param  {Number} speed                - Delay Time when Full Screen Effect is fired.   
 * @param  {Object|Boolean} btn          - Link or button that fires an event.
 * @param  {Boolean} lightbox            - Whether to enable the lightbox effect.
 * @param  {Number|Boolean} autoClose    - Specify auto-close time. This function is not enabled when this value is false.
 * @param  {Boolean} closeOnlyBtn        - Disable mask to close the window.
 * @return {Void}
 */	
( function ( $ ) {
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
						$obj.find( '.uix-modal-box__content > div' ).css( 'overflow-y', 'hidden' );
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

					$obj.addClass( 'active' );
					
					
					//auto close
					if ( closeTime && !isNaN( closeTime ) ) {
						setTimeout( function() {
							$( document ).UixCloseModalDialog();
						}, closeTime );
					}
					
					
				}

				if ( $obj.hasClass( 'is-fullscreen' ) ) {
					setTimeout( function() {

						if ( !$obj.hasClass( 'is-video' ) ) {
							$obj.find( '.uix-modal-box__content > div' ).css( 'overflow-y', 'scroll' );
						} else {
							$obj.find( '.uix-modal-box__content > div' ).css( 'overflow-y', 'hidden' );
						}

					}, settings.speed );

				}	

			});
			
			
		});
 
    };
 
}( jQuery ));




/*
 * Close Modal Dialog
 *
 * @return {Void}
 */	
( function ( $ ) {
    $.fn.UixCloseModalDialog = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			target  : '.uix-modal-box'
        }, options );
		
 
        this.each( function() {

			//Enable mask to close the window.
			$( '.uix-modal-mask' ).removeClass( 'js-uix-disabled' );
			
			$( settings.target ).removeClass( 'active' );
			TweenMax.to( '.uix-modal-mask', 0.3, {
				css: {
					opacity : 0,
					display : 'none'
				}
			});
				
			$( settings.target ).find( '.uix-modal-box__content' ).removeClass( 'js-uix-no-fullscreen' );
			
			
			// Unlocks the page
			$.scrollLock( false );
			
			
		});
 
    };
 
}( jQuery ));
