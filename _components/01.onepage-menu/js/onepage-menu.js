/* 
 *************************************
 * <!-- Navigation Highlighting -->
 *************************************
 */
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {

		var $primaryMenu      = $( '.menu-main' ),
			$sidefixedMenu    = $( '.custom-sidefixed-menu' ),
			topSectionSpacing = $( '.header-area' ).outerHeight( true );
		

		/*
		 * Get section or article by href
		 *
		 * @param  {string, object} el  - The current selector or selector ID
		 * @return {object}             - A new selector.
		 */
        function getRelatedContent( el ) {
            return $( $( el ).attr( 'href' ) );
        }
		
		/*
		 * Get link by section or article id
		 *
		 * @param  {string, object} el  - The current selector or selector ID
		 * @param  {object} menuObj     - Returns the menu element within the document.
		 * @return {object}             - A new selector.
		 */
        function getRelatedNavigation( el, menuObj ) {
            return menuObj.find( 'li > a[href=#' + $( el ).attr( 'id' ) + ']' ).parent( 'li' );
        } 
		
		/*
		 * Get all links by section or article
		 *
		 * @param  {object} menuObj     - Returns the menu element within the document.
		 * @return {object}             - A new selector.
		 */
        function getAllNavigation( menuObj ) {
            return menuObj.find( 'li' );
        } 	
		
		/*
		 * Smooth scroll to content
		 *
		 * @param  {object} menuObj     - Returns the menu element within the document.
		 * @return {void}               - The constructor.
		 */
        function goPageSection( menuObj ) {
			menuObj.find( 'li > a' ).on('click', function(e) {
				e.preventDefault();
				
				
				TweenLite.to( window, 0.5, {
					scrollTo: {
						y: getRelatedContent( this ).offset().top - topSectionSpacing
					},
					ease: Power2.easeOut
				});	
			
			});	
	
        } 	
        
		
		//-------- Scroll Animate Interactions
		//-----------------------------
		if ( $( 'body' ).hasClass( 'onepage' ) ) {

			//Activate the first item
			$primaryMenu.find( 'li:first' ).addClass( 'active' );
			$sidefixedMenu.find( 'li:first' ).addClass( 'active' );
	
			// Smooth scroll to content
			goPageSection( $primaryMenu );
			goPageSection( $sidefixedMenu );
			
			
			var navMinTop      = $sidefixedMenu.offset().top,
				navMaxTop      = parseFloat( $( document ).height() - $( '.footer-main-container' ).height() ) - $( window ).height()/3;
			
			$( window ).on( 'scroll touchmove', function() {
				var scrollTop = $( this ).scrollTop(),
					spyTop    = parseFloat( scrollTop + topSectionSpacing ),
					minTop    = $( '[data-highlight-section="true"]' ).first().offset().top,
					maxTop    = $( '[data-highlight-section="true"]' ).last().offset().top + $( '[data-highlight-section="true"]' ).last().height();

				
				$( '[data-highlight-section="true"]' ).each( function()  {
					var block     = $( this ),
						eleTop    = block.offset().top;
					
			
					if ( eleTop < spyTop ) {

						// Highlight element when related content
						getAllNavigation( $primaryMenu ).removeClass( 'active' );
						getAllNavigation( $sidefixedMenu ).removeClass( 'active' );
						getRelatedNavigation( block, $primaryMenu ).addClass( 'active' );
						getRelatedNavigation( block, $sidefixedMenu ).addClass( 'active' );
					} 
				});
				
				
				
				//Cancel the current highlight element
				if ( spyTop > maxTop || spyTop < minTop ) {
					getAllNavigation( $primaryMenu ).removeClass( 'active' );
					getAllNavigation( $sidefixedMenu ).removeClass( 'active' );
				}
				
				
				//Detecting when user scrolls to bottom of div
				if ( spyTop > navMaxTop || spyTop < navMinTop ) {
					$sidefixedMenu.removeClass( 'fixed' );
				} else {
					$sidefixedMenu.addClass( 'fixed' );
				}	
				
				
				
				
			});	
			
			
			

		}

		
		
		
		
    };

    theme.navHighlight = {
        documentReady : documentReady        
    };

    theme.components.documentReady.push( documentReady );
    return theme;

}( theme, jQuery, window, document ) );








