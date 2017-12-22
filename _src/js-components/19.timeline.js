
/*! 
 *************************************
 * 19. Timeline
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var pageLoaded = function() {
		
		
		var $window          = $( window ),
			windowWidth      = $window.width(),
			windowHeight     = $window.height(),
			$timeline        = $( '.list-timeline-container-outer.horizontal > .list-timeline-container' ),
			$item            = $timeline.find( '.list-timeline-item' );
				

		
		//--------  Timeline Event
		$( '.list-timeline-container-outer-wrapper.horizontal' ).each( function()  {
			
			
			var $this = $( this );
			
			$this.css( 'height', $this.height() - 17 + 'px' ); //Scrollbar width is 17px by default


			$this.find( '.timeline-prev' ).on( 'click', function( e ) {
				e.preventDefault();
				timelinePrev( $this );
				return false;
			});

			$this.find( '.timeline-next' ).on( 'click', function( e ) {
				e.preventDefault();
				timelineNext( $this );
				return false;
			});

			
		});
		
		
		function timelinePrev( obj ) {
			var	itemTotal = obj.find( '.list-timeline-item' ).length,
				tNav    = obj.find( '.list-timeline-item' ),
				tLoop   = false;
			
			
			
			var curIndex = obj.find( '.list-timeline-item.active' ).index(),
				tarIndex = ( curIndex >= 0  ) ? curIndex-1 : 0;

			//loop the items
			if ( tLoop ) {
				if ( tarIndex < 0 ) tarIndex = itemTotal-1;
			} else {
				if ( tarIndex < 0 ) tarIndex = 0;
			}
			
			
			tNav.removeClass( 'active' );
			obj.find( '.list-timeline-item:eq('+tarIndex+')' ).addClass( 'active' );

			//scroll left
			var tNavW = 0;
			for ( var i = 0; i < tarIndex; i++ ) {
				tNavW += obj.find( '.list-timeline-item:eq('+i+')' ).width();
			}
	
			obj.find( '.list-timeline-container-outer.horizontal > .list-timeline-container' ).css({
				'margin-left' : -parseFloat( tNavW ) + 'px'
			});
			
			
		}


		function timelineNext( obj ) {
			var	itemTotal = obj.find( '.list-timeline-item' ).length,
				tNav    = obj.find( '.list-timeline-item' ),
				tLoop   = false;
			
			var curIndex = obj.find( '.list-timeline-item.active' ).index(),
				tarIndex = ( curIndex < itemTotal  ) ? curIndex+1 : itemTotal-1;

			//loop the items
			if ( tLoop ) {
				if ( tarIndex == itemTotal ) tarIndex = 0;
			} else {
				if ( tarIndex > itemTotal-1 ) tarIndex = itemTotal-1;
			}
			
			tNav.removeClass( 'active' );
			obj.find( '.list-timeline-item:eq('+tarIndex+')' ).addClass( 'active' );
			

			//scroll right
			var tNavW = 0;
			for ( var i = 0; i < tarIndex; i++ ) {
				tNavW += obj.find( '.list-timeline-item:eq('+i+')' ).width();
			}
	
			obj.find( '.list-timeline-container-outer.horizontal > .list-timeline-container' ).css({
				'margin-left' : -parseFloat( tNavW ) + 'px'
			});
			
			
		}




    };

    theme.timeline = {
        pageLoaded : pageLoaded        
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );
