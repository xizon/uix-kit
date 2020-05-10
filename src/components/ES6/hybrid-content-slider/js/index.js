
/* 
 *************************************
 * <!-- Hybrid Content Slider -->
 *************************************
 */
/**
 * module.HYBRID_CONTENT_SLIDER
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
    UixCssProperty
} from '@uixkit/core/_global/js';


import '../scss/_style.scss';


export const HYBRID_CONTENT_SLIDER = ( ( module, $, window, document ) => {
	if ( window.HYBRID_CONTENT_SLIDER === null ) return false;
	
	
	
    module.HYBRID_CONTENT_SLIDER               = module.HYBRID_CONTENT_SLIDER || {};
    module.HYBRID_CONTENT_SLIDER.version       = '0.0.95';
    module.HYBRID_CONTENT_SLIDER.pageLoaded    = function() {

		$( '.uix-hybrid-content-slider' ).each( function()  {

			let $carouselWrapper        = $( this ),
				$carousel               = $carouselWrapper.find( '.uix-hybrid-content-slider__items' ),
				$carouselItem           = $carouselWrapper.find( '.uix-hybrid-content-slider__items > div' ),
				itemTotal               = $carouselItem.length,
				amountVisible           = 1,
				carouselDir             = $carouselWrapper.data( 'dir' ),
				carouselSpeed           = $carouselWrapper.data( 'speed' ),
				carouselNext            = $carouselWrapper.data( 'next' ),
				carouselPrev            = $carouselWrapper.data( 'prev' ),
                carouselPagination      = $carouselWrapper.data( 'pagination' ),
				carouseDraggable        = $carouselWrapper.data( 'draggable' ),
				carouseDraggableCursor  = $carouselWrapper.data( 'draggable-cursor' );

			
			if ( typeof carouselDir === typeof undefined ) carouselDir = 'horizontal';
			if ( typeof carouselSpeed === typeof undefined ) carouselSpeed = 250;
			if ( typeof carouselNext === typeof undefined ) carouselNext = '#uix-hybrid-content-slider__controls-123 .uix-hybrid-content-slider__controls--next';
			if ( typeof carouselPrev === typeof undefined ) carouselPrev = '#uix-hybrid-content-slider__controls-123 .uix-hybrid-content-slider__controls--prev';
            if ( typeof carouselPagination === typeof undefined ) carouselPagination = '#uix-hybrid-content-slider__pagination-123';
			if ( typeof carouseDraggable === typeof undefined ) carouseDraggable = false;
			if ( typeof carouseDraggableCursor === typeof undefined ) carouseDraggableCursor = 'move';

            
            //Autoplay parameters
            let dataAuto                   = $carouselWrapper.data( 'auto' ),
                dataTiming                 = $carouselWrapper.data( 'timing' ),
                dataLoop                   = $carouselWrapper.data( 'loop' );  

            if ( typeof dataAuto === typeof undefined ) dataAuto = false;	
            if ( typeof dataTiming === typeof undefined ) dataTiming = 10000;
            if ( typeof dataLoop === typeof undefined ) dataLoop = false; 

            
            
            //Autoplay times
            let playTimes;
            //A function called "timer" once every second (like a digital watch).
            $carouselWrapper[0].animatedSlides;
            
            
            //Store the latest position (X,Y) in a temporary variable
            let tempItemsPos = [];
			
            
            //each item width and height
            let eachItemNewWidth, eachItemNewHeight = [];
            
            
            // Returns the value of a number rounded to the nearest integer.
            const midIndex = 0; 


            
            // Get the width and height of each item
            $carouselItem.each( function( index ) {
                const _height = $( this ).height();
                eachItemNewHeight.push( _height );
                $( this ).attr({
                    'data-height': _height,
                    'data-index': index
                });
            });
            
                            
            //Returns the total height of items
            let totalItemsHeight = 0;
            for (let i = 0; i < eachItemNewHeight.length; i++ ) {
                totalItemsHeight += eachItemNewHeight[i];
                if ( (i+1) == (itemTotal - amountVisible) ) break;
            }
                   
            //Set target index of the carousel buttons
            setButtonTargetIndex( $( carouselNext ), $( carouselPrev ), 'init', null );
            

            
            //set actived item & initialize the height of container
            setContainerSize( 0 );    
            $carouselItem.addClass( 'js-is-ready' ); 
            
            
            // Activate the current item from carouse
            setItemState( 0 );    


			/* 
			 ---------------------------
			 Initialize carousel
			 ---------------------------
			 */  
			const eachItemOldWidth  = $carousel.width()/amountVisible;

            eachItemNewWidth = ( $carouselWrapper.width() / amountVisible );
            
            if ( carouselDir == 'horizontal' ) {
                $carousel.css( 'width', itemTotal * eachItemOldWidth );
            }

            
			// Re-order all items
			carouselReOrder();



			//default button status
			$( carouselPrev ).addClass( 'is-disabled' ).data( 'disabled', 1 );	

			/* 
			 ---------------------------
			 Re-order all items
			 ---------------------------
			 */ 
			
			function carouselReOrder() {

				
                //Initialize the width and height of each item
				if ( carouselDir == 'horizontal' ) {
                    const boxWidth = eachItemNewWidth;
                    TweenMax.set($carouselItem, {
                        width: boxWidth,
                        height: function(i, target) {
                            return eachItemNewHeight[i];
                        },
                        x: function(i, target) {
                            return i * boxWidth;
                        }
                    });

				} else {
                    
                    TweenMax.set($carouselItem, {
                        height: function(i, target) {
                            return eachItemNewHeight[i];
                        },
                        y: function(i, target) {
                            let yIncrement = 0;
                            for (let k = 0; k < eachItemNewHeight.length; k++ ) {    
                                const tempY = ( typeof eachItemNewHeight[k-1] === typeof undefined ) ? 0 : eachItemNewHeight[k-1];
                                yIncrement += tempY;
                                if ( k == i ) break;
                            }   
                            
                            return yIncrement;
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
                movePositionWithButton( false, $( this ), e, 'next' );

                //Pause the auto play event
                clearInterval( $carouselWrapper[0].animatedSlides );	 

                
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
                movePositionWithButton( false, $( this ), e, 'prev' );
                
                //Pause the auto play event
                clearInterval( $carouselWrapper[0].animatedSlides );
                
			});
		

			/* 
			 ---------------------------
			 Pagination
			 ---------------------------
			 */ 
            if ( $( carouselPagination ).length > 0 && $( carouselPagination ).html().length == 0 ) {
                //Button to add pagination automatically
                let _dot       = '';
                _dot += '<ul class="uix-hybrid-content-slider__pagination--default">';
                for ( let i = 0; i < itemTotal; i++ ) {
                    _dot += '<li><a data-target-index="'+i+'" href="javascript:void(0);"></a></li>';
                }
                _dot += '</ul>';

                $( carouselPagination ).html( _dot ).promise().done( function(){
                    // Activate the currently selected Pagination
                    setPaginationState( 0 );
                });	
            } else {
                // Activate the currently selected Pagination
                setPaginationState( 0 ); 
            }

            
			$( carouselPagination ).find( 'li a' ).off( 'click' ).on( 'click', $carouselWrapper, function( e ) {
				e.preventDefault();
                
                //Prevent buttons' events from firing multiple times
                if ( $( this ).attr( 'aria-disabled' ) == 'true' ) return false;
                $( carouselPagination ).find( 'li a' ).attr( 'aria-disabled', 'true' );
                
                $( carouselPagination ).find( 'li a' )
                    .delay(carouselSpeed)
                    .queue(function(next) { $( carouselPagination ).find( 'li a' ).attr( 'aria-disabled', 'false' ); next(); }); 
                
                
                //
                if ( !$( this ).parent().hasClass( 'is-active' ) ) {
                    
                    movePositionWithButton( true, $( this ), e, 'next' );

                    //Pause the auto play event
                    clearInterval( $carouselWrapper[0].animatedSlides );	
                }

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
            let targetIndex = 0;

            //Temporarily store arrays as strings
            //!!!important ///////////////////////////////////////
            //!!! Prevent dragging events from nesting multiple 
            //!!! times to reduce subscripts.
            //!!!important ///////////////////////////////////////
            const allHeightStr = eachItemNewHeight.toString();


            // let the pan gesture support all directions.
            // this will block the vertical scrolling on a touch-device while on the element
            dragDropMC.get('pan').set({ direction: Hammer.DIRECTION_ALL });
			
			dragDropMC.on( 'press panright panleft panup pandown', function( ev ) {

				//Set the direction in here
				direction = ev.type;

                
                
                //Get the current item index
                targetIndex = $( ev.target ).data( 'index' );
                if ( typeof targetIndex === typeof undefined ) targetIndex = $( ev.target ).closest( '.uix-hybrid-content-slider__item' ).data( 'index' );
                if ( typeof targetIndex === typeof undefined ) targetIndex = $( ev.target ).find( '.uix-hybrid-content-slider__item' ).data( 'index' );

                switch ( direction ) {
                    case 'panleft':
                    case 'panup':

                        targetIndex = targetIndex + 1;

                        break;

                    case 'panright':
                    case 'pandown':

                        targetIndex = targetIndex;

                        break;                 

                }
                
                
                
                //Determine whether it is the first or the last    
                let currentIsFirstOrLast = false;
                const firstItemOffset = ( carouselDir == 'horizontal' ) ? $carousel.find( '[data-index="0"]' )[0]._gsTransform.x : $carousel.find( '[data-index="0"]' )[0]._gsTransform.y;
                
                const maxMoveOffset = ( carouselDir == 'horizontal' ) ? -eachItemNewWidth*(itemTotal-amountVisible) : -totalItemsHeight;

                
                //
                if ( ( direction == 'panright' || direction == 'pandown' ) && firstItemOffset >= 0 ) { //first item
                    currentIsFirstOrLast = true;
                }

                if ( ( direction == 'panleft' || direction == 'panup' ) && firstItemOffset <= maxMoveOffset ) { //last item
                    currentIsFirstOrLast = true;
                }   
                
                
                
                //Rebound effect of drag offset 
                //
                //!important -> Please do not use multiple case conditions, 
                //otherwise it may cause vertical data problems

                if ( carouselDir == 'horizontal' ) {
                    switch ( direction ) {
                        case 'panleft':

                            if ( ev.deltaX > -eachItemNewWidth/4 && ev.deltaX < 0 ) {
                                elAnim = false;  
                                
                                const simulationButtonNext = $( carouselNext );
                                itemUpdates( $carouselWrapper, simulationButtonNext, ev.deltaX, 0.1, true, targetIndex, allHeightStr );
                            } else {
                                elAnim = ( currentIsFirstOrLast ) ? false : true;
                            }


                            break;
                        case 'panright':

                            if ( ev.deltaX < eachItemNewWidth/4 && ev.deltaX > 0 ) {
                                elAnim = false;  
                                
                                const simulationButtonPrev = $( carouselPrev );
                                itemUpdates( $carouselWrapper, simulationButtonPrev, ev.deltaX, 0.1, true, targetIndex, allHeightStr );
                            } else {
                                elAnim = ( currentIsFirstOrLast ) ? false : true;
                            }

                            break;  
          

                    }  
                } else {
                    
                    const draggingItemHeight = ( typeof allHeightStr.split( ',' )[targetIndex-1] === typeof undefined ) ? allHeightStr.split( ',' )[targetIndex] : allHeightStr.split( ',' )[targetIndex-1];
                    
                    
                    
                    switch ( direction ) {
                        case 'panup':

                            if ( ev.deltaY > -draggingItemHeight/4 && ev.deltaY < 0 ) {
                                elAnim = false;  
                                
                                const simulationButtonNext = $( carouselNext );
                                itemUpdates( $carouselWrapper, simulationButtonNext, ev.deltaY, 0.1, true, targetIndex, allHeightStr );
                            } else {
                                elAnim = ( currentIsFirstOrLast ) ? false : true;
                            }


                            break;

                        case 'pandown':

                            if ( ev.deltaY < draggingItemHeight/4 && ev.deltaY > 0 ) {
                                elAnim = false;  
                                
                                const simulationButtonPrev = $( carouselPrev );
                                itemUpdates( $carouselWrapper, simulationButtonPrev, ev.deltaY, 0.1, true, targetIndex, allHeightStr );
                            } else {
                                elAnim = ( currentIsFirstOrLast ) ? false : true;
                            }


                            break;            

                    }       
                    
                }
             

			});

			
			dragDropMC.on( 'panend', function( ev ) {
                
                if ( elAnim ) {

                    
                    //Use the direction in here
                    //You know the pan has ended
                    //and you know which action they were taking
                    //
                    //!important -> Please do not use multiple case conditions, 
                    //otherwise it may cause vertical data problems
                    
                    if ( carouselDir == 'horizontal' ) {
                        switch ( direction ) {
                            case 'panleft':

                                const deltaNext = -eachItemNewWidth;
                                const simulationButtonNext = $( carouselNext );
                                itemUpdates( $carouselWrapper, simulationButtonNext, deltaNext, null, false, targetIndex, allHeightStr );

                                break;

                            case 'panright':

                                const deltaPrev = eachItemNewWidth;
                                const simulationButtonPrev = $( carouselPrev );
                                itemUpdates( $carouselWrapper, simulationButtonPrev, deltaPrev, null, false, targetIndex, allHeightStr );

                                break;                 

                        }  
                        
                    } else {
                        switch ( direction ) {
                            case 'panup':

                                const deltaNext = -1;
                                const simulationButtonNext = $( carouselNext );
                                itemUpdates( $carouselWrapper, simulationButtonNext, deltaNext, null, false, targetIndex, allHeightStr );

                                break;

                            case 'pandown':

                                const deltaPrev = -1;
                                const simulationButtonPrev = $( carouselPrev );
                                itemUpdates( $carouselWrapper, simulationButtonPrev, deltaPrev, null, false, targetIndex, allHeightStr );

                                break;                 

                        }     
                    }
                    
                    		    
                } else {    
                    
                    //Rebound effect of drag offset 
                    itemUpdates( $carouselWrapper, null, tempItemsPos, null, false, targetIndex, allHeightStr);
                }
                
                //Pause the auto play event
                clearInterval( $carouselWrapper[0].animatedSlides );

			});	
            

                    
            //Autoplay Slider
            //-------------------------------------		
            if ( dataAuto && !isNaN( parseFloat( dataTiming ) ) && isFinite( dataTiming ) ) {

                sliderAutoPlay( playTimes, dataTiming, dataLoop );

                $carouselWrapper.on({
                    mouseenter: function() {
                        clearInterval( $carouselWrapper[0].animatedSlides );
                    },
                    mouseleave: function() {
                        sliderAutoPlay( playTimes, dataTiming, dataLoop );
                    }
                });	

            }
            
            
            /*
             * Trigger slider autoplay
             *
             * @param  {Function} playTimes      - Number of times.
             * @param  {Number} timing           - Autoplay interval.
             * @param  {Boolean} loop            - Gives the slider a seamless infinite loop.
             * @return {Void}             
             */
            function sliderAutoPlay( playTimes, timing, loop ) {	

                $carouselWrapper[0].animatedSlides = setInterval( function() {

                    const autoMove = function( indexGo ) {

                        // Retrieve the position (X,Y) of an element 
                        const moveX = eachItemNewWidth * indexGo;

                        let moveYIncrement = 0;
                        for (let k = 0; k < eachItemNewHeight.length; k++ ) {    
                            const tempY = ( typeof eachItemNewHeight[k-1] === typeof undefined ) ? 0 : eachItemNewHeight[k-1];
                            moveYIncrement += tempY;
                            if ( k == indexGo ) break;
                        }
                        const moveY = moveYIncrement;

                        //
                        const delta = ( carouselDir == 'horizontal' ) ? -moveX : -moveY;

                        //
                        itemUpdates( $carouselWrapper, 'auto', delta, null, false, indexGo, eachItemNewHeight );    
                    }; 
                    
                    playTimes = parseFloat( $carouselItem.filter( '.is-active' ).index() );
                    playTimes++;
                    
                    
                    if ( !loop ) {
                        if ( playTimes < itemTotal && playTimes >= 0 ) {
                            autoMove( playTimes );
                        }
                    } else {
                        if ( playTimes == itemTotal ) playTimes = 0;
                        if ( playTimes < 0 ) playTimes = itemTotal-1;		
                        
                        autoMove( playTimes );
                    }

                }, timing );	
            }


            
			
			/*
			 * Transition Between Items
			 *
			 * @param  {Element} wrapper            - Wrapper of carousel.
			 * @param  {?Element|String} curBtn     - The button that currently triggers the move.
             * @param  {Number|Array} delta         - The value returned will need to be adjusted according to the offset rate.
             * @param  {?Number} speed              - Sliding speed. Please set to 0 when rebounding.
             * @param  {Boolean} dragging           - Determine if the object is being dragged.
             * @param  {!Number} indexGo            - The target item index.
             * @param  {String|Array} itemsHeight   - Return all items height.
			 * @return {Void}
			 */
			function itemUpdates( wrapper, curBtn, delta, speed, dragging, indexGo, itemsHeight ) {
                
                if ( speed == null ) speed = carouselSpeed/1000;
                
				let $curWrapper = wrapper.children( '.uix-hybrid-content-slider__items' ),  //Default: $carousel
					$curItems   = $curWrapper.find( '> div' ); //Default: $carouselItem
           
                
                //Get height constant
                const itemsHeightArr = [];
                const _itemsHeight = itemsHeight.toString().split( ',' );
                _itemsHeight.forEach( function( element ) {
                    itemsHeightArr.push( parseFloat(element) );
                });
                
                
                //Check next or previous event
                let btnType = 'init';
                if ( curBtn != null && curBtn != 'auto' ) {
                    if ( typeof curBtn.attr( 'class' ) !== typeof undefined ) {
                        btnType = ( curBtn.attr( 'class' ).indexOf( '--next' ) >=0 ) ? 'next' : 'prev';
                    } else {
                        btnType = 'next';
                    }
                    
                }
                
                //Check next or previous event ( Autoplay )
                if ( curBtn == 'auto' ) btnType = 'next';;

            
				//Clone the first element to the last position
				if ( carouselDir == 'horizontal' ) {

                    const boxWidth = eachItemNewWidth;
                    
                    TweenMax.to( $curItems, speed, {
                        x: function(i, target) {

                            let xIncrement = 0;

                            for (let k = 0; k < itemTotal; k++ ) {    
                                const tempX = ( k == 0 ) ? 0 : boxWidth;
                                xIncrement += tempX;
                                if ( k == i ) break;
                            }   
 
                            
                            
                            if ( Array.isArray( delta ) ) {
                                
                                //Rebound effect of drag offset 
                                return ( delta.length == 0 ) ? xIncrement : delta[i];     
                                
                            } else {
                                
                                if ( !dragging ) {
                                    //console.log( 'btnType: ' + btnType + ' indexGo: ' + indexGo );


                                    let curWidthIncrement = 0;
                                    
                                    for (let m= 0; m < itemTotal; m++ ) {    
                                        const tempW = ( m == 0 ) ? 0 : boxWidth;
                                        curWidthIncrement += tempW;
                                        if ( m == ( btnType == 'next' ? indexGo : indexGo-1 ) ) break;
                                    } 

                                    return xIncrement + -curWidthIncrement;  
                                } else {
                                    //console.log( 'dragging...' );
                                    const x = Math.round(target._gsTransform.x / boxWidth ) * boxWidth;
                                    return x + delta; 
                                }
                            }
                            
                        },
                        onComplete : function() {
                            
                            if ( !dragging && !Array.isArray( delta ) ) {
                                
                                //Get index of current element
                                let currentIndex = 0;
				   
                                
                                //The state of the control button
                                setButtonState( Math.round( $curItems.first()[0]._gsTransform.x ), Math.round( ($curItems.length - amountVisible) * boxWidth ) );  

                                //Initialize the height of container
                                currentIndex = Math.round( $curItems.first()[0]._gsTransform.x/boxWidth );
                                setContainerSize( currentIndex );  	 

                                //Set target index of the carousel buttons
                                setButtonTargetIndex( $( carouselNext ), $( carouselPrev ), btnType, ( btnType == 'next' ? Math.abs( currentIndex ) : Math.abs( currentIndex ) + 1 ) );   
                                
                                // Activate the currently selected Pagination
                                setPaginationState( Math.abs( currentIndex ) );
                                
                                // Activate the current item from carouse
                                setItemState( Math.abs( currentIndex ) );     
                                
                                //Store the latest position (X,Y) in a temporary variable
                                tempItemsPos = createStoreLatestPosition();  
                                
                            }
                            

						}
                    });    
              

				} else {
                    
                    TweenMax.to( $curItems, speed, {
                        y: function(i, target) {
                            
                            let yIncrement = 0;

                            for (let k = 0; k < itemsHeightArr.length; k++ ) {    
                                const tempY = ( typeof itemsHeightArr[k-1] === typeof undefined ) ? 0 : itemsHeightArr[k-1];
                                yIncrement += tempY;
                                if ( k == i ) break;
                            }  
                            
                            if ( Array.isArray( delta ) ) {
                                
                                //Rebound effect of drag offset 
                                return ( delta.length == 0 ) ? yIncrement : delta[i];   
                                
                            } else {
                                
                                if ( !dragging ) {
                                    //console.log( 'btnType: ' + btnType + ' indexGo: ' + indexGo );


                                    let curHeightIncrement = 0;

                                    for (let m = 0; m < itemsHeightArr.length; m++ ) {    
                                        const tempH = ( typeof itemsHeightArr[m-1] === typeof undefined ) ? 0 : itemsHeightArr[m-1];
                                        curHeightIncrement += tempH;
                                        if ( m == ( btnType == 'next' ? indexGo : indexGo-1 ) ) break;
                                    }   
                                    

                                    return yIncrement + -curHeightIncrement;  
                                } else {
                                    //console.log( 'dragging...' );
                                    const draggingItemHeight = ( typeof itemsHeightArr[indexGo-1] === typeof undefined ) ? itemsHeightArr[indexGo] : itemsHeightArr[indexGo-1];
                                 
                                    const y = Math.round(target._gsTransform.y / draggingItemHeight ) * draggingItemHeight;
                                    return y + delta; 
                                }
                            }

                            
                            
                        },
                        onComplete : function() {
                            
                            
                            if ( !dragging && !Array.isArray( delta ) ) {
                                
                                //The state of the control button
                                setButtonState( $curItems.first()[0]._gsTransform.y, totalItemsHeight );   

                                //Set target index of the carousel buttons
                                setButtonTargetIndex( $( carouselNext ), $( carouselPrev ), btnType, indexGo ); 

                                //set actived item & initialize the height of container
                                setContainerSize( ( btnType == 'next' ? indexGo : indexGo-1 ) );
                                
                                // Activate the currently selected Pagination
                                setPaginationState( ( btnType == 'next' ? indexGo : indexGo-1 ) ); 
                    
                                // Activate the current item from carouse
                                setItemState( ( btnType == 'next' ? indexGo : indexGo-1 ) );               
                 
                                //Store the latest position (X,Y) in a temporary variable
                                tempItemsPos = createStoreLatestPosition();   
                                
                                
                            }
                              

						}
                    });         
                    
                }




			}

            
		
			/*
			 * Use the button to trigger the transition between the two sliders
			 *
			 * @param  {Boolean} paginationEnable   - Determine whether it is triggered by pagination
			 * @param  {Element} $btn               - The button that currently triggers the move.
             * @param  {Object} event               - Bind an event handler to the "click" JavaScript event,
             * @param  {String} type                - Move next or previous.
			 * @return {Void}
			 */
            function movePositionWithButton( paginationEnable, $btn, event, type ) {
   				const $curWrapper = $( event.data[0] ),
					  //Protection button is not triggered multiple times.
                      btnDisabled = $btn.data( 'disabled' ),
                      
                      //Get current button index
                      tIndex      = parseFloat( $btn.attr( 'data-target-index' ) );
                

                // Retrieve the position (X,Y) of an element 
                let moveX = eachItemNewWidth,
                    moveY = ( typeof eachItemNewHeight[tIndex-1] === typeof undefined ) ? 0 : eachItemNewHeight[tIndex-1];   
                
                if ( paginationEnable ) {
                    
                    //--
                    moveX = eachItemNewWidth * tIndex;
                    
                    //--
                    let moveYIncrement = 0;
                    for (let k = 0; k < eachItemNewHeight.length; k++ ) {    
                        const tempY = ( typeof eachItemNewHeight[k-1] === typeof undefined ) ? 0 : eachItemNewHeight[k-1];
                        moveYIncrement += tempY;
                        if ( k == tIndex ) break;
                    }
                    moveY = moveYIncrement;
                    
                }
                

                
                //
                let delta;
                if ( type == 'next' ) {
                    delta = ( carouselDir == 'horizontal' ) ? -moveX : -moveY;
                } else {
                    delta = ( carouselDir == 'horizontal' ) ? moveX : moveY;
                }
                
               
				if ( typeof btnDisabled === typeof undefined ) {	
					itemUpdates( $curWrapper, $btn, delta, null, false, tIndex, eachItemNewHeight );
                    
				}    
            }  
            


			/*
			 * Activate the currently selected Pagination
			 *
             * @param  {Number} index          - Get index of current element.
			 * @return {Void}
			 */
            function setPaginationState( index ) {
                $( carouselPagination ).find( 'li' ).removeClass( 'is-active' );
                $( carouselPagination ).find( 'li a[data-target-index="'+index+'"]' ).parent().addClass( 'is-active' );   
            }   
                 
			/*
			 * Activate the current item from carouse
			 *
             * @param  {Number} index          - Get index of current element.
			 * @return {Void}
			 */
            function setItemState( index ) {
                $carouselItem.removeClass( 'is-active' );
                $carouselItem.eq( index ).addClass( 'is-active' );   
            }      
            
			/*
			 * Store the latest position (X,Y) in a temporary variable
			 *
			 * @return {Array}              - Return to a new position.
			 */
            function createStoreLatestPosition() {
                const pos = [];
                // Retrieve the temporary variable of each item.
                $carouselItem.each( function() {
                    pos.push( ( carouselDir == 'horizontal' ? $( this )[0]._gsTransform.x : $( this )[0]._gsTransform.y ) );
                }); 
                return pos;
            }  

     
			/*
			 * Initialize the height of container
			 *
             * @param  {Number} index          - Get index of current element.
			 * @return {Void}
			 */
            function setContainerSize( index ) {
                
                const _h = eachItemNewHeight[Math.abs( index )];
                if ( typeof _h !== typeof undefined ) {
                    TweenMax.to( $carousel, 0.2, { 
                        height: eachItemNewHeight[Math.abs( index )]
                    } );	    
                }
 
            }   
              
           
            
   
			/*
			 * Set target index of the carousel buttons
			 *
			 * @param  {Element} nextBtn      - The next move button.
			 * @param  {Element} prevBtn      - The previous move button.
             * @param  {String} type          - The type of button is triggered. Values: next, prev, init
             * @param  {?Number} indexGo      - The target item index.
			 * @return {Void}
			 */
            function setButtonTargetIndex( nextBtn, prevBtn, type, indexGo ) {
                
                switch ( type ) {
                    case 'init':
                        nextBtn.attr({
                            'data-target-index': 1
                        });   
                        prevBtn.attr({
                            'data-target-index': 0
                        });   
                        
                        break;

                    case 'next':
                        let nextBtnOldTargetIndex1 = parseFloat( nextBtn.attr( 'data-target-index' ) );
                        let prevBtnOldTargetIndex1 = parseFloat( prevBtn.attr( 'data-target-index' ) );

                        if ( indexGo != null ) {
                            nextBtnOldTargetIndex1 = indexGo;
                            prevBtnOldTargetIndex1 = indexGo-1;
                        }

                        nextBtn.attr({
                            'data-target-index': nextBtnOldTargetIndex1+1
                        });   
                        prevBtn.attr({
                            'data-target-index': prevBtnOldTargetIndex1+1
                        });  
                        
                        break;  
                        
                    case 'prev':
                        let nextBtnOldTargetIndex2 = parseFloat( nextBtn.attr( 'data-target-index' ) ) - 1;
                        let prevBtnOldTargetIndex2 = parseFloat( prevBtn.attr( 'data-target-index' ) ) - 1;

                        if ( indexGo != null ) {
                            nextBtnOldTargetIndex2 = indexGo;
                            prevBtnOldTargetIndex2 = indexGo-1;
                        } 


                        nextBtn.attr({
                            'data-target-index': nextBtnOldTargetIndex2
                        });   
                        prevBtn.attr({
                            'data-target-index': prevBtnOldTargetIndex2
                        });   
                        
                        break;  
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
      
		});		

		
    };

    
    module.components.pageLoaded.push( module.HYBRID_CONTENT_SLIDER.pageLoaded );
	

	return class HYBRID_CONTENT_SLIDER {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );

