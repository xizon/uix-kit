
/* 
 *************************************
 * <!-- Modal Dialog -->
 *************************************
 */
import {
    templateUrl,
    homeUrl,
    ajaxUrl,
    UixBrowser,
    UixModuleInstance,
    UixGUID,
    UixMath,
    UixCssProperty,
    UixDebounce,
    UixThrottle
} from '@uixkit/core/_global/js';
import UixFireModalDialog from '@uixkit/core/modal-dialog/js/fn/fire-modal-dialog';
import UixCloseModalDialog from '@uixkit/core/modal-dialog/js/fn/close-modal-dialog';

import '../scss/_style.scss';


export const MODAL_DIALOG = ( ( module, $, window, document ) => {
	if ( window.MODAL_DIALOG === null ) return false;
	
	
    module.MODAL_DIALOG               = module.MODAL_DIALOG || {};
    module.MODAL_DIALOG.version       = '0.1.9';
    module.MODAL_DIALOG.documentReady = function( $ ) {

		
		//Delay Time when Full Screen Effect is fired.
		const modalSpeed = UixCssProperty.getTransitionDuration( $( '.uix-modal-box:first' )[0] );
        
        
        // To display the template tag content.
        $( 'template' ).each( function()  {
            
            const _content = $( this ).html( function( index,html ) {
                                        return html.replace(/[\r\n]/g, '' );
                                    }).html(),
                _id = $( this ).attr( 'id' );
            
            
            //If it is dialog, clone the contents of the <template> into the body
            if ( 
                typeof _id !== typeof undefined && 
                ! $( 'body' ).hasClass( _id ) && 
                $( '<div>' + _content + '</div>' ).find( '[role="dialog"]' ).length > 0 
            ) {

                
                //reset id
                $( this ).removeAttr( 'id' );
                $( 'body' ).addClass( _id );
                
                //append content to body
                $( _content.replace(/role=[\'\"]dialog[\'\"]/, 'role="dialog" id="'+_id+'"' ) ).appendTo( 'body' );
                
            }

        });
        
        
        
        
		
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
		
	    
		$( document ).off( 'click.MODAL_DIALOG' ).on( 'click.MODAL_DIALOG', '[data-modal-id]', function() {

			let dataH         = $( this ).data( 'modal-height' ),
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
	
		$( document ).off( 'click.MODAL_DIALOG_CLOSE' ).on( 'click.MODAL_DIALOG_CLOSE', '.uix-modal-box [data-modal-close-trigger], .uix-modal-mask:not(.js-uix-disabled)', function() {
			
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


		

