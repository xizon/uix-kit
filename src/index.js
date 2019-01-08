
/*
 * Import SASS files from components
 *    
 */
import './components/ES5/_global/scss/_all.scss';


/*
 * Import JS files from components of ES5
 * 
 * @description  Only concat all .js files without ES6 parsing.  
 *        
 */
import './components/ES5/_global/js/_all.js';



/*
 * Import JS files from components of ES6
 * 
 * @description  Just a simple demonstration of ES6.
 *        
 */

import { sex, echo } from './components/ES6/app1/js/functions.js';

//Output only on the ES6 demo page
if ( document.getElementsByTagName( 'body' )[0].className.match(/es6-demo-home/) ) {
	echo( sex );
	alert( 'this is ES6 demo page!' );
}



