
/*! 
 *************************************
 * 18. Counter
 *************************************
 */	
theme = ( function ( theme, $, window, document ) {
    'use strict';
    
    var pageLoaded = function() {
	
		$( '[data-counter-number]' ).each(function() {

			var $this = $( this );
			
			var waypoints = $this.waypoint({
			    handler: function( direction ) {
					
					$this.countTo({
						dilimiter      : true,
						doubleDigits   : true
					});
					
					//Prevents front-end javascripts that are activated in the background to repeat loading.
				    this.disable();
				  

			    },
			    offset: '100%' //0~100%, bottom-in-view
			});


		});

		
		
    };

    theme.counter = {
        pageLoaded : pageLoaded        
    };

    theme.components.pageLoaded.push( pageLoaded );
    return theme;

}( theme, jQuery, window, document ) );



/* Counter function */
(function ($) {
	$.fn.countTo = function (options) {
		options = options || {};
		
		return $(this).each(function () {
			// set options for current element
			var settings = $.extend({}, $.fn.countTo.defaults, {
				from            : $( this ).data( 'counter-start' ),
				to              : $( this ).data( 'counter-number' ),
				speed           : $( this ).data( 'counter-duration' ),
				refreshInterval : $( this ).data( 'counter-refresh-interval' ),
				dilimiter       : $( this ).data( 'counter-dilimiter' ),
				doubleDigits    : $( this ).data( 'counter-double-digits' )
			}, options);
			
			// how many times to update the value, and how much to increment the value on each update
			var loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;
			
			// references & variables that will change with each update
			var self      = this,
				$self     = $( this ),
				loopCount = 0,
				value     = settings.from,
				data      = $self.data('countTo') || {};
			
			$self.data('countTo', data);
			
			// if an existing interval can be found, clear it first
			if (data.interval) {
				clearInterval(data.interval);
			}
			data.interval = setInterval(updateTimer, settings.refreshInterval);
			
			// initialize the element with the starting value
			render(value);
			
			function updateTimer() {
				value += increment;
				loopCount++;
				
				render(value);
				
				if (typeof(settings.onUpdate) == 'function') {
					settings.onUpdate.call(self, value);
				}
				
				if (loopCount >= loops) {
					// remove the interval
					$self.removeData('countTo');
					clearInterval(data.interval);
					value = settings.to;
					
					if (typeof(settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}
			
			function render( value ) {
				var formattedValue = Number( value ).toFixed();
				
				if ( settings.dilimiter && formattedValue > 0 ) {
					formattedValue = formattedValue.toString().replace(/\B(?=(?:\d{3})+\b)/g, ',');
				}
				
				if (settings.doubleDigits) {
					if ( formattedValue < 10 ) {
						formattedValue = '0' + formattedValue;
					}
				}	
				
				
				$self.html( formattedValue );
			}
		});
	};
	
	$.fn.countTo.defaults = {
		from           : 0,            // the number the element should start at
		number         : 0,            // the number the element should end at
		duration       : 500,         // how long it should take to count between the target numbers
		refreshInterval: 1,           // how often the element should be updated
		dilimiter      : true,        // the number of decimal places to show
		onUpdate       : null,        // callback method for every time the element is updated
		onComplete     : null,       // callback method for when the element finishes updating,
		doubleDigits   : false       // two digits are used by default
	};
	
	
}(jQuery));