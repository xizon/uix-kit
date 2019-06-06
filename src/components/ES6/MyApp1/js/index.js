/* 
 *************************************
 * <!-- APP 1 -->
 *************************************
 */

const sex = 'boy';
const echo = ( value ) => {
	document.getElementById( 'root' ).innerHTML = './src/components/ES6/MyApp1 => <span style="color:red">echo(sex) =>' + value + '</span>';
};


export { sex, echo };


