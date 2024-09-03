
/* 
 *************************************
 * <!-- Accordion Background Images -->
 *************************************
 */
import {
    UixModuleInstance,
} from '@uixkit/core/_global/js';


import '../scss/_style.scss';


export const ACCORDION_BG = ( ( module, $, window, document ) => {
	if ( window.ACCORDION_BG === null ) return false;
	
	
	
    module.ACCORDION_BG               = module.ACCORDION_BG || {};
    module.ACCORDION_BG.version       = '0.0.7';
    module.ACCORDION_BG.documentReady = function( $ ) {
		
		
		
		let	windowWidth        = window.innerWidth,
			windowHeight       = window.innerHeight;
		
		
		if ( windowWidth <= 768 ) return false;
		
		
		$( '.uix-accordion-img' ).each( function() {
			const $this           = $( this );
            
			let	aEvent          = $this.data( 'event' ),
				outReset        = $this.data( 'out-reset' ),
				activeIndex     = $this.data( 'actived-item' ),
				offsetVal       = $this.data( 'offset' ),
				dir             = $this.data( 'direction' ),
				closeBtn        = $this.data( 'close-btn' ),
				$li             = $this.find( '> ul' ).children( 'li' ),
				total           = $li.length;
			
			
			
			if ( typeof activeIndex === typeof undefined ) {
				activeIndex = false;
			}			
			
			if ( typeof aEvent === typeof undefined ) {
				aEvent = 'click';
			}	
			
			if ( typeof outReset === typeof undefined ) {
				outReset = true;
			}	
			
			if ( typeof offsetVal === typeof undefined ) {
				offsetVal = '60%';
			}		
			
			//Initialize the width or height of each item
			itemInit();
			
			

			$li.on( aEvent, function( e ) {
				//Prevents further propagation of the current event in the capturing and bubbling phases.
				e.stopPropagation();
			
				
				//Apply click method to outer div but not inner div
				if ( e.target.className == 'uix-accordion-img__content__info' || e.target.className == 'uix-accordion-img__content' ) {
					
					if ( $( this ).hasClass( 'is-active' ) ) {
						$( this ).addClass( 'is-active' );

					} else {
						
						$li.addClass( 'active-sub' );
						$( this ).addClass( 'is-active' );
						$( this ).siblings().removeClass( 'is-active' );

						if ( dir == 'verticle' ) {
							$li.css( 'height', ( 100 - parseFloat( offsetVal ) )/(total - 1) + '%' );
							$( this ).css( 'height', offsetVal );	
						} else {
							$li.css( 'width', ( 100 - parseFloat( offsetVal ) )/(total - 1) + '%' );
							$( this ).css( 'width', offsetVal );	
						}
						
						


					}	
				}
			
			}); 
			
			if ( outReset ) {
				$this.on( 'mouseleave', function( e ) {
					itemInit();
				}); 	
			}
			
			if ( typeof closeBtn != typeof undefined && closeBtn != false && closeBtn != '' ) {
				$( closeBtn ).off( 'click' ).on( 'click', function( e ) {
					e.preventDefault();
					itemInit();
				}); 		
				
			}	
			
			/*
			 * Active the target item
			 *
		     * @param  {Number} index     - The index value of the item to be activated.
			 * @return {Void}
			 */
			function itemActiveItem( index ) {
				
				if ( index >= 0 ) {
					

					if ( dir == 'verticle' ) {
						$li.css( 'height', ( 100 - parseFloat( offsetVal ) )/(total - 1) + '%' );
						$li.eq( index ).css( 'height', offsetVal ).addClass( 'is-active' );	
					} else {
						$li.css( 'width', ( 100 - parseFloat( offsetVal ) )/(total - 1) + '%' );
						$li.eq( index ).css( 'width', offsetVal ).addClass( 'is-active' );	
					}

				}

			}
			
			itemActiveItem( parseFloat( activeIndex ) );
			
			
	
			/*
			 * Initialize the width or height of each item
			 *
			 * @return {Void}
			 */
			function itemInit() {
				

				if ( dir == 'verticle' ) {
					$li.removeClass( 'is-active active-sub' ).css( 'height', 100/total + '%' );
				} else {
					$li.removeClass( 'is-active active-sub' ).css( 'width', 100/total + '%' );
				}
				
			}
			
			
			
			
		});
		
	
		

		
		
    };

    module.components.documentReady.push( module.ACCORDION_BG.documentReady );

	return class ACCORDION_BG {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );

