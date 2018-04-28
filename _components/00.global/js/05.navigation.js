
/* 
 *************************************
 * <!-- Navigation -->
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
			var $window      = $( window ),
				windowWidth  = $window.width(),
				windowHeight = $window.height(),
				ulForDesktop = '.menu-container:not(.mobile) ul.menu-main';
	
		
		    // Menu selected (if it exists "data-current" property in <ul>)
		    var curMenuIndex = $( ulForDesktop ).data( 'current' );
		    if ( typeof curMenuIndex !== typeof undefined ) {
				$( ulForDesktop + ' > li:eq('+curMenuIndex+')' ).addClass( 'active' );
			}
		    
		    
		
			// Menu Hover
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
	
	
		
			//Add Sub-menu Arrow
			$( ulForDesktop + ' li' ).each( function() {
				if ( $( this ).find( 'ul' ).length > 0 ) {
					$( this ).prepend( '<span class="nav-arrow"></span>' );
				}
				
			} );	
		


			// Sticky primary navigation
			var waypoints2 = $( '.menu-container:not(.mobile)' ).waypoint({
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

