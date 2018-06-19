
/* 
 *************************************
 * <!-- Dynamic Drop Down List from JSON -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.DYNAMIC_DD_LIST               = APP.DYNAMIC_DD_LIST || {};
	APP.DYNAMIC_DD_LIST.version       = '0.0.1';
    APP.DYNAMIC_DD_LIST.documentReady = function( $ ) {

		$( '[data-ajax-dynamic-dd-json]' ).each( function() {
			var $this            = $( this ),
			    jsonFile         = $this.data( 'ajax-dynamic-dd-json' ),
				ranID            = 'dynamic-dd-control-' + Math.random()*1000000000000000000,
				method           = $this.data( 'ajax-dynamic-dd-method' ),
				event            = $this.data( 'ajax-dynamic-dd-event' ),
				associated       = $this.data( 'ajax-dynamic-dd-associated' ),
				toData           = $this.data( 'ajax-dynamic-dd-data' ),
				ID               = $this.attr( 'id' ),
				thisChange       = true,
				curID;
	

			if( typeof jsonFile === typeof undefined ) {
				jsonFile = '';
			}	
			
			if( typeof toData === typeof undefined ) {
				toData = '';
			}	
			
			if( typeof method === typeof undefined ) {
				method = 'POST';
			}		
			
			
			if( typeof associated === typeof undefined ) {
				associated = '#demo';
			}		
			
			if( typeof ID === typeof undefined ) {
				$this.attr( 'id', ranID );
			}	
			
			
			curID = $this.attr( 'id' );
			
			
			//Parse the JSON data
			if ( jsonFile != '' ) {
				
				$( document ).on( 'change', '#' + curID, function( e ) {

					e.preventDefault();
					
					if ( thisChange ) {
						
						thisChange = false;
						
						var curVal = $( this[ this.selectedIndex ] ).val();

						if ( curVal != '' ) {

							//Returns JSON data
							$.ajax({
								url      : jsonFile, //Be careful about the format of the JSON file
								method   : method,
								data     : toData,
								dataType : 'json',
								success  : function ( data ) { 

									//If the data is empty
									if ( data == null ) {
										//do something
									}



									//Push the options to target select
									
									//Check if a key exists inside a json object
									if ( data && data.hasOwnProperty( curVal ) ) {
										
										var optionsHtml   = '',
											thisVal       = data[ curVal ];

										for ( var i = 0; i < thisVal.length; i++ ) {
											
											var name      = thisVal[ i ].name,
												longitude = thisVal[ i ].longitude,
												latitude  = thisVal[ i ].latitude,
												addresses = thisVal[ i ].addresses;
												
											var addressesArr = '';
											for ( var k = 0; k < addresses.length; k++ ) {
												addressesArr += JSON.stringify( addresses[k] ) + ',';
											}
											
											addressesArr = addressesArr.replace(/,\s*$/, '' );
											
											
											optionsHtml += "<option data-addresses='["+addressesArr+"]' data-longitude='"+longitude+"' data-latitude='"+latitude+"' value='"+name+"'>"+name+"</option>";

										}

										$( associated ).html( optionsHtml );

										

										//Initialize the custom select
										$( document ).customSelectInit();
										$( associated ).attr( 'selected', 'selected' ).change();

									}
									

									//Avoid duplicate events running
									thisChange = true;

								 },
								 error  : function() {


								 }
							});


						}	
					}
					

					
					return false;


				});	
				
				
				
				//The target select event
				$( document ).on( 'change.cusSelectDynamicDD', associated, function( e ) {

					e.preventDefault();
					
					var $this        = $( this[ this.selectedIndex ] ),
						curVal       = $this.val(),
						curLongitude = $this.data( 'longitude' ),
						curLatitude  = $this.data( 'latitude' ),
						curAddresses = $this.data( 'addresses' );

					
					var curContents = '';
					for ( var k = 0; k < curAddresses.length; k++ ) {
						curContents += curAddresses[k].addr_name + ': ' + curAddresses[k].addr_longitude + ', ' + curAddresses[k].addr_latitude;
					}
					
					
					//console.log( curVal + ' Longitude: ' + curLongitude + ' | Latitude: ' + curLatitude + ' | Addresses: ' + curContents );
					
					return false;
				
					

				});				
				
				
			}
			


			
			
		});
		
    };

    APP.components.documentReady.push( APP.DYNAMIC_DD_LIST.documentReady );
    return APP;

}( APP, jQuery, window, document ) );







/*
 * Search string from JSON data
 *
 * @param  {function} callback               - Return function after successful loading of JSON file.
 * @param  {string} jsonFile                 - The path to the JSON file.
 * @param  {string} key                      - Target key of the JSON data.
 * @return {function}                        - Return a callback function.
 */
