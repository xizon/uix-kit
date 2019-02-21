

/* 
 *************************************
 *  <!-- Sticky Elements -->
 *************************************
 */

APP = ( function ( APP, $, window, document ) {
    'use strict';
	
	

    APP.STICKY_EL               = APP.STICKY_EL || {};
	APP.STICKY_EL.version       = '0.0.2';
    APP.STICKY_EL.pageLoaded    = function() {

		var $window      = $( window ),
			windowWidth  = window.innerWidth,
			windowHeight = window.innerHeight,
			topSpacing   = $( '.uix-header__container' ).outerHeight( true ) + 10;
		
		
		$window.on( 'scroll touchmove', function() {

			var scrollTop   = $window.scrollTop(),
				dynamicTop  = parseFloat( scrollTop + window.innerHeight ),
				targetTop   = parseFloat( $( document ).height() - 200 );

		
			//Detecting when user scrolls to bottom of div
			if ( dynamicTop >= targetTop ) {
				
					$( '.js-uix-sticky-el.active' )
						  .css( {
							  'top'  : parseFloat( topSpacing - (dynamicTop - targetTop) ) + 'px'
						  } );	
				
			} else {
				
				if ( $( '.js-uix-sticky-el.active' ).length > 0 && $( '.js-uix-sticky-el.active' ).position().top < topSpacing ) {
					$( '.js-uix-sticky-el.active' )
						  .css( {
							  'top'  : topSpacing + 'px'
						  } );	
				}
				
			}


		});	

		var	waypoints = $( '.js-uix-sticky-el' ).waypoint({

		  handler: function( direction ) {


			var $this      = $( this.element ),
				oWIdth     = $this.width();


			  $this
				  .toggleClass( 'active', direction === 'down' )
				  .css( {
					  'width': oWIdth + 'px',
					  'top'  : topSpacing + 'px'
				  } );



		  },

		  offset: topSpacing

		});	
		
	
			
//		var	navMinTop    = $( '.js-uix-sticky-el' ).offset().top + window.innerHeight/3,
//			navMaxTop    = parseFloat( $( document ).height() - $( '.uix-footer__container' ).height() ) - window.innerHeight/3;
//
//
//		$( window ).on( 'scroll touchmove', function() {
//			var scrollTop = $( this ).scrollTop(),
//				spyTop    = parseFloat( scrollTop + window.innerHeight/2 );
//
//			//Detecting when user scrolls to bottom of div
//			if ( spyTop > navMaxTop || spyTop < navMinTop ) {
//				$( '.js-uix-sticky-el' ).removeClass( 'act' );
//			} else {
//				$( '.js-uix-sticky-el' ).addClass( 'act' );
//			}	
//
//
//		});


    
		
    };

    APP.components.pageLoaded.push( APP.STICKY_EL.pageLoaded );
    return APP;

}( APP, jQuery, window, document ) );




