
/* 
 *************************************
 * <!-- Mega Menu -->
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



export const MEGA_MENU = ( ( module, $, window, document ) => {
	if ( window.MEGA_MENU === null ) return false;
	
	
	
	
	module.MEGA_MENU               = module.MEGA_MENU || {};
    module.MEGA_MENU.version       = '0.0.4';
	module.MEGA_MENU.pageLoaded = function() {

		const $window          = $( window );
		let	windowWidth        = window.innerWidth,
			windowHeight       = window.innerHeight;


		// Using delay is for more accurate calculation
		setTimeout( function() {
			megaMenuInit( windowWidth );
		}, 500 );
		

		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( window.innerWidth != windowWidth ) {

				// Update the window width for next time
				windowWidth = window.innerWidth;

				// Do stuff here
				megaMenuInit( windowWidth );
		
			}
		});
		
		

		
		// Initialize mega menu
		function megaMenuInit( w ) {
			let $menuWrap  = $( '.uix-menu__container:not(.is-mobile)' ),
				maxWidth     = 1140, //The maximum width of the mega menu wrapper
				
				//This value is equal to the $nav-mega-li-w variable in the SCSS
			    perDefaultW  = 270; //Default width of each column

			
			//New XL container for Bootstrap 4.x
			if ( w > 1430 ) maxWidth = 1278;
			
			//Full width container
			maxWidth = windowWidth - 15;
			
			
			
			// Remove the html tag for mega menu item
			$menuWrap.find( 'li.multi-column  > ul .multi-column-title' ).each( function()  {
				const megaOldItem = $( this ).html();
				if ( megaOldItem != '' ) {
					$( this ).html( megaOldItem.replace(/<[^>]+>/g, '' ) );
				}
			});
			
			
			if ( w > 768 ){

				$menuWrap.find( 'li.multi-column' ).each( function( index ) {
					const $rootLi         = $( this ),
						  colTotal        = $rootLi.find( '> ul > li' ).length,
						  itemWidth       = $rootLi.find( '> ul > li' ).first().width(),
						  $megaDiv        = $rootLi.find( '> ul.sub-menu' );

					let megaPerWidth    = null,
						rootLiLeft      = null;
					

					// Get width or other style data of element when Not Visible (Display: None)
					let megaDivWidth = $megaDiv.width();


					
					// Add mega arrow
					if ( $rootLi.find( '.uix-menu__arrow-mega' ).length < 1 ) $rootLi.prepend( '<span class="uix-menu__arrow-mega"></span>' );
					

					// Detecting if the right or left of the div is touching the browser window edge.
					if ( colTotal > 0 ) {

						rootLiLeft = UixCssProperty.getAbsoluteCoordinates( $megaDiv[0] ).left;
						
						
						//Determine the mega menu wrapper within document width, in order to limit the width of each column for mega menu
						if ( maxWidth > w ) maxWidth = w;
						
						
						if ( (megaDivWidth + 20) > maxWidth ) {

							megaDivWidth    = maxWidth;
							megaPerWidth    = maxWidth/colTotal - 2.888;
							
							//Resetting the width of each column
							$megaDiv.find( '> li' ).css( {
								'width' : megaPerWidth + 'px'
							} );
							
							//Resetting the width of each <li> tag
							$megaDiv.find( '> li ul li' ).css( {
								'width' : megaPerWidth + 'px'
							} );
							
							
							if ( ! $( 'body' ).hasClass( 'rtl' ) ) {
								$megaDiv.css( {
									'margin-left' : ( -rootLiLeft ) + ( ( w - megaDivWidth )/2 ) + 'px'
								} );
							} else {
								$megaDiv.css( {
									'margin-right' : ( -rootLiLeft ) + ( ( w - megaDivWidth )/2 ) + 'px'
								} );
							}

							
							
							
						} else {
							
							//Resetting the width of each column
							$megaDiv.find( '> li' ).css( {
								'width' : perDefaultW + 'px'
							} );	
							
							//Resetting the width of each <li> tag
							$megaDiv.find( '> li ul li' ).css( {
								'width' : perDefaultW + 'px'
							} );
								
							
							
							const chkWidth = ( rootLiLeft  + megaDivWidth );


							if ( chkWidth > w ) {
								if ( ! $( 'body' ).hasClass( 'rtl' ) ) {
									$megaDiv.css( {
										'margin-left' : - ( chkWidth - w ) + 'px'
									} );
								} else {
									$megaDiv.css( {
										'margin-right' : - ( chkWidth - w ) + 'px'
									} );
								}	
								
								
								//If the CSS sets the offset of ul::before
//								const $megaDiv_offset = megaDivWidth/2 - 0;
//								
//								if ( ! $( 'body' ).hasClass( 'rtl' ) ) {
//									$megaDiv.css( {
//										'margin-left' : - ( chkWidth - w ) + $megaDiv_offset + 'px'
//									} );
//								} else {
//									$megaDiv.css( {
//										'margin-right' : - ( chkWidth - w ) + $megaDiv_offset + 'px'
//									} );
//								}	
								
								
								

							}	
							
								
							
						}
						
					
		
					}


				} );	

			}
		}		

	};

	module.components.pageLoaded.push( module.MEGA_MENU.pageLoaded );

	return class MEGA_MENU {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );

