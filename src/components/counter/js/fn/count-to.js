
/* 
 *************************************
 * Count To
 *
 * @param  {Number} fixed                - formats a number using fixed-point notation.
 * @param  {Number} from                 - the number the element should start at
 * @param  {Number} to                   - the number the element should end at
 * @param  {Number} speed                - how long it should take to count between the target numbers
 * @param  {Number} refreshInterval      - how often the element should be updated
 * @param  {Boolean} dilimiter           - the number of decimal places to show
 * @param  {Boolean} doubleDigits        - two digits are used by default
 * @param  {Function} onUpdate           - callback method for every time the element is updated
 * @param  {Function} onComplete         - callback method for when the element finishes updating,
 * @return {Void}
 *
 *************************************
 */
(function ($) {
	$.fn.UixCountTo = function (options) {
		options = options || {};
		
		return $(this).each(function () {
			// set options for current element
			const settings = $.extend({}, $.fn.UixCountTo.defaults, {
				from            : $( this ).data( 'counter-start' ),
				to              : $( this ).data( 'counter-number' ),
                fixed           : $( this ).data( 'counter-fixed' ),
				speed           : $( this ).data( 'counter-duration' ),
				refreshInterval : $( this ).data( 'counter-refresh-interval' ),
				dilimiter       : $( this ).data( 'counter-dilimiter' ),
				doubleDigits    : $( this ).data( 'counter-double-digits' ),
				onUpdate        : null,   
				onComplete      : null
			}, options);
            
            
			
			// how many times to update the value, and how much to increment the value on each update
			let loops = Math.ceil(settings.speed / settings.refreshInterval),
				increment = (settings.to - settings.from) / loops;
            
       
			
			// references & variables that will change with each update
			let self      = this,
				$self     = $( this ),
				loopCount = 0,
				value     = settings.from,
				data      = $self.data('count-to') || {};
			
			$self.data('count-to', data);
			
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
					$self.removeData('count-to');
					clearInterval(data.interval);
					value = settings.to;
					
					if (typeof(settings.onComplete) == 'function') {
						settings.onComplete.call(self, value);
					}
				}
			}
			
			function render( value ) {
				let formattedValue = Number( value ).toFixed( settings.fixed );
                
				
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
	
	$.fn.UixCountTo.defaults = {
		from           : 0,       
		to             : 0,      
		fixed          : 0,      
		speed          : 500,       
		refreshInterval: 1,       
		dilimiter      : true,    
		doubleDigits   : false, 
		onUpdate       : null,    
		onComplete     : null  
		
	};

	
}(jQuery));