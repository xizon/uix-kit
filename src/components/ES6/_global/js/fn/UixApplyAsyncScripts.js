
/*
 * Apply some asynchronism scripts
 *
 * @global
 * @description This function can be used separately in HTML pages or custom JavaScript.
 * @param  {Boolean} scrollReveal          - Run script of module "Scroll Reveal". a page commonly used to
 *                                           load asynchronous information
 * @param  {Boolean} ajaxPostList          - Run script of module "Posts List With Ajax". a page commonly used to
 *                                           load asynchronous information
 * @param  {Boolean} ajaxDDList            - Run script of module "Dynamic Drop Down List from JSON".
 * @param  {Boolean} counterAnim           - Run script of module "Counter".
 * @return {Void}
 *
 * @Usage:
    
	
<script>
( function( $ ) {
"use strict";
    $( document ).ready( function() {
		$( document ).UixApplyAsyncScripts({
			scrollReveal    : true,
			ajaxPostList    : true,
			ajaxDDList      : true,
			counterAnim     : true,
			lightBox        : true 
		});
    } );
} ) ( jQuery );
</script>

 

 *
 * 
 */
import { UixModuleInstance } from '@uixkit/core/_global/js';

( function ( $ ) {
    'use strict';
    $.fn.UixApplyAsyncScripts = function( options ) {
 
		// This is the easiest way to have default options.
		var settings = $.extend({
			scrollReveal    : true, // @from ./src/components/ES6/scroll-reveal
			ajaxPostList    : true, // @from ./src/components/ES6/list-posts
			ajaxDDList      : true, // @from ./src/components/ES6/dynamic-dropdown-list-json
			counterAnim     : true, // @from ./src/components/ES6/counter
			lightBox        : true  // @from ./src/components/ES6/lightbox
		}, options );

		
        this.each( function() {
		
		
			//----
			if ( UixModuleInstance.MAIN )                         UixModuleInstance.MAIN.pageLoaded(); //Theme Scripts
			if ( UixModuleInstance.COMMON_HEIGHT )                UixModuleInstance.COMMON_HEIGHT.pageLoaded(); //Common Height
			if ( UixModuleInstance.ADVANCED_SLIDER )              UixModuleInstance.ADVANCED_SLIDER.pageLoaded(); //Advanced Slider (Basic)
			if ( UixModuleInstance.ADVANCED_SLIDER_FILTER )       UixModuleInstance.ADVANCED_SLIDER_FILTER.pageLoaded(); //Advanced Slider
			if ( UixModuleInstance.POST_LIST_SPLIT_FULLWIDTH )    UixModuleInstance.POST_LIST_SPLIT_FULLWIDTH.pageLoaded(); //Fullwidth List of Split
			if ( UixModuleInstance.STICKY_EL )                    UixModuleInstance.STICKY_EL.pageLoaded(); //Sticky Elements
			if ( UixModuleInstance.TEXT_EFFECT )                  UixModuleInstance.TEXT_EFFECT.pageLoaded(); //Text effect
			if ( UixModuleInstance.TIMELINE )                     UixModuleInstance.TIMELINE.pageLoaded(); //Timeline



			//----
			if ( UixModuleInstance.MAIN )                         UixModuleInstance.MAIN.documentReady($); //Theme Scripts
			if ( UixModuleInstance.TABLE )                        UixModuleInstance.TABLE.documentReady($); //Responsive Table
			if ( UixModuleInstance.TABLE_SORTER )                 UixModuleInstance.TABLE_SORTER.documentReady($); //Table Sorter
			if ( UixModuleInstance.MODAL_DIALOG )                 UixModuleInstance.MODAL_DIALOG.documentReady($); //Modal Dialog
			if ( UixModuleInstance.PARALLAX )                     UixModuleInstance.PARALLAX.documentReady($); //Parallax
			if ( UixModuleInstance.VIDEOS )                       UixModuleInstance.VIDEOS.documentReady($); //Videos
			if ( UixModuleInstance.BODY_AND_HEADER )              UixModuleInstance.BODY_AND_HEADER.documentReady($); //Header Area
			if ( UixModuleInstance.SET_BG )                       UixModuleInstance.SET_BG.documentReady($); //Specify a background image
			if ( UixModuleInstance.GET_CUSTOM_ATTRS )             UixModuleInstance.GET_CUSTOM_ATTRS.documentReady($); //Get all custom attributes of an element like "data-*"
			if ( UixModuleInstance.PAGINATION )                   UixModuleInstance.PAGINATION.documentReady($); //Pagination
			if ( UixModuleInstance.FORM )                         UixModuleInstance.FORM.documentReady($); //Form
			if ( UixModuleInstance.FLEXSLIDER )                   UixModuleInstance.FLEXSLIDER.documentReady($); //Flexslider
			if ( UixModuleInstance.RETINA )                       UixModuleInstance.RETINA.documentReady($); //Retina Graphics for Website
			if ( UixModuleInstance.SHOW_MORELESS )                UixModuleInstance.SHOW_MORELESS.documentReady($); //Show More Less
			if ( UixModuleInstance.DROPDOWN_MENU )                UixModuleInstance.DROPDOWN_MENU.documentReady($); //Dropdown Menu
			if ( UixModuleInstance.DROPDOWN_MENU2 )               UixModuleInstance.DROPDOWN_MENU2.documentReady($); //Dropdown Menu2
			if ( UixModuleInstance.ACCORDION )                    UixModuleInstance.ACCORDION.documentReady($); //Accordion
			if ( UixModuleInstance.ADVANCED_CONTENT_SLIDER )      UixModuleInstance.ADVANCED_CONTENT_SLIDER.documentReady($); //Advanced Content Slider
			if ( UixModuleInstance.GALLERY )                      UixModuleInstance.GALLERY.documentReady($); //Gallery
			if ( UixModuleInstance.IMAGE_SHAPES )                 UixModuleInstance.IMAGE_SHAPES.documentReady($); //Image Shapes
			if ( UixModuleInstance.PERIODICAL_SCROLL )            UixModuleInstance.PERIODICAL_SCROLL.documentReady($); //Periodical Scroll
			if ( UixModuleInstance.PRICING )                      UixModuleInstance.PRICING.documentReady($); //Pricing
			if ( UixModuleInstance.PROGRESS_BAR )                  UixModuleInstance.PROGRESS_BAR.documentReady($); //Progress Bar
			if ( UixModuleInstance.PROGRESS_LINE )                 UixModuleInstance.PROGRESS_LINE.documentReady($); //Progress Line
			if ( UixModuleInstance.ROTATING_EL )                  UixModuleInstance.ROTATING_EL.documentReady($); //Rotating Elements
			if ( UixModuleInstance.SMOOTH_SCROLLING_ANCHORLINK )  UixModuleInstance.SMOOTH_SCROLLING_ANCHORLINK.documentReady($); //Smooth Scrolling When Clicking An Anchor Link
			if ( UixModuleInstance.TABS )                         UixModuleInstance.TABS.documentReady($); //Tabs
			if ( UixModuleInstance.TEAM_FOCUS )                   UixModuleInstance.TEAM_FOCUS.documentReady($); //Team Focus
			if ( UixModuleInstance.LAVA_LAMP_STYLE_MENU )         UixModuleInstance.LAVA_LAMP_STYLE_MENU.documentReady($); //Lava-Lamp Style Menu
			if ( UixModuleInstance.CIRCLE_LAYOUT )                UixModuleInstance.CIRCLE_LAYOUT.documentReady($); //Circle Layout
			if ( UixModuleInstance.MULTI_ITEMS_CAROUSEL )         UixModuleInstance.MULTI_ITEMS_CAROUSEL.documentReady($); //Multiple Items Carousel
			if ( UixModuleInstance.THREE_BACKGROUND )             UixModuleInstance.THREE_BACKGROUND.documentReady($); //3D Background
			if ( UixModuleInstance.THREE_CAROUSEL )               UixModuleInstance.THREE_CAROUSEL.documentReady($); //3D Carousel


			//---- Prevent overlay clicks on asynchronous requests
			//---- Commonly used for AJAX modules that are clicked by button
			//Scroll Reveal
			if ( settings.scrollReveal ) {
				if ( UixModuleInstance.SCROLL_REVEAL ) UixModuleInstance.SCROLL_REVEAL.documentReady($);
			}

			//Posts List With Ajax
			if ( settings.ajaxPostList ) {
				if ( UixModuleInstance.POST_LIST_AJAX ) UixModuleInstance.POST_LIST_AJAX.documentReady($);
			}

			//Dynamic Drop Down List from JSON
			if ( settings.ajaxDDList ) {
				if ( UixModuleInstance.DYNAMIC_DD_LIST ) UixModuleInstance.DYNAMIC_DD_LIST.documentReady($);
			}


			//Counter
			if ( settings.counterAnim ) {
				if ( UixModuleInstance.COUNTER ) UixModuleInstance.COUNTER.documentReady($);
			}

			//Custom Lightbox
			if ( settings.lightBox ) {
				if ( UixModuleInstance.LIGHTBOX ) UixModuleInstance.LIGHTBOX.pageLoaded();
			}





			//----Uix Shortcodes (WordPress Plugin)
			if ( $.isFunction( $.uix_sc_init ) ) {
				$.uix_sc_init();
			}


			
		});
 
    };
 
}( jQuery ));
