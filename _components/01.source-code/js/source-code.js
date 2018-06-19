
/* 
 *************************************
 * <!-- Source Code View -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.SOURCE_CODE_VIEW               = APP.SOURCE_CODE_VIEW || {};
	APP.SOURCE_CODE_VIEW.version       = '0.0.1';
    APP.SOURCE_CODE_VIEW.documentReady = function( $ ) {

		//Add view source code to body
		$( 'body' ).prepend( '<a href="#source-code" id="view-source"><i class="fa fa-code" aria-hidden="true"></i></a><div id="source-code"><a href="javascript:void(0);" id="close"></a></div>' );
				
		
		//View source button event
		$( '#view-source' ).on( 'click', function() {
			$( 'html' ).css( 'overflow-y', 'hidden' );
			$( '#source-code' ).show();
		});
		
		$( '#source-code > #close' ).on( 'click', function() {
			$( 'html' ).css( 'overflow-y', 'auto' );
			var uri = window.location.toString();
			if ( uri.indexOf( '#' ) > 0 ) {
				var clean_uri = uri.substring(0, uri.indexOf( '#' ) );
				window.history.replaceState({}, document.title, clean_uri );
			}
			$( '#source-code' ).hide();
			
		});
		
		
		//Remove tag from HTML-String
		var removeElements = function( text, selector ) {
			var wrapped = $( "<div>" + text + "</div>" );
			wrapped.find( selector ).remove();
			return wrapped.html();
		};


		//Source code init
		var sourceCodeBodyClass      = $( 'body' ).attr( 'class' ),
			sourceCodeBodyClassCode  = ( typeof sourceCodeBodyClass != typeof undefined ) ? 'body class="'+sourceCodeBodyClass+'"' : 'body';
		
		$.get( window.location.toString(), function( data ) {
			var pageBodyCode   = data.split("<body")[1].split(">").slice(1).join(">").split("</body>")[0],
				pageHeaderCode = data.split("</head>")[0];
			
			pageBodyCode   = removeElements( pageBodyCode, '#view-source, #source-code' );
			pageBodyCode   = pageBodyCode.replace(/[<>]/g, function(m) { return {'<':'&lt;','>':'&gt;'}[m]; });
			pageHeaderCode = pageHeaderCode.replace(/[<>]/g, function(m) { return {'<':'&lt;','>':'&gt;'}[m]; });


			$("<pre />", {
				"html":   pageHeaderCode + '&lt;/head&gt;\n&lt;'+sourceCodeBodyClassCode+'&gt;\n' + pageBodyCode + '\n&lt;/body&gt;\n&lt;/html&gt;',
				"class": 'highlightBlock-print html'
			}).appendTo( '#source-code' );	
			
		});
		
		
		
		//highlighter written
		
    };

    APP.components.documentReady.push( APP.SOURCE_CODE_VIEW.documentReady );
    return APP;

}( APP, jQuery, window, document ) );


