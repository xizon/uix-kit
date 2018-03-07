
/*! 
 *************************************
 * Modal Dialog
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ){
		
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
				
				$( '.modal-mask' ).fadeIn( 'fast' );
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
			$( '.modal-mask' ).fadeOut( 'fast' );
			$( '.modal-box' ).find( '.content' ).removeClass( 'no-fullscreen' );
			$( 'html' ).css( 'overflow-y', 'auto' );
			setTimeout( function() {
	
			}, getTransitionDuration( '.modal-box:first' ) );
			
		});
		
	};
		
      
    theme.modalbox = {
        documentReady : documentReady        
    };  
    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );


