
/* 
 *************************************
 * <!-- Accordion Background Images -->
 *************************************
 */
App = ( function ( App, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
		$( '.custom-accordion-img' ).each( function() {
			var $this           = $( this ),
				aEvent          = $this.data( 'event' ),
				outReset        = $this.data( 'out-reset' ),
				widthShow       = $this.data( 'width-show' ),
				closeBtn        = $this.data( 'close-btn' ),
				$li             = $this.find( 'ul' ).children( 'li' ),
				total           = $li.length;
			
			
			
			
			if( typeof aEvent === typeof undefined ) {
				aEvent = 'click';
			}	
			
			if( typeof outReset === typeof undefined ) {
				outReset = true;
			}	
			
			if( typeof widthShow === typeof undefined ) {
				widthShow = '60%';
			}		
			
			//Initialize the width of each item
			itemInit();
			

			$li.on( aEvent, function( e ) {
				//Prevents further propagation of the current event in the capturing and bubbling phases.
				e.stopPropagation();
			
				
				//Apply click method to outer div but not inner div
				if ( e.target.className == 'outer' ) {
					
					if ( $( this ).hasClass( 'active' ) ) {
						$( this ).addClass( 'active' );

					} else {
						
						$li.addClass( 'sub-active' );
						$( this ).addClass( 'active' );
						$( this ).siblings().removeClass( 'active' );

						$li.css( 'width', ( 100 - parseFloat( widthShow ) )/(total - 1) + '%' );
						$( this ).css( 'width', widthShow );

					}	
				}
			
			}); 
			
			if ( outReset ) {
				$this.on( 'mouseleave', function( e ) {
					itemInit();
				}); 	
			}
			
			if( typeof closeBtn != typeof undefined && closeBtn != false && closeBtn != '' ) {
				$( closeBtn ).on( 'click', function( e ) {
					e.preventDefault();
					itemInit();
				}); 		
				
			}	
			
	
			/*
			 * Initialize the width of each item
			 *
			 * @return {void}             - The constructor.
			 */
			function itemInit() {
				$li.removeClass( 'active sub-active' ).css( 'width', 100/total + '%' );
			}
			
			
			
		});
		
		
	};
	
		
    App.accordionImg = {
        documentReady : documentReady        
    };

    App.components.documentReady.push( documentReady );
    return App;

}( App, jQuery, window, document ) );
