
/* 
 *************************************
 * <!-- Advanced Content Slider -->
 *************************************
 */
App = ( function ( App, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
		
	
		var $window                   = $( window ),
			windowWidth               = $window.width(),
			windowHeight              = $window.height(),
			animDuration              = 1200;
		
		
		
		sliderInit();
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( $window.width() != windowWidth ) {

				// Update the window width for next time
				windowWidth = $window.width();

				sliderInit();
				
			}
		});
		
		
		/*
		 * Initialize slideshow
		 *
		 * @return {void}                   - The constructor.
		 */
        function sliderInit() {
			
			$( '.custom-advanced-content-slider' ).each( function() {
				var $this                      = $( this ),
					$items                     = $this.find( '.item' ),
					$itemsWrapper              = $this.children( '.inner' ),
					$first                     = $items.first(),
					itemWidth                  = $this.width(),
					itemsTotal                 = $items.length,
					totalWidth                 = itemWidth*itemsTotal,
					dataControlsPagination     = $this.data( 'controls-pagination' ),
					dataControlsArrows         = $this.data( 'controls-arrows' ),
					dataControlsPaginationAuto = false;


				if ( typeof dataControlsPagination === typeof undefined ) dataControlsPagination = '.custom-advanced-content-slider-sp-pagination';
				if ( typeof dataControlsArrows === typeof undefined ) dataControlsArrows = '.custom-advanced-content-slider-sp-arrows';
				
				if ( $( dataControlsPagination ).html().length == 0 ) dataControlsPaginationAuto = true;

				

				//Initialize the width of each item
				//-------------------------------------		
				$first.addClass( 'active' );
				
				$items.css( 'width', itemWidth + 'px' );
				
				TweenMax.set( $itemsWrapper, { 
					width: totalWidth,
					onComplete  : function() {
						$this.css( 'height', 'auto' );
					}
				} );		
			

				//Pagination dots 
				//-------------------------------------	
				if ( dataControlsPaginationAuto ) {
					var _dot       = '',
						_dotActive = '';
					_dot += '<ul class="default">';
					for ( var i = 0; i < itemsTotal; i++ ) {

						_dotActive = ( i == 0 ) ? 'class="active"' : '';

						_dot += '<li><a '+_dotActive+' data-index="'+i+'" href="javascript:"></a></li>';
					}
					_dot += '</ul>';

					if ( $( dataControlsPagination ).html() == '' ) $( dataControlsPagination ).html( _dot );	
				} else {
					$( dataControlsPagination ).find( 'li' ).first().find( 'a' ).addClass( 'active' );
				}


				$( dataControlsPagination ).find( 'li a' ).on( 'click', function( e ) {
					e.preventDefault();

					if ( !$( this ).hasClass( 'active' ) ) {
						
						sliderUpdates( $( this ).attr( 'data-index' ), $this, dataControlsArrows, dataControlsPagination );
					}



				});

				
				//Next/Prev buttons
				//-------------------------------------		
				var _prev = $( dataControlsArrows ).find( '.prev' ),
					_next = $( dataControlsArrows ).find( '.next' );
				
				

				$( dataControlsArrows ).find( 'a' ).attr( 'href', 'javascript:' );
				
				_prev.addClass( 'disabled' );

				_prev.on( 'click', function( e ) {
					e.preventDefault();

					sliderUpdates( parseFloat( $items.filter( '.active' ).index() ) - 1, $this, dataControlsArrows, dataControlsPagination );

				});

				_next.on( 'click', function( e ) {
					e.preventDefault();

					sliderUpdates( parseFloat( $items.filter( '.active' ).index() ) + 1, $this, dataControlsArrows, dataControlsPagination );

				});

				
			});	
			
		}
		
		/*
		 * Transition Between Slides
		 *
		 * @param  {number} elementIndex     - Index of current slider.
		 * @param  {object} slider           - Selector of the slider .
		 * @param  {string} arrows           - Controller name of prev/next buttons.
		 * @param  {string} pagination       - Controller name of pagination buttons.
		 * @return {void}                    - The constructor.
		 */
        function sliderUpdates( elementIndex, slider, arrows, pagination ) {
			
			var $items        = slider.find( '.item' ),
				$current      = $items.eq( elementIndex ),
				itemsTotal    = $items.length,
				$prev         = $( arrows ).find( '.prev' ),
				$next         = $( arrows ).find( '.next' ),
				$pagination   = $( pagination ).find( 'li a' );
				
			$next.removeClass( 'disabled' );
			$prev.removeClass( 'disabled' );
			$pagination.removeClass( 'active' );
			
			if ( elementIndex == itemsTotal - 1 ) {
				$next.addClass( 'disabled' );
			}
			
			if ( elementIndex == 0 ) {
				$prev.addClass( 'disabled' );
			}
			
			$pagination.eq( elementIndex ).addClass( 'active' );
			
			
			if ( elementIndex <= itemsTotal - 1 && elementIndex >= 0 ) {

				$items.removeClass( 'active' );
				$current.addClass( 'active' );	
				
				
				TweenMax.to( slider.children( '.inner' ), animDuration/1000, { 
					x: '-' + ( slider.width() * elementIndex ),
					onComplete  : function() {

					},
					ease: Power3.easeOut
				} );
				
	
			}
			

			
		}
		
		
	};
	
		
    App.advancedContentSlider = {
        documentReady : documentReady        
    };

    App.components.documentReady.push( documentReady );
    return App;

}( App, jQuery, window, document ) );
