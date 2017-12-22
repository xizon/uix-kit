
/*! 
 *************************************
 * 7. Navigation
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var pageLoaded = function() {
		
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
		
			
			// Mobile Menu
			if ( $( '.brand img' ).length > 0 ) {
				$( '.mobile-brand' ).html( '<img src="'+$( '.brand img' ).attr( 'src' )+'" alt="">' );
			} else {
				$( '.mobile-brand' ).html( '<img src=" ' + templateUrl + '/assets/images/blank.gif" alt="">' );
			};
			
			
		    var $toggle = $( '.menu-toggle' ),
			    $menuToBody = $( 'body' ),
				sidrname   = 'sidr-left',
				sidrside   = 'left';
			
		
		    if ( $( 'body' ).hasClass( 'rtl' ) ) {
				sidrname   = 'sidr-right';
				sidrside   = 'right';
			}
				
			$toggle.sidr({
				name: sidrname,
				side: sidrside,
				source: '.menu-container',
				body: $menuToBody,
				onOpen: function( ev ) {
				    $toggle.addClass( 'open' );

					var logoURL = $( '.sidr-class-mobile-brand img' ).attr( 'src' );
					if ( typeof logoURL !== typeof undefined && logoURL != '' ) {
						if ( logoURL.indexOf( 'blank.gif' ) >= 0 ) $( '.sidr-inner' ).css( 'margin-top', '-70px' );
					}	
					
					//Fix the icon class name
					$( '.sidr-class-fa' ).each( function()  {
						var liOldClass = $( this ).attr( 'class' );
						$( this ).addClass( liOldClass.replace(/sidr-class-/g, '' ) );
						
					});
					
					
				},	
				onClose: function() {
				    $toggle.removeClass( 'open' );
				}
			  
			});
			
			
			$( '.sidr li' ).on( 'click', function() {
				  
				  var arrowText = $( this ).find( '.sidr-nav-arrow' ).text().replace( /(.).*\1/g, "$1" );
				  $( this ).find( '> .sidr-class-sub-menu:not(.sidr-class-sub-sub)' ).toggle();
				
				  if ( arrowText != '-' ) {
					  $( this ).find( '.sidr-nav-arrow' ).text( '-' );
				  } else {
					  $( this ).find( '.sidr-nav-arrow' ).text( '+' );
				  }
				  
				  
			} );
		
		
	
			// Close the menu on window change
			$window.on( 'resize', function() {
				windowWidth  = $window.width();
				$.sidr( 'close', sidrname );
				$( '.menu-toggle' ).removeClass( 'open' );
				if ( windowWidth <= 768 ) sidrmenuInit(); 
			} );
			
			if ( windowWidth <= 768 ) {
			    sidrmenuInit(); 
			};
		
			
			function sidrmenuInit() {
	
				$( '.sidr-class-menu-main > li' ).each( function() {
					if ( $( this ).find( 'ul' ).length > 0 ) {
						if ( $( this ).find( '.sidr-nav-arrow' ).length < 1 ) $( this ).prepend( '<em class="sidr-nav-arrow">+</em>' );
						$( this ).find( 'ul ul' ).addClass( 'sidr-class-sub-sub' );
						$( this ).find( ' > a' ).attr( 'href', 'javascript:void(0)' );
					}
				} );		

			};
			
			//Detect user scroll down or scroll up		
			var lastScrollTop = 0,
			    delta         = 5;
    
			$window.on( 'scroll', function() {
				
				// Show Toolbar when viewing site
				if ( $window.scrollTop() >= 46 ) {	
					$( '.admin-bar .menu-toggle' ).addClass( 'spy-scroll-postion' );
				}else{
					$( '.admin-bar .menu-toggle' ).removeClass( 'spy-scroll-postion' );
				};
		
				
				//---
				if ( $window.scrollTop() > 120 ) {	
					$( '.menu-container' ).addClass( 'spy-scroll-fixed' );
				}else{
					$( '.menu-container' ).removeClass( 'spy-scroll-fixed' );
				};
				
				//---
				var nowScrollTop = $(this).scrollTop();
				if ( Math.abs(lastScrollTop - nowScrollTop) >= delta ) {
					if ( nowScrollTop > lastScrollTop ) {
						// SCROLLING DOWN 
					} else {
						// SCROLLING UP 
						
					};
					lastScrollTop = nowScrollTop;
				};

				
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
        pageLoaded : pageLoaded        
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );

