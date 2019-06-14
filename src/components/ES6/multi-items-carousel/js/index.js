/* 
 *************************************
 * <!-- Multiple Items Carousel -->
 *************************************
 */
/**
 * module.MULTI_ITEMS_CAROUSEL
 * 
 * @requires ./examples/assets/js/min/hammer.min.js
 */


import {
    templateUrl,
    homeUrl,
    ajaxUrl,
    browser,
    UixModuleInstance,
    UixGUID,
    UixMath,
    UixCssProperty,
    UixApplyAsyncScripts,
    UixApplyAsyncAllScripts
} from '@uixkit/core/_global/js';


import '../scss/_style.scss';


export const MULTI_ITEMS_CAROUSEL = ( ( module, $, window, document ) => {
	
	
    module.MULTI_ITEMS_CAROUSEL               = module.MULTI_ITEMS_CAROUSEL || {};
    module.MULTI_ITEMS_CAROUSEL.version       = '0.0.3';
    module.MULTI_ITEMS_CAROUSEL.documentReady = function( $ ) {

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

			
			
			if ( typeof carouselDir === typeof undefined ) carouselDir = 'horizontal';
			if ( typeof carouselLoop === typeof undefined ) carouselLoop = false;
			if ( typeof amountVisible === typeof undefined ) amountVisible = 3;
			if ( typeof carouselSpeed === typeof undefined ) carouselSpeed = 250;
			if ( typeof carouselNext === typeof undefined ) carouselNext = '.uix-multi-carousel__controls--next';
			if ( typeof carouselPrev === typeof undefined ) carouselPrev = '.uix-multi-carousel__controls--prev';
			if ( typeof carouseDraggable === typeof undefined ) carouseDraggable = false;
			if ( typeof carouseDraggableCursor === typeof undefined ) carouseDraggableCursor = 'move';

			
			
			if ( window.innerWidth <= 768 ) amountVisible = 3;

			
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
				$( carouselPrev ).addClass( 'is-disabled' );
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
				el.removeClass( 'is-active active-prev active-next' );
				
				
			
				if ( dir == 'default' ) {
					el.eq( parseFloat( curItemIndex - 1 ) ).addClass( 'is-active' );		
				} else {
					el.eq( parseFloat( steps + centerItemIndex + 1 ) ).addClass( 'is-active' );	
				}
				
				//Add nearest classes for 3 elements
				el.each( function() {
					if ( $( this ).hasClass( 'is-active' ) ) {
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
			
			
			
			//Solve the activation problem of touch events
			//-------------------------------------	
			$carouselItem.on( 'click touchstart', function() {
				$carouselItem.removeClass( 'active-current' );
				$( this ).addClass( 'active-current' );
			});
			
			
			
			
			//Drag and Drop
			//-------------------------------------	
			var $dragDropTrigger = $carouselWrapper,
				hammerProps      = {};

			//Make the cursor a move icon when a user hovers over an item
			if ( carouseDraggable && carouseDraggableCursor != '' && carouseDraggableCursor != false ) $dragDropTrigger.css( 'cursor', carouseDraggableCursor );

			if ( !carouseDraggable ) {
				hammerProps = {
					inputClass: Hammer.TouchInput
				};
			}

			//Mouse event
			//Hammer.js pan event only for touch devices and not for desktop computer Click+Drag
			var direction,
				dragDropElement = $dragDropTrigger[0],
				dragDropMC      = new Hammer( dragDropElement, hammerProps );
			
			
			dragDropMC.on( 'panright press panleft panup pandown', function( ev ) {

				//Set the direction in here
				direction = ev.type;
			});

			


			dragDropMC.on( 'panend', function( ev ) {

			
				//Use the direction in here
				//You know the pan has ended
				//and you know which action they were taking
				if ( direction == 'panleft' || direction == 'panup' ) {
					goSteps++;

					//Loop items
					if ( carouselLoop ) {
						if ( goSteps > lastSteps ) goSteps = 0;
					} else {
						if ( goSteps > lastSteps ) goSteps = lastSteps;
					}

					itemUpdates( $carouselWrapper, false, carouselNext, carouselPrev, goSteps );
				}

				if ( direction == 'panright' || direction == 'pandown' ) {
					goSteps--;

					//Loop items
					if ( carouselLoop ) {
						if ( goSteps < 0 ) goSteps = lastSteps;
					} else {
						if ( goSteps < 0 ) goSteps = 0;
					}

					itemUpdates( $carouselWrapper, false, carouselNext, carouselPrev, goSteps );
				}			



			});	

		
		
			
			/*
			 * Transition Between Items
			 *
			 * @param  {Object} wrapper         - Wrapper of carousel.
			 * @param  {Object} curBtn          - The button that currently triggers the move.
			 * @param  {String} nextBtnStr      - The button ID or class that triggers the next move.
			 * @param  {String} prevBtnStr      - The button ID or class that triggers the previous move.
			 * @param  {Number} steps           - The number of steps per move.
			 * @return {Void}
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
					
					if ( isEnd ) $( nextBtnStr ).addClass( 'is-disabled' );
					if ( isFirst ) $( prevBtnStr ).addClass( 'is-disabled' );
					
					if ( isMid ) {
						$( nextBtnStr ).removeClass( 'is-disabled' );
						$( prevBtnStr ).removeClass( 'is-disabled' );
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

    module.components.documentReady.push( module.MULTI_ITEMS_CAROUSEL.documentReady );

	return class MULTI_ITEMS_CAROUSEL {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );


//
//export const MULTI_ITEMS_CAROUSEL = ( ( module, $, window, document ) => {
//	
//    module.MULTI_ITEMS_CAROUSEL               = module.MULTI_ITEMS_CAROUSEL || {};
//	module.MULTI_ITEMS_CAROUSEL.version       = '0.0.1';
//    module.MULTI_ITEMS_CAROUSEL.documentReady = function( $ ) {
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
//			if ( typeof carouselDir === typeof undefined ) {
//				carouselDir = 'horizontal';
//			}
//			
//			if ( typeof carouselLoop === typeof undefined ) {
//				carouselLoop = false;
//			}
//			if ( typeof showcarouselItem === typeof undefined ) {
//				showcarouselItem = 3;
//			}
//			if ( typeof carouselSpeed === typeof undefined ) {
//				carouselSpeed = 250;
//			}
//			if ( typeof carouselNext === typeof undefined ) {
//				carouselNext = '.uix-multi-carousel__controls--next';
//			}
//			if ( typeof carouselPrev === typeof undefined ) {
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
//				$( carouselPrev ).addClass( 'is-disabled' );
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
//				el.removeClass( 'is-active active-prev active-next' );
//				
//				
//				
//				if ( dir == 'left' ) {
//					el.eq( curItemIndex ).addClass( 'is-active' );
//					
//				} else if ( dir == 'right' ) {
//					el.eq( centerItemIndex ).addClass( 'is-active' );	
//					
//				} else if ( dir == 'default' ) {
//					el.eq( curItemIndex - 1 ).addClass( 'is-active' );		
//				}
//				
//				//Add nearest classes for 3 elements
//				el.each( function() {
//					if ( $( this ).hasClass( 'is-active' ) ) {
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
//			 * @param  {Object} wrapper         - Wrapper of carousel.
//			 * @param  {Object} items           - Items of carousel.
//			 * @param  {Object} curBtn          - The button that currently triggers the move.
//			 * @param  {String} nextBtnStr      - The button ID or class that triggers the next move.
//			 * @param  {String} prevBtnStr      - The button ID or class that triggers the previous move.
//			 * @return {Void}
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
//					if ( curBtn ) curBtn.addClass( 'is-disabled' );
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
//						$( carouselPrev ).data( 'click', 0 ).removeClass( 'is-disabled' );
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
//			 * @param  {Object} wrapper         - Wrapper of carousel.
//			 * @param  {Object} items           - Items of carousel.
//			 * @param  {Object} curBtn          - The button that currently triggers the move.
//			 * @param  {String} nextBtnStr      - The button ID or class that triggers the next move.
//			 * @param  {String} prevBtnStr      - The button ID or class that triggers the previous move.
//			 * @return {Void}
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
//					if ( curBtn ) curBtn.addClass( 'is-disabled' );
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
//						$( carouselNext ).data( 'click', 0 ).removeClass( 'is-disabled' );
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
//    module.components.documentReady.push( module.MULTI_ITEMS_CAROUSEL.documentReady );
//
//	return class MULTI_ITEMS_CAROUSEL {
//		constructor() {
//			this.module = module;
//		}
//		
//	};
//	
//})( UixModuleInstance, jQuery, window, document );
