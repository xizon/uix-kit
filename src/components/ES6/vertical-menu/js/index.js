
/* 
 *************************************
 * <!-- Vertical Menu -->
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


export const VERTICAL_MENU = ( ( module, $, window, document ) => {
	if ( window.VERTICAL_MENU === null ) return false;
	
	
	
    module.VERTICAL_MENU               = module.VERTICAL_MENU || {};
    module.VERTICAL_MENU.version       = '0.0.2';
    module.VERTICAL_MENU.documentReady = function( $ ) {

		var $window      = $( window ),
			windowWidth  = window.innerWidth,
			windowHeight = window.innerHeight,
			ulForDesktop = '.uix-v-menu__container:not(.is-mobile) ul.uix-menu';


		// Menu Hover
		var mTop = 15;
		$( ulForDesktop + ' > li.multi-column > ul li ul' ).addClass( 'multi' );
		$( ulForDesktop + ' > li:not(.multi-column) ul, .uix-v-menu__container:not(.is-mobile) li.multi-column > ul.sub-menu > li > ul, '+ulForDesktop+' li.multi-column > ul' ).css( 'margin-top', mTop + 'px' );

		$( ulForDesktop + ' li' ).on( 'mouseenter', function(){


			TweenMax.set( $( this ).find( ' > ul.sub-menu:not(.multi), .uix-menu__arrow-mega' ), {
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


		
			//Calculate whether the total width of a large navigation is greater than the window
			var megaMenuW        = $( ulForDesktop + ' > li.multi-column > ul' ).width(),
				megaMaxW         = parseFloat( windowWidth - $( ulForDesktop ).parent().width() ),
				megaMenuCoLength = $( ulForDesktop + ' > li.multi-column > ul > li' ).length;
			
			if ( megaMenuW > megaMaxW ) {
				
				$( ulForDesktop + ' > li.multi-column > ul > li' ).css( 'width', megaMaxW/megaMenuCoLength + 'px' );
				
			}
			
			

		}).on( 'mouseleave' , function(){


			TweenMax.to( $( this ).find( ' > ul.sub-menu:not(.multi), .uix-menu__arrow-mega' ), 0.3, {
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
		



		//Add Sub-menu Arrow
		$( ulForDesktop + ' li' ).each( function() {
			if ( $( this ).find( 'ul' ).length > 0 ) {
				$( this ).prepend( '<span class="uix-menu__arrow"></span>' );
			}

		} );	
		
		
		
		
		
		//Monitor the maximum height of the vertical navigation
		menuWrapInit( windowWidth, windowHeight );
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( window.innerWidth != windowWidth ) {

				// Update the window width for next time
				windowWidth  = window.innerWidth;
				windowHeight = window.innerHeight;

				// Do stuff here
				menuWrapInit( windowWidth, windowHeight );
		

			}
		});
		
	
		/*
		 * Monitor the maximum height of the vertical navigation
		 *
		 * @param  {Number} w         - Returns width of browser viewport
		 * @param  {Number} h         - Returns height of browser viewport
		 * @return {Void}
		 */
		function menuWrapInit( w, h ) {
			
			var $menuWrap  = $( '.uix-v-menu__container:not(.is-mobile)' ),
				vMenuTop   = 0, //This value is equal to the $vertical-menu-top variable in the SCSS
				winHeight  = h - vMenuTop;

			//WoedPress spy
			if ( $( '.admin-bar' ).length > 0 ) {
				winHeight = h - 132;
			}	

			$menuWrap.css({
				position  : 'fixed',
				height    : winHeight + 'px',
				marginTop : 0
			});	

			$window.on( 'scroll.VERTICAL_MENU touchmove.VERTICAL_MENU', function() {

				var curULHeight = $( 'ul.uix-menu' ).height(),
					windowPos   = $window.scrollTop();

				if ( curULHeight > winHeight ) {
					$menuWrap.css({
						position : 'absolute',
						height   : curULHeight + 'px'
					});

					if ( windowPos >= ( curULHeight - winHeight ) ) {
						$menuWrap.css({
							position  : 'fixed',
							marginTop : -( curULHeight - winHeight ) + 'px'
						});	
					} else {
						$menuWrap.css({
							position : 'absolute',
							marginTop : 0
						});		
					}

				}

				if ( $menuWrap.height() < winHeight ) {
					$menuWrap.css({
						position  : 'fixed',
						height    : winHeight + 'px',
						marginTop : 0
					});		
				}


			});	
			
		}
			
		
    };

    module.components.documentReady.push( module.VERTICAL_MENU.documentReady );
	

	return class VERTICAL_MENU {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );

