
/* 
 *************************************
 * <!-- Modal Dialog -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.MODAL_DIALOG               = APP.MODAL_DIALOG || {};
	APP.MODAL_DIALOG.version       = '0.0.1';
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
			
			$( '#element' ).off( 'click.modalDialog' );
			$( '#element' ).off( 'click.modalDialogClose' );
			
		*/
		
	
		if ( $( '.modal-mask' ).length == 0 ) {
			$( 'body' ).prepend( '<div class="modal-mask"></div>' );
		}
	    
		$( document ).on( 'click.modalDialog', '[data-modal-id]', function() {
			var dataID = $( this ).data( 'modal-id' ),
			    dataH  = $( this ).data( 'modal-height' ),
				dataW  = $( this ).data( 'modal-width' ),
				$obj   = $( '.modal-box#'+dataID );
			
			// Initializate modal
			$( this ).attr( 'href', 'javascript:void(0)' );
			$obj.find( '.content' ).addClass( 'no-fullscreen' );
			
			
			if ( $( this ).data( 'video-win' ) ) {
				$obj.find( '.content' ).css( 'overflow-y', 'hidden' );
			}
			
			
			if ( $obj.length > 0 ) {
				if( typeof dataH != typeof undefined && dataH != '' ) {
					$obj.css( {'height': dataH } );
				}
				
				if( typeof dataW != typeof undefined && dataW != '' ) {
					$obj.css( {'width': dataW } );
				}
				
				TweenMax.set( '.modal-mask', {
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
			
			if ( $obj.hasClass( 'fullscreen' ) ) {
				setTimeout( function() {
					$( 'html' ).css( 'overflow-y', 'hidden' );
					if ( !$obj.hasClass( 'video' ) ) {
						$obj.find( '.content' ).css( 'overflow-y', 'scroll' );
					}
					
				}, getTransitionDuration( '.modal-box#'+dataID ) );
				
			}
		
		});
		
		$( document ).on( 'click.modalDialogClose', '.modal-box .close-btn', function() {
			$( this ).parent().removeClass( 'active' );
		});
		
		$( document ).on( 'click.modalDialogClose', '.modal-box .close-btn, .modal-mask', function() {
			$( '.modal-box' ).removeClass( 'active' );
			TweenMax.to( '.modal-mask', 0.3, {
				css: {
					opacity : 0,
					display : 'none'
				}
			});
				
			$( '.modal-box' ).find( '.content' ).removeClass( 'no-fullscreen' );
			$( 'html' ).css( 'overflow-y', 'auto' );
			setTimeout( function() {
	
			}, getTransitionDuration( '.modal-box:first' ) );
			
		});
		
    };

    APP.components.documentReady.push( APP.MODAL_DIALOG.documentReady );
    return APP;

}( APP, jQuery, window, document ) );




