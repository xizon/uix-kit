
/* 
 *************************************
 * <!-- Source Code View -->
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
    UixCssProperty
} from '@uixkit/core/_global/js';

import '@uixkit/plugins/Miscellaneous/scrollLock';
import '../scss/_style.scss';


export const SOURCE_CODE_VIEW = ( ( module, $, window, document ) => {
	if ( window.SOURCE_CODE_VIEW === null ) return false;
	
	
	
    module.SOURCE_CODE_VIEW               = module.SOURCE_CODE_VIEW || {};
    module.SOURCE_CODE_VIEW.version       = '0.0.1';
    module.SOURCE_CODE_VIEW.documentReady = function( $ ) {

		//Add view source code to body
		$( 'body' ).prepend( '<a href="#uix-source-code" id="uix-view-source"><i class="fa fa-code" aria-hidden="true"></i></a><div id="uix-source-code"><a href="javascript:void(0);" id="uix-source-code__close"></a></div>' );
				

		//View source button event
		$( '#uix-view-source' ).on( 'click', function() {
			// Locks the page
			$.scrollLock( true );
			$( '#uix-source-code' ).show();
			

			
		});
		
		$( '#uix-source-code > #uix-source-code__close' ).on( 'click', function() {
			// Unlocks the page
			$.scrollLock( false );
			
			const uri = window.location.toString();
			if ( uri.indexOf( '#' ) > 0 ) {
				const clean_uri = uri.substring(0, uri.indexOf( '#' ) );
				window.history.replaceState({}, document.title, clean_uri );
			}
			$( '#uix-source-code' ).hide();
			
		});
		
		
		//Remove tag from HTML-String
		const removeElements = function( text, selector ) {
			const wrapped = $( "<div>" + text + "</div>" );
			wrapped.find( selector ).remove();
			return wrapped.html();
		};


		//Source code init
		const sourceCodeBodyClass      = $( 'body' ).attr( 'class' ),
			  sourceCodeBodyClassCode  = ( typeof sourceCodeBodyClass != typeof undefined ) ? 'body class="'+sourceCodeBodyClass+'"' : 'body';
		
		$.get( window.location.toString(), function( data ) {
			let pageBodyCode   = data.split("<body")[1].split(">").slice(1).join(">").split("</body>")[0],
				pageHeaderCode = data.split("</head>")[0];
			
			pageBodyCode   = removeElements( pageBodyCode, '#uix-view-source, #uix-source-code' );
			pageBodyCode   = pageBodyCode.replace(/[<>]/g, function(m) { return {'<':'&lt;','>':'&gt;'}[m]; });
			pageHeaderCode = pageHeaderCode.replace(/[<>]/g, function(m) { return {'<':'&lt;','>':'&gt;'}[m]; });


			$("<pre />", {
				"html":   pageHeaderCode + '&lt;/head&gt;\n&lt;'+sourceCodeBodyClassCode+'&gt;\n' + pageBodyCode + '\n&lt;/body&gt;\n&lt;/html&gt;',
				"class": 'highlightBlock-print html'
			}).appendTo( '#uix-source-code' );	
			
			$( 'pre.highlightBlock-print' ).each( function( i, block ) {
				hljs.highlightBlock( block );
			});	


			
		});
		
		
		
		//highlighter written
		
    };

    module.components.documentReady.push( module.SOURCE_CODE_VIEW.documentReady );

	return class SOURCE_CODE_VIEW {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );

