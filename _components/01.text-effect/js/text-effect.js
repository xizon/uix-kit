

/* 
 *************************************
 * <!-- Text effect -->
 *************************************
 */
App = ( function ( App, $, window, document ) {
    'use strict';
    
	
    var pageLoaded = function() {

		//Default Effect
		//-------------------------------------	
		$( '[data-text-eff]' ).each( function( index )  {
			$( document ).customTextEffInit( { selectors: '[data-text-eff="'+$( this ).data( 'text-eff' )+'"]' } );
		});
		
		
		
    };

    App.textEffect = {
        pageLoaded : pageLoaded        
    };

    App.components.pageLoaded.push( pageLoaded );
    return App;

}( App, jQuery, window, document ) );



/*
 * Text Effect
 *
 * @param  {string} selectors                - Text wrapper ID or class name.
 * @return {void}                            - The constructor.
 */
( function ( $ ) {
    $.fn.customTextEffInit = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			selectors    : '.letters-eff-fadeInRight'
        }, options );
 
        this.each( function() {
			
			var $this                = $( this ),
				customControls       = settings.selectors,
				speed                = $( customControls ).data( 'text-eff-speed' ),
				txtEff;

			
				if( typeof speed === typeof undefined ) {
					speed = 1200;
				}	
			
		
				$( customControls ).html( $( customControls ).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>") );
			
			
			
				if( customControls.indexOf( 'fadeInRight' ) >= 0 ) {
					txtEff = anime.timeline({loop: false})
						  .add({
							targets: customControls + ' .letter',
							translateX: [40,0],
							translateZ: 0,
							opacity: [0,1],
							easing: "easeOutExpo",
							duration: speed,
							delay: function(el, i) {
							  return 500 + 30 * i;
							}
						  });

				}
			
			
				if( customControls.indexOf( 'zoomInDown' ) >= 0 ) {
					txtEff = anime.timeline({loop: false})
						  .add({
						    targets: customControls + ' .letter',
							scale: [0, 1],
							duration: speed,
							elasticity: 600,
							delay: function(el, i) {
							  return 45 * (i+1);
							}
						  });

				}	
			



			
		});
 
    };
 
}( jQuery ));
