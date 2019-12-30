/* 
 *************************************
 * <!-- Full Page/One Page Transition 2 -->
 *************************************
 */
/**
 * module.ONEPAGE2
 * 
 * @requires ./src/components/ES5/_plugins-Miscellaneous
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




export const ONEPAGE2 = ( ( module, $, window, document ) => {
	if ( window.ONEPAGE2 === null ) return false;
	
	
	
    module.ONEPAGE2               = module.ONEPAGE2 || {};
    module.ONEPAGE2.version       = '0.0.5';
    module.ONEPAGE2.documentReady = function( $ ) {

        var $window      = $( window ),
		    windowWidth  = window.innerWidth,
		    windowHeight = window.innerHeight;

		
	    //Determine the direction of a jQuery scroll event
		//Fix an issue for mousewheel event is too fast.
		var lastAnimation      = 0,
			quietPeriod        = 500, //Do not change it
			animationTime      = 1000,//According to page transition animation changes
			$sectionsContainer = $( '.uix-normal-load__onepage-container2' ),
			$sections          = $sectionsContainer.find( '[data-highlight-section]' ),
			sectionTotal       = $sections.length,
			$primaryMenu       = $( '.uix-menu' ),
			$sidefixedMenu     = $( '.uix-menu-sidefixed' );
		
		
		//Prevent this module from loading in other pages
		if ( $sectionsContainer.length == 0 ) return false;
		
		
		//Init the sections style
		$sectionsContainer.css({
			'position' : 'relative'
		});
		
		var secIndex = 10;
		for ( var i = 0; i < sectionTotal; i++ ) {
			
			$sections.eq( i ).css({
				'position' : 'absolute',
				'width'    : '100%',
				'z-index'  : secIndex,
				'top'      : 0,
				'left'     : 0
			});		
			
			secIndex--;
			
			
		}
		
		


		// Prepare everything before binding wheel scroll
		$.each( $sections, function( i ) {
			$( this ).attr( 'data-index', i );
			if ( i == 0 ) {
				$( this ).addClass( 'is-active' );

			}
			
		});
		

		//Init the section location
		sectionStart();

		//Detect URL change
		$( window ).on( 'hashchange', function(){
			var hash = window.location.hash,
				locArr,
				loc;

			if ( hash ) {

				//Add hashchange event
				locArr = hash.split( 'section-' );
				loc    = locArr[1];
				moveTo( $sectionsContainer, false, loc );
			}
			
		} );
		
		
		
		
		
		/*
		 * Init the section location
		 *
		 * @return {Void}
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
		 * Initialize the depth of all sections
		 *
		 * @param  {Number} nextIndex        - Index of next section.
		 * @param  {Number} currentIndex     - Index of current section.
		 * @return {Void}
		 */
		function sectionsDepthInit( nextIndex, currentIndex ) {
	
			var secIndex = 10;
			
			for ( var i = 0; i < sectionTotal; i++ ) {

				if ( nextIndex && i != nextIndex && i != currentIndex ) {
					$sections.eq( i ).css( 'z-index', secIndex );
				}
				 
				secIndex--;

			}
			
			
		}
		
		
		
		
		/*
		 * Scroll initialize
		 *
		 * @param  {Object} event        - The wheel event is fired when a wheel button of a pointing device (usually a mouse) is rotated. 
		 * @param  {String} dir          - Gets a value that indicates the amount that the mouse wheel has changed.
		 * @return {Void}
		 */
		function scrollMoveInit( event, dir ) {
	
			var timeNow = new Date().getTime();
			// Cancel scroll if currently animating or within quiet period
			if( timeNow - lastAnimation < quietPeriod + animationTime) {
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
		 * @param  {Object} el           - The container of each sections.
		 * @param  {String} dir          - Rolling direction indicator.
		 * @param  {Number} hashID       - ID of custom hashchange event.
		 * @return {Void}
		 */
		function moveTo( el, dir, hashID ) {
			var index     = parseFloat( $sections.filter( '.is-active' ).attr( 'data-index' ) ),
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

				if ( $next.length > 0 ) {

					TweenMax.set( $next, {
						css: {
							'z-index' : 12,
							'top'     : ( dir == 'down' || dir === false ) ? windowHeight : -windowHeight
						},
						onComplete: function() {

							//Reset sections z-index
							$sections.eq( index ).css( 'z-index', 11 );
							sectionsDepthInit( nextIndex, index );


							TweenMax.to( $sections.eq( index ), animationTime/1000, {
								css: {
									'top'     : ( dir == 'down' || dir === false ) ? -windowHeight/2 : windowHeight/2
								},
								ease: Power2.easeOut
							});		



							TweenMax.to( this.target, animationTime/2000, {
								css: {
									'top'     : 0
								},
								ease: Power2.easeOut,
								onComplete: function() {


									$sections.removeClass( 'leave' );
									$sections.eq( index ).addClass( 'leave' );

									$sections.removeClass( 'is-active' );
									$next.addClass( 'is-active' ).removeClass( 'leave' );



									//Changing The Site URL
									var curSectionIndex = $sections.filter( '.is-active' ).index() + 1,
										href            = window.location.href.substr( 0, window.location.href.indexOf( '#' ) ) + '#' + $sections.filter( '.is-active' ).attr( 'id' );

									
									// Save state on history stack
									// - First argument is any object that will let you restore state
									// - Second argument is a title (not the page title, and not currently used)
									// - Third argument is the URL - this will appear in the browser address bar
									history.pushState( {}, document.title, href );
									console.log( 'Section ' + curSectionIndex + ' loaded!' );

									// Highlight element when related content
									getAllNavigation( $primaryMenu ).removeClass( 'is-active' );
									getAllNavigation( $sidefixedMenu ).removeClass( 'is-active' );
									$primaryMenu.find( 'li' ).eq( nextIndex ).addClass( 'is-active' );
									$sidefixedMenu.find( 'li' ).eq( nextIndex ).addClass( 'is-active' );



								}
							});			

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
		$primaryMenu.find( 'li:first' ).addClass( 'is-active' );
		$sidefixedMenu.find( 'li:first' ).addClass( 'is-active' );

		
		/*
		 * Get section or article by href
		 *
		 * @param  {String|Object} el  - The current selector or selector ID
		 * @return {Object}             - A new selector.
		 */
        function getRelatedContent( el ) {
            return $( $( el ).attr( 'href' ) );
        }

		
		/*
		 * Get all links by section or article
		 *
		 * @param  {Object} menuObj     - Returns the menu element within the document.
		 * @return {Object}             - A new selector.
		 */
        function getAllNavigation( menuObj ) {
            return menuObj.find( 'li' );
        } 	
		
		
		/*
		 * Smooth scroll to content
		 *
		 * @param  {Object} menuObj     - Returns the menu element within the document.
		 * @return {Void}
		 */
        function goPageSection( menuObj ) {
			menuObj.find( 'li > a' ).off( 'click.ONEPAGE2' ).on( 'click.ONEPAGE2', function(e) {
				e.preventDefault();
				
				if ( $( this ).parent().hasClass( 'is-active' ) ) return false;
				
			
				var dir = 'down';
				
				if ( $sections.filter( '.is-active' ).index() > $( this ).parent().index() ) {
					dir = 'up';
				}
				moveTo( $sectionsContainer, dir, $( this ).parent( 'li' ).index() + 1 );
				
				
			});	
	
        } 	
        
	
		
		/* 
		 ====================================================
		 *  Mouse Wheel & Touch Method
		 ====================================================
		 */
		var startY = 0;
		var onTouchStart = function ( e ) {
			var touches = e.touches;
			if ( touches && touches.length ) {
				startY = touches[0].pageY;
				
			}
		};

		
		var onDeviceWheel = function ( e ) {
			
			//Gets a value that indicates the amount that the mouse wheel has changed.
			var dir, delta, mobileDeltaY = null;
			
			var touches = e.touches;
			if ( touches && touches.length ) {
				mobileDeltaY = startY - touches[0].pageY;
			} else {
				delta = Math.max(-1, Math.min(1, (-e.deltaY)));
			}
			
		
			if ( mobileDeltaY != null ) {
				
				if ( mobileDeltaY >= 50 ) {
					//--- swipe up
				    dir = 'up';
				}
				if ( mobileDeltaY <= -50 ) {
					//--- swipe down
					dir = 'down';
				
				}	
			} else {
				if( delta < 0 ) { 
					//scroll down
					dir = 'down';

				} else {
					//scroll up
					dir = 'up';
				}	
			}

			
			scrollMoveInit( e, dir );
			
		};
		


		window.addEventListener( 'wheel', onDeviceWheel, { passive: true } );
		window.addEventListener( 'touchstart', onTouchStart, { passive: true } );
		window.addEventListener( 'touchmove', onDeviceWheel, { passive: true } );

		
		
    };

    module.components.documentReady.push( module.ONEPAGE2.documentReady );

	return class ONEPAGE2 {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );


