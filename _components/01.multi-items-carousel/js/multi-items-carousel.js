/*! 
 *************************************
 * Multiple Items Carousel
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {
    
		$( '.custom-multi-items-carousel' ).each( function()  {

			var $carouselWrapper   = $( this ),
				$carousel          = $carouselWrapper.find( '.items' ),
				$carouselItem      = $carouselWrapper.find( '.items > .item' ),
				carouselItemTotal  = $carouselItem.length,
				showcarouselItem   = $carouselWrapper.data( 'cus-carousel-show' ),
				carouselItemWidth  = $carousel.width()/showcarouselItem,
				carouselItemHeight = $carousel.height()/showcarouselItem,
				carouselDir        = $carouselWrapper.data( 'cus-carousel-dir' ),
				carouselLoop       = $carouselWrapper.data( 'cus-carousel-loop' ),
				carouselSpeed      = $carouselWrapper.data( 'cus-carousel-speed' ),
				carouselNext       = $carouselWrapper.data( 'cus-carousel-next' ),
				carouselPrev       = $carouselWrapper.data( 'cus-carousel-prev' );

			if( typeof carouselDir === typeof undefined ) {
				carouselDir = 'horizontal';
			}
			
			if( typeof carouselLoop === typeof undefined ) {
				carouselLoop = false;
			}
			if( typeof showcarouselItem === typeof undefined ) {
				showcarouselItem = 3;
			}
			if( typeof carouselSpeed === typeof undefined ) {
				carouselSpeed = 250;
			}
			if( typeof carouselNext === typeof undefined ) {
				carouselNext = '.next';
			}
			if( typeof carouselPrev === typeof undefined ) {
				carouselPrev = '.prev';
			}


			/*! 
			 ------------------
			 Initialize carousel
			 ------------------
			 */  
			var newWidth, newHeight;
			if ( carouselDir == 'horizontal' ) { 
				newWidth = ( $carouselWrapper.width() / showcarouselItem );
				$carousel.css( 'width', carouselItemTotal * carouselItemWidth );
			} else {
				newHeight = ( $carouselWrapper.height() / showcarouselItem );
				$carousel.css( 'height', carouselItemTotal * carouselItemHeight );
			}


			// Re-order all items
			carouselReOrder();



			//default button status
			if ( $carouselItem.first().data( 'id' ) == 1 && !carouselLoop ) {
				$( carouselPrev ).addClass( 'disable' );
			}	

			/*! 
			 ------------------
			 Re-order all items
			 ------------------
			 */ 
			
			function carouselReOrder() {
				
				$carouselWrapper.find( '.items > .item' ).each( function( index ) {
					
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
			
			
			/*! 
			 ------------------
			 Move left
			 ------------------
			 */ 
			$( carouselNext ).on( 'click', $carouselWrapper, function( e ) {
				e.preventDefault();
				
				
				var $btn        = $( this ),
					btnLock     = $btn.data( 'click' ),
					$curWrapper = $( e.data[0] ),
					$curItems   = $curWrapper.children().find( '> .item' ),
					isEnd       = false;
				

				//Move to the end
				if ( (carouselItemTotal - showcarouselItem + 1) == $curItems.first().data( 'id' ) ) {
					isEnd = true;
				}
				if ( (carouselItemTotal - showcarouselItem) == $curItems.first().data( 'id' ) && !carouselLoop ) {
					$btn.addClass( 'disable' );
				}
				
				
				//Loop items
				if ( carouselLoop ) {
					isEnd = false;
				}
				
				
				if ( typeof btnLock === typeof undefined || btnLock === 0 ) {
					
					if ( !isEnd ) {
						
						//Avoid button repeated trigger
						$btn.data( 'click', 1 );
						
						if ( carouselDir == 'horizontal' ) {
							
							$curItems
								.first()
								.animate({
									'marginLeft': -carouselItemWidth
								}, { duration: carouselSpeed, complete: function() {

									//Initialize each item "margin-left"
									$curItems.css( 'margin-left', 0 );

									//Clone the first element to the last position
									$curItems
										.first()
										.clone()
										.appendTo( $carousel );


									$( this ).remove();



									//Reset prevents code from duplicate run
									$( carouselPrev ).data( 'click', 0 ).removeClass( 'disable' );
									$btn.data( 'click', 0 );

								}} );	
							
						} else {
							
							$curItems
								.first()
								.animate({
									'marginTop': -carouselItemHeight
								}, { duration: carouselSpeed, complete: function() {

									//Initialize each item "margin-top"
									$curItems.css( 'margin-top', 0 );

									//Clone the first element to the last position
									$curItems
										.first()
										.clone()
										.appendTo( $carousel );


									$( this ).remove();



									//Reset prevents code from duplicate run
									$( carouselPrev ).data( 'click', 0 ).removeClass( 'disable' );
									$btn.data( 'click', 0 );

								}} );		
						}

	
					}


					
	
				}


			});

			
			/*! 
			 ------------------
			 Move right
			 ------------------
			 */ 
			$( carouselPrev ).on( 'click', $carouselWrapper, function( e ) {
				e.preventDefault();

				
				var $btn        = $( this ),
					btnLock     = $btn.data( 'click' ),
					$curWrapper = $( e.data[0] ),
					$curItems   = $curWrapper.children().find( '> .item' ),
					isEnd       = false;
				

				//Move to the end
				if ( 1 == $curItems.first().data( 'id' ) ) {
					isEnd = true;
				}
				if ( 2 == $curItems.first().data( 'id' ) && !carouselLoop ) {
					$btn.addClass( 'disable' );
				}
				
				
				//Loop items
				if ( carouselLoop ) {
					isEnd = false;
				}
				
				
				if ( typeof btnLock === typeof undefined || btnLock === 0 ) {
					
					if ( !isEnd ) {
						
						//Avoid button repeated trigger
						$btn.data( 'click', 1 );

				
						//Clone the first element to the last position
						if ( carouselDir == 'horizontal' ) {
							$curItems
								.last()
								.clone()
								.prependTo( $carousel )
								.css( 'margin-left', -carouselItemWidth + 'px' )
								.animate({
									'marginLeft': 0
								}, { duration: carouselSpeed, complete: function() {

									//Initialize each item "margin-left"
									$curItems.css( 'margin-left', 0 );


									$curItems
										.last()
										.remove();



									//Reset prevents code from duplicate run
									$( carouselNext ).data( 'click', 0 ).removeClass( 'disable' );
									$btn.data( 'click', 0 );

								}} );			
							
						} else {
							$curItems
								.last()
								.clone()
								.prependTo( $carousel )
								.css( 'margin-top', -carouselItemHeight + 'px' )
								.animate({
									'marginTop': 0
								}, { duration: carouselSpeed, complete: function() {

									//Initialize each item "margin-top"
									$curItems.css( 'margin-top', 0 );


									$curItems
										.last()
										.remove();



									//Reset prevents code from duplicate run
									$( carouselNext ).data( 'click', 0 ).removeClass( 'disable' );
									$btn.data( 'click', 0 );

								}} );		
						}
						
						
	
					}


					
	
				}
				
				

			});
			
			
			


		});		
		
		
    };

    theme.multiItemsCarousel = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );






