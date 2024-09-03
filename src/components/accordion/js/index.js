
/* 
 *************************************
 * <!-- Accordion -->
 *************************************
 */
import {
    UixModuleInstance,
} from '@uixkit/core/_global/js';


import '../scss/_style.scss';


export const ACCORDION = ( ( module, $, window, document ) => {
	if ( window.ACCORDION === null ) return false;
	
	
	
    module.ACCORDION               = module.ACCORDION || {};
    module.ACCORDION.version       = '0.0.3';
    module.ACCORDION.documentReady = function( $ ) {

		$( '.uix-accordion' ).each( function() {
			const $this           = $( this );
            
			const $li             = $this.children( 'dl' ),
				  $titlebox       = $this.find( 'dt' );
            
			let	aEvent          = $this.data( 'event' ),
				firstShow       = $this.data( 'first-show' );
            

			
			
			const openItem = function( obj ) {
				//to open
				// - temporarilty set height:auto
				// - tween from height:0
				TweenMax.set( obj, { height: 'auto' } );
				TweenMax.from( obj, 0.5, { height:0 } );		
			};
			
			if ( typeof aEvent === typeof undefined ) {
				aEvent = 'click';
			}	
			
			if ( typeof firstShow === typeof undefined ) {
				firstShow = false;
			}		
			
		
			if ( firstShow ) {
				$li.first().addClass( 'is-active' ).attr( 'aria-expanded', true );
				openItem( $li.first().find( 'dd' ) );
				
			}
			
			

			$li.off( aEvent ).on( aEvent, function( e ) {
				//Prevents further propagation of the current event in the capturing and bubbling phases.
				e.stopPropagation();
				
			
				//Its value is not a boolean but a string
				const expanded = ( $( this ).attr( 'aria-expanded' ) == 'true' ) ? false : true,
					  $content = $( this ).find( 'dd' );
				
				if ( expanded ) {
					//Hide other all sibling <dt> of the selected element
					const $e = $( this ).siblings();
					$e.removeClass( 'is-active' ).attr( 'aria-expanded', false );
					
					$( this ).addClass( 'is-active' ).attr( 'aria-expanded', true );
					
					TweenMax.to( $e.find( 'dd' ), 0.5, { 
						height: 0
					} );
					
					//to open
					openItem( $content );


					
				} else {
					
					if ( e.type == 'click' ) {
						$( this ).removeClass( 'is-active' ).attr( 'aria-expanded', false );
						
						//to close
						TweenMax.to( $content, 0.5, { height: 0 } );

					}
					
				}
				

			}); 
						
			
			
		});
		
    };

    module.components.documentReady.push( module.ACCORDION.documentReady );
	

	return class ACCORDION {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );

