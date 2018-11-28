
/* 
 *************************************
 * <!-- Mega Menu -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	

    APP.MEGAMENU               = APP.MEGAMENU || {};
	APP.MEGAMENU.version       = '0.0.1';
    APP.MEGAMENU.pageLoaded    = function() {

		var $window      = $( window ),
			windowWidth  = $window.width(),
			windowHeight = $window.height();

		// Using delay is for more accurate calculation
		setTimeout( function() {
			megaMenuInit( windowWidth );
		}, 500 );
		
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( $window.width() != windowWidth ) {

				// Update the window width for next time
				windowWidth = $window.width();

				// Do stuff here
				megaMenuInit( windowWidth );
		

			}
		});
		
		
	
		// For the absolute coordinates of any jquery element 
		function getAbsoluteCoordinates( $element ) {
			var windowWidth     = $( window ).width(),
			    leftPos         = null;

			
			if ( ! $( 'body' ).hasClass( 'rtl' ) ) {
				leftPos = ( $element.offset().left == 0 ) ? $element.parent().offset().left : $element.offset().left;
			} else {
				
				//($(window).width() - ($whatever.offset().left + $whatever.outerWidth()));
				leftPos = ( $element.offset().left == 0 ) ? ( windowWidth - ( $element.parent().offset().left + $element.parent().outerWidth() ) ) : ( windowWidth - ( $element.offset().left + $element.outerWidth() ) );
			}
				

			return leftPos;
		}	

		
		// Initialize mega menu
		function megaMenuInit( w ) {
			var $menuWrap  = $( '.uix-menu__container:not(.is-mobile)' ),
				maxWidth     = 1140, //The maximum width of the mega menu wrapper
				
				//This value is equal to the $nav-mega-li-w variable in the SCSS
			    perDefaultW  = 270; //Default width of each column

			
			//Basic Container
			if ( w > 1430 ) maxWidth = 1278;
			if ( w > 1600 ) maxWidth = 1410;
			
			
			
			// Remove the html tag for mega menu item
			$menuWrap.find( 'li.multi-column  > ul .multi-column-title' ).each( function()  {
				var mega_old_item = $( this ).html();
				if ( mega_old_item != '' ) {
					$( this ).html( mega_old_item.replace(/<[^>]+>/g, '' ) );
				}
			});
			
			
			if ( w > 768 ){

				$menuWrap.find( 'li.multi-column' ).each( function() {
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

						root_li_left     = getAbsoluteCoordinates( mega_div );
						
						
						//Determine the mega menu wrapper within document width, in order to limit the width of each column for mega menu
						if ( maxWidth > w ) maxWidth = w;
						
						
						if ( mega_div_w > maxWidth ) {

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

    APP.components.pageLoaded.push( APP.MEGAMENU.pageLoaded );
    return APP;

}( APP, jQuery, window, document ) );
