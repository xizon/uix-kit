
/* 
 *************************************
 * <!-- Hybrid Content Slider -->
 *************************************
 */
import {
    templateUrl,
    homeUrl,
    ajaxUrl,
    UixBrowser,
    UixModuleInstance,
    UixGUID,
    UixMath,
    UixCssProperty,
    UixDebounce,
    UixThrottle
} from '@uixkit/core/_global/js';


import '../scss/_style.scss';


export const HYBRID_CONTENT_SLIDER = ( ( module, $, window, document ) => {
	if ( window.HYBRID_CONTENT_SLIDER === null ) return false;
	
	
	
    module.HYBRID_CONTENT_SLIDER               = module.HYBRID_CONTENT_SLIDER || {};
    module.HYBRID_CONTENT_SLIDER.version       = '0.1.1';
    module.HYBRID_CONTENT_SLIDER.pageLoaded    = function() {

		$( '.uix-hybrid-content-slider' ).each( function()  {

			let $sliderWrapper        = $( this ),
				$slider               = $sliderWrapper.find( '.uix-hybrid-content-slider__items' ),
				$sliderItem           = $sliderWrapper.find( '.uix-hybrid-content-slider__items > div' ),
				itemsTotal             = $sliderItem.length,
				amountVisible         = 1,
				sliderDir             = $sliderWrapper.data( 'dir' ),
				sliderSpeed           = $sliderWrapper.data( 'speed' ),
				sliderNext            = $sliderWrapper.data( 'next' ),
				sliderPrev            = $sliderWrapper.data( 'prev' ),
                sliderPagination      = $sliderWrapper.data( 'pagination' ),
				carouseDraggable        = $sliderWrapper.data( 'draggable' ),
				carouseDraggableCursor  = $sliderWrapper.data( 'draggable-cursor' );

			
			if ( typeof sliderDir === typeof undefined ) sliderDir = 'horizontal';
			if ( typeof sliderSpeed === typeof undefined ) sliderSpeed = 250;
			if ( typeof sliderNext === typeof undefined ) sliderNext = '#uix-hybrid-content-slider__controls-123 .uix-hybrid-content-slider__controls--next';
			if ( typeof sliderPrev === typeof undefined ) sliderPrev = '#uix-hybrid-content-slider__controls-123 .uix-hybrid-content-slider__controls--prev';
            if ( typeof sliderPagination === typeof undefined ) sliderPagination = '#uix-hybrid-content-slider__pagination-123';
			if ( typeof carouseDraggable === typeof undefined ) carouseDraggable = false;
			if ( typeof carouseDraggableCursor === typeof undefined ) carouseDraggableCursor = 'move';

            
            //Autoplay parameters
            let dataAuto                   = $sliderWrapper.data( 'auto' ),
                dataTiming                 = $sliderWrapper.data( 'timing' ),
                dataLoop                   = $sliderWrapper.data( 'loop' );  

            if ( typeof dataAuto === typeof undefined ) dataAuto = false;	
            if ( typeof dataTiming === typeof undefined ) dataTiming = 10000;
            if ( typeof dataLoop === typeof undefined ) dataLoop = false; 

            
            
            //Autoplay times
            let playTimes;
            //A function called "timer" once every second (like a digital watch).
            $sliderWrapper[0].animatedSlides;
            
            
            //Store the latest position (X,Y) in a temporary variable
            let tempItemsPos = [];
			
            
            //each item width and height
            let eachItemNewWidth, eachItemNewHeight = [];
            
            
            // Returns the value of a number rounded to the nearest integer.
            const midIndex = 0; 


            
            // Get the width and height of each item
            $sliderItem.each( function( index ) {
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
                if ( (i+1) == (itemsTotal - amountVisible) ) break;
            }
                   
            //Set target index of the slider buttons
            setButtonTargetIndex( $( sliderNext ), $( sliderPrev ), 'init', null );
            

            
            //set actived item & initialize the height of container
            setContainerSize( 0 );    
            $sliderItem.addClass( 'js-is-ready' ); 
            
            
            // Activate the current item from carouse
            setItemState( 0 );    


			/* 
			 ---------------------------
			 Initialize slider
			 ---------------------------
			 */  
			const eachItemOldWidth  = $slider.width()/amountVisible;

            eachItemNewWidth = ( $sliderWrapper.width() / amountVisible );
            
            if ( sliderDir === 'horizontal' ) {
                $slider.css( 'width', itemsTotal * eachItemOldWidth );
            }

            
			// Re-order all items
			sliderReOrder();



			//default button status
			$( sliderPrev ).addClass( 'is-disabled' ).data( 'disabled', 1 );	

			/* 
			 ---------------------------
			 Re-order all items
			 ---------------------------
			 */ 
			
			function sliderReOrder() {

				
                //Initialize the width and height of each item
				if ( sliderDir === 'horizontal' ) {
                    const boxWidth = eachItemNewWidth;
                    TweenMax.set($sliderItem, {
                        width: boxWidth,
                        height: function(i, target) {
                            return eachItemNewHeight[i];
                        },
                        x: function(i, target) {
                            return i * boxWidth;
                        }
                    });

				} else {
                    
                    TweenMax.set($sliderItem, {
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
			 Next/Prev buttons
			 ---------------------------
			 */ 
            const _prev = $( sliderPrev ),
                  _next = $( sliderNext );


            _next.off('click').on('click', $sliderWrapper, function (e) {
                e.preventDefault();
                btnNextMove();
            });

            _prev.off('click').on('click', $sliderWrapper, function (e) {
                e.preventDefault();
                btnPrevMove();
            });

            
            // (right/down)
            function btnPrevMove() {
                //Prevent buttons' events from firing multiple times
                if ( _prev.attr( 'aria-disabled' ) == 'true' ) return false;
                _prev.attr( 'aria-disabled', 'true' );

                _prev
                    .delay(sliderSpeed)
                    .queue(function(next) { _prev.attr( 'aria-disabled', 'false' ); next(); });
                
                //
                movePositionWithButton( false, _prev, 'prev' );
                
                //Pause the auto play event
                clearInterval( $sliderWrapper[0].animatedSlides );

            }

            // (left/up)
            function btnNextMove() {
                //Prevent buttons' events from firing multiple times
                if ( _next.attr( 'aria-disabled' ) == 'true' ) return false;
                _next.attr( 'aria-disabled', 'true' );

                _next
                    .delay(sliderSpeed)
                    .queue(function(next) { _next.attr( 'aria-disabled', 'false' ); next(); });                
                
                //
                movePositionWithButton( false, _next, 'next' );

                //Pause the auto play event
                clearInterval( $sliderWrapper[0].animatedSlides );	 
                
            } 

		

			/* 
			 ---------------------------
			 Pagination
			 ---------------------------
			 */ 
            if ( $( sliderPagination ).length > 0 && $( sliderPagination ).html().length == 0 ) {
                //Button to add pagination automatically
                let _dot       = '';
                _dot += '<ul class="uix-hybrid-content-slider__pagination--default">';
                for ( let i = 0; i < itemsTotal; i++ ) {
                    _dot += '<li><a data-target-index="'+i+'" href="javascript:void(0);"></a></li>';
                }
                _dot += '</ul>';

                $( sliderPagination ).html( _dot ).promise().done( function(){
                    // Activate the currently selected Pagination
                    setPaginationState( 0 );
                });	
            } else {
                // Activate the currently selected Pagination
                setPaginationState( 0 ); 
            }

            
			$( sliderPagination ).find( 'li a' ).off( 'click' ).on( 'click', $sliderWrapper, function( e ) {
				e.preventDefault();
                
                //Prevent buttons' events from firing multiple times
                if ( $( this ).attr( 'aria-disabled' ) == 'true' ) return false;
                $( sliderPagination ).find( 'li a' ).attr( 'aria-disabled', 'true' );
                
                $( sliderPagination ).find( 'li a' )
                    .delay(sliderSpeed)
                    .queue(function(next) { $( sliderPagination ).find( 'li a' ).attr( 'aria-disabled', 'false' ); next(); }); 
                
                
                //
                if ( !$( this ).parent().hasClass( 'is-active' ) ) {
                    
                    movePositionWithButton( true, $( this ), 'next' );

                    //Pause the auto play event
                    clearInterval( $sliderWrapper[0].animatedSlides );	
                }

			});		
            
            
			//Drag and Drop
			//-------------------------------------	
			const $dragDropTrigger = $sliderWrapper;
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
                const firstItemOffset = ( sliderDir === 'horizontal' ) ? $slider.find( '[data-index="0"]' )[0]._gsTransform.x : $slider.find( '[data-index="0"]' )[0]._gsTransform.y;
                
                const maxMoveOffset = ( sliderDir === 'horizontal' ) ? -eachItemNewWidth*(itemsTotal-amountVisible) : -totalItemsHeight;

                
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

                if ( sliderDir === 'horizontal' ) {
                    switch ( direction ) {
                        case 'panleft':

                            if ( ev.deltaX > -eachItemNewWidth/4 && ev.deltaX < 0 ) {
                                elAnim = false;  
                                
                                const simulationButtonNext = $( sliderNext );
                                itemUpdates( $sliderWrapper, simulationButtonNext, ev.deltaX, 0.1, true, targetIndex, allHeightStr );
                            } else {
                                elAnim = ( currentIsFirstOrLast ) ? false : true;
                            }


                            break;
                        case 'panright':

                            if ( ev.deltaX < eachItemNewWidth/4 && ev.deltaX > 0 ) {
                                elAnim = false;  
                                
                                const simulationButtonPrev = $( sliderPrev );
                                itemUpdates( $sliderWrapper, simulationButtonPrev, ev.deltaX, 0.1, true, targetIndex, allHeightStr );
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
                                
                                const simulationButtonNext = $( sliderNext );
                                itemUpdates( $sliderWrapper, simulationButtonNext, ev.deltaY, 0.1, true, targetIndex, allHeightStr );
                            } else {
                                elAnim = ( currentIsFirstOrLast ) ? false : true;
                            }


                            break;

                        case 'pandown':

                            if ( ev.deltaY < draggingItemHeight/4 && ev.deltaY > 0 ) {
                                elAnim = false;  
                                
                                const simulationButtonPrev = $( sliderPrev );
                                itemUpdates( $sliderWrapper, simulationButtonPrev, ev.deltaY, 0.1, true, targetIndex, allHeightStr );
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
                    
                    if ( sliderDir === 'horizontal' ) {
                        switch ( direction ) {
                            case 'panleft':
                                btnNextMove();
                                break;

                            case 'panright':
                                btnPrevMove();
                                break;                 

                        }  
                        
                    } else {
                        switch ( direction ) {
                            case 'panup':
                                btnNextMove();
                                break;

                            case 'pandown':
                                btnPrevMove();
                                break;                 

                        }     
                    }
                    
                    		    
                } else {    
                    
                    //Rebound effect of drag offset 
                    itemUpdates( $sliderWrapper, false, tempItemsPos, null, false, targetIndex, allHeightStr);
                }
                
                //Pause the auto play event
                clearInterval( $sliderWrapper[0].animatedSlides );

			});	
            

                    
            //Autoplay Slider
            //-------------------------------------		
            if ( dataAuto && !isNaN( parseFloat( dataTiming ) ) && isFinite( dataTiming ) ) {

                sliderAutoPlay( playTimes, dataTiming, dataLoop );

                const autoplayEnter = function() {
                    clearInterval( $sliderWrapper[0].animatedSlides );
                };

                const autoplayLeave = function() {
                    sliderAutoPlay( playTimes, dataTiming, dataLoop );
                };


                // Do not use the `off()` method, otherwise it will cause the second mouseenter to be invalid
                $sliderWrapper.on( 'mouseenter', autoplayEnter );
                $sliderWrapper.on( 'mouseleave', autoplayLeave );  

                // To determine if it is a touch screen.
                if (Modernizr.touchevents) {
                    $sliderWrapper.on( 'pointerenter', autoplayEnter );
                    $sliderWrapper.on( 'pointerleave', autoplayLeave );  
                }



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

                $sliderWrapper[0].animatedSlides = setInterval( function() {

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
                        const delta = ( sliderDir === 'horizontal' ) ? -moveX : -moveY;

                        //
                        itemUpdates( $sliderWrapper, 'auto', delta, null, false, indexGo, eachItemNewHeight );    
                    }; 
                    
                    playTimes = parseFloat( $sliderItem.filter( '.is-active' ).index() );
                    playTimes++;
                    
                    
                    if ( !loop ) {
                        if ( playTimes < itemsTotal && playTimes >= 0 ) {
                            autoMove( playTimes );
                        }
                    } else {
                        if ( playTimes == itemsTotal ) playTimes = 0;
                        if ( playTimes < 0 ) playTimes = itemsTotal-1;		
                        
                        autoMove( playTimes );
                    }

                }, timing );	
            }


            
			
			/*
			 * Transition Between Items
			 *
			 * @param  {Element} wrapper                  - Wrapper of slider.
			 * @param  {?Element|String|Boolean} curBtn   - The button that currently triggers the move.
             * @param  {Number|Array} delta               - The value returned will need to be adjusted according 
             *                                              to the offset  * rate.
             * @param  {?Number} speed                     - Sliding speed. Please set to 0 when rebounding.
             * @param  {Boolean} dragging                  - Determine if the object is being dragged.
             * @param  {!Number} indexGo                   - The target item index.
             * @param  {String|Array} itemsHeight          - Return all items height (the string type is 
             *                                               used when a drag event is triggered).
			 * @return {Void}
			 */
			function itemUpdates( wrapper, curBtn, delta, speed, dragging, indexGo, itemsHeight ) {
                
                if ( speed == null ) speed = sliderSpeed/1000;
                
				let $curWrapper = wrapper.children( '.uix-hybrid-content-slider__items' ),  //Default: $slider
					$curItems   = $curWrapper.find( '> div' ); //Default: $sliderItem
           
                
                //Get height constant
                const itemsHeightArr = [];
                const _itemsHeight = itemsHeight.toString().split( ',' );
                _itemsHeight.forEach( function( element ) {
                    itemsHeightArr.push( parseFloat(element) );
                });
                
                
                //Check next or previous event
                let btnType = 'init';
                if ( curBtn !== false && curBtn !== 'auto' ) {
                    if ( typeof curBtn.attr( 'class' ) !== typeof undefined ) {
                        btnType = ( curBtn.attr( 'class' ).indexOf( '--next' ) >=0 ) ? 'next' : 'prev';
                    } else {
                        btnType = 'next';
                    }
                    
                }
                
                //Check next or previous event ( Autoplay )
                if ( curBtn === 'auto' ) btnType = 'next';;

            
				//Clone the first element to the last position
				if ( sliderDir === 'horizontal' ) {

                    const boxWidth = eachItemNewWidth;
                    
                    TweenMax.to( $curItems, speed, {
                        x: function(i, target) {

                            let xIncrement = 0;

                            for (let k = 0; k < itemsTotal; k++ ) {    
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
                                    
                                    for (let m= 0; m < itemsTotal; m++ ) {    
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

                                //Set target index of the slider buttons
                                setButtonTargetIndex( $( sliderNext ), $( sliderPrev ), btnType, ( btnType == 'next' ? Math.abs( currentIndex ) : Math.abs( currentIndex ) + 1 ) );   
                                
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

                                //Set target index of the slider buttons
                                setButtonTargetIndex( $( sliderNext ), $( sliderPrev ), btnType, indexGo ); 

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
			 * @param  {Boolean} paginationEnabled   - Determine whether it is triggered by pagination
			 * @param  {Element} $btn               - The button that currently triggers the move.
             * @param  {String} type                - Move next or previous.
			 * @return {Void}
			 */
            function movePositionWithButton( paginationEnabled, $btn, type ) {
   				const //Protection button is not triggered multiple times.
                      btnDisabled = $btn.data( 'disabled' ),
                      
                      //Get current button index
                      tIndex      = parseFloat( $btn.attr( 'data-target-index' ) );
                

                // Retrieve the position (X,Y) of an element 
                let moveX = eachItemNewWidth,
                    moveY = ( typeof eachItemNewHeight[tIndex-1] === typeof undefined ) ? 0 : eachItemNewHeight[tIndex-1];   
                
                if ( paginationEnabled ) {
                    
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
                    delta = ( sliderDir === 'horizontal' ) ? -moveX : -moveY;
                } else {
                    delta = ( sliderDir === 'horizontal' ) ? moveX : moveY;
                }
                
               
				if ( typeof btnDisabled === typeof undefined ) {	
					itemUpdates( $sliderWrapper, $btn, delta, null, false, tIndex, eachItemNewHeight );
                    
				}    
            }  
            


			/*
			 * Activate the currently selected Pagination
			 *
             * @param  {Number} index          - Get index of current element.
			 * @return {Void}
			 */
            function setPaginationState( index ) {
                $( sliderPagination ).find( 'li' ).removeClass( 'is-active' );
                $( sliderPagination ).find( 'li a[data-target-index="'+index+'"]' ).parent().addClass( 'is-active' );   
            }   
                 
			/*
			 * Activate the current item from carouse
			 *
             * @param  {Number} index          - Get index of current element.
			 * @return {Void}
			 */
            function setItemState( index ) {
                $sliderItem.removeClass( 'is-active' );
                $sliderItem.eq( index ).addClass( 'is-active' );   
            }      
            
			/*
			 * Store the latest position (X,Y) in a temporary variable
			 *
			 * @return {Array}              - Return to a new position.
			 */
            function createStoreLatestPosition() {
                const pos = [];
                // Retrieve the temporary variable of each item.
                $sliderItem.each( function() {
                    pos.push( ( sliderDir === 'horizontal' ? $( this )[0]._gsTransform.x : $( this )[0]._gsTransform.y ) );
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
                    TweenMax.to( $slider, 0.2, { 
                        height: eachItemNewHeight[Math.abs( index )]
                    } );	    
                }
 
            }   
              
           
            
   
			/*
			 * Set target index of the slider buttons
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
                    $( sliderNext ).addClass( 'is-disabled' ).data( 'disabled', 1 );
                    $( sliderPrev ).removeClass( 'is-disabled' ).removeData( 'disabled' );
                } else if ( Math.round( firstOffset ) == 0 ) {
                    $( sliderNext ).removeClass( 'is-disabled' ).removeData( 'disabled' );
                    $( sliderPrev ).addClass( 'is-disabled' ).data( 'disabled', 1 );
                } else {
                    $( sliderNext ).removeClass( 'is-disabled' ).removeData( 'disabled' );
                    $( sliderPrev ).removeClass( 'is-disabled' ).removeData( 'disabled' );
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

