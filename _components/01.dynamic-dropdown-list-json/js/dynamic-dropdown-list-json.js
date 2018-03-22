
/*! 
 *************************************
 * Dynamic Drop Down List from JSON
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
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
												latitude  = thisVal[ i ].latitude;
												
											optionsHtml += "<option data-longitude='"+longitude+"' data-latitude='"+latitude+"' value='"+name+"'>"+name+"</option>";

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
						curLatitude  = $this.data( 'latitude' );

					
					console.log( curVal + ' Longitude: ' + curLongitude + ' | Latitude: ' + curLatitude );
					
					return false;
				
					

				});				
				
				
			}
			


			
			
		});
			
		
	};
	
		
    theme.dynamicDDList = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );

