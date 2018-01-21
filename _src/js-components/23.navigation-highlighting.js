/*! 
 *************************************
 * 23. Navigation Highlighting
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {
    
        // Get section or article by href
        function getRelatedContent( el ) {
            return $( $( el ).attr( 'href' ) );
        }
        // Get link by section or article id
        function getRelatedNavigation( el ) {
            return $( '.menu-main li > a[href=#' + $( el ).attr( 'id' ) + ']' ).parent( 'li' );
        } 
        
	    //-------- Navigation highlighting using waypoints
		if ( $( 'body' ).hasClass( 'highlight-section' ) ) {


			// Smooth scroll to content
			$( '.menu-main li > a' ).on('click', function(e) {
				e.preventDefault();

				$( 'html,body' ).animate({
					scrollTop: getRelatedContent( this ).offset().top - 20
				});
			});	

			//-------- Default cwaypoint settings
			var topSectionSpacing = $( '.header-area' ).outerHeight( true );
			var waypoints1 = $( '[data-highlight-section="true"]' ).waypoint({
				handler: function( direction ) {


					// Highlight element when related content
					getRelatedNavigation( this.element ).toggleClass( 'active', direction === 'down' );
					$( this.element ).toggleClass( 'active', direction === 'down' );

				},
				offset: topSectionSpacing
			});	

			var waypoints2 = $( '[data-highlight-section="true"]' ).waypoint({
				handler: function( direction ) {

					// Highlight element when related content
					getRelatedNavigation( this.element ).toggleClass( 'active', direction === 'up' );
					$( this.element ).toggleClass( 'active', direction === 'up' );

				},
				offset: function() {  
					return -$( this.element ).height() - topSectionSpacing; 
				}
			});	

			setTimeout( function() {
				$( '.menu-main li:first' ).addClass( 'active' );
			}, 1000 );	
		}

		
		
		
		
    };

    theme.navHighlight = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );






