/* 
 *************************************
 * <!-- Periodical Scroll -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.PERIODICAL_SCROLL               = APP.PERIODICAL_SCROLL || {};
	APP.PERIODICAL_SCROLL.version       = '0.0.2';
    APP.PERIODICAL_SCROLL.documentReady = function( $ ) {

		$( '[data-periodical-scroll-container]' ).each( function() {

			var $this       = $( this ),
				ul          = $this.data( 'periodical-scroll-container' ),
				speed       = $this.data( 'periodical-scroll-speed' ),
				timing      = $this.data( 'periodical-scroll-timing' ),
				$wrap       = $this.find( ul ),
				itemHeight  = $wrap.find( 'li:first' ).height();


			if ( typeof speed === typeof undefined ) {
				speed = 600;
			}

			if ( typeof timing === typeof undefined ) {
				timing = 2000;
			}	
			
			var $item     = $wrap.find( '> li' ),
				moveY     = itemHeight*2,
				timeline  = new TimelineMax({
				onComplete: function() {
					setTimeout( function() {
						timeline.restart();
					}, timing );
					
				}
			});

			TweenLite.defaultEase = Circ.easeInOut;

			timeline
					.add( TweenMax.staggerFromTo( $item, speed/1000, {
						opacity : 0,
						y       : moveY
					},
					{
						opacity : 1,
						y       : 0,
					}, timing/1000 ))
			
					.add( TweenMax.staggerTo( $item, speed/1000, {
						delay    : timing/1000,
						opacity  : 0,
						y        : -moveY,
					}, timing/1000 ), 0 );
			

			
			$wrap.on( 'mouseenter', function() { 
				timeline.pause();
			} )
		    .on( 'mouseleave', function() { 
				timeline.play();
			} );
			

			
		});
		
    };

    APP.components.documentReady.push( APP.PERIODICAL_SCROLL.documentReady );
    return APP;

}( APP, jQuery, window, document ) );


