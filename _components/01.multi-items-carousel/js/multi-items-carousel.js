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
				$carousel          = $( '.items' ),
				$carouselItem      = $( '.items > .item' ),
				carouselItemTotal  = $carouselItem.length,
				showcarouselItem   = $carouselWrapper.data( 'cus-carousel-show' ),
				carouselItemWidth  = $carousel.width()/showcarouselItem,
				carouselLeft       = 0,
				carouselSpeed      = $carouselWrapper.data( 'cus-carousel-speed' ),
				carouselNext       = $carouselWrapper.data( 'cus-carousel-next' ),
				carouselPrev       = $carouselWrapper.data( 'cus-carousel-prev' );


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
			var newWidth = ( $carouselWrapper.width() / showcarouselItem );

			$carousel.css( 'width', carouselItemTotal * carouselItemWidth );


			// Re-order all items
			$carouselItem.each( function() {
				$( this ).css( 'left', carouselLeft + 'px' );
				$( this ).width( newWidth + 'px' );
				carouselLeft += newWidth;
			});


			//default button status
			if ( parseFloat( $carousel.css( 'marginLeft' ) ).toFixed(0) == 0 ) {
				$( carouselPrev ).addClass( 'disable' );
			}	

			/*! 
			 ------------------
			 Move left
			 ------------------
			 */ 
			$( carouselNext ).on( 'click', function( e ) {
				e.preventDefault();

				var $btn    = $( this ),
					btnLock = $btn.data( 'click' );

				if ( typeof btnLock === typeof undefined || btnLock === 0 ) {

					//Avoid button repeated trigger
					$btn.data( 'click', 1 );

					var original = parseFloat( $carousel.css( 'marginLeft' ) ).toFixed(0),
						target   = -parseFloat( (carouselItemTotal - showcarouselItem - 1)*carouselItemWidth ).toFixed(0);


					if ( original >= target ) {
						$carousel.animate({
							'marginLeft': '-=' + carouselItemWidth
						}, { duration: carouselSpeed, complete: function() {

							//Reset prevents code from duplicate run
							$( carouselPrev ).data( 'click', 0 ).removeClass( 'disable' );
							$btn.data( 'click', 0 );
						}} );	
					}

					if ( original == target ) {
						$btn.addClass( 'disable' );

					}
				}


			});

			
			/*! 
			 ------------------
			 Move right
			 ------------------
			 */ 
			$( carouselPrev ).on( 'click', function( e ) {

				e.preventDefault();

				var $btn    = $( this ),
					btnLock = $btn.data( 'click' );

				if ( typeof btnLock === typeof undefined || btnLock === 0 ) {

					//Avoid button repeated trigger
					$btn.data( 'click', 1 );


					var original = parseFloat( $carousel.css( 'marginLeft' ) ).toFixed(0),
						target   = 0;


					if ( original < target ) {
						$carousel.animate({
							'marginLeft': '+=' + carouselItemWidth
						}, { duration: carouselSpeed, complete: function() {

							//Reset prevents code from duplicate run
							$( carouselNext ).data( 'click', 0 ).removeClass( 'disable' );
							$btn.data( 'click', 0 );
						}} );	
					}	

					if ( original == -carouselItemWidth.toFixed(0) ) {
						$btn.addClass( 'disable' );

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






