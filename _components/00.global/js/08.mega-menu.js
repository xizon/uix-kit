
/*! 
 *************************************
 * 8. `Mega Menu`
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var pageLoaded = function() {
		
		
		// Using delay is for more accurate calculation
		setTimeout( function() {
			megaMenuInit();
		}, 500 );
		
		$( window ).on('resize', function() {
			megaMenuInit();

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
		function megaMenuInit() {
			var $window      = $( window ),
				windowWidth  = $window.width(),
				windowHeight = $window.height(),
				maxWidth     = 1170, //The maximum width of the mega menu wrapper
			    perDefaultW  = 220; //Default width of each column

			
			// Remove the html tag for mega menu item
			$( 'li.multi-column  > ul .multi-column-title, li.sidr-class-multi-column > ul .sidr-class-multi-column-title' ).each( function()  {
				var mega_old_item = $( this ).html();
				if ( mega_old_item != '' ) {
					$( this ).html( mega_old_item.replace(/<[^>]+>/g, '' ) );
				}
			});
			
			
			if ( windowWidth > 768 ){

				$( 'li.multi-column' ).each( function() {
					var root_li          = $( this ),
						col_total        = root_li.find( '> ul .multi-column-title' ).length,
						col_div          = root_li.find( '> ul .multi-column-title' ).closest( 'li' ),
						mega_div         = root_li.find( ' > ul.sub-menu' ),
						mega_div_w       = mega_div.width(),
						mega_single_w    = null,
						root_li_left     = null;
					
					
					// Add mega arrow
					if ( root_li.find( '.mega-arrow' ).length < 1 ) root_li.prepend( '<span class="mega-arrow"></span>' );
					

					// Detecting if the right or left of the div is touching the browser window edge.
					if ( col_total > 0 ) {

						root_li_left     = getAbsoluteCoordinates( mega_div );
						
						
						//Determine the mega menu wrapper within document width, in order to limit the width of each column for mega menu
						if ( maxWidth > windowWidth ) maxWidth = windowWidth;
						
						
						if ( mega_div_w > maxWidth ) {

							mega_div_w       = maxWidth;
							mega_single_w    = maxWidth/col_total - 2.888;
							
							mega_div.find( '> li' ).css( {
								'width' : mega_single_w + 'px'
							} );
							
							
							if ( ! $( 'body' ).hasClass( 'rtl' ) ) {
								mega_div.css( {
									'margin-left' : ( - root_li_left ) + ( ( windowWidth - mega_div_w )/2 ) + 'px'
								} );
							} else {
								mega_div.css( {
									'margin-right' : ( - root_li_left ) + ( ( windowWidth - mega_div_w )/2 ) + 'px'
								} );
							}

							
							
							
						} else {
							
							mega_div.find( '> li' ).css( {
								'width' : perDefaultW + 'px'
							} );				
							
							var chkWidth = parseFloat( root_li_left  + mega_div_w );


							if ( chkWidth > windowWidth ) {
								if ( ! $( 'body' ).hasClass( 'rtl' ) ) {
									mega_div.css( {
										'margin-left' : - ( chkWidth - windowWidth ) + 'px'
									} );
								} else {
									mega_div.css( {
										'margin-right' : - ( chkWidth - windowWidth ) + 'px'
									} );
								}	

							}	
							
								
							
						}
						
					
		
					}


				} );	

			}
		}
		

		
		
		
    };

    theme.megamenu = {
        pageLoaded : pageLoaded        
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );
