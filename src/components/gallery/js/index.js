
/* 
 *************************************
 * <!-- Gallery -->
 *************************************
 */
import {
    UixModuleInstance,
} from '@uixkit/core/_global/js';


import '@uixkit/core/gallery/js/third-party/muuri';

import '../scss/_style.scss';


export const GALLERY = ( ( module, $, window, document ) => {
	if ( window.GALLERY === null ) return false;
	
	
    module.GALLERY               = module.GALLERY || {};
    module.GALLERY.version       = '0.0.5';
    module.GALLERY.documentReady = function( $ ) {

		$( '.uix-gallery' ).each( function() {

			const galleryType = $( this ).data( 'show-type' );
			
			
			/* 
			 ---------------------------
			 Add a tagname to each list item
			 ---------------------------
			 */ 
			// Masonry
			if ( galleryType.indexOf( 'masonry' ) >= 0  ) {
				$( this ).addClass( 'masonry-container' );
				$( this ).find( '.uix-gallery__item' ).addClass( 'masonry-item' );
			}
			
			// Filterable
			if ( galleryType.indexOf( 'filter' ) >= 0  ) {
				$( this ).addClass( 'filter-container' );
				$( this ).find( '.uix-gallery__item' ).addClass( 'filter-item' );	
			}	

			
			if ( galleryType.indexOf( 'filter' ) >= 0 || galleryType.indexOf( 'masonry' ) >= 0 ) {

				const filterCat      = $( this ).data( 'filter-id' ),
					$grid          = $( this ).find( '.uix-gallery__tiles' ),
					$allItems      = $( this ).find( '.uix-gallery__item' ),
					$filterOptions = $( filterCat );

				
				const MuuriGrid = new Muuri( $grid.get(0), {
					items: $grid.get(0).querySelectorAll( '.uix-gallery__item' ),
					
					// Default show animation
					showDuration: 300,
					showEasing: 'ease',

					// Default hide animation
					hideDuration: 300,
					hideEasing: 'ease',

					// Item's visible/hidden state styles
					visibleStyles: {
						opacity: '1',
						transform: 'scale(1)'
					},
					hiddenStyles: {
						opacity: '0',
						transform: 'scale(0.5)'
					},

					// Layout
					layout: {
						fillGaps: false,
						horizontal: false,
						alignRight: false,
						alignBottom: false,
						rounding: true
					},
					layoutOnResize: 100,
					layoutOnInit: true,
					layoutDuration: 300,
					layoutEasing: 'ease',
					
					//// Drag & Drop
					dragEnabled: false
				});


				// When all items have loaded refresh their
				// dimensions and layout the grid.
				$grid.waitForImages().done(function() {
					MuuriGrid.refreshItems().layout();
					// For a little finishing touch, let's fade in
					// the images after all them have loaded and
					// they are corrertly positioned.
					$( 'body' ).addClass( 'images-loaded' );

				});


				/* 
				 ---------------------------
				 Function of Filterable and Masonry
				 ---------------------------
				 */ 
				if ( galleryType.indexOf( 'filter' ) >= 0 ) {
					$filterOptions.find( 'li > a' ).off( 'click' ).on( 'click', function() {
						const $this       = $( this );
						const activeClass = 'current-cat',
							  isActive    = $this.parent().hasClass( activeClass ),
							  group       = isActive ? 'all' : $this.data( 'group' );

						// Hide current label, show current label in title
						if ( !isActive ) {
							$filterOptions.find( '.' + activeClass ).removeClass( activeClass );
						}

						$this.parent().toggleClass( activeClass );

						// Filter elements
						const filterFieldValue = group;
						MuuriGrid.filter( function ( item ) {

							const element       = item.getElement(),
								  curCats       = element.getAttribute( 'data-groups' ).toString().replace(/^\,|\,$/g, '').replace(/^\[|\]$/g, '') + ',all',
								  isFilterMatch = !filterFieldValue ? true : ( curCats || '' ).indexOf( filterFieldValue ) > -1;

							return isFilterMatch;
						});


						return false;	
					});	
				} else {

					//remove filter button of all
					$filterOptions.find( '[data-group="all"]' ).parent( 'li' ).remove();
					
				}

				

			}


		} );
		
		
    };

    module.components.documentReady.push( module.GALLERY.documentReady );
	

	return class GALLERY {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );




