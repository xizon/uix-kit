
/*
 * Method of deleting or adding a module
 *
 * @global
 * @description This function can be used separately in HTML pages or custom JavaScript.
 * @param  {Boolean|String} destroy       - If it is a string, it means destroying this module from UixModuleInstance
 * @param  {Object} add                     - New module data via JSON.
 * @param  {String} add.moduleName        - The name of the module (the default is all uppercase).
 * @param  {Boolean} add.pageLoaded       - Window loading module method. If true or 1, the module will execute after the page is loaded.
 * @param  {Number} add.version           - The new module version number.
 * @param  {Function} add.callback        - The new module script of function.
 * @return {Void}      
 *
 * @Usage:
 * !!! The code is to be inserted in front of the uix-kit core script.
	
	
<script>
window.MAIN = null;
( function( $ ) {
"use strict";
    $( document ).ready( function() {
		$( document ).UixModuleFilter( { 
		   'destroy' : 'MAIN',
		   'add'     : {
							moduleName    : 'YOUR_MODULE_NAME',
							pageLoaded    : true,
							version       : '0.0.1',
							callback      : function() {
								//the module will execute after the page is loaded.

							}
						}
		} );
    } );
} ) ( jQuery );
</script>

 *
 * 
 */

import { UixModuleInstance } from '@uixkit/core/_global/js';

export const UixModuleFilter = ( ( $ ) => {
	'use strict';

    $.fn.UixModuleFilter = function( options ) {
 
        // This is the easiest way to have default options.
        const settings = $.extend({
			destroy       : false,
			add           : {
				moduleName    : 'OLD_MODULE_NAME',
				pageLoaded    : false,
				version       : '0.0.1',
				callback      : function() {}
			}

        }, options );
 
        this.each( function() {
		
			
			//remove a module
			//-------------------------------------	
			if ( settings.destroy && Object.prototype.toString.call( settings.destroy )=='[object String]' ) {
				const moduleName = settings.destroy;
				if ( typeof UixModuleInstance[ moduleName ] != typeof undefined ) {
					delete UixModuleInstance[ moduleName ];	
				}

			}
			
			
			
			
			//add or replace a module
			//-------------------------------------	
			if ( settings.add && Object.prototype.toString.call( settings.add )=='[object Object]' && settings.add.hasOwnProperty( 'pageLoaded' ) ) {

				const moduleName = settings.add.moduleName;
				
				
				//delete the old module if exist
				if ( typeof UixModuleInstance[ moduleName ] != typeof undefined ) {
					console.log( 'The module already exists, please destroy the old module or change the new module name.' );
				} else {
					
					//loading mode "documentReady"
					if ( ! settings.add.pageLoaded || settings.add.pageLoaded == 0 ) {

						const _moduleName = ( function ( module, $, window, document ) {

							module[ moduleName ]               = module[ moduleName ] || {};
							module[ moduleName ].version       = settings.add.version;
							module[ moduleName ].documentReady = function( $ ) {

								settings.add.callback();

							};

							module.components.documentReady.push( module[ moduleName ].documentReady );
							return _moduleName;

						})( UixModuleInstance, jQuery, window, document );
						UixModuleInstance[ moduleName ].documentReady($);

					}

					//loading mode "pageLoaded"
					if ( settings.add.pageLoaded || settings.add.pageLoaded == 1  ) {

						const _moduleName = ( function ( module, $, window, document ) {

							module[ moduleName ]               = module[ moduleName ] || {};
							module[ moduleName ].version       = settings.add.version;
							module[ moduleName ].pageLoaded = function() {

								settings.add.callback();

							};

							module.components.pageLoaded.push( module[ moduleName ].pageLoaded );
							return _moduleName;

						})( UixModuleInstance, jQuery, window, document );
						UixModuleInstance[ moduleName ].pageLoaded();
						

					}	
				}
				



			}

			
		});
 
    };
	
})( jQuery );

