
/* 
 *************************************
 * <!-- SVG Map (World) -->
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


export const SVG_MAP_WORLD = ( ( module, $, window, document ) => {
	if ( window.SVG_MAP_WORLD === null ) return false;
	
	
    module.SVG_MAP_WORLD               = module.SVG_MAP_WORLD || {};
    module.SVG_MAP_WORLD.version       = '0.0.2';
    module.SVG_MAP_WORLD.documentReady = function( $ ) {


		const $svgEl = $( '.uix-svgmap--world' );
		

		$( document ).off( 'click.SVG_MAP_WORLD' ).on( 'click.SVG_MAP_WORLD', '.uix-svgmap--world__trigger a', function( e ) {
			
			// stop propagation of this event, it will never reach body in bubbling phase.
			e.stopPropagation();

			const goName       = $( this ).data( 'title' ),
				  goText       = $( this ).text();
            
			let	svgCurName   = '',
				svgNameIndex = 0;
			
			$( '.uix-svgmap--world .uix-svgmap--world__name' ).each( function( index )  {
				
				if ( goName == $( this ).data( 'title' ) ) {
					svgCurName = $( this ).data( 'title' );
				    svgNameIndex = index;
					return false;
				}
			});
		
			//Hide all elements
			svgMapRestore(1);

			
			//Display current element
			svgMapActive( svgNameIndex, goText );
			
			
	
		});
		
			
			
		//Restore all elements
        //Do not add off() to this
		$( document.body ).on( 'click', function( e ) {
			svgMapRestore(2);
		});

		
		function svgMapRestore( type ) {

			const alpha = ( type == 1 ) ? 0.3 : 1;

			$svgEl.children().removeClass( 'is-show' );
			$svgEl.find( 'path' ).css({
				'z-index'   : 1,
				'opacity'   : alpha
			});



			$svgEl.find( '.uix-svgmap--world__name' ).each( function()  {
				$( this ).css({
					'z-index'   : 1,
					'opacity'   : alpha,
					'font-size' : '3px'
				})
				.text( $( this ).data( 'title' ) );

			});



			$svgEl.find( '.uix-svgmap--world__num' ).css({
				'font-size' : '6px',
				'z-index'   : 1,
				'opacity'   : alpha
			});	


		}


		function svgMapActive( index, text ) {
			$svgEl.each( function()  {
				$( this ).children().eq( index ).addClass( 'is-show' );
				$( this ).find( 'path' ).eq( index ).css({
					'z-index'   : 2,
					'opacity'   : 1
				});
				$( this ).find( '.uix-svgmap--world__name' ).eq( index ).css({
					'z-index'   : 2,
					'opacity'   : 1,
					'font-size' : '10px'
				})
				.text( text );

				$( this ).find( '.uix-svgmap--world__num' ).eq( index ).css({
					'font-size' : '10px',
					'z-index'   : 2,
					'opacity'   : 1
				});	


			});

		}
		
    };

    module.components.documentReady.push( module.SVG_MAP_WORLD.documentReady );
	

	return class SVG_MAP_WORLD {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );



