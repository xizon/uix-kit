
/*
 * Search string from JSON data
 * @Format reference: assets/json/countries.json
 *
 * @param  {Function} callback               - Return function after successful loading of JSON file.
 * @param  {String} jsonFile                 - The path to the JSON file.
 * @param  {String} key                      - Target key of the JSON data.
 * @return {Function}                        - Return a callback function.
 */
( function ( $ ) {
    $.fn.UixSearchJsonStr = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			method    : 'POST',
			callback  : null,
			jsonFile  : '',
			key       : 'attributes'
        }, options );
 
        this.each( function() {
			
			var obj = $( this );
			
			
			//Returns JSON data
			$.ajax({
				url      : settings.jsonFile,
				method   : settings.method,
				dataType : 'json',
				success  : function ( data ) { 

					var newArr = [];
					
					//Convert JSON to an array
					var formatFromServer = function formatFromServer( data ) {
						var formatData = {};

						for ( var item in data ) {
							if ( $( document ).UixIsJsonObj( { string:  data[item] } ) ) {
								formatFromServer( data[item], formatData );
							} else {
								formatData[item] = data[item];
							}
						}

						for ( var item2 in formatData ) {
							//console.log( formatData[ item2 ] );
							newArr.push( formatData[ item2 ] );
						}



						return formatData;
					};

					formatFromServer( data );


					//search JSON key that contains specific string
					for ( var p = 0; p < newArr.length; p++ ) {
						
						for ( var n = 0; n < newArr[p].list.length; n++ ) {
							
							if ( Object.prototype.toString.call( newArr[p].list[n][settings.key] ) =='[object Array]' ) {
								
								// API: Callback
								settings.callback( newArr[p].list[n][settings.key] );

							}


						}


					}



				 },
				 error  : function() {


				 }
			});

			
		});
 
    };
 
}( jQuery ));