/*


{
	"Country 1": [{
			"name": "City 1",
			"longitude": 86.212172,
			"latitude": 14.480298,
			"addresses": [{
					"addr_name": "Address 1",
					"addr_info": "The various addr keys are used to provide address information for buildings and facilities. See Addresses for more details on usage.",
					"addr_longitude": 22.362791,
					"addr_latitude": 114.131421
				},
				{
					"addr_name": "Address 2",
					"addr_info": "See Addresses for more details on usage.",
					"addr_longitude": 22.349032,
					"addr_latitude": 114.075408
				},
				{
					"addr_name": "Address 3",
					"addr_info": "The various addr keys are used to provide address information for buildings and facilities.",
					"addr_longitude": 22.348031,
					"addr_latitude": 114.064361
				}
			]
		},

		{
			"name": "City 2",
			"longitude": 83.526166,
			"latitude": 30.910773,
			"addresses": [{
					"addr_name": "Address 4",
					"addr_info": "The various addr keys are used to provide address information for buildings and facilities. See Addresses for more details on usage.",
					"addr_longitude": 22.362791,
					"addr_latitude": 114.131421
				},
				{
					"addr_name": "Address 5",
					"addr_info": "See Addresses for more details on usage.",
					"addr_longitude": 22.349032,
					"addr_latitude": 114.075408
				},
				{
					"addr_name": "Address 6",
					"addr_info": "The various addr keys are used to provide address information for buildings and facilities.",
					"addr_longitude": 22.348031,
					"addr_latitude": 114.064361
				}
			]
		},

		{
			"name": "City 3",
			"longitude": 86.212172,
			"latitude": 14.480298,
			"addresses": [{
					"addr_name": "Address 7",
					"addr_info": "The various addr keys are used to provide address information for buildings and facilities. See Addresses for more details on usage.",
					"addr_longitude": 22.362791,
					"addr_latitude": 114.131421
				},
				{
					"addr_name": "Address 8",
					"addr_info": "See Addresses for more details on usage.",
					"addr_longitude": 22.349032,
					"addr_latitude": 114.075408
				}
			]
		},

		{
			"name": "City 4",
			"longitude": 83.526166,
			"latitude": 30.910773,
			"addresses": [{
					"addr_name": "Address 9",
					"addr_info": "The various addr keys are used to provide address information for buildings and facilities. See Addresses for more details on usage.",
					"addr_longitude": 22.362791,
					"addr_latitude": 114.131421
				},
				{
					"addr_name": "Address 10",
					"addr_info": "See Addresses for more details on usage.",
					"addr_longitude": 22.349032,
					"addr_latitude": 114.075408
				}
			]
		},

		{
			"name": "City 5",
			"longitude": 86.212172,
			"latitude": 14.480298,
			"addresses": [{
				"addr_name": "Address 11",
				"addr_info": "The various addr keys are used to provide address information for buildings and facilities. See Addresses for more details on usage.",
				"addr_longitude": 22.362791,
				"addr_latitude": 114.131421
			}]
		}

	],
	"Country 2": [{
			"name": "City 2_1",
			"longitude": 86.212172,
			"latitude": 14.480298,
			"addresses": [{
					"addr_name": "Address 12",
					"addr_info": "The various addr keys are used to provide address information for buildings and facilities. See Addresses for more details on usage.",
					"addr_longitude": 22.362791,
					"addr_latitude": 114.131421
				},
				{
					"addr_name": "Address 13",
					"addr_info": "See Addresses for more details on usage.",
					"addr_longitude": 22.349032,
					"addr_latitude": 114.075408
				}
			]
		},

		{
			"name": "City 2_2",
			"longitude": 83.526166,
			"latitude": 30.910773,
			"addresses": [{
				"addr_name": "Address 14",
				"addr_info": "The various addr keys are used to provide address information for buildings and facilities. See Addresses for more details on usage.",
				"addr_longitude": 22.362791,
				"addr_latitude": 114.131421
			}]
		},

		{
			"name": "City 2_3",
			"longitude": 86.212172,
			"latitude": 14.480298,
			"addresses": [{
				"addr_name": "Address 15",
				"addr_info": "The various addr keys are used to provide address information for buildings and facilities. See Addresses for more details on usage.",
				"addr_longitude": 22.362791,
				"addr_latitude": 114.131421
			}]
		}

	],
	"Country 3": [{
			"name": "City 3_1",
			"longitude": 86.212172,
			"latitude": 14.480298,
			"addresses": [{
				"addr_name": "Address 16",
				"addr_info": "The various addr keys are used to provide address information for buildings and facilities.",
				"addr_longitude": 22.362791,
				"addr_latitude": 114.131421
			}]
		},

		{
			"name": "City 3_2",
			"longitude": 83.526166,
			"latitude": 30.910773,
			"addresses": [{
				"addr_name": "Address 17",
				"addr_info": "The various addr keys are used to provide address information for buildings and facilities.",
				"addr_longitude": 22.362791,
				"addr_latitude": 114.131421
			}]
		},
		{
			"name": "City 3_3",
			"longitude": 86.212172,
			"latitude": 14.480298,
			"addresses": [{
				"addr_name": "Address 18",
				"addr_info": "The various addr keys are used to provide address information for buildings and facilities.",
				"addr_longitude": 22.362791,
				"addr_latitude": 114.131421
			}]
		}

	]

}


*/
( function ( $ ) {
    $.fn.searchJsonString = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			callback  : null,
			jsonFile  : '',
			key       : 'addresses'
        }, options );
 
        this.each( function() {
			
			var obj = $( this );
			
			
			//Returns JSON data
			$.ajax({
				url      : $( '#dynamic-dd-country' ).data( 'ajax-dynamic-dd-json' ),
				method   : 'POST',
				dataType : 'json',
				success  : function ( data ) { 

					var newArr = [];
					var formatFromServer = function formatFromServer( data ) {
						var formatData = {};

						for ( var item in data ) {
							if ( $( document ).isJsonObject( { string:  data[item] } ) ) {
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

						for ( var n = 0; n < newArr[p].length; n++ ) {

							if ( Object.prototype.toString.call( newArr[p][n][settings.key] ) =='[object Array]' ) {
								
								// API: Callback
								settings.callback( newArr[p][n][settings.key] );

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



/*
 * Check if a string is a valid JSON string
 * Note: Used when certain functions use "JSON.parse"
 *
 * @param  {string} string                   - A json arbitrary string
 * @return {boolean}                         - Return a boolean.
 */
( function ( $ ) {
    $.fn.isJsonObject = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			string    : ''
        }, options );
 
        this.each( function() {
			
			var str = settings.str;

			if ( typeof( str ) == 'string' && str.length > 0 ) {

				if ( str.replace( /\"\"/g, '' ).replace( /\,/g, '' ) == '[{}]' ) {
					return false;
				} else {

					if (/^[\],:{}\s]*$/.test( str.replace(/\\["\\\/bfnrtu]/g, '@' ).
					replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
					replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

						return true;

					}else{

						return false;

					}	

				}

			} else {
				return false;
			}
			
			
		});
 
    };
 
}( jQuery ));
