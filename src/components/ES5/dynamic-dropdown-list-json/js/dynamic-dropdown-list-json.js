
/* 
 *************************************
 * <!-- Dynamic Drop Down List from JSON -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.DYNAMIC_DD_LIST               = APP.DYNAMIC_DD_LIST || {};
	APP.DYNAMIC_DD_LIST.version       = '0.0.2';
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
	

			if ( typeof jsonFile === typeof undefined ) {
				jsonFile = '';
			}	
			
			if ( typeof toData === typeof undefined ) {
				toData = '';
			}	
			
			if ( typeof method === typeof undefined ) {
				method = 'POST';
			}		
			
			
			
			if ( typeof associated === typeof undefined ) {
				associated = '#demo';
			}		
			
			if ( typeof ID === typeof undefined ) {
				$this.attr( 'id', ranID );
			}	
			
			
			curID = $this.attr( 'id' );
			
			
			//Parse the JSON data
			if ( jsonFile != '' ) {
			
				//Initialize dependent/chained dropdown list
				var dataExist = $this.data( 'exist' );
				if ( typeof dataExist === typeof undefined && dataExist != 1 ) {

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


							//Render the custom select
							$( document ).UixRenderCustomSelect();


						 },
						 error  : function() {


						 }
					});



					//Prevent the form from being initialized again
					$this.data( 'exist', 1 );	
				}



				//Dropdown list change event trigger
				$( document ).on( 'change', '#' + curID, function( e ) {

					e.preventDefault();


					if ( thisChange ) {

						thisChange = false;

						var curVal = $( '#' + curID + ' option:selected' ).val();


						//Clear all options
						if ( curVal == '' ) {


							$( '#' + curID ).find( 'option[value=""]' ).attr( 'selected', 'selected' );
							$( associated ).find( 'option:selected' ).removeAttr( 'selected' );

							//Render the custom select
							$( document ).UixRenderCustomSelect();
							$( associated ).attr( 'selected', 'selected' ).change();	

							APP.DYNAMIC_DD_LIST.documentReady($);


						}



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


											var optionsHtml         = '',
												sortListDemo        = data[m].list;


											if ( typeof sortListDemo === typeof undefined ) {


												/* 
												 ====================================================
												 * China cities dropdown list demo
												 ====================================================
												 */

												var chinaCitiesListDemo = data[m].city;

												//Traversing json of chinese provinces and cities
												//-------------------------------------	
												for ( var i = 0; i < chinaCitiesListDemo.length; i++ ) {

													var city      = chinaCitiesListDemo[i].name,
														area      = chinaCitiesListDemo[i].area;

													var areaTxt = '';
													for ( var k = 0; k < area.length; k++ ) {
														areaTxt += JSON.stringify( area[k] ) + ',';
													}

													areaTxt = areaTxt.replace(/,\s*$/, '' );


													optionsHtml += "<option data-name='"+city+"' data-area='["+areaTxt+"]'  value='"+city+"'>"+city+"</option>";

												}
											} else {


												/* 
												 ====================================================
												 *  Sort object then subsort further demo
												 ====================================================
												 */

												//Traversing json with coordinates and details
												//-------------------------------------		
												for ( var i2 = 0; i2 < sortListDemo.length; i2++ ) {

													var name        = sortListDemo[i2].name,
														longitude   = sortListDemo[i2].longitude,
														latitude    = sortListDemo[i2].latitude,
														customAttrs = sortListDemo[i2].attributes;

													var attributesTxt = '';
													for ( var k2 = 0; k2 < customAttrs.length; k2++ ) {

														//Need to filter single quotes
														attributesTxt += JSON.stringify( customAttrs[k2] ).replace(/'/g, '&apos;' ) + ',';
													}

													attributesTxt = attributesTxt.replace(/,\s*$/, '' );



													optionsHtml += "<option data-name='"+name+"' data-attributes='["+attributesTxt+"]' data-longitude='"+longitude+"' data-latitude='"+latitude+"' value='"+name+"'>"+name+"</option>";

												}

											}

											$( associated ).html( optionsHtml );
											$( associated ).closest( '.uix-controls__select-wrapper' ).find( '.uix-controls__select-trigger' ).addClass( 'active' );


											//Render the custom select
											$( document ).UixRenderCustomSelect();
											$( associated ).attr( 'selected', 'selected' ).change();




											break;
										}

									}//end for data


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



				/* 
				 ====================================================
				 *  Callback from two-level classification
				 *  Fire the three-level classification
				 ====================================================
				 */
				//For "China cities" and "Sort Demo"

				$( document ).on( 'change.DYNAMIC_DD_LIST', associated, function( e ) {

					e.preventDefault();

					var $this        = $( this[ this.selectedIndex ] ),
						curVal       = $this.val(),
						curLongitude = $this.data( 'longitude' ),
						curLatitude  = $this.data( 'latitude' ),
						curAttributes = $this.data( 'attributes' ),
						curContents  = '';


					if ( Object.prototype.toString.call( curAttributes ) =='[object Array]' ) {
						for ( var k = 0; k < curAttributes.length; k++ ) {
							curContents += curAttributes[k].attr_name + ': ' + curAttributes[k].attr_longitude + ', ' + curAttributes[k].attr_latitude;
						}

					}

					//console.log( curVal + ' Longitude: ' + curLongitude + ' | Latitude: ' + curLatitude + ' | Addresses: ' + curContents );

					return false;



				});		

				
				
			} // end of jsonFile
			
			
			
		});
		
    };

    APP.components.documentReady.push( APP.DYNAMIC_DD_LIST.documentReady );
    return APP;

}( APP, jQuery, window, document ) );







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



/*
 * Check if a string is a valid JSON string
 * Note: Used when certain functions use "JSON.parse"
 *
 * @param  {String} string                   - A json arbitrary string
 * @return {Boolean}                         - Return a boolean.
 */
( function ( $ ) {
    $.fn.UixIsJsonObj = function( options ) {
 
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
