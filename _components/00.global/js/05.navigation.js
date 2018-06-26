
/* 
 *************************************
 * <!-- Navigation -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.NAVIGATION               = APP.NAVIGATION || {};
	APP.NAVIGATION.version       = '0.0.4';
    APP.NAVIGATION.documentReady = function( $ ) {

		var $window      = $( window ),
			windowWidth  = $window.width(),
			windowHeight = $window.height(),
			ulForDesktop = '.menu-container:not(.mobile) ul.menu-main';


		//-------- Menu selected (if it exists "data-current" property in <ul>)
		var curMenuIndex = $( ulForDesktop ).data( 'current' );
		if ( typeof curMenuIndex !== typeof undefined ) {
			$( ulForDesktop + ' > li:eq('+curMenuIndex+')' ).addClass( 'active' );
		}



		//-------- Menu Hover
		var mTop = 15;
		$( ulForDesktop + ' > li.multi-column > ul li ul' ).addClass( 'multi' );
		$( ulForDesktop + ' > li:not(.multi-column) ul, .menu-container:not(.mobile) li.multi-column > ul.sub-menu > li > ul, '+ulForDesktop+' li.multi-column > ul' ).css( 'margin-top', mTop + 'px' );

		$( ulForDesktop + ' li' ).on( 'mouseenter', function(){


			TweenMax.set( $( this ).find( ' > ul.sub-menu:not(.multi), .mega-arrow' ), {
				css: {
					opacity    : 0,
					display    : 'block',
					marginTop  : mTop + 'px'
				},
				onComplete : function() {

					TweenMax.to( this.target, 0.3, {
						css: {
							opacity    : 1,
							marginTop  : 0
						},
						ease   : Power2.easeOut
					});		



				}
			});				



		}).on( 'mouseleave' , function(){


			TweenMax.to( $( this ).find( ' > ul.sub-menu:not(.multi), .mega-arrow' ), 0.3, {
				css: {
					opacity    : 0,
					marginTop  : mTop + 'px'
				},
				onComplete : function() {

					TweenMax.set( this.target, {
						css: {
							display    : 'none',
						}
					});		



				}
			});				

		});



		//-------- Add Sub-menu Arrow
		$( ulForDesktop + ' li' ).each( function() {
			if ( $( this ).find( 'ul' ).length > 0 ) {
				$( this ).prepend( '<span class="nav-arrow"></span>' );
			}

		} );	



		//-------- Sticky primary navigation
		//Note: Don't use Waypoint, because the Offset is wrong on calculating height of fixed element
		var $el = $( '.menu-container:not(.mobile)' );
		$window.on('scroll touchmove', function() {

			var scrollTop = $( this ).scrollTop(),
				spyTop    = 220;
			
			if ( scrollTop >= spyTop ) {
				$el.addClass( 'spy-scroll-fixed' );
			} else {
				$el.removeClass( 'spy-scroll-fixed' );	
			}
			
		});
		

		//-------- Prevent to <a> of page transitions
		$( 'a' ).each( function() {
			var attr = $( this ).attr( 'href' );
			if ( typeof attr !== typeof undefined && attr !== false ) {
				if  ( $( this ).attr( 'href' ).indexOf( '/#' ) >= 0   || $( this ).attr( 'href' ) == '#' ) {
					$( this ).attr( 'data-normal', 1 ); 
				 }	
			}

		});
	
		
    };

    APP.components.documentReady.push( APP.NAVIGATION.documentReady );
    return APP;

}( APP, jQuery, window, document ) );

