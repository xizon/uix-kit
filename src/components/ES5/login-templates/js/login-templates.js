
/* 
 *************************************
 * <!-- Login Templates -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.LOGIN_UI               = APP.LOGIN_UI || {};
	APP.LOGIN_UI.version       = '0.0.1';
    APP.LOGIN_UI.documentReady = function( $ ) {

		
		
		var $loginToggle = $( '.uix-special-login__toggle' ),
			$loginForms  = $( '.uix-special-login__form' );

		$loginToggle.data( 'switched', true ).on( 'click', function( e ) {
			
			e.preventDefault();

			var $form1 = $loginForms.eq(0),
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

    APP.components.documentReady.push( APP.LOGIN_UI.documentReady );
    return APP;

}( APP, jQuery, window, document ) );



