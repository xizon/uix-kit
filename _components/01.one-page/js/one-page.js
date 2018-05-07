/* 
 *************************************
 * <!-- Full Page/One Page Transition -->
 *************************************
 */
App = ( function ( App, $, window, document ) {
    'use strict';
    
    var documentReady = function( $ ) {


        var $window      = $( window ),
		    windowWidth  = $window.width(),
		    windowHeight = $window.height();
		

	    //Determine the direction of a jQuery scroll event
		//Fix an issue for mousewheel event is too fast.
		var lastAnimation      = 0,
			quietPeriod        = 500, //Do not change it
			animationTime      = 1000,//According to page transition animation changes
			$sectionsContainer = $( '.custom-fullpage-container' ),
			$sections          = $sectionsContainer.find( '> section' ),
			sectionTotal       = $sections.length,
			topSectionSpacing  = 0,
			$primaryMenu       = $( '.menu-main' ),
			$sidefixedMenu     = $( '.custom-sidefixed-menu' );
		
		
		//Prevent this module from loading in other pages
		if ( $sectionsContainer.length == 0 ) return false;
		


		// Prepare everything before binding wheel scroll
		$.each( $sections, function( i ) {
			$( this ).attr( 'data-index', i );
			if ( i == 0 ) {
				$( this ).addClass( 'active' );

			}
			
		});
		

		
		//Init the section location
		sectionStart();

		
		/*
		 * Init the section location
		 *
		 * @return {void}                - The constructor.
		 */
		function sectionStart() {
	
			setTimeout( function() {
				var hash = window.location.hash,
					locArr,
					loc, 
					curTab;

				if ( hash ) {
					
					//Add hashchange event
					locArr = hash.split( 'section-' );
					loc    = locArr[1];
					moveTo( $sectionsContainer, false, loc );
				} else {
					moveTo( $sectionsContainer, false, 1 );
				}

			}, quietPeriod );

		}
			
		
		/*
		 * Scroll initialize
		 *
		 * @param  {object} event        - The wheel event is fired when a wheel button of a pointing device (usually a mouse) is rotated. 
		 * @param  {string} dir          - Gets a value that indicates the amount that the mouse wheel has changed.
		 * @return {void}                - The constructor.
		 */
		function scrollMoveInit( event, dir ) {
	
			var timeNow = new Date().getTime();
			// Cancel scroll if currently animating or within quiet period
			if( timeNow - lastAnimation < quietPeriod + animationTime) {
				event.preventDefault();
				return;
			}

			if ( dir == 'down' ) {
				//scroll down
				moveTo( $sectionsContainer, 'down', false );
				
			} else {
				//scroll up
				moveTo( $sectionsContainer, 'up', false );
				
			  
			}
			lastAnimation = timeNow;
		}
		
      
		
		/*
		 * Move Animation
		 *
		 * @param  {object} el           - The container of each sections.
		 * @param  {string} dir          - Rolling direction indicator.
		 * @param  {number} hashID       - ID of custom hashchange event.
		 * @return {void}                - The constructor.
		 */
		function moveTo( el, dir, hashID ) {
			var index     = parseFloat( $sections.filter( '.active' ).attr( 'data-index' ) ),
				nextIndex = null,
				$next     = null,
				isNumeric = /^[-+]?(\d+|\d+\.\d*|\d*\.\d+)$/;
			
			
			 
			if ( dir == 'down' || dir === false ) {
				nextIndex = index + 1;
			} else {
				nextIndex = index - 1;
			}
			

			//ID of custom hashchange event
			if ( isNumeric.test( hashID ) ) nextIndex = parseFloat( hashID - 1 );
			
			
			if ( nextIndex <= parseFloat( sectionTotal-1 ) && nextIndex >= 0 ) {
				
				if ( nextIndex > parseFloat( sectionTotal-1 ) ) nextIndex = parseFloat( sectionTotal-1 );
				if ( nextIndex < 0 ) nextIndex = 0;


				//Returns the target section
				$next = $sections.eq( nextIndex );

				//Smooth scroll to content
				if ( $next.length > 0 ) {
					TweenMax.to( window, animationTime/1000, {
						scrollTo: {
							y: $next.offset().top - topSectionSpacing
						},
						ease: Power2.easeOut,
						onComplete: function() {

							$sections.removeClass( 'leave' );
							$sections.eq( index ).addClass( 'leave' );

							$sections.removeClass( 'active' );
							$next.addClass( 'active' ).removeClass( 'leave' );



							//Changing The Site URL
							var curSectionIndex = $sections.filter( '.active' ).index() + 1,
								href            = window.location.href.substr( 0, window.location.href.indexOf( '#' ) ) + '#' + $sections.filter( '.active' ).attr( 'id' );

							if ( Modernizr.cssanimations ) {
								history.pushState( {}, document.title, href );
								console.log( 'Section ' + curSectionIndex + ' loaded!' );
							}


						}
					});			
				}	
				
			}
			

	

			
		}
		
		

		/* 
		 ====================================================
		 *  Navigation Interaction
		 ====================================================
		 */
		goPageSection( $primaryMenu );
		goPageSection( $sidefixedMenu );

        
	
		//Activate the first item
		$primaryMenu.find( 'li:first' ).addClass( 'active' );
		$sidefixedMenu.find( 'li:first' ).addClass( 'active' );
		
		
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
		 * @param  {string, object} el    - The current selector or selector ID
		 * @param  {object} menuObj       - Returns the menu element within the document.
		 * @param  {boolean} echoIndex    - Whether to return the current index.
		 * @return {object}               - A new selector.
		 */
        function getRelatedNavigation( el, menuObj, echoIndex ) {
			
			if ( echoIndex ) {
				return menuObj.find( 'li > a[href=#' + $( el ).attr( 'id' ) + ']' ).parent( 'li' ).index();
			} else {
			    return menuObj.find( 'li > a[href=#' + $( el ).attr( 'id' ) + ']' ).parent( 'li' );	
			}
            
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
			menuObj.find( 'li > a' ).on( 'click', function(e) {
				e.preventDefault();
				
				if ( $( this ).parent().hasClass( 'active' ) ) return false;
				
				
				moveTo( $sectionsContainer, false, $( this ).parent( 'li' ).index() + 1 );
			});	
	
        } 	



		var navMinTop      = ( $sidefixedMenu.length > 0 ) ? $sidefixedMenu.offset().top : 0,
			navMaxTop      = parseFloat( $( document ).height() - $( '.footer-main-container' ).height() ) - windowHeight/3;

		$window.on( 'scroll touchmove', function() {
			var scrollTop = $( this ).scrollTop(),
				spyTop    = parseFloat( scrollTop + topSectionSpacing ),
				minTop    = $( '[data-highlight-section="true"]' ).first().offset().top,
				maxTop    = $( '[data-highlight-section="true"]' ).last().offset().top + $( '[data-highlight-section="true"]' ).last().height();

			$( '[data-highlight-section="true"]' ).each( function()  {
				var block     = $( this ),
					eleTop    = block.offset().top;
				

				// The 1 pixel in order to solve inaccurate value of outerHeight() 
				// in Safari and Firefox browsers.
				if ( eleTop < spyTop + 1 ) {

					// Highlight element when related content
					getAllNavigation( $primaryMenu ).removeClass( 'active' );
					getAllNavigation( $sidefixedMenu ).removeClass( 'active' );
					getRelatedNavigation( block, $primaryMenu, false ).addClass( 'active' );
					getRelatedNavigation( block, $sidefixedMenu, false ).addClass( 'active' );
					
					
				} 
			});



			//Cancel the current highlight element
			// The 1 pixel in order to solve inaccurate value of outerHeight() 
			// in Safari and Firefox browsers.
			if ( spyTop > maxTop || spyTop < minTop - 1 ) {
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
	
		

		
		
		/* 
		 ====================================================
		 *  Mouse Wheel Method
		 ====================================================
		 */
		$( document ).on( 'wheel', function( e ) { 

			var dir;
			//Gets a value that indicates the amount that the mouse wheel has changed.
			var delta = e.originalEvent.deltaY;
			
			if( delta > 0 ) { 
				//scroll down
				dir = 'down';
				
			} else {
				//scroll up
				dir = 'up';
			}
			
			scrollMoveInit( e, dir );
			
			//prevent page fom scrolling
			return false;

		});
		
		
		
		/* 
		 ====================================================
		 *  Touch Method
		 ====================================================
		 */
			
		var startX,
			startY;


		$sectionsContainer.on( 'touchstart.onepage', function( event ) {
			var touches = event.originalEvent.touches;
			if ( touches && touches.length ) {
				startX = touches[0].pageX;
				startY = touches[0].pageY;


				$sectionsContainer.on( 'touchmove.onepage', function( event ) {

					var touches = event.originalEvent.touches;
					if ( touches && touches.length ) {
						var deltaX = startX - touches[0].pageX,
							deltaY = startY - touches[0].pageY;

						if ( deltaX >= 50) {
							//--- swipe left


						}
						if ( deltaX <= -50) {
							//--- swipe right
						


						}
						if ( deltaY >= 50) {
							//--- swipe up
							moveTo( $sectionsContainer, 'down', false );

						}
						if ( deltaY <= -50) {
							//--- swipe down
							moveTo( $sectionsContainer, 'up', false );
							

						}
						if ( Math.abs( deltaX ) >= 50 || Math.abs( deltaY ) >= 50 ) {
							$sectionsContainer.off( 'touchmove.onepage' );
						}
					}

				});
			}	
		});


		
		
    };

    App.onepage = {
        documentReady : documentReady        
    };

    App.components.documentReady.push( documentReady );
    return App;

}( App, jQuery, window, document ) );


