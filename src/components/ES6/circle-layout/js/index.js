
/* 
 *************************************
 * <!-- Circle Layout -->
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
    UixCssProperty
} from '@uixkit/core/_global/js';


import '../scss/_style.scss';


export const CIRCLE_LAYOUT = ( ( module, $, window, document ) => {
	if ( window.CIRCLE_LAYOUT === null ) return false;
	
	
    module.CIRCLE_LAYOUT               = module.CIRCLE_LAYOUT || {};
    module.CIRCLE_LAYOUT.version       = '0.0.1';
    module.CIRCLE_LAYOUT.documentReady = function( $ ) {

		$( '.js-uix-circle-layout' ).each( function( id ) {
			var $this             = $( this ),
				$ul               = $this.find( '> ul' ),
			    $li               = $ul.find( '> li' ),
				liWidth           = $li.first().outerWidth(),
				liHeight          = $li.first().outerHeight(),
				display           = $this.data( 'circle-layout-display' ),
				radius            = $this.data( 'circle-layout-radius' ),
				radius2           = $this.data( 'circle-layout-radius-c' ),
				rotation          = $this.data( 'circle-layout-rotation' );
			
			
			
			if ( typeof display === typeof undefined ) {
				display = 5;
			}	
			
			if ( typeof radius === typeof undefined ) {
				radius = 180;
			}	
			
			if ( typeof radius2 === typeof undefined ) {
				radius2 = 110;
			}		
			
			if ( typeof rotation === typeof undefined ) {
				rotation = 0;
			}			
			
			$this.css( {
			    'width'      : radius * 2 + 'px'
			} );

			
			
			$ul.css( {
			    'width'     : radius * 2 + 'px',
			    'height'    : radius * 2 + 'px',
				'transform' : 'rotate('+parseFloat(rotation)+'deg)'
			} );

			
			$ul.next( 'div' ).css( {
			    'width'      : radius2 * 2 + 'px',
			    'height'     : radius2 * 2 + 'px'
			} );	
			
			
			

			//Layout components in a circle layout
			var angle           = 0,
			    step            = 2 * Math.PI / display,
			    transitionDelay = 0,
				pad             = $ul.width();

			
			$li.each( function() { //Can'nt use arrow function here!!!
				// 'this' works differently with arrow fucntions
				var el          = $( this ),
					x           = radius * Math.cos(angle) - liWidth / 2,
					y           = radius * Math.sin(angle) - liHeight / 2;

				
				el.css({
					'transform'        : 'translate('+parseFloat( x + liWidth/2 )+'px,'+parseFloat( pad/2 + y + liHeight/2 )+'px)',
					'transition-delay' : transitionDelay + "s"
				})
				.find( '> a' )
				.css({
					'transform'        : 'rotate('+parseFloat(-rotation)+'deg)'
				});
				
				
				
				
				angle += step;
				transitionDelay += 0.15;
			});	

			
			
		});
		
		
    };

    module.components.documentReady.push( module.CIRCLE_LAYOUT.documentReady );
	

	return class CIRCLE_LAYOUT {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );



