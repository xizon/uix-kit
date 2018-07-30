
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
				ranID            = 'dynamic-dd-control-' + UIX_GUID.newGuid(),
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
				
				//Initialize dependent/chained dropdown list
				$.ajax({
					url      : jsonFile,
					method   : method,
					data     : toData,
					dataType : 'json',
					success  : function ( data ) { 

						var firstOptionsHtml = '';
						
						//Push the options to target select
						for ( var m = 0; m < data.length; m++ ) {
							firstOptionsHtml += "<option value='"+data[m].name+"'>"+data[m].name+"</option>";
						}	
						
						$( firstOptionsHtml ).insertAfter( $this.find( 'option' ).first() );


						//Initialize the custom select
						$( document ).customSelectInit();
					

					 },
					 error  : function() {


					 }
				});
				
				
				
				//Dropdown list change event trigger
				$( document ).on( 'change', '#' + curID, function( e ) {

					e.preventDefault();
					
				
					if ( thisChange ) {
						
						thisChange = false;
						
						var curVal = $( '#' + curID + ' option:selected' ).val();

						
						if ( curVal != '' ) {
							
							//remove the empty option
							$( '#' + curID + ' option[value=""]' ).remove();

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

									
									for ( var m = 0; m < data.length; m++ ) {

										//Check if a key exists inside a json object
										if ( data[m].name == curVal ) {


											var optionsHtml   = '',
												cities        = data[m].city,
												list          = data[m].list;


											if ( typeof list === typeof undefined ) {
												//Traversing json of chinese provinces and cities
												//-------------------------------------	
												for ( var i = 0; i < cities.length; i++ ) {

													var city      = cities[i].name,
														area      = cities[i].area;

													var areaTxt = '';
													for ( var k = 0; k < area.length; k++ ) {
														areaTxt += JSON.stringify( area[k] ) + ',';
													}

													areaTxt = areaTxt.replace(/,\s*$/, '' );


													optionsHtml += "<option data-name='"+city+"' data-area='["+areaTxt+"]'  value='"+city+"'>"+city+"</option>";

												}
											} else {
												//Traversing json with coordinates and details
												//-------------------------------------		
												for ( var i2 = 0; i2 < list.length; i2++ ) {

													var name      = list[i2].name,
														longitude = list[i2].longitude,
														latitude  = list[i2].latitude,
														addresses = list[i2].addresses;

													var addressesTxt = '';
													for ( var k2 = 0; k2 < addresses.length; k2++ ) {
														
														//Need to filter single quotes
														addressesTxt += JSON.stringify( addresses[k2] ).replace(/'/g, '&apos;' ) + ',';
													}

													addressesTxt = addressesTxt.replace(/,\s*$/, '' );


													optionsHtml += "<option data-name='"+name+"' data-addresses='["+addressesTxt+"]' data-longitude='"+longitude+"' data-latitude='"+latitude+"' value='"+name+"'>"+name+"</option>";

												}

											}

											$( associated ).html( optionsHtml );


											//Initialize the custom select
											$( document ).customSelectInit();
											$( associated ).attr( 'selected', 'selected' ).change();

											break;
										}
									}//end for
									

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
						curAddresses = $this.data( 'addresses' ),
						curContents  = '';
					
					if ( Object.prototype.toString.call( curAddresses ) =='[object Array]' ) {
						for ( var k = 0; k < curAddresses.length; k++ ) {
							curContents += curAddresses[k].addr_name + ': ' + curAddresses[k].addr_longitude + ', ' + curAddresses[k].addr_latitude;
						}
						
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
 * @Format reference: assets/json/countries.json
 *
 * @param  {function} callback               - Return function after successful loading of JSON file.
 * @param  {string} jsonFile                 - The path to the JSON file.
 * @param  {string} key                      - Target key of the JSON data.
 * @return {function}                        - Return a callback function.
 */
( function ( $ ) {
    $.fn.searchJsonString = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			method    : 'POST',
			callback  : null,
			jsonFile  : '',
			key       : 'addresses'
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
