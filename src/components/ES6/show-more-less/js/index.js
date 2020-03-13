
/* 
 *************************************
 * <!-- Show More Less -->
 *************************************
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


import '../scss/_style.scss';


export const SHOW_MORELESS = ( ( module, $, window, document ) => {
	if ( window.SHOW_MORELESS === null ) return false;
	
	
	
    module.SHOW_MORELESS               = module.SHOW_MORELESS || {};
    module.SHOW_MORELESS.version       = '0.0.3';
    module.SHOW_MORELESS.documentReady = function( $ ) {

	
		$( '.uix-more-btn__link' ).each( function()  {
			const $btn          = $( this ),
			  	  $con          = $btn.parent().prev( '.uix-more-btn' ),
				  $btnTxt       = $btn.find( '> span' ),
				  defaultHeight = $con.height()


			
			$btn.off( 'click' ).on( 'click', function( e ) {
				e.preventDefault();

				const expanded      = ( $( this ).attr( 'aria-expanded' ) == 'true' ) ? false : true;

				if ( expanded ) {

					$con.addClass( 'is-active' ).attr( 'aria-expanded', true );
					$( this ).addClass( 'is-active' ).attr( 'aria-expanded', true );


					//to open
					// - temporarilty set height:auto
					// - tween from height:0
					TweenMax.set( $con, { height: 'auto' } );
					TweenMax.from( $con, 0.5, { height: defaultHeight } );		

					//change text
					$btnTxt.eq(0).hide();
					$btnTxt.eq(1).show();


				} else {

					$con.removeClass( 'is-active' ).attr( 'aria-expanded', false );
					$( this ).removeClass( 'is-active' ).attr( 'aria-expanded', false );

					//to close
					TweenMax.to( $con, 0.5, { height: defaultHeight } );

					//change text
					$btnTxt.eq(0).show();
					$btnTxt.eq(1).hide();


				}

			});	
		});

		
    };

    module.components.documentReady.push( module.SHOW_MORELESS.documentReady );
	

	return class SHOW_MORELESS {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );

