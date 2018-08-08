/* 
 *************************************
 * <!-- Multiple Items Carousel -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.MULTI_ITEMS_CAROUSEL               = APP.MULTI_ITEMS_CAROUSEL || {};
	APP.MULTI_ITEMS_CAROUSEL.version       = '0.0.3';
    APP.MULTI_ITEMS_CAROUSEL.documentReady = function( $ ) {

		$( '.uix-multi-carousel' ).each( function()  {

			var $carouselWrapper        = $( this ),
				goSteps                 = 0,
				$carousel               = $carouselWrapper.find( '.uix-multi-carousel__items' ),
				$carouselItem           = $carouselWrapper.find( '.uix-multi-carousel__items > div' ),
				itemTotal               = $carouselItem.length,
				amountVisible           = $carouselWrapper.data( 'cus-carousel-show' ),
				carouselItemWidth       = null,
				carouselItemHeight      = null,
				carouselDir             = $carouselWrapper.data( 'cus-carousel-dir' ),
				carouselLoop            = $carouselWrapper.data( 'cus-carousel-loop' ),
				carouselSpeed           = $carouselWrapper.data( 'cus-carousel-speed' ),
				carouselNext            = $carouselWrapper.data( 'cus-carousel-next' ),
				carouselPrev            = $carouselWrapper.data( 'cus-carousel-prev' ),
				carouselPaging          = $carouselWrapper.data( 'cus-carousel-paging' ),
				carouseDraggable        = $carouselWrapper.data( 'cus-carousel-draggable' ),
				carouseDraggableCursor  = $carouselWrapper.data( 'cus-carousel-draggable-cursor' );

			
			
			if( typeof carouselDir === typeof undefined ) carouselDir = 'horizontal';
			if( typeof carouselLoop === typeof undefined ) carouselLoop = false;
			if( typeof amountVisible === typeof undefined ) amountVisible = 3;
			if( typeof carouselSpeed === typeof undefined ) carouselSpeed = 250;
			if( typeof carouselNext === typeof undefined ) carouselNext = '.uix-multi-carousel__controls--next';
			if( typeof carouselPrev === typeof undefined ) carouselPrev = '.uix-multi-carousel__controls--prev';
			if ( typeof carouseDraggable === typeof undefined ) carouseDraggable = false;
			if ( typeof carouseDraggableCursor === typeof undefined ) carouseDraggableCursor = 'move';

			
			
			if ( $( window ).width() <= 768 ) amountVisible = 3;

			
			carouselItemWidth  = $carousel.width()/amountVisible;
			carouselItemHeight = $carousel.height()/amountVisible;

			
			/* 
			 ---------------------------
			 Get the number of steps to the last visible element
			 ---------------------------
			 */ 
			var lastSteps = parseFloat( itemTotal - amountVisible );
			 


			/* 
			 ---------------------------
			 Initialize carousel
			 ---------------------------
			 */  
			var newWidth, newHeight;
			if ( carouselDir == 'horizontal' ) { 
				newWidth = ( $carouselWrapper.width() / amountVisible );
				$carousel.css( 'width', itemTotal * carouselItemWidth );
			} else {
				newHeight = ( $carouselWrapper.height() / amountVisible );
				$carousel.css( 'height', itemTotal * carouselItemHeight );
			}


			// Re-order all items
			carouselReOrder();



			//default button status
			if ( $carouselItem.first().data( 'id' ) == 1 && !carouselLoop ) {
				$( carouselPrev ).addClass( 'disabled' );
			}	

			/* 
			 ---------------------------
			 Re-order all items
			 ---------------------------
			 */ 
			
			function carouselReOrder() {
				
				//Active the center item
				carouselActiveCenterItem( $carouselItem, 'default', null );
				
				$carouselItem.each( function( index ) {
				

						if ( carouselDir == 'horizontal' ) {
							$( this )
								.width( newWidth + 'px' )
								.css( 'visibility', 'visible' )
								.attr( 'data-id', index+1 );
						} else {
							$( this )
								.height( newHeight + 'px' )
								.css( 'visibility', 'visible' )
								.attr( 'data-id', index+1 );
						}

					});	
			}
			
			/* 
			 ---------------------------
			 Active the center item
			 ---------------------------
			 */ 
			
			function carouselActiveCenterItem( el, dir, steps ) {
				var curItemIndex    = (amountVisible/2).toFixed(0),
					centerItemIndex = Math.floor(amountVisible / 2)-1;		
				el.removeClass( 'active active-prev active-next' );
				
				
			
				if ( dir == 'default' ) {
					el.eq( parseFloat( curItemIndex - 1 ) ).addClass( 'active' );		
				} else {
					el.eq( parseFloat( steps + centerItemIndex + 1 ) ).addClass( 'active' );	
				}
				
				//Add nearest classes for 3 elements
				el.each( function() {
					if ( $( this ).hasClass( 'active' ) ) {
						$( this ).prev().addClass( 'active-prev' );
						$( this ).next().addClass( 'active-next' );
						
						return false;
					}
				});	
				
				
				
			}	
			


			
			
			/* 
			 ---------------------------
			 Move left/up
			 ---------------------------
			 */ 
			$( carouselNext ).on( 'click', $carouselWrapper, function( e ) {
				e.preventDefault();
				
				
				var $btn        = $( this ),
					$curWrapper = $( e.data[0] ),
					//Protection button is not triggered multiple times.
					btnLock     = $btn.data( 'click' );
				
				
				if ( typeof btnLock === typeof undefined || btnLock === 0 ) {
					
					goSteps++;
				
					//Loop items
					if ( carouselLoop ) {
						if ( goSteps > lastSteps ) goSteps = 0;
					} else {
						if ( goSteps > lastSteps ) goSteps = lastSteps;
					}
					
					itemUpdates( $curWrapper, $btn, carouselNext, carouselPrev, goSteps );

				}


			});

			
			/* 
			 ---------------------------
			 Move right/down
			 ---------------------------
			 */ 
			$( carouselPrev ).on( 'click', $carouselWrapper, function( e ) {
				e.preventDefault();

				var $btn        = $( this ),
					$curWrapper = $( e.data[0] ),
					//Protection button is not triggered multiple times.
					btnLock     = $btn.data( 'click' );
				
				
				if ( typeof btnLock === typeof undefined || btnLock === 0 ) {
					
					goSteps--;
				
					//Loop items
					if ( carouselLoop ) {
						if ( goSteps < 0 ) goSteps = lastSteps;
					} else {
						if ( goSteps < 0 ) goSteps = 0;
					}
					
					itemUpdates( $curWrapper, $btn, carouselNext, carouselPrev, goSteps );

				

				}


			});
			
			
			//Drag and Drop
			//-------------------------------------	
			var $dragDropTrigger = $carouselItem;

			//Make the cursor a move icon when a user hovers over an item
			if ( carouseDraggable && carouseDraggableCursor != '' && carouseDraggableCursor != false ) $dragDropTrigger.css( 'cursor', carouseDraggableCursor );



			//Mouse event
			$dragDropTrigger.on( 'mousedown.MULTI_ITEMS_CAROUSEL touchstart.MULTI_ITEMS_CAROUSEL', function( e ) {
				e.preventDefault();

				var touches = e.originalEvent.touches;

				$( this ).addClass( 'dragging' );
				$( this ).data( 'origin_offset_x', parseInt( $( this ).css( 'margin-left' ) ) );
				$( this ).data( 'origin_offset_y', parseInt( $( this ).css( 'margin-top' ) ) );


				if ( touches && touches.length ) {	
					$( this ).data( 'origin_mouse_x', parseInt( touches[0].pageX ) );
					$( this ).data( 'origin_mouse_y', parseInt( touches[0].pageY ) );

				} else {

					if ( carouseDraggable ) {
						$( this ).data( 'origin_mouse_x', parseInt( e.pageX ) );
						$( this ).data( 'origin_mouse_y', parseInt( e.pageY ) );	
					}


				}

				$dragDropTrigger.on( 'mouseup.MULTI_ITEMS_CAROUSEL touchmove.MULTI_ITEMS_CAROUSEL', function( e ) {
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

							goSteps++;

							//Loop items
							if ( carouselLoop ) {
								if ( goSteps > lastSteps ) goSteps = 0;
							} else {
								if ( goSteps > lastSteps ) goSteps = lastSteps;
							}

							itemUpdates( $carouselWrapper, false, carouselNext, carouselPrev, goSteps );


						}
						if ( deltaX <= -50) {
							//--- right

							goSteps--;

							//Loop items
							if ( carouselLoop ) {
								if ( goSteps < 0 ) goSteps = lastSteps;
							} else {
								if ( goSteps < 0 ) goSteps = 0;
							}

							itemUpdates( $carouselWrapper, false, carouselNext, carouselPrev, goSteps );

						}
						if ( deltaY >= 50) {
							//--- up


						}
						if ( deltaY <= -50) {
							//--- down

						}

						if ( Math.abs( deltaX ) >= 50 || Math.abs( deltaY ) >= 50 ) {
							$dragDropTrigger.off( 'touchmove.MULTI_ITEMS_CAROUSEL' );
						}	


					} else {

						if ( carouseDraggable ) {
							//right
							if ( e.pageX > origin_mouse_x ) {


								goSteps--;

								//Loop items
								if ( carouselLoop ) {
									if ( goSteps < 0 ) goSteps = lastSteps;
								} else {
									if ( goSteps < 0 ) goSteps = 0;
								}

								itemUpdates( $carouselWrapper, false, carouselNext, carouselPrev, goSteps );	

							}

							//left
							if ( e.pageX < origin_mouse_x ) {

								goSteps++;

								//Loop items
								if ( carouselLoop ) {
									if ( goSteps > lastSteps ) goSteps = 0;
								} else {
									if ( goSteps > lastSteps ) goSteps = lastSteps;
								}

								itemUpdates( $carouselWrapper, false, carouselNext, carouselPrev, goSteps );		

							}

							//down
							if ( e.pageY > origin_mouse_y ) {

							}

							//up
							if ( e.pageY < origin_mouse_y ) {

							}	

							$dragDropTrigger.off( 'mouseup.MULTI_ITEMS_CAROUSEL' );

						}	



					}



				} );


			} );
			
			
			/*
			 * Transition Between Items
			 *
			 * @param  {object} wrapper         - Wrapper of carousel.
			 * @param  {object} curBtn          - The button that currently triggers the move.
			 * @param  {string} nextBtnStr      - The button ID or class that triggers the next move.
			 * @param  {string} prevBtnStr      - The button ID or class that triggers the previous move.
			 * @param  {number} steps           - The number of steps per move.
			 * @return {void}                   - The constructor.
			 */
			function itemUpdates( wrapper, curBtn, nextBtnStr, prevBtnStr, steps ) {

		
				var $curWrapper = wrapper.children( '.uix-multi-carousel__items' ),  //Default: $carousel
					$curItems   = $curWrapper.find( '> div' ), //Default: $carouselItem
					isEnd       = false,
					isFirst     = false,
					isMid       = false;
		
				//Reset prevents code from duplicate run
				var preventEvent = function() {
					if ( curBtn ) curBtn.data( 'click', 0 );
				};
				
				
				//Determine if the element is at the end or beginning
				if ( steps == lastSteps ) isEnd = true;
				if ( steps == 0 ) isFirst = true;
				if ( steps < lastSteps && steps > 0 ) isMid = true;
				
				
				//The state of the control button
				if ( !carouselLoop ) {
					
					if ( isEnd ) $( nextBtnStr ).addClass( 'disabled' );
					if ( isFirst ) $( prevBtnStr ).addClass( 'disabled' );
					
					if ( isMid ) {
						$( nextBtnStr ).removeClass( 'disabled' );
						$( prevBtnStr ).removeClass( 'disabled' );
					}
					
					
				}
				


				//Avoid button repeated trigger
				if ( curBtn ) curBtn.data( 'click', 1 );


				//Clone the first element to the last position
				if ( carouselDir == 'horizontal' ) {

					TweenMax.to( $curWrapper, carouselSpeed/1000, {
						x          : '-' + carouselItemWidth*steps,
						onComplete : function() {

							//Active the center item
							carouselActiveCenterItem( $curItems, 'move', steps );

							//Reset prevents code from duplicate run
							preventEvent();


						}
					});		



				} else {

					TweenMax.to( $curWrapper, carouselSpeed/1000, {
						y          : '-' + carouselItemHeight*steps,
						onComplete : function() {

							//Active the center item
							carouselActiveCenterItem( $curItems, 'move', steps );

							//Reset prevents code from duplicate run
							preventEvent();


						}
					});		


				}
				
				

					

			}
	
			
			
		



		});		
		
		
    };

    APP.components.documentReady.push( APP.MULTI_ITEMS_CAROUSEL.documentReady );
    return APP;

}( APP, jQuery, window, document ) );



