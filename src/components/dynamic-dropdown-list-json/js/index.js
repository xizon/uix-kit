
/* 
 *************************************
 * <!-- Dynamic Drop Down List from JSON -->
 *************************************
 */
import {
    templateUrl,
    homeUrl,
    ajaxUrl,
    browser,
    UixModuleInstance,
    UixGUID,
    UixMath,
    UixCssProperty,
    UixDebounce,
    UixThrottle
} from '@uixkit/core/_global/js';
import UixRenderCustomSelect from '@uixkit/core/form/js/fn/select';


export const DYNAMIC_DD_LIST = ( ( module, $, window, document ) => {
	if ( window.DYNAMIC_DD_LIST === null ) return false;
	
	
    module.DYNAMIC_DD_LIST               = module.DYNAMIC_DD_LIST || {};
    module.DYNAMIC_DD_LIST.version       = '0.1.1';
    module.DYNAMIC_DD_LIST.documentReady = function( $ ) {
        

		$( '[data-ajax-dynamic-dd-json]' ).each( function() {
			const $this            = $( this );
            
            const ranID            = 'dynamic-dd-control-' + UixGUID.create(),
				  ID               = $this.attr( 'id' );
            
            
			let	jsonFile          = $this.data( 'ajax-dynamic-dd-json' ),
                dataType          = $this.data( 'ajax-dynamic-dd-datatype' ),
                method            = $this.data( 'ajax-dynamic-dd-method' ),
				paramsWithJson    = $this.data( 'ajax-dynamic-dd-data' ),
				placeholderStrArr = $this.data( 'ajax-dynamic-dd-placeholder-str' ),
                controlIDsArr     = $this.data( 'ajax-dynamic-dd-control-ids' ),
                appendTemp        = $this.data( 'ajax-dynamic-dd-append-temp' ),
				curID;
	
					
			if ( typeof placeholderStrArr === typeof undefined ) placeholderStrArr = [];
            if ( typeof controlIDsArr === typeof undefined ) controlIDsArr = [];
			if ( typeof jsonFile === typeof undefined ) jsonFile = '';
			if ( typeof paramsWithJson === typeof undefined ) paramsWithJson = {};
			if ( typeof method === typeof undefined ) method = 'POST';
            if ( typeof appendTemp === typeof undefined ) appendTemp = '';
			if ( typeof ID === typeof undefined ) $this.attr( 'id', ranID );
			if ( typeof dataType === typeof undefined ) dataType = 'category'; // options: category, place
			
			

			curID = $this.attr( 'id' );
			
			
			//Parse the JSON data
			if ( jsonFile != '' ) {
			
				//Initialize dependent/chained dropdown list
				let dataExist = $this.data( 'exist' );
				if ( typeof dataExist === typeof undefined && dataExist != 1 ) {

                    
                    // Add a request or response interceptor
                    const axiosInterceptor = axios.interceptors.request.use(function(config) {
                        // Do something before request is sent


                        //
                        return config;
                    },
                    function(error) {
                        return Promise.reject(error);
                    });


                    // To send data in the application/x-www-form-urlencoded format instead
                    const formData = new FormData();
                    const defaultPostData = paramsWithJson;
                    for(let k in defaultPostData) {
                        formData.append(k, defaultPostData[k]);
                    }

                    // Create a request event
                    axios({
                        timeout: 15000,
                        method: method,
                        url: jsonFile,
                        data: formData,
                        responseType: 'json',
                    })
                    .then(function (response) {

                        const jsonData = response.data;
                       
                        
                        
                        //Recursive and initialized functions
                        //------------------------------------
                        const initSelectControls = function( selectIndex, nodeName, $select, arr, allControlsLength ) {

                            //-- Hide or display controls
                            const controlView = function() {
                                
                                for( let p = 0; p < controlIDsArr.length; p++ ) {
                                    
                                    const data = controlIDsArr[p];
                                    const curSelInputID = ( data != null ) ? controlIDsArr[p].replace( '#', '' ) : data;
                                    const curSelWrapperID = curSelInputID + '----select';
                                    const isCustomSel = $( '#' + curSelWrapperID ).hasClass( 'uix-controls__select' );
                                    const $curSelWrapper = isCustomSel ? $( '#' + curSelWrapperID ).parent( '.uix-controls__select-wrapper' ) : $( '#' + curSelWrapperID ); 

                                    //hide/display select wrapper
                                    if ( $( '#' + curSelWrapperID ).find( 'select option' ).length == 0 ) {
                                        $curSelWrapper.hide();
                                    } else {
                                        $curSelWrapper.show();
                                    } 

                                    //Render the custom select
                                    if ( isCustomSel ) $( document ).UixRenderCustomSelect();   

                                }
                               
                            };
                            
                            
                            
                            //-- Clear the select controls behind       
                            const clearAllSelControls = function() {
                                if( allControlsLength > selectIndex ) {                
                                    for( let i = allControlsLength; i > selectIndex; i-- ) {

                                        const $targetClearSel = $this.find( 'select' ).eq(i-1);
                                        const tid = $targetClearSel.closest( '.uix-controls' ).attr( 'id' );
                                        const curSelInputID = ( tid != null ) ? tid.replace('----select','') : tid;

                                        //Remove options
                                        $targetClearSel.empty();

                                        //update a empty value
                                        $( '#' + curSelInputID ).val( '' );   

                                        //Hide or display controls
                                        controlView();   


                                    }
                                }
                            };
                            
                            clearAllSelControls();


                            //-- Json Infinite Recursion
                            if ( arr == '' ) return false; //Empty data sent when the change event is triggered
                            if ( arr ) {

                                /*
                                console.log( '--------' );
                                console.log( '-> target select ID: ' + $select.closest( '.uix-controls' ).attr( 'id' ) );
                                console.log( '-> target select data: ' );
                                console.log( arr );
                                */
                                
                                
                                //add empty option
                                const emptyOption = '<option value="">' + placeholderStrArr[selectIndex] + '</option>';
                                $select.append( emptyOption );

                                //
                                for( let i = 0; i < arr.length; i++ ) {
                                
                                    if ( arr[i] ) {
                                        

                                        ///////////////////////////////////////
                                        //////////////// category /////////////
                                        ///////////////////////////////////////

                                        if ( dataType == 'category' ) {

                                            const _name = arr[i].name;
                                            $select.append( '<option data-index="'+i+'" value="'+_name+'">' + _name + '</option>' );

                                        } // endif dataType


                                        ///////////////////////////////////////
                                        //////////////// place ////////////////
                                        /////////////////////////////////////// 

                                        if ( dataType == 'place' ) {

                                            const _name = arr[i].name;
                                            if ( typeof _name === typeof undefined ) {
                                                $select.append( '<option data-index="'+i+'" value="'+arr[i]+'">' + arr[i] + '</option>' );
                                            } else {
                                                $select.append( '<option data-index="'+i+'" value="'+_name+'">' + _name + '</option>' );
                                            }
                                            


                                        } // endif dataType     

                                        
                                    }


                                }//end for arr  

                            }//endif arr


                            
                            //-- Hide or display controls
                            controlView();
                            

                            //-- Change Event
                            $select.off( 'change.DYNAMIC_DD_LIST' ).on( 'change.DYNAMIC_DD_LIST', function() {
                                
                                const curDeep = $( this ).find( 'option:selected' ).data( 'index' );
                                const curVal = $( this[ this.selectedIndex ] ).val();
                                const $targetSel = $this.find( 'select' ).eq(selectIndex+1);
                                
                                
                                //update a new value
                                const tid = $( this ).closest( '.uix-controls' ).attr( 'id' );
                                $( '#' + ( tid != null ? tid.replace('----select','') : tid ) ).val( curVal );

                                //Remove options
                                if ( curVal == '' || curVal == null ) {
                                    $targetSel.empty();
                                } 
                                
                                
                                //Hide or display controls
                                controlView(); 
                                
                                
                                //send new JSON data
                                let sendData = ( arr[curDeep] ) ? arr[curDeep][nodeName] : '';
                                initSelectControls( selectIndex+1, 'list', $targetSel, sendData, allControlsLength );

                                

                            });

                        };

                        
                      
                        // Append the default select control to the container
                        //------------------------------------
                        for( let p = 0; p < controlIDsArr.length; p++ ) {
 
                            const data = controlIDsArr[p];
                            const curSelInputID = ( data != null ) ? controlIDsArr[p].replace( '#', '' ) : data;
                            const curSelWrapperID = curSelInputID + '----select';
                            

                            if ( $( '#' + curSelWrapperID ).length == 0 ) {
                                
                                $( $.parseHTML( appendTemp ) )
                                    .attr( 'id', curSelWrapperID )
                                    .appendTo( $this );

                            }



                        }//endfor controlIDsArr 


                        
                        // Initialize the selection box
                        //------------------------------------
                        const lastData = controlIDsArr[controlIDsArr.length-1];
                        const lastSelInputID = ( lastData != null ) ? lastData.replace( '#', '' ) : lastData;
                        const lastSelWrapperID = lastSelInputID + '-select'; 
                        $.when( $( '#' + lastSelWrapperID ).length > 0 ).then( function() {
                            initSelectControls( 0, 'list', $this.find( 'select' ).first(), jsonData, controlIDsArr.length );
                            
                       
                            //-- Reset default value and select style
                            for( let p = 0; p < controlIDsArr.length; p++ ) {

                                const data = controlIDsArr[p];
                                const curSelInputID = ( data != null ) ? controlIDsArr[p].replace( '#', '' ) : data;
                                const curSelWrapperID = curSelInputID + '----select';
                                const isCustomSel = $( '#' + curSelWrapperID ).hasClass( 'uix-controls__select' );
                                const $curSelWrapper = isCustomSel ? $( '#' + curSelWrapperID ).parent( '.uix-controls__select-wrapper' ) : $( '#' + curSelWrapperID ); 


                                //update a new value to select control when the default is not empty
                                const defaultVal = $( '#' + curSelInputID ).data( 'default-value' );

                                if ( defaultVal != '' && defaultVal != null ) {
                                    
                                    $( '#' + curSelInputID ).val( defaultVal );
                                    $curSelWrapper.find( 'select' )
                                                                .val( defaultVal )
                                                                .attr( 'selected', 'selected' )
                                                                .change(); 


                                }


                                //Render the custom select
                                if ( isCustomSel ) {
                                    $( document ).UixRenderCustomSelect();
                                    $curSelWrapper.find( 'select' ).attr( 'selected', 'selected' ).change();
                                }


                            }
  
                            
                        });



                    })  
                    .catch(function (error) {

                        if (error.response) {
                            // The request was made and the server responded with a status code
                            // that falls out of the range of 2xx
                            const status = error.response.status;
                            console.log(status);


                        } else if (error.request) {
                            // The request was made but no response was received
                            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                            // http.ClientRequest in node.js
                            console.log(error.request);


                        } else {
                            // If there was a problem, we need to
                            // dispatch the error condition
                            console.log(error.message);
                        }
                    });


                    // Remove an interceptor later
                    axios.interceptors.request.eject(axiosInterceptor);




					//Prevent the form from being initialized again
					$this.data( 'exist', 1 );	
				}


				
			} // end of jsonFile
			
			
			
		});
		
		
			
				
    };

    module.components.documentReady.push( module.DYNAMIC_DD_LIST.documentReady );
	

	return class DYNAMIC_DD_LIST {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );



