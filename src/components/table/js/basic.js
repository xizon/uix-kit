/* 
 *************************************
 * <!-- Responsive Table -->
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


export const TABLE = ( ( module, $, window, document ) => {
	if ( window.TABLE === null ) return false;
	
	
	
    module.TABLE               = module.TABLE || {};
    module.TABLE.version       = '0.0.4';
    module.TABLE.documentReady = function( $ ) {

		const $window          = $( window );
		let	windowWidth        = window.innerWidth,
			windowHeight       = window.innerHeight;

		/* 
		 ---------------------------
		 Duplicate title
		 ---------------------------
		 */
		$( '.js-uix-table--responsive' ).each(function( index ) {
			const $this = $( this );
			
			$this.find( ' thead th' ).each(function( index ) {
				const data = $( this ).html().replace(/<span[^>]*>[\s\S]+<\/span>/g, '');
				if( typeof( $( this ).attr( 'data-table' ) ) === typeof undefined ) {
					$( this ).attr( 'data-table', data );
				}
			});

			$this.find( ' tbody tr' ).each(function( index ) {
				$( this ).find( '> td' ).each( function( index ) {
					const data = $this.find( ' thead th' ).eq(index).attr( 'data-table' );
					$( this ).attr( 'data-table', data );

				});

			});

		});


		/* 
		 ---------------------------
		 With scroll bars
		 ---------------------------
		 */

		tableDataScrolledInit( windowWidth );

		$window.off( 'resize' ).on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( window.innerWidth != windowWidth ) {

				// Update the window width for next time
				windowWidth = window.innerWidth;

				// Do stuff here
				tableDataScrolledInit( windowWidth );


			}
		});


		function tableDataScrolledInit( w ) {



			//Add an identifier so that the mobile terminal can compare by row
			$( '.js-uix-table--responsive-scrolled' ).each(function( index ) {
				const $this = $( this );
				$this.find( ' tbody tr' ).each(function( index ) {
					$( this ).find( '> td' ).each( function( index ) {
						$this.find( ' thead th' ).eq(index).attr( 'data-table-row', index );
						$( this ).attr( 'data-table-row', index );
					});
				});
			});


			if ( w <= 768 ) {



				//get maxHeight of per row
				$( '.js-uix-table--responsive-scrolled' ).each(function( index ) {

					const $this = $( this );
					const len = $this.find( ' tbody tr' ).length;
					for (let i=0; i<len; i++ ) {
						
						let	_heights = [];
						$this.find( ' [data-table-row="'+i+'"]' ).each( function( index ) {
							const tempheight = $( this ).outerHeight();
							_heights.push( tempheight );
						} );

						const maxHeight = Math.max.apply( Math, _heights );
						$this.find( ' [data-table-row="'+i+'"]' ).css({'height': maxHeight + 'px'});
						
					}
				});


			} else {
				$( '.js-uix-table--responsive-scrolled tbody td, .js-uix-table--responsive-scrolled thead th' ).removeAttr( 'style') ;
			}

		}	

		
		
    };

    module.components.documentReady.push( module.TABLE.documentReady );
	

	return class TABLE {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );


