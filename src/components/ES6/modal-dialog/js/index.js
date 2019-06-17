
/* 
 *************************************
 * <!-- Modal Dialog -->
 *************************************
 */

/**
 * module.MODAL_DIALOG
 * 
 * @requires ./src/components/ES5/_plugins-Miscellaneous
 */



import {
    templateUrl,
    homeUrl,
    ajaxUrl,
    browser,
    UixModuleInstance,
    UixGUID,
    UixMath,
    UixCssProperty
} from '@uixkit/core/_global/js';
import UixFireModalDialog from '@uixkit/core/modal-dialog/js/fn/fire-modal-dialog';
import UixCloseModalDialog from '@uixkit/core/modal-dialog/js/fn/close-modal-dialog';

import '../scss/_style.scss';


export const MODAL_DIALOG = ( ( module, $, window, document ) => {
	if ( window.MODAL_DIALOG === null ) return false;
	
	
    module.MODAL_DIALOG               = module.MODAL_DIALOG || {};
    module.MODAL_DIALOG.version       = '0.1.0';
    module.MODAL_DIALOG.documentReady = function( $ ) {

		
		//Delay Time when Full Screen Effect is fired.
		var modalSpeed = UixCssProperty.getTransitionDuration( $( '.uix-modal-box:first' )[0] );
	
		
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
				$( this ).parent().removeClass( 'is-active' );
			}
			
			$( document ).UixCloseModalDialog();
			
			
			return false;
			
		});
		
    };

    module.components.documentReady.push( module.MODAL_DIALOG.documentReady );
	

	return class MODAL_DIALOG {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );


		

