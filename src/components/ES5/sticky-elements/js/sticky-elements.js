
/* 
 *************************************
 *  <!-- Sticky Elements -->
 *************************************
 */

APP = ( function ( APP, $, window, document ) {
    'use strict';
	

    APP.STICKY_EL               = APP.STICKY_EL || {};
	APP.STICKY_EL.version       = '0.0.4';
    APP.STICKY_EL.pageLoaded    = function() {

		var $window      = $( window ),
			windowWidth  = window.innerWidth,
			windowHeight = window.innerHeight,
			topSpacing   = ( windowWidth <= 768 ) ? 0 : $( '.uix-header__container' ).outerHeight( true ); //with margin
		
	
		
		
		//prepend a placeholder
		$( '.js-uix-sticky-el' ).each( function()  {

			var $el      = $( this ),
				elHeight = $el.outerHeight( true ), //with margin
				elClass  = $el.attr( 'class' ).replace( 'js-uix-sticky-el', ''),
				tempID   = 'sticky-' + UixGUID.create();

			$el.attr( 'data-sticky-id', tempID );
			
			if ( ! $el.hasClass( 'is-placeholder' ) ) {
				$( '<div class="'+elClass+' is-placeholder"></div>' )
					.css({
						'height': elHeight + 'px',
						'width' : '100%',
						'display': 'none',
						'visibility': 'hidden'
					})
				    .attr( 'data-sticky-id', tempID )
					.insertBefore( $el );
			}

			
		});

		
		
		//spy the scroll event
		$window.on( 'scroll touchmove', function() {

			var scrollTop   = $window.scrollTop(),
				dynamicTop  = parseFloat( scrollTop + window.innerHeight );


			$( '.js-uix-sticky-el.active' ).each( function()  {
				var $el      = $( this );

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


			var $this    = $( this.element ),
				oWIdth   = $this.width(),
				clsID    = $this.data( 'sticky-id' ),
				$ph      = $( '[data-sticky-id="'+clsID+'"].is-placeholder' );


			  $this
				  .toggleClass( 'active', direction === 'down' )
				  .css( {
					  'width': oWIdth + 'px',
					  'top'  : topSpacing + 'px'
				  } );
			  
			  if ( $this.hasClass( 'active' ) ) {
				  $ph.css( 'display', 'block' );
			  } else {
				  $ph.css( 'display', 'none' );
			  }



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




