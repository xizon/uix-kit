

/*! 
 *************************************
 * Sticky Elements 
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var pageLoaded = function() {
		
		var $window      = $( window ),
			windowWidth  = $window.width(),
			windowHeight = $window.height(),
			topSpacing   = $( '.header-area' ).outerHeight( true ) + 10;
		
		
		$window.on( 'scroll touchmove', function() {

			var scrollTop   = $window.scrollTop(),
				dynamicTop  = parseFloat( scrollTop + $window.height() ),
				targetTop   = parseFloat( $( document ).height() - 200 );

			//Detecting when user scrolls to bottom of div
			if ( dynamicTop >= targetTop ) {
				
				
				$( '.stick-widget.sticky' )
					  .css( {
						  'top'  : parseFloat( topSpacing - (dynamicTop - targetTop) ) + 'px'
					  } );
				
			}


		});	

		var	waypoints = $( '.stick-widget' ).waypoint({

		  handler: function( direction ) {


			var $this      = $( this.element ),
				oWIdth     = $this.width();


			  $this
				  .toggleClass( 'sticky', direction === 'down' )
				  .css( {
					  'width': oWIdth + 'px',
					  'top'  : topSpacing + 'px'
				  } );



		  },

		  offset: topSpacing

		});	

		
    };

    theme.stickyElements = {
        pageLoaded : pageLoaded        
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );



