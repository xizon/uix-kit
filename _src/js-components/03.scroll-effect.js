/*! 
 *************************************
 * 3. Scroll Effect
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {
    
		//-------- Back to top
		$( 'body' ).prepend( '<a href="#" id="toTop"><span id="toTopHover"></span></a>' );
		
		//-------- Sticky button of back to top 
		var waypoints = $( '#toTop' ).waypoint({
			handler: function( direction ) {
				
				$( this.element ).toggleClass( 'active', direction === 'down' );

			},
			offset: -120
		});
		
		
		$( '#toTop' ).on( 'click', function( e ) {
			e.preventDefault();
			$( 'html, body' ).stop().animate({
				scrollTop: 0
			}, { easing: 'easeOutQuart', duration: 500 } );	
		
		});
		
	    //-------- Navigation highlighting using waypoints
		if ( $( 'body' ).hasClass( 'highlight-section' ) ) {
			// Get section or article by href
			function getRelatedContent( el ) {
				return $( $( el ).attr( 'href' ) );
			}
			// Get link by section or article id
			function getRelatedNavigation( el ) {
				return $( '.menu-main li > a[href=#' + $( el ).attr( 'id' ) + ']' ).parent( 'li' );
			}

			// Smooth scroll to content
			$( '.menu-main li > a' ).on('click',
			function(e) {
				e.preventDefault();

				$( 'html,body' ).animate({
					scrollTop: getRelatedContent( this ).offset().top - 20
				})
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

    theme.scrolltop = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );






