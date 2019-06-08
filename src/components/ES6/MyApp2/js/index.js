
/* 
 *************************************
 * <!-- App 2 ( With jQuery ) -->
 *************************************
 */
import Application from '../../_global/js/_base';

import '../scss/style.scss';

const AppDemo2 = ( ( Application, $, window, document ) => {
	
    Application.DEMO2               = Application.DEMO2 || {};
	Application.DEMO2.version       = '0.0.1';
    Application.DEMO2.documentReady = function( $ ) {

		//Prevent this module from loading in other pages
		if ( ! $( 'body' ).hasClass( 'es6-demo-home' ) ) return false;
		
        let $window                  = $( window ),
		    windowWidth              = window.innerWidth,
		    windowHeight             = window.innerHeight;

		
		//Show class name for ES6 demo page
		$( '#root' ).append( `<br> ./src/components/ES6/MyApp2 => <span style="color:red">ES6 uses jQuery closure to succeed, and window width is: <code>${windowWidth}</code></span>` );
		

    };

    Application.components.documentReady.push( Application.DEMO2.documentReady );

	return class AppDemo2 {
		constructor() {
			this.Application = Application;
		}
		
	};
	
})( Application, jQuery, window, document );


export default AppDemo2;



