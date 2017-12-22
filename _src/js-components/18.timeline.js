
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
				

		//--------  Timeline initialize
		if ( windowWidth > 768 ) {
		    timelineInit();
		}
		
		$window.on('resize', function() {
			windowWidth  = $window.width();
			if ( windowWidth > 768 ) {
				timelineInit();
			} else {
				$( '.list-timeline-container-outer.horizontal' ).off( 'mousewheel' );
				$timeline.css( 'width', 'auto' );
			}
			

		});
		
		function timelineInit() {
			// Horizontal
			var totalWidth = 0;

			$item.each( function( index )  {
				totalWidth = totalWidth + $( this ).outerWidth();

			});

			$timeline.css( 'width', totalWidth + 'px' );
			
			//Use the wheel to control the timeline
			/*
			$( '.list-timeline-container-outer.horizontal' ).on( 'mousewheel', function( event, delta) {
				this.scrollLeft -= (delta * 10);
				event.preventDefault();
			});	
			*/
	
			
		}
		
		
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
				tNavW   = tNav.width(),
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
			obj.find( '.list-timeline-container-outer.horizontal' ).animate({scrollLeft: tarIndex * tNavW }, 300 );	
		}


		function timelineNext( obj ) {
			var	itemTotal = obj.find( '.list-timeline-item' ).length,
				tNav    = obj.find( '.list-timeline-item' ),
				tNavW   = tNav.width(),
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
			obj.find( '.list-timeline-container-outer.horizontal' ).animate({scrollLeft: tarIndex * tNavW }, 300 );	
		}




    };

    theme.timeline = {
        pageLoaded : pageLoaded        
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );
