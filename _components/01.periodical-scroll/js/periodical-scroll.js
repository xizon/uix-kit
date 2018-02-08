/*! 
 *************************************
 * Periodical Scroll
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {
	
		$( '[data-periodical-scroll-container]' ).each(function() {

			var $this       = $( this ),
				ul          = $this.data( 'periodical-scroll-container' ),
				speed       = $this.data( 'periodical-scroll-speed' ),
				timing      = $this.data( 'periodical-scroll-timing' );


			if( typeof speed === typeof undefined ) {
				speed = 600;
			}

			if( typeof timing === typeof undefined ) {
				timing = 2000;
			}	
			
			var $wrap  = $this.find( ul ),
				time   = timing,
				speed  = speed,
				moveEv = null;
			
			//Initialize the container height
			$wrap.css({
				'height'   : $wrap.find( 'li:first' ).height() + 'px',
				'overflow' : 'hidden'
			});
			
 
			//Animation
			$wrap.on( 'mouseenter', function() {

				clearInterval( moveEv );

			} ).on( 'mouseleave' , function() {
				moveEv=setInterval(function(){
					var $item     = $wrap.find( 'li:first' ),
						curHeight = $item.height(); 

					$item.animate({marginTop: -curHeight + 'px' }, speed, function(){
						$item.css('marginTop',0).appendTo( $wrap );
					});

				}, time );
			} ).trigger('mouseleave');
			
			
		});
	
		
		
    };

    theme.periodicalScroll = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );

