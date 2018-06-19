
/* 
 *************************************
 * <!-- Advanced Content Slider -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.ADVANCED_CONTENT_SLIDER               = APP.ADVANCED_CONTENT_SLIDER || {};
	APP.ADVANCED_CONTENT_SLIDER.version       = '0.0.2';
    APP.ADVANCED_CONTENT_SLIDER.documentReady = function( $ ) {

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
					dataDraggable              = $this.data( 'draggable' ),
					dataDraggableCursor        = $this.data( 'draggable-cursor' ),
					dataControlsPaginationAuto = false;

				
				

				if ( typeof dataControlsPagination === typeof undefined ) dataControlsPagination = '.custom-advanced-content-slider-sp-pagination';
				if ( typeof dataControlsArrows === typeof undefined ) dataControlsArrows = '.custom-advanced-content-slider-sp-arrows';
				if ( typeof dataDraggable === typeof undefined ) dataDraggable = false;
				if ( typeof dataDraggableCursor === typeof undefined ) dataDraggableCursor = 'move';
				
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
					$( dataControlsPagination ).find( 'li' ).first().addClass( 'active' );
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
				
				
				//Drag and Drop
				//-------------------------------------	
				var $dragDropTrigger = $items;

				//Make the cursor a move icon when a user hovers over an item
				if ( dataDraggable && dataDraggableCursor != '' && dataDraggableCursor != false ) $dragDropTrigger.css( 'cursor', dataDraggableCursor );
				


				//Mouse event
				$dragDropTrigger.on( 'mousedown.advancedContentSlider touchstart.advancedContentSlider', function( e ) {
					e.preventDefault();

					var touches = e.originalEvent.touches;
					
					$( this ).addClass( 'dragging' );
					$( this ).data( 'origin_offset_x', parseInt( $( this ).css( 'margin-left' ) ) );
					$( this ).data( 'origin_offset_y', parseInt( $( this ).css( 'margin-top' ) ) );
					
					
					if ( touches && touches.length ) {	
						$( this ).data( 'origin_mouse_x', parseInt( touches[0].pageX ) );
						$( this ).data( 'origin_mouse_y', parseInt( touches[0].pageY ) );

					} else {
						
						if ( dataDraggable ) {
							$( this ).data( 'origin_mouse_x', parseInt( e.pageX ) );
							$( this ).data( 'origin_mouse_y', parseInt( e.pageY ) );	
						}


					}
					
					$dragDropTrigger.on( 'mouseup.advancedContentSlider touchmove.advancedContentSlider', function( e ) {
						e.preventDefault();

						$( this ).removeClass( 'dragging' );
						var touches        = e.originalEvent.touches,
							origin_mouse_x = $( this ).data( 'origin_mouse_x' ),
							origin_mouse_y = $( this ).data( 'origin_mouse_y' );

						if ( touches && touches.length ) {

							var deltaX = origin_mouse_x - touches[0].pageX,
								deltaY = origin_mouse_y - touches[0].pageY;

							if ( deltaX >= 50) {
								//--- left
								sliderUpdates( parseFloat( $items.filter( '.active' ).index() ) + 1, $this, dataControlsArrows, dataControlsPagination );


							}
							if ( deltaX <= -50) {
								//--- right
								sliderUpdates( parseFloat( $items.filter( '.active' ).index() ) - 1, $this, dataControlsArrows, dataControlsPagination );


							}
							if ( deltaY >= 50) {
								//--- up


							}
							if ( deltaY <= -50) {
								//--- down

							}

							if ( Math.abs( deltaX ) >= 50 || Math.abs( deltaY ) >= 50 ) {
								$dragDropTrigger.off( 'touchmove.advancedContentSlider' );
							}	


						} else {
							
							if ( dataDraggable ) {
								//right
								if ( e.pageX > origin_mouse_x ) {
									sliderUpdates( parseFloat( $items.filter( '.active' ).index() ) - 1, $this, dataControlsArrows, dataControlsPagination );
								}

								//left
								if ( e.pageX < origin_mouse_x ) {
									sliderUpdates( parseFloat( $items.filter( '.active' ).index() ) + 1, $this, dataControlsArrows, dataControlsPagination );
								}

								//down
								if ( e.pageY > origin_mouse_y ) {

								}

								//up
								if ( e.pageY < origin_mouse_y ) {

								}	

								$dragDropTrigger.off( 'mouseup.advancedContentSlider' );
								
							}	
							
							
							
						}



					} );

					
					

				} );

			
				
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
				itemsTotal    = $items.length,
				$prev         = $( arrows ).find( '.prev' ),
				$next         = $( arrows ).find( '.next' ),
				$pagination   = $( pagination ).find( 'li a' );
				
			if ( elementIndex <= itemsTotal - 1 && elementIndex >= 0 ) {

				if ( elementIndex > parseFloat( itemsTotal - 1 ) ) elementIndex = parseFloat( itemsTotal - 1 );
				if ( elementIndex < 0 ) elementIndex = 0;
				
				$next.removeClass( 'disabled' );
				$prev.removeClass( 'disabled' );
				$pagination.removeClass( 'active' );
				$pagination.parent().removeClass( 'active' );

				if ( elementIndex == itemsTotal - 1 ) {
					$next.addClass( 'disabled' );
				}

				if ( elementIndex == 0 ) {
					$prev.addClass( 'disabled' );
				}

				

				$items.removeClass( 'active' );
				$items.eq( elementIndex ).addClass( 'active' );	
				$pagination.eq( elementIndex ).addClass( 'active' );
				$pagination.eq( elementIndex ).parent().addClass( 'active' );
				
				
				
				TweenMax.to( slider.children( '.inner' ), animDuration/1000, { 
					x: '-' + ( slider.width() * elementIndex ),
					onComplete  : function() {

					},
					ease: Power3.easeOut
				} );
				
	
			}
			

			
		}
		
		
    };

    APP.components.documentReady.push( APP.ADVANCED_CONTENT_SLIDER.documentReady );
    return APP;

}( APP, jQuery, window, document ) );


