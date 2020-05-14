
/* 
 *************************************
 * Get all attributes of an element using jQuery
 *
 * @return {array}                        - Returns a new array.
 * @usage:
 
	$( '#demo' ).attr();  // { "data-a": "1", "id": "b" }

 *************************************
 */
( function( old ) {
	$.fn.attr = function() {
		if ( arguments.length === 0 ) {

			if ( this.length === 0 ) {
				return null;
			}

			var obj = {};
			$.each( this[0].attributes, function() {
				if( this.specified ) {
					obj[this.name] = this.value;
				}
			});

			return obj;

		}

		return old.apply(this, arguments);
	};
} )( $.fn.attr );
