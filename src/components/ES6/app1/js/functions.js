/* 
 *************************************
 * <!-- APP1 -->
 *************************************
 */

import { globalVar, globalVar2, globalVar3 } from '../../_global/js/vars.js';

const sex = 'boy';
const echo = ( value ) => {
	console.log('%c ./src/components/ES6/app1 =>  echo(sex) =>' + '%c ' + value, 'color: #333', 'color: #f00');
	console.log('%c ./src/components/ES6/app1 =>  ' + '%c' + globalVar, 'color: #333', 'color: #f00');
};


export { sex, echo };


