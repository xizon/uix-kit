/******/
/******/
/* App 1 */		
import { sex, echo } from '../../MyApp1/js';
if ( document.getElementsByTagName( 'body' )[0].className.match(/es6-demo-home/) ) { //Output only on the ES6 demo page
	echo( sex );
}



/******/
/******/
/* App 2 ( With jQuery ) */		
import AppShowBodyClass from '../../MyApp2/js';
let AppShowBodyClassRender = new AppShowBodyClass().render();

