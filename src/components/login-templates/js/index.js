
/* 
 *************************************
 * <!-- Login Templates -->
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


import '../scss/_style.scss';


export const LOGIN_UI = ( ( module, $, window, document ) => {
	if ( window.LOGIN_UI === null ) return false;
	
	
	
    module.LOGIN_UI               = module.LOGIN_UI || {};
    module.LOGIN_UI.version       = '0.0.2';
    module.LOGIN_UI.documentReady = function( $ ) {

		
		
		const $loginToggle = $( '.uix-special-login__toggle' ),
			  $loginForms  = $( '.uix-special-login__form' );

		$loginToggle.data( 'switched', true ).off( 'click' ).on( 'click', function( e ) {
			
			e.preventDefault();

			const $form1 = $loginForms.eq(0),
			      $form2 = $loginForms.eq(1);

		
			if ( $( this ).data( 'switched' ) ) {
				$( this ).data( 'switched', false );

				TweenMax.set( $form2, {
					height: 'auto'
				});
				TweenMax.from( $form2, 0.5, {
					height: 0
				});

				TweenMax.to( $form1, 0.5, {
					height: 0
				});
				
				// Switches the Icon
				$( this ).find( '> span i' ).eq(0).hide();
				$( this ).find( '> span i' ).eq(1).show();


			} else {
				$( this ).data( 'switched', true );

				TweenMax.set( $form1, {
					height: 'auto'
				});
				TweenMax.from( $form1, 0.5, {
					height: 0
				});

				TweenMax.to( $form2, 0.5, {
					height: 0
				});
				
				// Switches the Icon
				$( this ).find( '> span i' ).eq(1).hide();
				$( this ).find( '> span i' ).eq(0).show();	
				
				
			}

		});
	
		
    };

    module.components.documentReady.push( module.LOGIN_UI.documentReady );

	return class LOGIN_UI {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );



