
/* 
 *************************************
 * <!-- Modal Dialog -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.MODAL_DIALOG               = APP.MODAL_DIALOG || {};
	APP.MODAL_DIALOG.version       = '0.0.4';
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
		
		var modalSpeed = getTransitionDuration( $( '.uix-modal-box:first' )[0] );
		
		
		
		/*
		  * Unbind that one in a safe way that won't accidentally unbind other click handlers.
		  * In order to trigger other custom Modal Dialog events.
			
			$( '#element' ).off( 'click.MODAL_DIALOG' );
			$( '#element' ).off( 'click.MODAL_DIALOG_CLOSE' );
			
		*/
		
	
		if ( $( '.uix-modal-mask' ).length == 0 ) {
			$( 'body' ).prepend( '<div class="uix-modal-mask"></div>' );
		}
	    
		$( document ).on( 'click.MODAL_DIALOG', '[data-modal-id]', function() {
			var dataID = $( this ).data( 'modal-id' ),
			    dataH  = $( this ).data( 'modal-height' ),
				dataW  = $( this ).data( 'modal-width' ),
				$obj   = $( '.uix-modal-box#'+dataID );
			
			// Initializate modal
			$( this ).attr( 'href', 'javascript:void(0)' );
			$obj.find( '.uix-modal-box__content' ).addClass( 'js-uix-no-fullscreen' );
			
			
			if ( $( this ).data( 'video-win' ) ) {
				$obj.find( '.uix-modal-box__content > div' ).css( 'overflow-y', 'hidden' );
			}
			
			
			if ( $obj.length > 0 ) {
				
				
				// Locks the page
				$.scrollLock( true );
					

				if( typeof dataH != typeof undefined && dataH != '' ) {
					$obj.css( {'height': dataH } );
				}
				
				if( typeof dataW != typeof undefined && dataW != '' ) {
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
					}
					
				}, modalSpeed );
				
			}
		
		});
		
		$( document ).on( 'click.MODAL_DIALOG_CLOSE', '.uix-modal-box .uix-modal-box__close', function() {
			$( this ).parent().removeClass( 'active' );
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
			setTimeout( function() {
	
			}, modalSpeed );
			
		});
		
    };

    APP.components.documentReady.push( APP.MODAL_DIALOG.documentReady );
    return APP;

}( APP, jQuery, window, document ) );




