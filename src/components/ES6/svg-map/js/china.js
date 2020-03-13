
/* 
 *************************************
 * <!-- SVG Map (China) -->
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


export const SVG_MAP_CHINA = ( ( module, $, window, document ) => {
	if ( window.SVG_MAP_CHINA === null ) return false;
	
	
	
    module.SVG_MAP_CHINA               = module.SVG_MAP_CHINA || {};
    module.SVG_MAP_CHINA.version       = '0.0.2';
    module.SVG_MAP_CHINA.documentReady = function( $ ) {


		
		const $svgEl = $( '.uix-svgmap--china' );
		
		$( document ).off( 'click.SVG_MAP_CHINA' ).on( 'click.SVG_MAP_CHINA', '.uix-svgmap--china__trigger a', function( e ) {
			
			// stop propagation of this event, it will never reach body in bubbling phase.
			e.stopPropagation();

			const goName       = $( this ).data( 'title' ),
				  goText       = $( this ).text();
            
			let	svgCurName   = '',
				svgNameIndex = 0;
			
			$( '.uix-svgmap--china .uix-svgmap--china__name' ).each( function()  {
				
				if ( goName == $( this ).data( 'title' ) ) {
					svgCurName = $( this ).data( 'title' );
					return false;
				}
			});
			
			svgNameIndex = $( '.uix-svgmap--china .uix-svgmap--china__name[data-title="'+svgCurName+'"]' ).index();
			
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
			$svgEl.find( 'circle' ).css({
				'r'         : 6,
				'font-size' : '6px',
				'z-index'   : 1,
				'opacity'   : alpha
			});


			$svgEl.find( '.uix-svgmap--china__name' ).each( function()  {
				$( this ).css({
					'transform' : 'translate(0,15px)',
					'z-index'   : 1,
					'opacity'   : alpha
				})
				.text( $( this ).data( 'title' ) );

			});

			$svgEl.find( '.uix-svgmap--china__num' ).css({
				'font-size' : '6px',
				'z-index'   : 1,
				'opacity'   : alpha
			});	


		}


		function svgMapActive( index, text ) {
			$svgEl.each( function()  {
				$( this ).children().eq( index ).addClass( 'is-show' );
				$( this ).find( 'circle' ).eq( index ).css({
					'r'         : 15,
					'z-index'   : 2,
					'opacity'   : 1
				});
				$( this ).find( '.uix-svgmap--china__name' ).eq( index ).css({
					'transform' : 'translate(0,25px)',
					'z-index'   : 2,
					'opacity'   : 1
				})
				.text( text );

				$( this ).find( '.uix-svgmap--china__num' ).eq( index ).css({
					'font-size' : '10px',
					'z-index'   : 2,
					'opacity'   : 1
				});	


			});

		}

		
    };

    module.components.documentReady.push( module.SVG_MAP_CHINA.documentReady );
	

	return class SVG_MAP_CHINA {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );


