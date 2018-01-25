
/*! 
 *************************************
 * 5. Navigation
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
			var $window      = $( window ),
				windowWidth  = $window.width(),
				windowHeight = $window.height();
	
			
			// Menu Hover
			var mTop = 15;
			$( 'ul.menu-main > li.multi-column > ul li ul' ).addClass( 'multi' );
			$( 'ul.menu-main > li:not(.multi-column) ul, li.multi-column > ul.sub-menu > li > ul, ul.menu-main li.multi-column > ul' ).css( 'margin-top', mTop + 'px' );
			
			$( 'ul.menu-main li' ).on( 'mouseenter', function(){
				$( this ).find( ' > ul.sub-menu:not(.multi), .mega-arrow' ).show().animate( { marginTop: 0, opacity: 1 }, { duration: 150 } );
				
			}).on( 'mouseleave' , function(){
				$( this ).find( '.mega-arrow' ).hide().animate( { opacity: 0 }, { duration: 150 } );
				$( this ).find( ' > ul.sub-menu:not(.multi)' ).animate( { marginTop: mTop + 'px', opacity: 0 }, { duration: 150,
						complete: function() {
							$( this ).hide();
						} 
				} );		
			});
	
	
		
			//Add Sub-menu Arrow
			$( 'ul.menu-main li' ).each( function() {
				if ( $( this ).find( 'ul' ).length > 0 ) {
					$( this ).prepend( '<span class="nav-arrow"></span>' );
				}
				
			} );	
		
			
		
			//Show Toolbar when viewing site for WordPress
			var waypoints = $( '.admin-bar .menu-toggle' ).waypoint({
				handler: function( direction ) {

					$( this.element ).toggleClass( 'spy-scroll-postion', direction === 'down' );

				},
				offset: -46
			});

			// Sticky primary navigation
			var waypoints2 = $( '.menu-container' ).waypoint({
				handler: function( direction ) {

					$( this.element ).toggleClass( 'spy-scroll-fixed', direction === 'down' );

				},
				offset: -120
			});


			//Prevent to <a> of page transitions
			$( 'a' ).each( function() {
				var attr = $( this ).attr( 'href' );
				if ( typeof attr !== typeof undefined && attr !== false ) {
					if  ( $( this ).attr( 'href' ).indexOf( '/#' ) >= 0   || $( this ).attr( 'href' ) == '#' ) {
						$( this ).attr( 'data-normal', 1 ); 
					 }	
				}
					
			});
		

			
		
	};
	
		
    theme.navigation = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );

