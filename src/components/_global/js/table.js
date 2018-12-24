/* 
 *************************************
 * <!-- Responsive Table -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.TABLE               = APP.TABLE || {};
	APP.TABLE.version       = '0.0.1';
    APP.TABLE.documentReady = function( $ ) {

		var $resTable = $('table.uix-table.is-responsive, .uix-table.is-responsive table'),
			$thead    = $resTable.find( 'thead' ),
			$tbody    = $resTable.find( 'tbody' );

        $thead.find( 'th' ).each(function() {
            var data = $(this).text();
            if ( !$( this ).attr( 'data-table' ) ) {
                $( this ).attr( 'data-table', data );
            }
        });

        $tbody.find( 'td' ).each(function() {
            var index = $(this).index();
            var data = $thead.find( 'th:eq(' + index + ')' ).attr( 'data-table' );
            $( this ).attr( 'data-table', data );
        });
		
		
    };

    APP.components.documentReady.push( APP.TABLE.documentReady );
    return APP;

}( APP, jQuery, window, document ) );



