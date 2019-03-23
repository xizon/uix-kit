
/**

	TABLE OF CONTENTS
	---------------------------
	
	
	${{TOC}}

*/


if ( typeof jQuery === 'undefined' || typeof TweenMax === 'undefined' || typeof Waypoint === 'undefined' || typeof videojs === 'undefined' ) {
    throw new Error( 'Uix Kit\'s JavaScript requires jQuery, TweenMax, Waypoint and videojs.' );
}

//Fixed a bug that Cannot read property 'fn' of undefined for jQuery 1.xx.x.
window.$ = window.jQuery;

/* 
 *************************************
 * Global variables from front pages
 *************************************
 */
var 
	//If the file is in the root directory, you can leave it empty. 
	//If in another directory, you can write: "/blog"
    templateUrl, 

	//Eg. https://uiux.cc
	homeUrl, 
	
	//Eg. https://uiux.cc/wp-admin/admin-ajax.php
	ajaxUrl; 


if ( typeof APP_ROOTPATH === 'undefined' ) {
    templateUrl = '';
	homeUrl     = '';
	ajaxUrl     = '';
} else {
    templateUrl = APP_ROOTPATH.templateUrl.replace(/\/\s*$/, '' );
	homeUrl     = APP_ROOTPATH.homeUrl.replace(/\/\s*$/, '' );
	ajaxUrl     = APP_ROOTPATH.ajaxUrl.replace(/\/\s*$/, '' );
}


//Modify templateUrl as the correct path when local test is enabled
if ( templateUrl == '' && ( location.hostname === 'localhost' || location.hostname === '127.0.0.1' || location.hostname === '' ) ) {
    templateUrl = '/examples';
}


/* 
 *************************************
 * Determine whether it is a special browser
 *************************************
 */
var browser = {
	isAndroid : /(android)/i.test(navigator.userAgent),
	isPC      : !navigator.userAgent.match(/(iPhone|iPod|Android|ios|Mobile)/i),
	isSafari  : !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/), /*Test to 9, 10. */
	isIE      : !!window.ActiveXObject || "ActiveXObject" in window     /*Test to 6 ~ 11 (not edge) */
};




/* 
 *************************************
 * Core scripts for current site
 *************************************
 */

/**
 * APP
 * @global
 *
 * //Used for all modules from ./src/components/ES5/[__]/js
 * @requires ./examples/assets/js/min/jquery.waitforimages.min.js
 * @requires ./examples/assets/js/min/video.min.js
 * @requires ./examples/assets/js/min/jquery.waypoints.min.js
 * @requires ./examples/assets/js/min/TweenMax.min.js
 * 
 */
var APP = (function ( $, window, document ) {
    'use strict';

    var _APP           = {},
        components     = { documentReady: [], pageLoaded: [] };

	if ( $( 'img' ).length == 0 ) {
		$( 'body' ).prepend( '<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="" style="display:none">' );
	}
	
	if( $.isFunction( $.fn.waitForImages ) ) {
		$( 'body' ).waitForImages( pageLoaded );
	} else {
		$( window ).on( 'load', pageLoaded );
	}
	
    $( document ).ready( documentReady );
	
	
	
	
    function documentReady( context ) {
        
        context = typeof context == typeof undefined ? $ : context;
        components.documentReady.forEach( function( component ) {
            component( context );
        });
    }

    function pageLoaded( context ){
        
        context = typeof context == "object" ? $ : context;
        components.pageLoaded.forEach( function( component ) {
           component( context );
        });
    }

    _APP.setContext = function ( contextSelector ) {
        var context = $;
        if ( typeof contextSelector !== typeof undefined ) {
            return function( selector ) {
                return $( contextSelector ).find( selector );
            };
        }
        return context;
    };

    _APP.components         = components;
    _APP.documentReady      = documentReady;
	_APP.pageLoaded         = pageLoaded;

    return _APP;
}( jQuery, window, document ) ); 



/* 
 *************************************
 * Create GUID / UUID
 *
 * @return {String}                        - The globally-unique identifiers.
 *************************************
 */
var UixGUID = UixGUID || (function() {
    function t() {
        do {
            var x = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,
            function(t) {
                var x = 16 * Math.random() | 0;
                return ("x" == t ? x: 3 & x | 8).toString(16)
            })
        } while (! t . register ( x ));
        return x;
    }
	
    return t.version = "1.4.2",
    t.create = function() {
        return t();
    },
    t._list = {},
    Object.defineProperty(t, "list", {
        get: function() {
            var x = [];
            for (var r in t._list) x.push(r);
            return x;
        },
        set: function(x) {
            t._list = {};
            for (var r = 0; r < x.length; r++) t._list[x[r]] = 1;
        }
    }),
    t.exists = function(x) {
        return !! t._list[x];
    },
    t.register = function(x) {
        return ! t.exists(x) && (t._list[x] = 1, !0);
    },
	t
})();


/* 
 *************************************
 * Logs out the version and renderer information for this running instance of Uix Kit.
 *************************************
 */
//( function UIX_HELLO() { 
//    if ( navigator.userAgent.toLowerCase().indexOf( 'chrome' ) > -1 ) {
//        var args = ['\n %c Made with Uix Kit by https://github.com/xizon/uix-kit', 'color: #333; border: 1px solid; padding: 10px;'];
//
//        window.console.log.apply(console, args);
//    } else if (window.console) {
//        window.console.log( 'Made with Uix Kit by https://github.com/xizon/uix-kit' );
//    }
//} ());


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



/* 
 *************************************
 * Parallax Effect
 *
 * @param  {Number} speed     - The speed of movement between elements.
 * @param  {JSON} bg          - Specify the background display. Default value: { enable: true, xPos: '50%' }
 * @return {Void}
 *************************************
 */

( function ( $ ) {
    $.fn.UixParallax = function( options ) {
 
        // This is the easiest way to have default options.
        var settings = $.extend({
			speed    : 0.25,
			bg       : { enable: true, xPos: '50%' }
        }, options );
 
        this.each( function() {
			
			var bgEff      = settings.bg,
				$this      = $( this ),
				bgXpos     = '50%',
				speed      = -parseFloat( settings.speed );
			
			
			
			if ( bgEff ) {
				bgEff      = settings.bg.enable;
				bgXpos     = settings.bg.xPos;
			}
			
	
			//Prohibit transition delay
			$this.css( {
				'transition': 'none'
			} );

		    $( window ).on( 'scroll touchmove', function( e ){
				scrollUpdate();
			});
			
			
			//Initialize the position of the background
			if ( bgEff ) {
				//background parallax
				TweenMax.set( $this, {
					backgroundPosition: bgXpos + ' ' + (-$this.offset().top*speed) + 'px'
				});
			} else {
				//element parallax
				TweenMax.set( $this, {
					y: 0
				});	
			}
			
			
			function scrollUpdate() {
				var scrolled = $( window ).scrollTop(),
					st       = $this.offset().top - scrolled;
				

				
				if ( bgEff ) {
					//background parallax
					TweenMax.set( $this, {
						backgroundPosition: bgXpos + ' ' + ( 0 - ( st * speed ) ) + 'px'
					});
				} else {
					//element parallax
					TweenMax.set( $this, {
						y: ( 0 - ( scrolled * speed ) )
					});
					
					
				}
				
			}

			
			
		});
 
    };
 
}( jQuery ));



