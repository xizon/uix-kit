/* 
 *************************************
 * <!-- Multiple Items Carousel -->
 *************************************
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
    UixDebounce,
    UixThrottle
} from '@uixkit/core/_global/js';

import ModifiersPlugin from '@uixkit/plugins/GSAP/esm/ModifiersPlugin';

import '../scss/_style.scss';


export const MULTI_ITEMS_CAROUSEL = ( ( module, $, window, document ) => {
	if ( window.MULTI_ITEMS_CAROUSEL === null ) return false;
	
	
	
    module.MULTI_ITEMS_CAROUSEL               = module.MULTI_ITEMS_CAROUSEL || {};
    module.MULTI_ITEMS_CAROUSEL.version       = '0.0.5';
    module.MULTI_ITEMS_CAROUSEL.documentReady = function( $ ) {

		$( '.uix-multi-carousel' ).each( function()  {

			let $carouselWrapper        = $( this ),
				$carousel               = $carouselWrapper.find( '.uix-multi-carousel__items' ),
				$carouselItem           = $carouselWrapper.find( '.uix-multi-carousel__items > div' ),
				itemTotal               = $carouselItem.length,
				amountVisible           = $carouselWrapper.data( 'show' ),
				carouselDir             = $carouselWrapper.data( 'dir' ),
				carouselLoop            = $carouselWrapper.data( 'loop' ),
				carouselSpeed           = $carouselWrapper.data( 'speed' ),
				carouselNext            = $carouselWrapper.data( 'next' ),
				carouselPrev            = $carouselWrapper.data( 'prev' ),
				carouseDraggable        = $carouselWrapper.data( 'draggable' ),
				carouseDraggableCursor  = $carouselWrapper.data( 'draggable-cursor' );

			
			
			if ( typeof carouselDir === typeof undefined ) carouselDir = 'horizontal';
			if ( typeof carouselLoop === typeof undefined ) carouselLoop = false;
			if ( typeof amountVisible === typeof undefined ) amountVisible = 3;
			if ( typeof carouselSpeed === typeof undefined ) carouselSpeed = 250;
			if ( typeof carouselNext === typeof undefined ) carouselNext = '.uix-multi-carousel__controls--next';
			if ( typeof carouselPrev === typeof undefined ) carouselPrev = '.uix-multi-carousel__controls--prev';
			if ( typeof carouseDraggable === typeof undefined ) carouseDraggable = false;
			if ( typeof carouseDraggableCursor === typeof undefined ) carouseDraggableCursor = 'move';

			
			
			if ( window.innerWidth <= 768 ) amountVisible = 3;
            
            // Returns the value of a number rounded to the nearest integer.
            const midIndex = Math.round( amountVisible/2 ) - 1; 



			/* 
			 ---------------------------
			 Initialize carousel
			 ---------------------------
			 */  
			let eachItemNewWidth, eachItemNewHeight;
			const eachItemOldWidth  = $carousel.width()/amountVisible;
			const eachItemOldHeight = $carousel.height()/amountVisible;

			if ( carouselDir == 'horizontal' ) { 
				eachItemNewWidth = ( $carouselWrapper.width() / amountVisible );
				$carousel.css( 'width', itemTotal * eachItemOldWidth );
			} else {
				eachItemNewHeight = ( $carouselWrapper.height() / amountVisible );
				$carousel.css( 'height', itemTotal * eachItemOldHeight );
			}


			// Re-order all items
			carouselReOrder();



			//default button status
			if ( !carouselLoop ) {
				$( carouselPrev ).addClass( 'is-disabled' ).data( 'disabled', 1 );
			}	

			/* 
			 ---------------------------
			 Re-order all items
			 ---------------------------
			 */ 
			
			function carouselReOrder() {
				
				if ( carouselDir == 'horizontal' ) {
                    const boxWidth = eachItemNewWidth;
                    TweenMax.set($carouselItem, {
                        width: boxWidth,
                        x: function(i, target) {

                            //Active the center item
                            if( i === midIndex && carouselLoop ) {
                                TweenMax.set( target, {className:"+=is-active"});
                            }
                            
                            //Add index to each item
                            $carouselItem.eq(i).attr( 'data-index', i );

                            return i * boxWidth;
                        }
                    });

				} else {
                    
                    const boxHeight = eachItemNewHeight;
                    TweenMax.set($carouselItem, {
                        height: boxHeight,
                        y: function(i, target) {

                            //Active the center item
                            if( i === midIndex && carouselLoop ) {
                                TweenMax.set( target, {className:"+=is-active"});
                            }
                            
                            //Add index to each item
                            $carouselItem.eq(i).attr( 'data-index', i );   

                            return i * boxHeight;
                        }
                    });  
                    
                }
   

			}

			
			
			/* 
			 ---------------------------
			 Move left/up
			 ---------------------------
			 */ 
			$( carouselNext ).off( 'click' ).on( 'click', $carouselWrapper, function( e ) {
				e.preventDefault();
                
                //Prevent buttons' events from firing multiple times
                if ( $( this ).attr( 'aria-disabled' ) == 'true' ) return false;
                $( this ).attr( 'aria-disabled', 'true' );
                $( this )
                    .delay(carouselSpeed)
                    .queue(function(next) { $( this ).attr( 'aria-disabled', 'false' ); next(); });
 
                
                //
                movePositionWithButton( $( this ), e, 'next' );
			});

			
            
			/* 
			 ---------------------------
			 Move right/down
			 ---------------------------
			 */ 
			$( carouselPrev ).off( 'click' ).on( 'click', $carouselWrapper, function( e ) {
				e.preventDefault();
                
                //Prevent buttons' events from firing multiple times
                if ( $( this ).attr( 'aria-disabled' ) == 'true' ) return false;
                $( this ).attr( 'aria-disabled', 'true' );
                $( this )
                    .delay(carouselSpeed)
                    .queue(function(next) { $( this ).attr( 'aria-disabled', 'false' ); next(); });  
                
                //
                movePositionWithButton( $( this ), e, 'prev' );
			});
		

            	
			
			//Drag and Drop
			//-------------------------------------	
			const $dragDropTrigger = $carouselWrapper;
            let hammerProps      = {};

			//Make the cursor a move icon when a user hovers over an item
			if ( carouseDraggable && carouseDraggableCursor != '' && carouseDraggableCursor != false ) $dragDropTrigger.css( 'cursor', carouseDraggableCursor );

			if ( !carouseDraggable ) {
				hammerProps = {
					inputClass: Hammer.TouchInput
				};
			}

			//Mouse event
			//Hammer.js pan event only for touch devices and not for desktop computer Click+Drag
			let direction;
            const dragDropElement = $dragDropTrigger[0],
				  dragDropMC      = new Hammer( dragDropElement, hammerProps );
			
            let elAnim = true;
            
            // let the pan gesture support all directions.
            // this will block the vertical scrolling on a touch-device while on the element
            dragDropMC.get('pan').set({ direction: Hammer.DIRECTION_ALL });
			
			dragDropMC.on( 'press panright panleft panup pandown', function( ev ) {

				//Set the direction in here
				direction = ev.type;
                
                //Determine whether it is the first or the last    
                let currentIsFirstOrLast = false;
                if ( ! carouselLoop ) {
                    const firstItemOffset = ( carouselDir == 'horizontal' ) ? $carousel.find( '[data-index="0"]' )[0]._gsTransform.x : $carousel.find( '[data-index="0"]' )[0]._gsTransform.y;
                    
                    const maxMoveOffset = ( carouselDir == 'horizontal' ) ? -eachItemNewWidth*(itemTotal-amountVisible) : -eachItemNewHeight*(itemTotal-amountVisible);
                    
                    if ( ( direction == 'panright' || direction == 'pandown' ) && firstItemOffset >= 0 ) { //first item
                        currentIsFirstOrLast = true;
                    }

                    if ( ( direction == 'panleft' || direction == 'panup' ) && firstItemOffset <= maxMoveOffset ) { //last item
                        currentIsFirstOrLast = true;
                    }      
                }
                

                
                //Rebound effect of drag offset 
                switch ( direction ) {
                    case 'panleft':
                        
                        if ( ev.deltaX > -eachItemNewWidth/4 && ev.deltaX < 0 ) {
                            elAnim = false;  
                            itemUpdates( $carouselWrapper, ev.deltaX, 0.1, true );
                        } else {
                            elAnim = ( currentIsFirstOrLast ) ? false : true;
                        }
                        
                        
                        break;
                        
                    case 'panup':
                        
                        if ( ev.deltaY > -eachItemNewHeight/4 && ev.deltaY < 0 ) {
                            elAnim = false;  
                            itemUpdates( $carouselWrapper, ev.deltaY, 0.1, true );
                        } else {
                            elAnim = ( currentIsFirstOrLast ) ? false : true;
                        }
                        
                        
                        break;
                        
                    case 'panright':
                        
                        if ( ev.deltaX < eachItemNewWidth/4 && ev.deltaX > 0 ) {
                            elAnim = false;  
                            itemUpdates( $carouselWrapper, ev.deltaX, 0.1, true );
                        } else {
                            elAnim = ( currentIsFirstOrLast ) ? false : true;
                        }
                        
                        
                        break;  
                        
                    case 'pandown':
                        if ( ev.deltaY < eachItemNewHeight/4 && ev.deltaY > 0 ) {
                            elAnim = false;  
                            itemUpdates( $carouselWrapper, ev.deltaY, 0.1, true );
                        } else {
                            elAnim = ( currentIsFirstOrLast ) ? false : true;
                        }
                        
                        
                        break;            
                        
                }
                

			});

			


			dragDropMC.on( 'panend', function( ev ) {

                if ( elAnim ) {

                    
                    //Use the direction in here
                    //You know the pan has ended
                    //and you know which action they were taking
                    switch ( direction ) {
                        case 'panleft':
                        case 'panup':

                            const delta1 = ( carouselDir == 'horizontal' ) ? -eachItemNewWidth : -eachItemNewHeight;
                            itemUpdates( $carouselWrapper, delta1, null, false );
                            
                            break;

                        case 'panright':
                        case 'pandown':
                          
                            const delta2 = ( carouselDir == 'horizontal' ) ? eachItemNewWidth : eachItemNewHeight;
                            itemUpdates( $carouselWrapper, delta2, null, false );
                            
                            break;                 
                            
                    }
                    		    
                } else {    
                    itemUpdates( $carouselWrapper, 0, null, false );
                }

			});	
            
			
			/*
			 * Transition Between Items
			 *
			 * @param  {Element} wrapper        - Wrapper of carousel.
             * @param  {Number} delta           - The value returned will need to be adjusted according to the offset rate.
             * @param  {?Number} speed          - Sliding speed. Please set to 0 when rebounding.
             * @param  {Boolean} dragging       - Determine if the object is being dragged.
			 * @return {Void}
			 */
			function itemUpdates( wrapper, delta, speed, dragging ) {

                if ( speed == null ) speed = carouselSpeed/1000;
             
                
				let $curWrapper = wrapper.children( '.uix-multi-carousel__items' ),  //Default: $carousel
					$curItems   = $curWrapper.find( '> div' ); //Default: $carouselItem
		

            
				//Clone the first element to the last position
				if ( carouselDir == 'horizontal' ) {

                    const boxWidth = eachItemNewWidth;
                    const wrapWidth = ($curItems.length - 1) * boxWidth; 
                    
                    TweenMax.to( $curItems, speed, {
                        x: function(i, target) {
                            const x = Math.round(target._gsTransform.x / boxWidth ) * boxWidth;
                            return x + delta;
                        },
                        modifiers: {
                            x: function(x, target) {
                                
                                if ( carouselLoop ) {
                                    //Active the center item
                                    if( x === midIndex*boxWidth ) {
                                        TweenMax.set( target, {className:"+=is-active"});
                                    } else {
                                        TweenMax.set( target, {className:"-=is-active"});
                                    }


                                    return wrap(x, -boxWidth, wrapWidth);  
                                } else {
                                    return x;
                                }
                                

                            }
                        },
                        onComplete : function() {
                            
                            if ( !dragging && delta != 0 ) {
                                //The state of the control button
                                setButtonState( Math.round( $curItems.first()[0]._gsTransform.x ), Math.round( ($curItems.length - amountVisible) * boxWidth ) );  

                            }


						}
                    });    
              

                    
				} else {
                    
                    const boxHeight = eachItemNewHeight;
                    const wrapHeight = ($curItems.length - 1) * boxHeight; 
                    
                    TweenMax.to( $curItems, speed, {
                        y: function(i, target) {
                            const y = Math.round(target._gsTransform.y / boxHeight) * boxHeight;
                            return y + delta;
                        },
                        modifiers: {
                            y: function(y, target) {
                                
                                
                                if ( carouselLoop ) {
                                    //Active the center item
                                    if( y === midIndex*boxHeight ) {
                                        TweenMax.set( target, {className:"+=is-active"});
                                    } else {
                                        TweenMax.set( target, {className:"-=is-active"});
                                    }

                                    return wrap(y, -boxHeight, wrapHeight)
                                } else {
                                    return y;
                                }

                            }
                        },
                        onComplete : function() {
                            
                            if ( !dragging && delta != 0 ) {
                                //The state of the control button
                                setButtonState( Math.round( $curItems.first()[0]._gsTransform.y ), Math.round( ($curItems.length - amountVisible) * boxHeight ) );   
   
                            }
                         
						}
                    });         
                    
                }

			
					

			}
     
            
			/*
			 * Move function with buttons
			 *
			 * @param  {Element} $btn               - The button that currently triggers the move.
             * @param  {Object} event               - Bind an event handler to the "click" JavaScript event,
             * @param  {String} type                - Move next or previous.
			 * @return {Void}
			 */
            function movePositionWithButton( $btn, event, type ) {
   				const $curWrapper = $( event.data[0] ),
					  //Protection button is not triggered multiple times.
                      btnDisabled = $btn.data( 'disabled' );
                
                let delta;
                if ( type == 'next' ) {
                    delta = ( carouselDir == 'horizontal' ) ? -eachItemNewWidth : -eachItemNewHeight;
                } else {
                    delta = ( carouselDir == 'horizontal' ) ? eachItemNewWidth : eachItemNewHeight;
                }
                
				if ( typeof btnDisabled === typeof undefined ) {	
					itemUpdates( $curWrapper, delta, null, false );
				} 
            }  
            
            
			/*
			 * The state of the control button
			 *
             * @param  {Number} firstOffset          - Get the computed Translate X or Y values of a given first DOM element.
             * @param  {Number} lastOffset           - Get the computed Translate X or Y values of a given last DOM element.
			 * @return {Void}
			 */
            function setButtonState( firstOffset, lastOffset ) {
                
                if ( carouselLoop ) return false;
               
                if ( Math.abs( firstOffset ) == lastOffset ) {
                    $( carouselNext ).addClass( 'is-disabled' ).data( 'disabled', 1 );
                    $( carouselPrev ).removeClass( 'is-disabled' ).removeData( 'disabled' );
                } else if ( Math.round( firstOffset ) == 0 ) {
                    $( carouselNext ).removeClass( 'is-disabled' ).removeData( 'disabled' );
                    $( carouselPrev ).addClass( 'is-disabled' ).data( 'disabled', 1 );
                } else {
                    $( carouselNext ).removeClass( 'is-disabled' ).removeData( 'disabled' );
                    $( carouselPrev ).removeClass( 'is-disabled' ).removeData( 'disabled' );
                }
            }   
            
	
			/*
			 * Tweens each box to a relative x/y position of "+={number}"
			 *
			 * @param  {Number} value           - Current position of the element, x or y coordinates.
			 * @param  {Number} min             - The minimum value, used to mark the width or height of each element.
			 * @param  {Number} max             - The maximum value, used to mark the width or height of the entire container.
			 * @return {Number}                 - The about-to-be-applied value from the regular tween.
			 */
            function wrap(value, min, max) {
                const v = value - min;
                const r = max - min;

                // force x/y value to be between {min} and {max} using modulus
                return ((r + v % r) % r) + min;
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