//APP = ( function ( APP, $, window, document ) {
//    'use strict';
//	
//    APP.MULTI_ITEMS_CAROUSEL               = APP.MULTI_ITEMS_CAROUSEL || {};
//	  APP.MULTI_ITEMS_CAROUSEL.version       = '0.0.1';
//    APP.MULTI_ITEMS_CAROUSEL.documentReady = function( $ ) {
//
//		$( '.uix-multi-carousel' ).each( function()  {
//
//			var $carouselWrapper   = $( this ),
//				$carousel          = $carouselWrapper.find( '.uix-multi-carousel__items' ),
//				$carouselItem      = $carouselWrapper.find( '.uix-multi-carousel__items > div' ),
//				carouselItemTotal  = $carouselItem.length,
//				showcarouselItem   = $carouselWrapper.data( 'cus-carousel-show' ),
//				carouselItemWidth  = $carousel.width()/showcarouselItem,
//				carouselItemHeight = $carousel.height()/showcarouselItem,
//				carouselDir        = $carouselWrapper.data( 'cus-carousel-dir' ),
//				carouselLoop       = $carouselWrapper.data( 'cus-carousel-loop' ),
//				carouselSpeed      = $carouselWrapper.data( 'cus-carousel-speed' ),
//				carouselNext       = $carouselWrapper.data( 'cus-carousel-next' ),
//				carouselPrev       = $carouselWrapper.data( 'cus-carousel-prev' );
//
//			if( typeof carouselDir === typeof undefined ) {
//				carouselDir = 'horizontal';
//			}
//			
//			if( typeof carouselLoop === typeof undefined ) {
//				carouselLoop = false;
//			}
//			if( typeof showcarouselItem === typeof undefined ) {
//				showcarouselItem = 3;
//			}
//			if( typeof carouselSpeed === typeof undefined ) {
//				carouselSpeed = 250;
//			}
//			if( typeof carouselNext === typeof undefined ) {
//				carouselNext = '.uix-multi-carousel__controls--next';
//			}
//			if( typeof carouselPrev === typeof undefined ) {
//				carouselPrev = '.uix-multi-carousel__controls--prev';
//			}
//
//
//			
//			/* 
//			 ---------------------------
//			 Initialize carousel
//			 ---------------------------
//			 */  
//			var newWidth, newHeight;
//			if ( carouselDir == 'horizontal' ) { 
//				newWidth = ( $carouselWrapper.width() / showcarouselItem );
//				$carousel.css( 'width', carouselItemTotal * carouselItemWidth );
//			} else {
//				newHeight = ( $carouselWrapper.height() / showcarouselItem );
//				$carousel.css( 'height', carouselItemTotal * carouselItemHeight );
//			}
//
//
//			// Re-order all items
//			carouselReOrder();
//
//
//
//			//default button status
//			if ( $carouselItem.first().data( 'id' ) == 1 && !carouselLoop ) {
//				$( carouselPrev ).addClass( 'disabled' );
//			}	
//
//			/* 
//			 ---------------------------
//			 Re-order all items
//			 ---------------------------
//			 */ 
//			
//			function carouselReOrder() {
//				
//				//Active the center item
//				carouselActiveCenterItem( $carouselItem, 'default' );
//				
//				$carouselItem.each( function( index ) {
//				
//
//						if ( carouselDir == 'horizontal' ) {
//							$( this )
//								.width( newWidth + 'px' )
//								.css( 'visibility', 'visible' )
//								.attr( 'data-id', index+1 );
//						} else {
//							$( this )
//								.height( newHeight + 'px' )
//								.css( 'visibility', 'visible' )
//								.attr( 'data-id', index+1 );
//						}
//
//					});	
//			}
//			
//			/* 
//			 ---------------------------
//			 Active the center item
//			 ---------------------------
//			 */ 
//			
//			function carouselActiveCenterItem( el, dir ) {
//				var curItemIndex    = (showcarouselItem/2).toFixed(0),
//					centerItemIndex = Math.floor(showcarouselItem / 2)-1;		
//				el.removeClass( 'active active-prev active-next' );
//				
//				
//				
//				if ( dir == 'left' ) {
//					el.eq( curItemIndex ).addClass( 'active' );
//					
//				} else if ( dir == 'right' ) {
//					el.eq( centerItemIndex ).addClass( 'active' );	
//					
//				} else if ( dir == 'default' ) {
//					el.eq( curItemIndex - 1 ).addClass( 'active' );		
//				}
//				
//				//Add nearest classes for 3 elements
//				el.each( function() {
//					if ( $( this ).hasClass( 'active' ) ) {
//						$( this ).prev().addClass( 'active-prev' );
//						$( this ).next().addClass( 'active-next' );
//						
//						return false;
//					}
//				});	
//				
//				
//				
//			}	
//			
//
//			
//			
//			/* 
//			 ---------------------------
//			 Move left/up
//			 ---------------------------
//			 */ 
//			$( carouselNext ).on( 'click', $carouselWrapper, function( e ) {
//				e.preventDefault();
//				
//				
//				var $btn        = $( this ),
//					$curWrapper = $( e.data[0] ),
//					$curItems   = $curWrapper.children().find( '> div' ),
//					//Protection button is not triggered multiple times.
//					btnLock     = $btn.data( 'click' );
//				
//				if ( typeof btnLock === typeof undefined || btnLock === 0 ) {
//					moveNext( $curWrapper, $curItems, $btn, carouselNext, carouselPrev );
//				}
//
//
//			});
//
//			
//			/* 
//			 ---------------------------
//			 Move right/down
//			 ---------------------------
//			 */ 
//			$( carouselPrev ).on( 'click', $carouselWrapper, function( e ) {
//				e.preventDefault();
//
//				
//				var $btn        = $( this ),
//					$curWrapper = $( e.data[0] ),
//					$curItems   = $curWrapper.children().find( '> div' ),
//					//Protection button is not triggered multiple times.
//					btnLock     = $btn.data( 'click' );
//
//			
//				
//				if ( typeof btnLock === typeof undefined || btnLock === 0 ) {
//					movePrev( $curWrapper, $curItems, $btn, carouselNext, carouselPrev );
//				}
//				
//				
//
//			});
//			
//			
//			
//			/*
//			 * Transition between items next (left/up)
//			 *
//			 * @param  {object} wrapper         - Wrapper of carousel.
//			 * @param  {object} items           - Items of carousel.
//			 * @param  {object} curBtn          - The button that currently triggers the move.
//			 * @param  {string} nextBtnStr      - The button ID or class that triggers the next move.
//			 * @param  {string} prevBtnStr      - The button ID or class that triggers the previous move.
//			 * @return {void}                   - The constructor.
//			 */
//			function moveNext( wrapper, items, curBtn, nextBtnStr, prevBtnStr ) {
//
//		
//				var $curWrapper = wrapper,  //Default: $carousel
//					$curItems   = items,  //Default: $carouselItem
//					isEnd       = false,
//					$cloneItem  = null;
//					
//
//				//Move to the end
//				if ( (carouselItemTotal - showcarouselItem + 1) == $curItems.first().data( 'id' ) ) {
//					isEnd = true;
//				}
//				if ( (carouselItemTotal - showcarouselItem) == $curItems.first().data( 'id' ) && !carouselLoop ) {
//					if ( curBtn ) curBtn.addClass( 'disabled' );
//				}
//				
//				
//				//Loop items
//				if ( carouselLoop ) {
//					isEnd = false;
//				}
//				
//				//Reset prevents code from duplicate run
//				var preventEvent = function() {
//					if ( carouselPrev && carouselPrev != '' ) {
//						$( carouselPrev ).data( 'click', 0 ).removeClass( 'disabled' );
//					}
//
//					if ( curBtn ) curBtn.data( 'click', 0 );
//			
//				};
//				
//				if ( !isEnd ) {
//
//
//					//Avoid button repeated trigger
//					if ( curBtn ) curBtn.data( 'click', 1 );
//
//
//
//					//Clone the first element to the last position
//					if ( carouselDir == 'horizontal' ) {
//
//						TweenMax.to( $curItems.first(), carouselSpeed/1000, {
//							css: {
//								marginLeft : -carouselItemWidth
//							},
//							onComplete : function() {
//
//								//Initialize each item "margin-left"
//								$curItems.css( 'margin-left', 0 );
//
//								//Clone the first element to the last position
//								$curItems
//									.first()
//									.clone()
//									.appendTo( $carousel );
//
//
//								//Remove duplicate elements
//								this.target.remove();
//
//
//
//								//Active the center item
//								carouselActiveCenterItem( $curItems, 'left' );
//
//								//Reset prevents code from duplicate run
//								preventEvent();
//								
//
//							}
//						});		
//						
//					
//
//
//					} else {
//
//
//
//						TweenMax.to( $curItems.first(), carouselSpeed/1000, {
//							css: {
//								marginTop : -carouselItemHeight
//							},
//							onComplete : function() {
//
//								//Initialize each item "margin-top"
//								$curItems.css( 'margin-top', 0 );
//
//								//Clone the first element to the last position
//								$curItems
//									.first()
//									.clone()
//									.appendTo( $carousel );
//
//
//								//Remove duplicate elements
//								this.target.remove();
//
//
//
//								//Active the center item
//								carouselActiveCenterItem( $curItems, 'left' );
//
//								//Reset prevents code from duplicate run
//								preventEvent();
//
//
//							}
//						});		
//
//
//					}
//
//
//
//				}// end isEnd
//				
//				
//
//					
//
//			}
//	
//			
//			
//			
//			/*
//			 * Transition between items previously (right/down)
//			 *
//			 * @param  {object} wrapper         - Wrapper of carousel.
//			 * @param  {object} items           - Items of carousel.
//			 * @param  {object} curBtn          - The button that currently triggers the move.
//			 * @param  {string} nextBtnStr      - The button ID or class that triggers the next move.
//			 * @param  {string} prevBtnStr      - The button ID or class that triggers the previous move.
//			 * @return {void}                   - The constructor.
//			 */
//			function movePrev( wrapper, items, curBtn, nextBtnStr, prevBtnStr ) {
//
//		
//				var $curWrapper = wrapper,  //Default: $carousel
//					$curItems   = items,  //Default: $carouselItem
//					isEnd       = false,
//					$cloneItem  = null;
//					
//
//				
//				//Move to the end
//				if ( 1 == $curItems.first().data( 'id' ) ) {
//					isEnd = true;
//				}
//				if ( 2 == $curItems.first().data( 'id' ) && !carouselLoop ) {
//					if ( curBtn ) curBtn.addClass( 'disabled' );
//				}
//				
//				
//				//Loop items
//				if ( carouselLoop ) {
//					isEnd = false;
//				}
//				
//				//Reset prevents code from duplicate run
//				var preventEvent = function() {
//					if ( carouselNext && carouselNext != '' ) {
//						$( carouselNext ).data( 'click', 0 ).removeClass( 'disabled' );
//					}
//
//					if ( curBtn ) curBtn.data( 'click', 0 );
//			
//				};
//				
//				if ( !isEnd ) {
//
//
//					//Avoid button repeated trigger
//					if ( curBtn ) curBtn.data( 'click', 1 );
//
//
//
//					//Clone the first element to the last position
//					if ( carouselDir == 'horizontal' ) {
//
//						$cloneItem = $curItems.last().clone();
//
//
//						//Clone the last element to the first position
//						$cloneItem
//							.prependTo( $carousel )
//							.css( 'margin-left', -carouselItemWidth + 'px' );
//
//
//						TweenMax.to( $cloneItem, carouselSpeed/1000, {
//							css: {
//								marginLeft : 0
//							},
//							onComplete : function() {
//
//								//Remove duplicate elements
//								$curItems
//									.last()
//									.remove();
//
//
//
//								//Active the center item
//								carouselActiveCenterItem( $curItems, 'right' );
//
//								//Reset prevents code from duplicate run
//								preventEvent();
//								
//						
//
//
//
//							}
//						});
//						
//
//
//
//					} else {
//
//
//						$cloneItem = $curItems.last().clone();
//
//
//						//Clone the last element to the first position
//						$cloneItem
//							.prependTo( $carousel )
//							.css( 'margin-top', -carouselItemHeight + 'px' );
//
//
//						TweenMax.to( $cloneItem, carouselSpeed/1000, {
//							css: {
//								marginTop : 0
//							},
//							onComplete : function() {
//
//								//Remove duplicate elements
//								$curItems
//									.last()
//									.remove();
//
//
//
//								//Active the center item
//								carouselActiveCenterItem( $curItems, 'right' );
//
//								//Reset prevents code from duplicate run
//								preventEvent();
//
//
//
//							}
//						});
//
//
//
//					}
//
//
//
//				}// end isEnd
//				
//				
//
//					
//
//			}
//
//
//
//
//
//		});		
//		
//    };
//
//    APP.components.documentReady.push( APP.MULTI_ITEMS_CAROUSEL.documentReady );
//    return APP;
//
//}( APP, jQuery, window, document ) );
//


