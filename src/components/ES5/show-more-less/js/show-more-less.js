
/* 
 *************************************
 * <!-- Show More Less -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.SHOW_MORELESS               = APP.SHOW_MORELESS || {};
	APP.SHOW_MORELESS.version       = '0.0.2';
    APP.SHOW_MORELESS.documentReady = function( $ ) {

	
		$( '.uix-more-btn__link' ).each( function()  {
			var $btn          = $( this ),
				$con          = $btn.parent().prev( '.uix-more-btn' ),
				$btnTxt       = $btn.find( '> span' ),
				defaultHeight = $con.height()


			
			$btn.on( 'click', function( e ) {
				e.preventDefault();

				var expanded      = ( $( this ).attr( 'aria-expanded' ) == 'true' ) ? false : true;

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

    APP.components.documentReady.push( APP.SHOW_MORELESS.documentReady );
    return APP;

}( APP, jQuery, window, document ) );


