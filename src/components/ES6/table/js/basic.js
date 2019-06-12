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
	UixCssProperty,
	UixApplyAsyncScripts,
	UixApplyAsyncAllScripts
} from '@uixkit/core/_global/js';


import '../scss/_style.scss';


export const TABLE = ( ( module, $, window, document ) => {
	
	
    module.TABLE               = module.TABLE || {};
	module.TABLE.version       = '0.0.3';
    module.TABLE.documentReady = function( $ ) {


		
		var $window      = $( window ),
			windowWidth  = window.innerWidth,
			windowHeight = window.innerHeight;	
		
		/* 
		 ---------------------------
		 Duplicate title
		 ---------------------------
		 */
					
		var $resTable = $('table.uix-table.is-responsive, .uix-table.is-responsive table'),
			$thead    = $resTable.find( 'thead' ),
			$tbody    = $resTable.find( 'tbody' );

        $thead.find( 'th' ).each(function() {
            var data = $( this ).html().replace(/<span\s+class=(\"|\')js-uix-table-responsive__hidden(\"|\')(([\s\S])*?)<\/span>/g, '');
            if ( !$( this ).attr( 'data-table' ) ) {
                $( this ).attr( 'data-table', data );
            }
        });

        $tbody.find( 'td' ).each(function() {
            var index = $(this).index();
            var data = $thead.find( 'th:eq(' + index + ')' ).attr( 'data-table' );
            $( this ).attr( 'data-table', data );
        });
		
	
		/* 
		 ---------------------------
		 With scroll bars
		 ---------------------------
		 */
		var resTableSCrolled = '.js-uix-table--responsive-scrolled',
			columns          = $( resTableSCrolled + ' tr').length,
			rows             = $( resTableSCrolled + ' th').length;
		
		tableDataScrolledInit( windowWidth );
		
		$window.on( 'resize', function() {
			// Check window width has actually changed and it's not just iOS triggering a resize event on scroll
			if ( window.innerWidth != windowWidth ) {

				// Update the window width for next time
				windowWidth = window.innerWidth;

				// Do stuff here
				tableDataScrolledInit( windowWidth );
		

			}
		});
		
		
		function tableDataScrolledInit( w ) {
			
			if ( w <= 768 ) {
				for ( var i = 0; i < rows; i++ ) {
					var maxHeight = $( resTableSCrolled + ' th:nth-child(' + i + ')').outerHeight();
					for ( var j = 0; j < columns; j++ ) {
						if ($( resTableSCrolled + ' tr:nth-child(' + j + ') td:nth-child(' + i + ')').outerHeight() > maxHeight) {
							maxHeight = $( resTableSCrolled + ' tr:nth-child(' + j + ') td:nth-child(' + i + ')').outerHeight();
						}
						if ($( resTableSCrolled + ' tr:nth-child(' + j + ') td:nth-child(' + i + ')').prop('scrollHeight') > $( resTableSCrolled + ' tr:nth-child(' + j + ') td:nth-child(' + i + ')').outerHeight()) {
							maxHeight = $( resTableSCrolled + ' tr:nth-child(' + j + ') td:nth-child(' + i + ')').prop( 'scrollHeight' );
						}
					}
					for (var j = 0; j < columns; j++ ) {
						$( resTableSCrolled + ' tr:nth-child(' + j + ') td:nth-child(' + i + ')').css( 'height', maxHeight );
						$( resTableSCrolled + ' th:nth-child(' + i + ')').css( 'height', maxHeight );
					}
				}
			} else {
				$( resTableSCrolled + ' td, '+resTableSCrolled+' th').removeAttr( 'style') ;
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


