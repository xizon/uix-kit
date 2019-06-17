
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
    module.MEGA_MENU.version       = '0.0.3';
	module.MEGA_MENU.pageLoaded = function() {

		var $window      = $( window ),
			windowWidth  = window.innerWidth,
			windowHeight = window.innerHeight;

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
			var $menuWrap  = $( '.uix-menu__container:not(.is-mobile)' ),
				maxWidth     = 1140, //The maximum width of the mega menu wrapper
				
				//This value is equal to the $nav-mega-li-w variable in the SCSS
			    perDefaultW  = 270; //Default width of each column

			
			//New XL container for Bootstrap 4.x
			if ( w > 1430 ) maxWidth = 1278;
			
			//Full width container
			maxWidth = windowWidth - 15;
			
			
			
			// Remove the html tag for mega menu item
			$menuWrap.find( 'li.multi-column  > ul .multi-column-title' ).each( function()  {
				var mega_old_item = $( this ).html();
				if ( mega_old_item != '' ) {
					$( this ).html( mega_old_item.replace(/<[^>]+>/g, '' ) );
				}
			});
			
			
			if ( w > 768 ){

				$menuWrap.find( 'li.multi-column' ).each( function( index ) {
					var root_li          = $( this ),
						col_total        = root_li.find( '> ul > li' ).length,
						mega_div         = root_li.find( ' > ul.sub-menu' ),
						mega_div_w       = mega_div.width(),
						mega_single_w    = null,
						root_li_left     = null;
					
					
					// Add mega arrow
					if ( root_li.find( '.uix-menu__arrow-mega' ).length < 1 ) root_li.prepend( '<span class="uix-menu__arrow-mega"></span>' );
					

					// Detecting if the right or left of the div is touching the browser window edge.
					if ( col_total > 0 ) {

						root_li_left = UixCssProperty.getAbsoluteCoordinates( mega_div[0] ).left;
						
						
						//Determine the mega menu wrapper within document width, in order to limit the width of each column for mega menu
						if ( maxWidth > w ) maxWidth = w;
						
						
						if ( parseFloat(mega_div_w + 20) > maxWidth ) {

							mega_div_w       = maxWidth;
							mega_single_w    = maxWidth/col_total - 2.888;
							
							//Resetting the width of each column
							mega_div.find( '> li' ).css( {
								'width' : mega_single_w + 'px'
							} );
							
							//Resetting the width of each <li> tag
							mega_div.find( '> li ul li' ).css( {
								'width' : mega_single_w + 'px'
							} );
							
							
							if ( ! $( 'body' ).hasClass( 'rtl' ) ) {
								mega_div.css( {
									'margin-left' : ( - root_li_left ) + ( ( w - mega_div_w )/2 ) + 'px'
								} );
							} else {
								mega_div.css( {
									'margin-right' : ( - root_li_left ) + ( ( w - mega_div_w )/2 ) + 'px'
								} );
							}

							
							
							
						} else {
							
							//Resetting the width of each column
							mega_div.find( '> li' ).css( {
								'width' : perDefaultW + 'px'
							} );	
							
							//Resetting the width of each <li> tag
							mega_div.find( '> li ul li' ).css( {
								'width' : perDefaultW + 'px'
							} );
								
							
							
							var chkWidth = parseFloat( root_li_left  + mega_div_w );


							if ( chkWidth > w ) {
								if ( ! $( 'body' ).hasClass( 'rtl' ) ) {
									mega_div.css( {
										'margin-left' : - ( chkWidth - w ) + 'px'
									} );
								} else {
									mega_div.css( {
										'margin-right' : - ( chkWidth - w ) + 'px'
									} );
								}	
								
								
								//If the CSS sets the offset of ul::before
//								var mega_div_offset = mega_div_w/2 - 0;
//								
//								if ( ! $( 'body' ).hasClass( 'rtl' ) ) {
//									mega_div.css( {
//										'margin-left' : - ( chkWidth - w ) + mega_div_offset + 'px'
//									} );
//								} else {
//									mega_div.css( {
//										'margin-right' : - ( chkWidth - w ) + mega_div_offset + 'px'
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

