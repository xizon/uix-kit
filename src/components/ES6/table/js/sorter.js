/* 
 *************************************
 * <!-- Table Sorter -->
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
import sortElements from '@uixkit/core/table/js/fn/sort-elements';

import '../scss/_style.scss';


export const TABLE_SORTER = ( ( module, $, window, document ) => {
	if ( window.TABLE_SORTER === null ) return false;
	
	
	
    module.TABLE_SORTER               = module.TABLE_SORTER || {};
    module.TABLE_SORTER.version       = '0.0.3';
    module.TABLE_SORTER.documentReady = function( $ ) {

		
		$( '.js-uix-table-sorter' ).each( function()  {
			const $sortTable = $( this ).find( 'table' );
			
			//add arrows
			
			$sortTable.find( "[data-sort-type]" ).each( function()  {
				if ( $( this ).find( '.uix-table-sorter' ).length == 0 ) {
					$( this ).wrapInner( '<span class="uix-table-sorter" />' );
				}
				
				const $th     = $( this ),
					  thIndex = $th.index(),
					  thType  = $th.data( 'sort-type' );
                
				let	inverse = false;

				$th.off( 'click' ).on( 'click', function() {

					$sortTable.find( 'tbody td' ).filter( function() {

						return $( this ).index() === thIndex;

					}).sortElements(function(a, b) {


						let txt1 = $.text([a]).replace(/(<([^>]+)>)/ig, ''),
				            txt2 = $.text([b]).replace(/(<([^>]+)>)/ig, '');

						//type of number
						if ( thType == 'number' ) {
							txt1 = Number( txt1.replace(/[^0-9.-]+/g, '' ) );
							txt2 = Number( txt2.replace(/[^0-9.-]+/g, '' ) );
						}

						//type of date
						if ( thType == 'date' ) {
							txt1 = new Date( txt1 );
							txt2 = new Date( txt2 );	
						}	



						//add filter class
						$sortTable.find( 'tbody tr' ).addClass( 'js-uix-newsort' );


						if ( txt1 > txt2 ) {
							if ( inverse ) {
								return -1;
							} else {
								return 1;
							}

						} else {

							if ( inverse ) {
								return 1;
							} else {
								return -1;
							}	

						}




					},
					function() {

						// parentNode is the element we want to move
						return this.parentNode;

					});

					inverse = !inverse;

				});

			});

		

		});


		
    };

    module.components.documentReady.push( module.TABLE_SORTER.documentReady );
	

	return class TABLE_SORTER {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );



