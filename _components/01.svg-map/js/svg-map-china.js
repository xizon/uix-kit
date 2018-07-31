
/* 
 *************************************
 * <!-- SVG Map (China) -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.SVG_MAP_CHINA               = APP.SVG_MAP_CHINA || {};
	APP.SVG_MAP_CHINA.version       = '0.0.1';
    APP.SVG_MAP_CHINA.documentReady = function( $ ) {


		
		var $svgEl = $( '.uix-svgmap--china' );
		
		$( '.uix-svgmap--china__trigger a' ).on( 'click', function( e ) {
			
			// stop propagation of this event, it will never reach body in bubbling phase.
			e.stopPropagation();

			var goName       = $( this ).data( 'title' ),
				goText       = $( this ).text(),
				svgCurName   = '',
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
		$( 'body' ).on( 'click', function( e ) {
			svgMapRestore(2);
		});

		function svgMapRestore( type ) {

			var alpha = ( type == 1 ) ? 0.3 : 1;

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

    APP.components.documentReady.push( APP.SVG_MAP_CHINA.documentReady );
    return APP;

}( APP, jQuery, window, document ) );




