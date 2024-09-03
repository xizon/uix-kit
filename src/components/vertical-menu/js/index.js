
/* 
 *************************************
 * <!-- Vertical Menu -->
 *************************************
 */

import {
    UixModuleInstance,
    UixDebounce,
    UixThrottle
} from '@uixkit/core/_global/js';


import '../scss/_style.scss';


export const VERTICAL_MENU = ( ( module, $, window, document ) => {
	if ( window.VERTICAL_MENU === null ) return false;
	
	
	
    module.VERTICAL_MENU               = module.VERTICAL_MENU || {};
    module.VERTICAL_MENU.version       = '0.0.6';
    module.VERTICAL_MENU.documentReady = function( $ ) {

        
        let	windowWidth        = window.innerWidth,
            windowHeight       = window.innerHeight;
        
		const ulForDesktop = '.uix-v-menu__container:not(.is-mobile) ul.uix-menu';


		// Menu Hover
		const mTop = 15;
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
			const megaMenuW        = $( ulForDesktop + ' > li.multi-column > ul' ).width(),
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
		menuWrapInit( windowHeight );

		function windowUpdate() {
			// Check window height has actually changed and it's not just iOS triggering a resize event on scroll
			if ( window.innerHeight != windowHeight ) {
				
				// Update the window height for next time
				windowHeight = window.innerHeight;
		
				// Do stuff here
				menuWrapInit( windowHeight );
		
		
			}
		}
		
		// Add function to the window that should be resized
		const debounceFuncWindow = UixDebounce(windowUpdate, 50);
		window.removeEventListener('resize', debounceFuncWindow);
		window.addEventListener('resize', debounceFuncWindow);
		
	
		/*
		 * Monitor the maximum height of the vertical navigation
		 *
		 * @param  {Number} h         - Returns height of browser viewport
		 * @return {Void}
		 */
		function menuWrapInit( h ) {
			
			const $menuWrap  = $( '.uix-v-menu__container:not(.is-mobile)' ),
				  vMenuTop   = 0; //This value is equal to the $vertical-menu-top variable in the SCSS
            
            
			let	winHeight  = h - vMenuTop;

			//WoedPress spy
			if ( $( '.admin-bar' ).length > 0 ) {
				winHeight = h - 132;
			}	

			$menuWrap.css({
				position  : 'fixed',
				height    : winHeight + 'px',
				marginTop : 0
			});	


			function scrollUpdate() {
				const curULHeight = $( 'ul.uix-menu' ).height(),
					  scrolled    = $( window ).scrollTop();

				if ( curULHeight > winHeight ) {
					$menuWrap.css({
						position : 'absolute',
						height   : curULHeight + 'px'
					});

					if ( scrolled >= ( curULHeight - winHeight ) ) {
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
			}
			
			// Add function to the element that should be used as the scrollable area.
			const throttleFunc = UixThrottle(scrollUpdate, 5);
			window.removeEventListener('scroll', throttleFunc);
			window.removeEventListener('touchmove', throttleFunc);
			window.addEventListener('scroll', throttleFunc);
			window.addEventListener('touchmove', throttleFunc);
			throttleFunc();
			

			
		}
			
		
    };

    module.components.documentReady.push( module.VERTICAL_MENU.documentReady );
	

	return class VERTICAL_MENU {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );

