/* 
 *************************************
 * <!-- APP 1 -->
 *************************************
 */
import Application from '../../_global/js/_base';

const AppDemo1 = ( ( Application, $, window, document ) => {
	
    Application.DEMO1               = Application.DEMO1 || {};
	Application.DEMO1.version       = '0.0.1';
    Application.DEMO1.pageLoaded = function() {

		//Prevent this module from loading in other pages
		if ( ! document.getElementsByTagName( 'body' )[0].className.match(/es6-demo-home/) ) return false;

		const echo = ( value ) => {
			document.getElementById( 'root' ).innerHTML = `./src/components/ES6/MyApp1 => <span style="color:red">echo(sex) => ${value}</span>`;
		};
		echo( 'boy' );
		
		

    };

    Application.components.pageLoaded.push( Application.DEMO1.pageLoaded );

	return class AppDemo1 {
		constructor() {
			this.Application = Application;
		}
		
	};
	
})( Application, jQuery, window, document );


export default AppDemo1;