/* 
 *************************************
 * <!-- Table Sorter -->
 *************************************
 */

APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.TABLE_SORTER               = APP.TABLE_SORTER || {};
	APP.TABLE_SORTER.version       = '0.0.1';
    APP.TABLE_SORTER.documentReady = function( $ ) {

		
		$( '.js-uix-table-sorter' ).each( function()  {
			var $sortTable = $( this ).find( 'table' );

			$sortTable.find( "[data-sort-type]" ).wrapInner( '<span class="uix-table-sorter" />' ).each( function() {

				var $th     = $( this ),
					thIndex = $th.index(),
					thType  = $th.data( 'sort-type' ),
					inverse = false;

				$th.on( 'click', function() {

					$sortTable.find( 'tbody td' ).filter( function() {

						return $( this ).index() === thIndex;

					}).sortElements( function(a, b) {


						var txt1 = $.text([a]).replace(/(<([^>]+)>)/ig, ''),
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

    APP.components.documentReady.push( APP.TABLE_SORTER.documentReady );
    return APP;

}( APP, jQuery, window, document ) );




/**
 * jQuery.fn.sortElements
 * --------------
 * @author James Padolsey (http://james.padolsey.com)
 * @version 0.11
 * @updated 18-MAR-2010
 * --------------
 * @param Function comparator:
 *   Exactly the same behaviour as [1,2,3].sort(comparator)
 *   
 * @param Function getSortable
 *   A function that should return the element that is
 *   to be sorted. The comparator will run on the
 *   current collection, but you may want the actual
 *   resulting sort to occur on a parent or another
 *   associated element.
 *   
 *   E.g. $('td').sortElements(comparator, function(){
 *      return this.parentNode; 
 *   })
 *   
 *   The <td>'s parent (<tr>) will be sorted instead
 *   of the <td> itself.
 */
jQuery.fn.sortElements = (function(){
    
    var sort = [].sort;
    
    return function(comparator, getSortable) {
        
        getSortable = getSortable || function(){return this;};
        
        var placements = this.map(function(){
            
            var sortElement = getSortable.call(this),
                parentNode = sortElement.parentNode,
                
                // Since the element itself will change position, we have
                // to have some way of storing it's original position in
                // the DOM. The easiest way is to have a 'flag' node:
                nextSibling = parentNode.insertBefore(
                    document.createTextNode(''),
                    sortElement.nextSibling
                );
            
            return function() {
                
                if (parentNode === this) {
                    throw new Error(
                        "You can't sort elements if any one is a descendant of another."
                    );
                }
                
				
                // Insert before flag:
                parentNode.insertBefore(this, nextSibling);
                // Remove flag:
                parentNode.removeChild(nextSibling);
                
            };
            
        });
       
        return sort.call(this, comparator).each(function(i){
            placements[i].call(getSortable.call(this));
        });
        
    };
    
})();
