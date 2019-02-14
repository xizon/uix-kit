
/* 
 *************************************
 * <!-- Scroll Reveal -->
 *************************************
 */
APP = ( function ( APP, $, window, document ) {
    'use strict';
	
    APP.SCROLL_REVEAL               = APP.SCROLL_REVEAL || {};
	APP.SCROLL_REVEAL.version       = '0.1.0';
    APP.SCROLL_REVEAL.documentReady = function( $ ) {

		
		var viewport;
		
		//From JSON config in data attribute in HTML
		var $scrollRevealElements = $( '[data-uix-anim]' ),
			tmAnim = function( obj, type ) {

				var config = obj.data( 'uix-anim' );

				if( typeof config === typeof undefined || config == '' || config === false ) {
					config = {
						"from"     : {"opacity":0,"x":70},
						"to"       : {"opacity":1,"x":0},
						"ease"     : "Power2.easeOut",
						"duration" : 0.8,
						"delay"    : 0,
						"infinite" : false,
						"viewport" : '100%' //A percentage of the viewport's height.
					};
				}
				
			
				//get attributes to tweenMax
				var fromCSS     = config.from,
					toCSS       = config.to,
					myEase      = config.ease,
					myDuration  = config.duration,
					myDelay     = config.delay,
					infinite    = config.infinite;
				
				//A percentage of the viewport's height.
				viewport = config.viewport;
				
				
				if( Object.prototype.toString.call( fromCSS ) == '[object String]' ) {
					//Add class when element becomes visible
					
					toCSS = toCSS.replace(/\./, '' );
					
					if ( type == 'from' ) obj.removeClass( toCSS );

					if ( type == 'from-anim' ) obj.removeClass( toCSS );

					//Target animation
					if ( type == 'to' ) obj.addClass( toCSS );

					
				} else {
					//Using TweenMax to create animations
					if ( type == 'from' ) {
						TweenMax.set( obj, {
							css        : fromCSS
						});	

					}

					if ( type == 'from-anim' ) {
						TweenMax.to( obj, myDuration, {
							css        : fromCSS
						});	

					}

					//Target animation
					if ( type == 'to' ) {

						TweenMax.to( obj, myDuration, {
							css    : toCSS,
							ease   : myEase,
							delay  : myDelay
						});		


					}	


					
				}
				
				//Reversing Scroll Animations for Loop  
				if ( type == 'loop' ) {
					if ( infinite ) {
						return 1;
					} else {
						return 0;
					}	
				}

				

			};


		$scrollRevealElements.each( function()  {
			
			//Prevent asynchronous loading of repeated calls
			var actived = $( this ).data( 'active' );
			
			if( typeof actived === typeof undefined ) {
				tmAnim( $( this ), 'from' );

			}
			
		});

		
					
		//Prevent the location of page elements from being loaded incorrectly
		//Invoking a jQuery function after .each() has completed
		setTimeout( function() {
		
			var waypoints = $scrollRevealElements.waypoint({
				handler: function( direction ) {

					
					//Prevent asynchronous loading of repeated calls
					var actived = $( this.element ).data( 'active' ),
						tmLoop  = tmAnim( $( this.element ), 'loop' );
					

					if( typeof actived === typeof undefined && tmLoop != 1 ) {
						
						//$( this.element ).toggleClass( 'animated fadeInUp', direction === 'down' );
						tmAnim( $( this.element ), 'to' );

						$( this.element ).data( 'active', 1 );

						
					}
					
					if ( tmLoop === 1 ) {
						if ( direction === 'up' ) {
							tmAnim( $( this.element ), 'from-anim' );
						} else {
							tmAnim( $( this.element ), 'to' );
						}
					}	
					



				},
				offset: viewport //0~100%, bottom-in-view
			});
	
		}, 500 );
		
    };

    APP.components.documentReady.push( APP.SCROLL_REVEAL.documentReady );
    return APP;

}( APP, jQuery, window, document ) );


