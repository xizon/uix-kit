
/*! 
 *************************************
 * Mobile Menu with Sidr
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
			var $window      = $( window ),
				windowWidth  = $window.width(),
				windowHeight = $window.height();
	
			
			
			// Mobile Menu
			if ( $( '.brand img' ).length > 0 ) {
				$( '.mobile-brand' ).html( '<img src="'+$( '.brand img' ).attr( 'src' )+'" alt="">' );
			} else {
				$( '.mobile-brand' ).html( '<img src=" ' + templateUrl + '/assets/images/blank.gif" alt="">' );
			}
			
			
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
			}
		
			
			function sidrmenuInit() {
	
				$( '.sidr-class-menu-main > li' ).each( function() {
					if ( $( this ).find( 'ul' ).length > 0 ) {
						if ( $( this ).find( '.sidr-nav-arrow' ).length < 1 ) $( this ).prepend( '<em class="sidr-nav-arrow">+</em>' );
						$( this ).find( 'ul ul' ).addClass( 'sidr-class-sub-sub' );
						$( this ).find( ' > a' ).attr( 'href', 'javascript:void(0);' );
					}
				} );		

			}
			
		
		
	};
	
		
    theme.mobileMenu = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );

