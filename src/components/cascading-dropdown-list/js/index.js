
/* 
 *************************************
 * <!-- Cascading DropDown List -->
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

import '../scss/_style.scss';

export const CASCADING_DD_LIST = ( ( module, $, window, document ) => {
	if ( window.CASCADING_DD_LIST === null ) return false;
	
	
    module.CASCADING_DD_LIST               = module.CASCADING_DD_LIST || {};
    module.CASCADING_DD_LIST.version       = '0.2.1';
    module.CASCADING_DD_LIST.documentReady = function( $ ) {
        


        const curControls = '.uix-cascading-dropdown-list';
        let wrapperDepth = $( curControls ).length === 0 ? 1 : $( curControls ).length+1;
        $( curControls ).each(function () {

            wrapperDepth--;

            const cid = UixGUID.create();
            const $control = $(this);
            const actived = $control.data('activated');
            $control.attr( 'id', 'app-' + cid );

            //
			let	ajaxURL    = $control.data( 'cascading-dd-json' ),
                ajaxMethod = $control.data( 'cascading-dd-method' ),
                loadingTmpl = $control.data( 'cascading-dd-loading-tmpl' );
	

                
			if ( typeof ajaxURL === typeof undefined ) ajaxURL = '';
			if ( typeof ajaxMethod === typeof undefined ) ajaxMethod = 'POST';
            if ( typeof loadingTmpl === typeof undefined ) loadingTmpl = '<div>loading...</div>';

            
            if (typeof actived === typeof undefined) {


                //Initialize HTML structure
                $control.append(`
                    <em class="uix-cascading-dropdown-list__result"></em>
                    <span class="uix-cascading-dropdown-list__items__wrapper"></span>
                    <span class="uix-cascading-dropdown-list__loading__wrapper"></span>    
                `);

                
                //
                const $listWrapper = $control.find( '.uix-cascading-dropdown-list__items__wrapper' );
                const $resInput = $control.find('input.uix-cascading-dropdown-list__res');
                const $eachResWrapper = $control.find( '.uix-cascading-dropdown-list__result' );
                const fieldName = typeof $resInput.attr('name') === 'undefined' ? 'auto-name-'+cid : $resInput.attr('name');
                

                // Methods
                //------------------------------------------
                function loadingAnim() {
                    const $loadingWrapper = $control.find( '.uix-cascading-dropdown-list__loading__wrapper' );

                    if ( $control.data('loading') ) {
                        $loadingWrapper.html(loadingTmpl);
                    } else {
                        $loadingWrapper.html('');
                    }
                }

                //
                function handleInitControl() {

                    const firstLevelItems = [];
                    $control.data('ajaxOptions').forEach( (item) => {
                        firstLevelItems.push({
                            "id": item.id,
                            "name": item.name
                        });
                    });
            
            
                    //
                    $control.data({
                        'data': [$control.data('ajaxOptions')],
                        'firstLevelItems': [firstLevelItems]
                    });

                    // update result to input
                    $resInput.val( '' );
            
                }

                //
                function queryResultOfJSON(data, targetVal, returnType) {

                    let callbackValueNested = [];
                    let lastFirstLevelName = '';
                    let loop = true;
                    let resDepth = 0;
                
                    const getIndexOf = function(arr, val) {
                        for (let i=0; i<arr.length; i++) {
                            if( arr[i].id.toString() === val.toString() ){
                                return i;
                            }
                        }
                        return -1;
                    };
                
                
                    const searchJsonStr = function(list, depth) {
                
                        // `depth` is very important, it is used to accurately judge the final result
                        if (typeof(depth) === 'undefined') {
                            depth = 0;
                        } else {
                            depth++;
                        }

                        //    
                        for ( let i = 0; i < list.length; i++ ) {
                
                            const row = list[i];
                            const callbackValue = returnType === 'key' ? row.id.toString() : row.name.toString();
                            
                            if ( loop ) {
                                // get first-level item
                                if ( getIndexOf(data, row.id) !== -1 ) {
                                    callbackValueNested.push(callbackValue);
                                    lastFirstLevelName = callbackValue;
                                }
                
                                // get child-level item
                                if (row.children) {
                                    callbackValueNested.push(callbackValue);
                                }
                
                            }
                
                
                            //check the value
                            if ( row.id.toString() === targetVal.toString() ) {
                                callbackValueNested.push(callbackValue);
                                loop = false;
                                resDepth = depth;
                                break;
                            }
                
                
                            // Note: Recursion must be placed here
                            if ( loop ) {
                                if (row.children) {
                                    searchJsonStr(row.children, depth);
                                }	
                            }
                
                
                            
                        }
                
                
                    }
                    searchJsonStr(data);
                
                
                    // (1) Remove duplicate values
                    //------------------------------------------
                    callbackValueNested = callbackValueNested.filter(function(item, index, arr) {
                        return arr.indexOf(item, 0) === index;
                    });
                
                
                    // (2) Delete needless first-level
                    //------------------------------------------
                    let resAll = callbackValueNested.slice(callbackValueNested.indexOf( lastFirstLevelName ), callbackValueNested.length)
                
                
                    // (3) Returns result
                    //------------------------------------------
                    if ( resAll.length > 1 ) {
                        // Get first-level item
                        resAll.splice(1);
                        
                        // Get child-level item
                        let resChild = callbackValueNested.slice(-resDepth); // Get the last elements in reverse
                        
                        // Combine
                        resAll = resAll.concat( resChild );
                        
                    }
                
                    return resAll;
                
                }
                

                //
                function setValue(arr, targetVal) {

                    // update result to input
                    $resInput.val( targetVal );
                    
                    //search JSON key that contains specific string
                    $control.data({
                        'selectedData': {
                            labels: queryResultOfJSON(arr, targetVal, 'value' ),
                            values: queryResultOfJSON(arr, targetVal, 'key' )
                        }
                    });
                    
                }


                //
                function handleClickItem(resValue, index, level) {
                    
                    console.log('resValue: ', resValue, ' | index: ', index, ' | level: ', level);
            
                    // update value
                    setValue( $control.data('ajaxOptions'), resValue.id );
            
            
                    // active the selected item
                    const markCurrent = function(arr, index) {
                        for (let i = 0; i < arr.length; i++) {
                            if (i === index) {
                                arr[i].current = true;
                            } else {
                                arr[i].current = false;
                            }
                        }
                    };
                
                    // deactivate all items
                    const markAllItems = function(arr) {
                        for (let i = 0; i < arr.length; i++) {
                            arr[i].current = false;
                        }
                    };
                


                    //
                    const newData = $control.data('data');  // such as: [Array(6), Array(3)]
                    //console.log( 'newData: ', newData );
            
                    // All the elements from start(array.length - start) to the end of the array will be deleted.
                    newData.splice(level + 1);
            
                    if (resValue.children) {
                        const childList = resValue.children;
                        markAllItems(childList);
                        newData[level + 1] = childList;
                    }
            
            
                    //
                    $control.data({
                        'data': newData
                    });
            
                    markCurrent(newData[level], index); 
            
                }
            

                //
                function handleDisplayOptions(e) {
                    e.preventDefault();
                    $control.data({
                        'isShow': !$control.data('isShow')
                    });
                }



                // If clicked on outside of element
                function handleClickOutside(event) {
                    if ( 
                        event.target.className != '' && ( 
                            event.target.className.indexOf( 'uix-cascading-dropdown-list__trigger' ) < 0 && 
                            event.target.className.indexOf( 'uix-cascading-dropdown-list__items' ) < 0 && 
                            event.target.className.indexOf( 'uix-cascading-dropdown-list__opt' ) < 0
                        )
                    ) {
                        
                        $control.data({
                            'isShow': false
                        });

                    }
                }
                


                // Rendering component
                function render() {
                    const isShow = $control.data('isShow'); 
                    const data = $control.data('data');


                    //for wrapper
                    if ( isShow ) {

                        let items = '';
                        data.map((item, level) => {
                            
                            let options = '';
                            item.map((option, optionIndex) => {
                                options += '<div class="'+(option.current ? 'uix-cascading-dropdown-list__opt is-active' : 'uix-cascading-dropdown-list__opt')+'" data-level="'+level+'" data-value=\''+JSON.stringify(option)+'\' data-index="'+optionIndex+'">'+option.name+'</div>'
                            });
                            

                            items += '<li>'+options+'</li>';
                        });

                        $listWrapper.html(`
                        <div class="uix-cascading-dropdown-list__items">
                            <ul>
                                `+items+`
                            </ul>
            
                        </div>
                        `);
                    } else {
                        $listWrapper.html('');
                    }


                    //for options
                    const selectedData = $control.data('selectedData');

                    let displayInfo = '';
                    if ( selectedData.labels ) {
                        selectedData.labels.map((item, i, arr) => {

                            const _input = '<input name="'+fieldName+'-node[]" type="hidden" value="'+selectedData.values[i]+'"/>';

                            if (arr.length - 1 === i) {
                                displayInfo += '<span>'+item+''+_input+'</span>';
                            } else {
                                displayInfo += '<span>'+item+''+_input+'</span><svg viewBox="0 0 22 22" width="8"><path d="m345.44 248.29l-194.29 194.28c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744l171.91-171.91-171.91-171.9c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.29 194.28c6.177 6.18 9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373" transform="matrix(.03541-.00013.00013.03541 2.98 3.02)" fill="#a5a5a5"/></svg>';
                            }
                        });
                    }


                    $eachResWrapper.html(displayInfo);


                }    




                // Initialize status
                //------------------------------------------
                const defaultVal = $resInput.val(); //the default value is STRING

                /*
                // If the final result is a comma separated string, like this: `value1,value2`
                if (defaultVal) {
                    defaultVal.trim().replace(/^\,|\,$/g, '').split(',').forEach((item, index) => {
                         // do something
                    });
                }
                */

                //init data
                $control.data({
                    'ajaxOptions': [],
                    'firstLevelItems': [],
                    'loading': true,
        
                    //for variable field
                    'data': [],
                    'selectedData': {
                        labels: [],
                        values: []
                    },
                    'isShow': false
                });

                //loading
                loadingAnim();

                //Initialize input
                $resInput.attr({
                    'type': 'hidden',
                    'name': fieldName
                });

                //Initialize wrapper depth
                $control.css('z-index',wrapperDepth);
                

                // Get data of asynchronous request
                //------------------------------------------
                const req = ajaxMethod.toLowerCase() === 'get' ? axios.get(ajaxURL) : axios.post(ajaxURL);
                let allData = null;
                req.then((res) => {
                    allData = res.data;

                    $control.data({
                        'loading': false
                    });


                    //loading
                    loadingAnim();

                    if (allData !== undefined) {

                        $control.data({
                            'ajaxOptions': allData
                        });

                        //Initialize options 
                        handleInitControl();

                        //Set a default value
                        if ( defaultVal ) setValue( allData, defaultVal );

                        //Rendering component
                        render();


                    }


                    


                });

        
                // Mouse Events
                //------------------------------------------
                //Trigger event 
                $( document ).off( 'click.CASCADING_DROPDOWNLIST_TRIGGER'+cid ).on( 'click.CASCADING_DROPDOWNLIST_TRIGGER'+cid, `#${'app-' + cid} .uix-cascading-dropdown-list__trigger`, function( e ) {
                    handleDisplayOptions(e);

                    //Rendering component
                    render();


                });	 
                
                //Options event
                $( document ).off( 'click.CASCADING_DROPDOWNLIST_OPTIONS_OPEN'+cid ).on( 'click.CASCADING_DROPDOWNLIST_OPTIONS_OPEN'+cid, `#${'app-' + cid} .uix-cascading-dropdown-list__opt`, function( e ) {
                    const _level = $( this ).data( 'level' );
                    const _value = $( this ).data( 'value' );
                    const _index = $( this ).data( 'index' );

                    handleClickItem(_value, _index, _level);


                    //Rendering component
                    render();

                });	 


                //Hide options event
                //Do not add off() to this
                $( document ).on( 'click.CASCADING_DROPDOWNLIST_CLOSE', function( e ) {
                    handleClickOutside(e);

                    //Rendering component
                    render();

                });	  


                //------------------------------------------

                //Prevents front-end javascripts that are activated in the background to repeat loading.
                $control.data('activated', 1);

            }//endif actived			


        });


			
				
    };

    module.components.documentReady.push( module.CASCADING_DD_LIST.documentReady );
	

	return class CASCADING_DD_LIST {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );



