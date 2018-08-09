
/* 
 *************************************
 * <!-- Modal Dialog -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.MODAL_DIALOG               = APP.MODAL_DIALOG || {};
	APP.MODAL_DIALOG.version       = '0.0.2';
    APP.MODAL_DIALOG.documentReady = function( $ ) {

		function getTransitionDuration( elementOrSelector ){
			var $el, durString, isMS, numberStr, numberNum;
			$el = $( elementOrSelector );
			if( $el.length === 0 ){
				return false;
			}
			$el = $($el[0]); // Force just the first item.  need more?  use .each
			
			var dur = $el.css('transition-duration');
			if( typeof dur === typeof undefined ) { 
				dur = '0.5s';
			}
			
			durString = dur.toLowerCase();
			isMS = durString.indexOf( 'ms' ) >= 0;
			numberNum = durString.replace( 'ms', '' ).replace( 's', '' );
			return isMS ? numberNum : numberNum * 1000;
		}
		
		
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
				$obj.find( '.uix-modal-box__content' ).css( 'overflow-y', 'hidden' );
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
						$obj.find( '.uix-modal-box__content' ).css( 'overflow-y', 'scroll' );
					}
					
				}, getTransitionDuration( '.uix-modal-box#'+dataID ) );
				
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
	
			}, getTransitionDuration( '.uix-modal-box:first' ) );
			
		});
		
    };

    APP.components.documentReady.push( APP.MODAL_DIALOG.documentReady );
    return APP;

}( APP, jQuery, window, document ) );




