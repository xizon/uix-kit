/* 
 *************************************
 * <!-- Testimonials Carousel -->
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {
    
		var $obj                 = $( '.custom-testimonials .flexslider' ),
			testimonialsControls = '';
		
		
		for ( var i = 0; i < $obj.find( '.slides > li' ).length; i++ ) {
			testimonialsControls += '<li></li>';
		}
		$( '.slides-custom-control' ).html( testimonialsControls );
    	
		
		
		$obj.flexslider({
			animation         : 'slide',
			slideshow         : true,
			smoothHeight      : true,
			controlNav        : true,
			manualControls    : '.slides-custom-control li',
			directionNav      : false,
			animationSpeed    : 600,
			slideshowSpeed    : 7000,
			selector          : ".slides > li",
			start: function(slider){
				$obj.on( 'mousedown', function( e ) {
					if ( $obj.data( 'flexslider' ).animating ) {
						return;
					}
						
					$( this ).addClass('dragging');
					$( this ).data( 'origin_offset_x', parseInt( $( this ).css( 'margin-left' ) ) );
					$( this ).data( 'origin_offset_y', parseInt( $( this ).css( 'margin-top' ) ) );
					$( this ).data( 'origin_mouse_x', parseInt( e.pageX ) );
					$( this ).data( 'origin_mouse_y', parseInt( e.pageY ) );
				} );
			
				$obj.on( 'mouseup', function( e ) {
					if ( $obj.data('flexslider').animating ) {
						return;
					}
						
					$( this ).removeClass('dragging');
					var origin_mouse_x = $( this ).data( 'origin_mouse_x' ),
					    origin_mouse_y = $( this ).data( 'origin_mouse_y' );
					
					if ( 'horizontal' === $obj.data('flexslider').vars.direction ) {
						if ( e.pageX > origin_mouse_x ) {
							$obj.flexslider('prev');
						}
						if ( e.pageX < origin_mouse_x ) {
							$obj.flexslider('next');
						}
					} else {
						if ( e.pageY > origin_mouse_y ) {
							$obj.flexslider('prev');
						}
						if ( e.pageY < origin_mouse_y ) {
							$obj.flexslider('next');
						}
					}
				} );
				
				
				$( '.custom-testimonials-count .total' ).text( '0' + slider.count );
				$( '.custom-testimonials-count .cur' ).text( '0' + parseFloat( slider.currentSlide + 1 ) );
				
			},
			after: function(slider){
				
				$( '.custom-testimonials-count .total' ).text( '0' + slider.count );
				$( '.custom-testimonials-count .cur' ).text( '0' + parseFloat( slider.currentSlide + 1 ) );
				
			}
		});
		
		
    };

    theme.testimonials = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );






