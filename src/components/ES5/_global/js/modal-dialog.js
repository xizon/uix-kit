
/* 
 *************************************
 * <!-- Modal Dialog -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.MODAL_DIALOG               = APP.MODAL_DIALOG || {};
	APP.MODAL_DIALOG.version       = '0.0.7';
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
		
			$( document ).fireModalDialog( {
				id        : $( this ).data( 'modal-id' ),
				height    : $( this ).data( 'modal-height' ),
				width     : $( this ).data( 'modal-width' ),
				speed     : modalSpeed,
				btn       : $( this )
			});

			return false;
		
		});
		
		
		$( document ).on( 'click.MODAL_DIALOG_CLOSE', '.uix-modal-box .uix-modal-box__close', function() {
			$( this ).parent().removeClass( 'active' );
			
			return false;
		});
		
		$( document ).on( 'click.MODAL_DIALOG_CLOSE', '.uix-modal-box .uix-modal-box__close, .uix-modal-mask', function() {
			$( '.uix-modal-box' ).removeClass( 'active' );
			TweenMax.to( '.uix-modal-mask', 0.3, {
				css: {
					opacity : 0,
					display : 'none'
				}
			});
				
			$( '.uix-modal-box' ).find( '.uix-modal-box__content' ).removeClass( 'js-uix-no-fullscreen' );
			
			
			// Unlocks the page
			$.scrollLock( false );
			
			//something...
			setTimeout( function() {
	
			}, modalSpeed );
			
			
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
 * @param  {Number|String} height        - Custom modal height whick need a unit string. 
										   This attribute "data-modal-height" may not exist. Such as: 200px
 * @param  {Number|String} width         - Custom modal width whick need a unit string. 
										   This attribute "data-modal-height" may not exist. Such as: 200px
 * @param  {Number} speed                - Delay Time when Full Screen Effect is fired.   
 * @param  {Object} btn                  - Link or button that fires an event.
 * @return {Void}
 */	
( function ( $ ) {
    $.fn.fireModalDialog = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			id        : 'demo',
			height    : false,
			width     : false,
			speed     : 500,
			btn       : false
        }, options );
		
 
        this.each( function() {

			if ( settings.id == '' ) return false;
			
			
	
			//Add modal mask to stage
			if ( $( '.uix-modal-mask' ).length == 0 ) {
				$( 'body' ).prepend( '<div class="uix-modal-mask"></div>' );
			}
			$.when( $( '.uix-modal-mask' ).length > 0 ).then( function() {

				var dataID  = settings.id,
					dataH   = settings.height,
					dataW   = settings.width,
					linkBtn = settings.btn,
					$obj   = $( '.uix-modal-box#'+dataID );

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

					$obj.addClass( 'active' );	
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
