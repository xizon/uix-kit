
/* 
 *************************************
 * <!-- Dropdown Menu -->
 *************************************
 */	
App = ( function ( App, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {
		

		//Create a trigger of Dropdown Menu on Click
		$( '.custom-dropdown-trigger' ).each( function() {
			var $this = $( this );

			//Close the target
			$this.find( '> label' ).on( 'click', function( e ) {
				e.preventDefault();
				//Prevents further propagation of the current event in the capturing and bubbling phases.
				e.stopPropagation();

				$this.toggleClass( 'open' );

			});	

			$this.find( 'li a' ).on( 'click', function() {
				$this.removeClass( 'open' );	
				$this.find( 'input[type="hidden"]' ).val( $( this ).data( 'value' ) );
				$this.find( '> label > span' ).html( $( this ).text() );
 
			});		


			$( 'html' ).on( 'click', function() {
				$this.removeClass( 'open' );	
			});		



		});


				
    };

    App.dropdownMenu = {
        documentReady : documentReady        
    };

    App.components.documentReady.push( documentReady );
    return App;

}( App, jQuery, window, document ) );


