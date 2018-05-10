
/* 
 *************************************
 * <!-- Dynamic Drop Down List from JSON -->
 *************************************
 */
App = ( function ( App, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {
		
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
	
		
    App.dynamicDDList = {
        documentReady : documentReady        
    };

    App.components.documentReady.push( documentReady );
    return App;

}( App, jQuery, window, document ) );

