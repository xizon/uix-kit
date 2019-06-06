
/* 
 *************************************
 * <!-- App 2 ( With jQuery ) -->
 *************************************
 */
import '../scss/style.scss';
export default class AppShowBodyClass {
	
    properties() {
        this.version = '0.0.1';
    }
	
    constructor() {
		this.properties();
    }
	
	
	render() {
		( function( $ ) {
		"use strict";
			$( document ).ready( function() {

				//Show class name for ES6 demo page
				if ( $( 'body' ).hasClass( 'es6-demo-home' ) ) {
					$( '#root' ).append( '<br>./src/components/ES6/MyApp2 => <span style="color:red">ES6 uses jQuery closure to succeed, and body class is: <code>' + $( 'body' ).attr( 'class' ) + '</code></span>' );
				}
				

			} );


		} ) ( jQuery );
		
	
	}
	
}


