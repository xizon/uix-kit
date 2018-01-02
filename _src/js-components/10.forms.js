
/*! 
 *************************************
 * 10. Forms
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
		/*--- Input File ----*/
		$( '.controls-file-container' ).each( function()  {
			var fileInput  = $( this ).find( 'input[type="file"]' ),
				fileBtn    = $( this ).find( '.controls-file-trigger' ),
				filePath   = $( this ).next( '.controls-file-return' );
			
			fileBtn.on( 'click', function() {
				fileInput.focusin();
			});	
			
			fileInput.on( 'change', function() {
				filePath.text( $( this ).val() );
			});	
			
		});

		/*--- Hover Effect ----*/
		$( '.float-label' ).each( function(){
			
			var $this = $( this );
			
			// on focus add cladd active to label
			$this.focus( function() {
				$this.next().addClass( 'active' );
			});
			//on blur check field and remove class if needed
			$this.blur( function() {
				if( $this.val() === '' || $this.val() === 'blank') {
					$this.next().removeClass();
				}
			});
			
			// if exist cookie value
			if( $this.val() != '' && $this.val() != 'blank') { 
			    $this.next().addClass( 'active' );
			}
			
		});
		
		$( '.wp-search-submit' ).on( 'click', function() {
			$( this ).parent().parent( 'form' ).submit();
		});
		
		
		
		/*--- Input Validation ----*/
		//Using the jQuery Validation Plugin to check your form
		
		
	};
	
		
    theme.forms = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );

