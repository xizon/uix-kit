
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
    'use strict';
    $.fn.UixSearchJsonStr = function( options ) {
 
        // This is the easiest way to have default options.
        const settings = $.extend({
			method    : 'POST',
			callback  : null,
			jsonFile  : '',
			key       : 'attributes'
        }, options );
 
        this.each( function() {
			
			const obj = $( this );
			
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
            const defaultPostData = {
                action  : 'load_singlepages_ajax_content'
            };
            for(let k in defaultPostData) {
                formData.append(k, defaultPostData[k]);
            }

            // Create a request event
            axios({
                timeout: 15000,
                method: settings.method,
                url: settings.jsonFile,
                data: formData,
                responseType: 'text',
            })
            .then(function (response) {
                
                const jsonData = response.data;
                
                
                let newArr = [];

                //Convert JSON to an array
                const formatFromServer = function formatFromServer( data ) {
                    let formatData = {};

                    for ( let item in data ) {
                        if ( $( document ).UixIsJsonObj( { string:  data[item] } ) ) {
                            formatFromServer( data[item], formatData );
                        } else {
                            formatData[item] = data[item];
                        }
                    }

                    for ( let item2 in formatData ) {
                        //console.log( formatData[ item2 ] );
                        newArr.push( formatData[ item2 ] );
                    }



                    return formatData;
                };

                formatFromServer( jsonData );


                //search JSON key that contains specific string
                for ( let p = 0; p < newArr.length; p++ ) {

                    for ( let n = 0; n < newArr[p].list.length; n++ ) {

                        if ( Object.prototype.toString.call( newArr[p].list[n][settings.key] ) =='[object Array]' ) {

                            // API: Callback
                            settings.callback( newArr[p].list[n][settings.key] );

                        }


                    }


                }   
                
                
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



			
		});
 
    };
 
}( jQuery ));

