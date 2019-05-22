

/* 
 *************************************
 * <!-- Base Third-party Functions -->
 *************************************
 */

//=========================================================
//=========================================================
//=========================================================
//=========================================================
//=========================================================


/* 
 *************************************
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 * 
 *************************************
 */

(function($, window, undefined) {
    '$:nomunge';
    var str_hashchange = 'hashchange',
    doc = document,
    fake_onhashchange, special = $.event.special,
    doc_mode = doc.documentMode,
    supports_onhashchange = 'on' + str_hashchange in window && (doc_mode === undefined || doc_mode > 7);
    function get_fragment(url) {
        url = url || location.href;
        return '#' + url.replace(/^[^#]*#?(.*)$/, '$1');
    };
    $.fn[str_hashchange] = function(fn) {
        return fn ? this.bind(str_hashchange, fn) : this.trigger(str_hashchange);
    };
    $.fn[str_hashchange].delay = 50;
    special[str_hashchange] = $.extend(special[str_hashchange], {
        setup: function() {
            if (supports_onhashchange) {
                return false;
            }
            $(fake_onhashchange.start);
        },
        teardown: function() {
            if (supports_onhashchange) {
                return false;
            }
            $(fake_onhashchange.stop);
        }
    });
    fake_onhashchange = (function() {
        var self = {},
        timeout_id, last_hash = get_fragment(),
        fn_retval = function(val) {
            return val;
        },
        history_set = fn_retval,
        history_get = fn_retval;
        self.start = function() {
            timeout_id || poll();
        };
        self.stop = function() {
            timeout_id && clearTimeout(timeout_id);
            timeout_id = undefined;
        };
        function poll() {
            var hash = get_fragment(),
            history_hash = history_get(last_hash);
            if (hash !== last_hash) {
                history_set(last_hash = hash, history_hash);
                $(window).trigger(str_hashchange);
            } else if (history_hash !== last_hash) {
                location.href = location.href.replace(/#.*/, '') + history_hash;
            }
            timeout_id = setTimeout(poll, $.fn[str_hashchange].delay);
        };
        $.browser.msie && !supports_onhashchange && (function() {
            var iframe, iframe_src;
            self.start = function() {
                if (!iframe) {
                    iframe_src = $.fn[str_hashchange].src;
                    iframe_src = iframe_src && iframe_src + get_fragment();
                    iframe = $('<iframe tabindex="-1" title="empty"/>').hide().one('load',
                    function() {
                        iframe_src || history_set(get_fragment());
                        poll();
                    }).attr('src', iframe_src || 'javascript:0').insertAfter('body')[0].contentWindow;
                    doc.onpropertychange = function() {
                        try {
                            if (event.propertyName === 'title') {
                                iframe.document.title = doc.title;
                            }
                        } catch(e) {}
                    };
                }
            };
            self.stop = fn_retval;
            history_get = function() {
                return get_fragment(iframe.location.href);
            };
            history_set = function(hash, history_hash) {
                var iframe_doc = iframe.document,
                domain = $.fn[str_hashchange].domain;
                if (hash !== history_hash) {
                    iframe_doc.title = doc.title;
                    iframe_doc.open();
                    domain && iframe_doc.write('<script>document.domain="' + domain + '"</script>');
                    iframe_doc.close();
                    iframe.location.hash = hash;
                }
            };
        })();
        return self;
    })();
})(jQuery, this);


/* 
 *************************************
 * Get all attributes of an element using jQuery
 *
 * @return {array}                        - Returns a new array.
 * @usage:
 
	$( '#demo' ).attr();  // { "data-a": "1", "id": "b" }

 *************************************
 */
( function( old ) {
  $.fn.attr = function() {
    if(arguments.length === 0) {
      if(this.length === 0) {
        return null;
      }

      var obj = {};
      $.each(this[0].attributes, function() {
        if(this.specified) {
          obj[this.name] = this.value;
        }
      });
      return obj;
    }

    return old.apply(this, arguments);
  };
} )( $.fn.attr );




/* 
 *************************************
 * Scroll Lock
 * @https://gist.github.com/barneycarroll/6550066
 * @return {Void}
 *************************************
 */
/*
	 // Locks the page
	$.scrollLock( true );
	
	// Unlocks the page
	$.scrollLock( false );
*/

( function($) {
    'use strict';
	$.scrollLock = ( function scrollLockClosure() {
	   
		var $html      = $( 'html' ),
			// State: unlocked by default
			locked     = false,
			// State: scroll to revert to
			prevScroll = {
				scrollLeft : $( window ).scrollLeft(),
				scrollTop  : $( window ).scrollTop()
			},
			// State: styles to revert to
			prevStyles = {},
			lockStyles = {
				'overflow-y' : 'scroll',
				'position'   : 'fixed',
				'width'      : '100%'
			};
	
		// Instantiate cache in case someone tries to unlock before locking
		saveStyles();
	
		// Save context's inline styles in cache
		function saveStyles() {
			var styleAttr = $html.attr( 'style' ),
				styleStrs = [],
				styleHash = {};
	
			if( !styleAttr ){
				return;
			}
	
			styleStrs = styleAttr.split( /;\s/ );
	
			$.each( styleStrs, function serializeStyleProp( styleString ){
				if( !styleString ) {
					return;
				}
	
				var keyValue = styleString.split( /\s:\s/ );
	
				if( keyValue.length < 2 ) {
					return;
				}
	
				styleHash[ keyValue[ 0 ] ] = keyValue[ 1 ];
			} );
	
			$.extend( prevStyles, styleHash );
		}
	
		function lock() {
			var appliedLock = {};
	
			// Duplicate execution will break DOM statefulness
			if( locked ) {
				return;
			}
	
			// Save scroll state...
			prevScroll = {
				scrollLeft : $( window ).scrollLeft(),
				scrollTop  : $( window ).scrollTop()
			};
	
			// ...and styles
			saveStyles();
	
			// Compose our applied CSS
			$.extend( appliedLock, lockStyles, {
				// And apply scroll state as styles
				'left' : - prevScroll.scrollLeft + 'px',
				'top'  : - prevScroll.scrollTop  + 'px'
			} );
	
			// Then lock styles...
			$html.css( appliedLock );
	
			// ...and scroll state
			$( window )
				.scrollLeft( 0 )
				.scrollTop( 0 );
	
			locked = true;
		}
	
		function unlock() {
			// Duplicate execution will break DOM statefulness
			if( !locked ) {
				return;
			}
	
			// Revert styles
			$html.attr( 'style', $( '<x>' ).css( prevStyles ).attr( 'style' ) || '' );
	
			// Revert scroll values
			$( window )
				.scrollLeft( prevScroll.scrollLeft )
				.scrollTop(  prevScroll.scrollTop );
	
			locked = false;
		}
	
		return function scrollLock( on ) {
			// If an argument is passed, lock or unlock depending on truthiness
			if( arguments.length ) {
				if( on ) {
					lock();
				}
				else {
					unlock();
				}
			}
			// Otherwise, toggle
			else {
				if( locked ){
					unlock();
				}
				else {
					lock();
				}
			}
		};
	}() );

} ) ( jQuery );
