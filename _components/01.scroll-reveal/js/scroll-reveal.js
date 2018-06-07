
/* 
 *************************************
 * <!-- Scroll Reveal -->
 *************************************
 */
App = ( function ( App, $, window, document ) {
    'use strict';
   
   
    var documentReady = function( $ ) {

		
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
						"infinite" : false
					};
				}
				
			
				//get attributes to tweenMax
				var fromCSS     = config.from,
					toCSS       = config.to,
					myEase      = config.ease,
					myDuration  = config.duration,
					myDelay     = config.delay,
					infinite    = config.infinite;
				
			
				//Initialize the state of the element
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
			tmAnim( $( this ), 'from' );
		});

					
		var waypoints = $scrollRevealElements.waypoint({
			handler: function( direction ) {

				//$( this.element ).toggleClass( 'animated fadeInUp', direction === 'down' );
				var tmLoop = tmAnim( $( this.element ), 'loop' );
				
				if ( tmLoop === 1 ) {
					if ( direction === 'up' ) {
						tmAnim( $( this.element ), 'from-anim' );
					} else {
						tmAnim( $( this.element ), 'to' );
					}
				} else {
					tmAnim( $( this.element ), 'to' );
				}

			},
			offset: '100%' //0~100%, bottom-in-view
		});

		
	};
	
		
    App.scrollReveal = {
        documentReady : documentReady        
    };

    App.components.documentReady.push( documentReady );
    return App;

}( App, jQuery, window, document ) );