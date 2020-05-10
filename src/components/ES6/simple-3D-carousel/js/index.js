
/* 
 *************************************
 * <!-- 3D Carousel -->
 *************************************
 */
/**
 * module.THREE_CAROUSEL
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


export const THREE_CAROUSEL = ( ( module, $, window, document ) => {
	if ( window.THREE_CAROUSEL === null ) return false;
	
	
	
    module.THREE_CAROUSEL               = module.THREE_CAROUSEL || {};
    module.THREE_CAROUSEL.version       = '0.0.2';
    module.THREE_CAROUSEL.documentReady = function( $ ) {

		$( '.uix-3d-carousel' ).each( function() {
			const $this             = $( this );
            
            let $wrapper          = $this.find( '> ul' ),
				$items            = $wrapper.find( '> li' ),
                itemCount         = $items.length;
            
			let	dataTiming        = $this.data( 'timing' ),
				dataPrevBtn       = $this.data( 'prev-btn' ),
				dataNextBtn       = $this.data( 'next-btn' ),
				dataDraggable     = $this.data( 'draggable' ),
			    autoSwap          = null,
				items             = [],
				startItem         = 1,
				position          = 0,
				leftpos           = itemCount,
				resetCount        = itemCount;

			if ( typeof dataTiming === typeof undefined ) dataTiming = 5000;
			if ( typeof dataPrevBtn === typeof undefined ) dataPrevBtn = ".my-carousel-3d-prev";
			if ( typeof dataNextBtn === typeof undefined ) dataNextBtn = ".my-carousel-3d-next";
			if ( typeof dataDraggable === typeof undefined ) dataDraggable = false;
			

			//Avoid problems caused by insufficient quantity
			//-------------------------------------		
			if ( itemCount == 3 ) {
				const $clone3 = $items.eq(1).clone();
				$items.last().after( $clone3 );
			}
			
			if ( itemCount == 2 ) {
				const $clone2_1 = $items.eq(0).clone(),
					  $clone2_2 = $items.eq(1).clone();
				$items.last().after( [$clone2_1, $clone2_2 ] );
			}
			
			if ( itemCount == 1 ) {
				const $clone1_1 = $items.eq(0).clone(),
					  $clone1_2 = $items.eq(0).clone(),
					  $clone1_3 = $items.eq(0).clone();
					
				$items.last().after( [$clone1_1, $clone1_2, $clone1_3 ] );
			}		
			

			//New objects of items and wrapper
			$wrapper  = $this.find( '> ul' );
			$items = $wrapper.find( '> li' );
			itemCount = $items.length;
			leftpos  = itemCount;
			resetCount = itemCount;

			//Adding an index to an element makes it easy to query
			//-------------------------------------	
			$items.each( function( index ) {
				items[index] = $( this ).text();
				$( this ).attr( 'id', index+1 );

			});

			//Pause slideshow and reinstantiate on mouseout
			//-------------------------------------	
			$wrapper.on( 'mouseenter', function() {
				clearInterval( autoSwap );
			} ).on( 'mouseleave' , function() {
				autoSwap = setInterval( itemUpdates, dataTiming );
			} );


			
			//Initialize the default effect
			//-------------------------------------	
			itemUpdates( 'clockwise' );
			
			
			//The matched click events for the element.
			//-------------------------------------	
			$( dataPrevBtn ).on( 'click', function( e ) {
				e.preventDefault();
				itemUpdates( 'clockwise' );
				return false;
				
			});
			$( dataNextBtn ).on( 'click', function( e ) {
				e.preventDefault();
				itemUpdates( 'counter-clockwise' );
				return false;
				
			});
			
			
			$items.on( 'click', function( e ) {
				e.preventDefault();

				if ( $( this ).attr( 'class' ) == 'uix-3d-carousel__item uix-3d-carousel__item--left-pos' ) {
					itemUpdates( 'counter-clockwise' );
				} else {
					itemUpdates( 'clockwise' );
				}
			});


			//Drag and Drop
			//-------------------------------------	
			const $dragDropTrigger = $wrapper;
            
			let	hammerProps = {};

			
			if ( !dataDraggable ) {
				hammerProps = {
					inputClass: Hammer.TouchInput
				};
			}

			//Mouse event
			//Hammer.js pan event only for touch devices and not for desktop computer Click+Drag
			let direction;
            const dragDropElement = $dragDropTrigger[0],
				  dragDropMC      = new Hammer( dragDropElement, hammerProps );
			
            // let the pan gesture support all directions.
            // this will block the vertical scrolling on a touch-device while on the element
            dragDropMC.get('pan').set({ direction: Hammer.DIRECTION_ALL });
            
			dragDropMC.on( 'press panright panleft', function( ev ) {

				//Set the direction in here
				direction = ev.type;
			});



			dragDropMC.on( 'panend', function( ev ) {

				//Use the direction in here
				//You know the pan has ended
				//and you know which action they were taking
				if ( direction == 'panleft' ) {
					itemUpdates( 'clockwise' );
				}

				if ( direction == 'panright' ) {
					itemUpdates( 'counter-clockwise' );
				}			



			});	

			

			/*
			 * Swap Between Images
			 *
			 * @param  {String} action           - Direction of movement, optional: clockwise, counter-clockwise
			 * @return {Void}
			 */
			function itemUpdates( action ) {
				const direction = action;

				//moving carousel backwards
				if ( direction == 'counter-clockwise' ) {
					let leftitem = parseFloat( $wrapper.find( '> li.uix-3d-carousel__item--left-pos' ).attr( 'id' ) - 1 );
					if ( leftitem == 0 ) {
						leftitem = itemCount;
					}

					$wrapper.find( '> li.uix-3d-carousel__item--right-pos' ).removeClass( 'uix-3d-carousel__item--right-pos' ).addClass( 'uix-3d-carousel__item--back-pos' );
					$wrapper.find( '> li.uix-3d-carousel__item--main-pos' ).removeClass( 'uix-3d-carousel__item--main-pos' ).addClass( 'uix-3d-carousel__item--right-pos' );
					$wrapper.find( '> li.uix-3d-carousel__item--left-pos' ).removeClass( 'uix-3d-carousel__item--left-pos' ).addClass( 'uix-3d-carousel__item--main-pos' );
					$wrapper.find( '> li#' + leftitem + '').removeClass( 'uix-3d-carousel__item--back-pos' ).addClass( 'uix-3d-carousel__item--left-pos' );

					startItem--;

					if ( startItem < 1 ) {
						startItem = itemCount;
					}
				}

				//moving carousel forward
				if ( direction == 'clockwise' || direction == '' || direction == null ) {
					const carousel3DPos = function( dir ) {
						if ( dir != 'leftposition' ) {
							//increment image list id
							position++;

							//if final result is greater than image count, reset position.
							if ( startItem + position > resetCount ) {
								position = 1 - startItem;
							}
						}

						//setting the left positioned item
						if (dir == 'leftposition') {
							//left positioned image should always be one left than main positioned image.
							position = startItem - 1;

							//reset last image in list to left position if first image is in main position
							if (position < 1) {
								position = itemCount;
							}
						}

						return position;
					};

					$wrapper.find( '> li#' + startItem + '').removeClass( 'uix-3d-carousel__item--main-pos' ).addClass( 'uix-3d-carousel__item--left-pos' );
					$wrapper.find( '> li#' + (startItem + carousel3DPos()) + '').removeClass( 'uix-3d-carousel__item--right-pos' ).addClass( 'uix-3d-carousel__item--main-pos' );
					$wrapper.find( '> li#' + (startItem + carousel3DPos()) + '').removeClass( 'uix-3d-carousel__item--back-pos' ).addClass( 'uix-3d-carousel__item--right-pos' );
					$wrapper.find( '> li#' + carousel3DPos( 'leftposition' ) + '').removeClass( 'uix-3d-carousel__item--left-pos' ).addClass( 'uix-3d-carousel__item--back-pos' );

					startItem++;
					position = 0;
					if ( startItem > itemCount ) {
						startItem = 1;
					}
				}
			}

			

		});

		
    };

    module.components.documentReady.push( module.THREE_CAROUSEL.documentReady );
	

	return class THREE_CAROUSEL {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );


