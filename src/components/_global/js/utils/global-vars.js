/*
 * Global variables from front pages
 *
 * @private
 */
let
	//If the file is in the root directory, you can leave it empty.
	//If in another directory, you can write: "/blog"
    templateUrl,

	//Eg. https://uiux.cc
	homeUrl,

	//Eg. https://uiux.cc/wp-admin/admin-ajax.php
	ajaxUrl;


if ( typeof APP_ROOTPATH === 'undefined' ) {
	templateUrl = '';
	homeUrl     = '';
	ajaxUrl     = '';
} else {
	templateUrl = APP_ROOTPATH.templateUrl.replace(/\/\s*$/, '' );
	homeUrl     = APP_ROOTPATH.homeUrl.replace(/\/\s*$/, '' );
	ajaxUrl     = APP_ROOTPATH.ajaxUrl.replace(/\/\s*$/, '' );
}



export { templateUrl, homeUrl, ajaxUrl };
