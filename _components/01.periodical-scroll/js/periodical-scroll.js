/* 
 *************************************
 * <!-- Periodical Scroll -->
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {
	
		$( '[data-periodical-scroll-container]' ).each(function() {

			var $this       = $( this ),
				ul          = $this.data( 'periodical-scroll-container' ),
				speed       = $this.data( 'periodical-scroll-speed' ),
				timing      = $this.data( 'periodical-scroll-timing' ),
				$wrap       = $this.find( ul ),
				itemHeight  = $wrap.find( 'li:first' ).height();


			if( typeof speed === typeof undefined ) {
				speed = 600;
			}

			if( typeof timing === typeof undefined ) {
				timing = 2000;
			}	
			
			//Initialize the container height
			$wrap.css({
				'height'   : itemHeight + 'px',
				'overflow' : 'hidden'
			});
			
			
			
			var stop      = false,
				obj       = $wrap;

			// change item
			setInterval( periodicalTextChange, timing );

			function periodicalTextChange() {
				
				if ( stop ) return;

				var itemToMove = obj[0].firstElementChild;
				itemToMove.style.marginTop = -itemHeight + 'px';
			  
				// move the child to the end of the items' list
				setTimeout( function() {
					itemToMove.removeAttribute( 'style' );
					obj[0].appendChild( itemToMove );
				}, speed );
			}

			obj.on( 'mouseenter', function() { stop = true; } )
			   .on( 'mouseleave', function() { stop = false; } );		

			
			
		});
	
		
		
    };

    theme.periodicalScroll = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );

