
/* 
 *************************************
 *  <!-- Sticky Elements -->
 *************************************
 */

APP = ( function ( APP, $, window, document ) {
    'use strict';
	

    APP.STICKY_EL               = APP.STICKY_EL || {};
	APP.STICKY_EL.version       = '0.0.3';
    APP.STICKY_EL.pageLoaded    = function() {

		var $window      = $( window ),
			windowWidth  = window.innerWidth,
			windowHeight = window.innerHeight,
			topSpacing   = $( '.uix-header__container' ).outerHeight( true ) + 10;
		

		$window.on( 'scroll touchmove', function() {

			var scrollTop   = $window.scrollTop(),
				dynamicTop  = parseFloat( scrollTop + window.innerHeight );


			$( '.js-uix-sticky-el.active' ).each( function()  {
				var $el = $( this );

				if ( typeof $el.data( 'stop-trigger' ) != typeof undefined && $( $el.data( 'stop-trigger' ) ).length > 0 ) {
					
					

					var diff      = typeof $el.data( 'stop-trigger-diff' ) != typeof undefined && $el.data( 'stop-trigger-diff' ).length > 0 ? UixMath.evaluate( $el.data( 'stop-trigger-diff' ).replace(/\s/g, '').replace(/\%\h/g, windowHeight ).replace(/\%\w/g, windowWidth ) ) : 0,
						targetTop = $( $el.data( 'stop-trigger' ) ).offset().top - diff;
					
				
					//Detecting when user scrolls to bottom of div
					if ( dynamicTop >= targetTop ) {

							$el.css( {
								  'top'  : parseFloat( topSpacing - (dynamicTop - targetTop) ) + 'px'
							  } );	

					} else {

						if ( $el.length > 0 && $el.position().top < topSpacing ) {
							$el.css( {
								  'top'  : topSpacing + 'px'
							  } );	
						}

					}
				}	

			});
			
			

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
//				$( '.js-uix-sticky-el' ).removeClass( 'active' );
//			} else {
//				$( '.js-uix-sticky-el' ).addClass( 'active' );
//			}	
//
//
//		});


    
		
    };

    APP.components.pageLoaded.push( APP.STICKY_EL.pageLoaded );
    return APP;

}( APP, jQuery, window, document ) );




