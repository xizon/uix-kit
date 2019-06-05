
/* 
 *************************************
 *  <!-- Sticky Elements -->
 *************************************
 */

APP = ( function ( APP, $, window, document ) {
    'use strict';
	

    APP.STICKY_EL               = APP.STICKY_EL || {};
	APP.STICKY_EL.version       = '0.0.5';
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
		
		//  Initialize
		stickyInit( windowWidth, windowHeight );
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( window.innerWidth != windowWidth ) {

				// Update the window width for next time
				windowWidth  = window.innerWidth;
				windowHeight = window.innerHeight;

				// Do stuff here
				stickyInit( windowWidth, windowHeight );
		

			}
		});
		
		
	
		/*
		 * Initialize Sticky Elements settings
		 *
		 * @param  {Number} w         - Returns width of browser viewport
		 * @param  {Number} h         - Returns height of browser viewport
		 * @return {Void}
		 */
		function stickyInit( w, h ) {
			
			$window.off( 'scroll.STICKY_EL touchmove.STICKY_EL' );

			
			if ( w > 768 ) {
				
				$( '.js-uix-sticky-el' ).each( function()  {
					var $el      = $( this ),
						elTop    = $el.offset().top,
						oWidth   = $el.width(),
						clsID    = $el.data( 'sticky-id' ),
						$ph      = $( '[data-sticky-id="'+clsID+'"].is-placeholder' );
					
					
					
					//spy the scroll event
					$window.on( 'scroll.STICKY_EL touchmove.STICKY_EL', function() {

						var scrollTop   = $window.scrollTop(),
							dynamicTop  = parseFloat( scrollTop + window.innerHeight );


						//------
						if ( parseFloat( scrollTop + topSpacing ) > elTop ) {
						  $el
							  .addClass( 'is-active' )
							  .css( {
								  'width': oWidth + 'px',
								  'top'  : topSpacing + 'px'
							  } );
						   $ph.css( 'display', 'block' );

						} else {
						  $el
							  .removeClass( 'is-active' )
							  .css( {
								  'top'  : 0
							  } );	
						  $ph.css( 'display', 'none' );
						}



						//------
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


					});//endif scroll.STICKY_EL touchmove.STICKY_EL
					
					

				});//endif $( '.js-uix-sticky-el' )

				
				
			} else {
				$( '.js-uix-sticky-el' ).removeClass( 'is-active' );
				$( '[data-sticky-id].is-placeholder' ).css( 'display', 'none' );
				
			}// endif w > 768
			
			
		}
		
		
		


		
    };

    APP.components.pageLoaded.push( APP.STICKY_EL.pageLoaded );
    return APP;

}( APP, jQuery, window, document ) );




