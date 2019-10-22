/*
 * Common website functions, Can be called separately in HTML pages or custom JavaScript.
 *    
 */
import UixModuleFilter from '@uixkit/core/_global/js/fn/UixModuleFilter';
import UixApplyAsyncScripts from '@uixkit/core/_global/js/fn/UixApplyAsyncScripts';
import UixApplyAsyncAllScripts from '@uixkit/core/_global/js/fn/UixApplyAsyncAllScripts';



/*
 * Import modules from components
 *    
 */
/******/
/******/
/* base */
import BODY_AND_HEADER from '@uixkit/core/_global/js/modules/body-and-header';
import COMMON_HEIGHT from '@uixkit/core/_global/js/modules/common-height';
import GET_CUSTOM_ATTRS from '@uixkit/core/_global/js/modules/custom-data-attrs';
import LOADER from '@uixkit/core/_global/js/modules/loader';
import MEGA_MENU from '@uixkit/core/_global/js/modules/mega-menu';
import MOBILE_MENU from '@uixkit/core/_global/js/modules/mobile-menu';
import NAVIGATION from '@uixkit/core/_global/js/modules/navigation';
import SET_BG from '@uixkit/core/_global/js/modules/set-background';
import VIDEOS from '@uixkit/core/_global/js/modules/videos';

	
/******/
/******/
/* pages */	
import MAIN from '@uixkit/core/_main/js';
import ACCORDION_BG from '@uixkit/core/accordion-img/js';
import ACCORDION from '@uixkit/core/accordion/js';
import ADVANCED_CONTENT_SLIDER from '@uixkit/core/advanced-content-slider/js';
import ADVANCED_SLIDER from '@uixkit/core/advanced-slider/js/basic';
import ADVANCED_SLIDER_FILTER from '@uixkit/core/advanced-slider/js/special';
import AJAX_PUSH_CONTENT from '@uixkit/core/AJAX-push/js';
import AJAX_PAGE_LOADER from '@uixkit/core/AJAX/js';
import BACK_TO_TOP from '@uixkit/core/back-to-top/js';
import CIRCLE_LAYOUT from '@uixkit/core/circle-layout/js';
import COUNTER from '@uixkit/core/counter/js';
import DROPDOWN_MENU from '@uixkit/core/dropdown-menu/js';
import DROPDOWN_MENU2 from '@uixkit/core/dropdown-menu2/js';
import DYNAMIC_DD_LIST from '@uixkit/core/dynamic-dropdown-list-json/js';
import FLEXSLIDER from '@uixkit/core/flexslider/js';
import FLOATING_SIDE_EL from '@uixkit/core/floating-side-element/js';
import FORM_PROGRESS from '@uixkit/core/form-progress/js';
import FORM from '@uixkit/core/form/js';
import GALLERY from '@uixkit/core/gallery/js';
import HOVER_DELAY_INTERACTION from '@uixkit/core/hover-delay-interaction/js';
import IMAGE_SHAPES from '@uixkit/core/image-shapes/js';
import LAVA_LAMP_STYLE_MENU from '@uixkit/core/lava-lamp-style-menu/js';
import LIGHTBOX from '@uixkit/core/lightbox/js';
import BULLETED_LIST from '@uixkit/core/list-bulleted/js';
import POST_LIST_AJAX from '@uixkit/core/list-posts/js';
import FULL_WIDTH_COLUMN_TO_EDGE from '@uixkit/core/fullwidth-column-to-edge/js';
import LOGIN_UI from '@uixkit/core/login-templates/js';
import MODAL_DIALOG from '@uixkit/core/modal-dialog/js';
import MOUSEWHEEL_INTERACTION from '@uixkit/core/mousewheel-interaction/js';
import MULTI_ITEMS_CAROUSEL from '@uixkit/core/multi-items-carousel/js';
import ONEPAGE from '@uixkit/core/one-page/js';
import ONEPAGE2 from '@uixkit/core/one-page2/js';
import PARALLAX from '@uixkit/core/parallax/js';
import PERIODICAL_SCROLL from '@uixkit/core/periodical-scroll/js';
import PRICING from '@uixkit/core/pricing/js';
import PROGRESS_BAR from '@uixkit/core/progress-bar/js';
import PROGRESS_LINE from '@uixkit/core/progress-line/js';
import RETINA from '@uixkit/core/retina/js';
import ROTATING_EL from '@uixkit/core/rotating-elements/js';
import SCROLL_REVEAL from '@uixkit/core/scroll-reveal/js';
import SCROLLSPY_ANIM from '@uixkit/core/scrollspy-animate/js';
import SHOW_MORELESS from '@uixkit/core/show-more-less/js';
import SKEW_ON_SCROLL from '@uixkit/core/skew-on-scroll/js';
import SMOOTH_SCROLLING_ANCHORLINK from '@uixkit/core/smooth-scrolling-anchor-link/js';
import SMOOTH_SCROLLING_PAGE from '@uixkit/core/smooth-scrolling-page/js';
import STICKY_EL from '@uixkit/core/sticky-elements/js';
import SVG_MAP_CHINA from '@uixkit/core/svg-map/js/china';
import SVG_MAP_WORLD from '@uixkit/core/svg-map/js/world';
import THREE_BACKGROUND_THREE from '@uixkit/core/simple-3D-background-three/js';
import THREE_BACKGROUND_THREE2 from '@uixkit/core/simple-3D-background-three2/js';
import THREE_BACKGROUND_THREE3 from '@uixkit/core/simple-3D-background-three3/js';
import THREE_BACKGROUND from '@uixkit/core/simple-3D-background/js';
import THREE_CAROUSEL from '@uixkit/core/simple-3D-carousel/js';
import THREE_GALLERY from '@uixkit/core/simple-3D-gallery/js';
import THREE_IMAGE_TRANSITION from '@uixkit/core/simple-3D-image-transition/js';
import THREE_MODEL from '@uixkit/core/simple-3D-model/js';
import THREE_PAGES from '@uixkit/core/simple-3D-pages/js';
import THREE_PARTICLE from '@uixkit/core/simple-3D-particle-effect/js';
import THREE_SPHERE_THREE from '@uixkit/core/simple-3D-sphere-three/js';
import THREE_OBJ_ANIM_INTERACTION from '@uixkit/core/simple-3D-obj-anim-interaction/js';
import THREE_MOUSE_INTERACTION from '@uixkit/core/simple-3D-mouse-interaction/js';
import THREE_MOUSE_INTERACTION2 from '@uixkit/core/simple-3D-mouse-interaction2/js';
import THREE_SHATTER_SLIDER from '@uixkit/core/simple-3D-shatter-slider/js';	
import THREE_EXP_PARTICLE_SLIDER from '@uixkit/core/simple-3D-explosive-particle-slider/js';
import THREE_LIQUID_SCROLLSPY_SLIDER from '@uixkit/core/simple-3D-liquid-scrollspy-slider/js';
import THREE_FILMIC_EFF from '@uixkit/core/simple-3D-filmic-effects/js';
import TABLE from '@uixkit/core/table/js/basic';
import TABLE_SORTER from '@uixkit/core/table/js/sorter';	
import TABS from '@uixkit/core/tabs/js';
import TEAM_FOCUS from '@uixkit/core/team-focus/js';
import TEXT_EFFECT from '@uixkit/core/text-effect/js';
import TIMELINE from '@uixkit/core/timeline/js';
import VERTICAL_MENU from '@uixkit/core/vertical-menu/js';
import WP_CORE from '@uixkit/core/wordpress/js';


	
/******/
/******/
/* pages */	
/* These modules do not contain JavaScript */
import '@uixkit/core/badges/scss/_style.scss';
import '@uixkit/core/blended-grid-layout/scss/_style.scss';
import '@uixkit/core/breadcrumbs/scss/_style.scss';
import '@uixkit/core/button/scss/_style.scss';
import '@uixkit/core/card/scss/_style.scss';
import '@uixkit/core/circle-text/scss/_style.scss';
import '@uixkit/core/content-placeholder-animated/scss/_style.scss';
import '@uixkit/core/dividing-line/scss/_style.scss';
import '@uixkit/core/dots/scss/_style.scss';
import '@uixkit/core/dotted-line/scss/_style.scss';
import '@uixkit/core/equal-width-columns/scss/_style.scss';
import '@uixkit/core/features/scss/_style.scss';
import '@uixkit/core/footer-templates/scss/_style.scss';
import '@uixkit/core/gallery-grid-layout/scss/_style.scss';
import '@uixkit/core/heading/scss/_style.scss';
import '@uixkit/core/image-animation/scss/_style.scss';
import '@uixkit/core/list-brands/scss/_style.scss';
import '@uixkit/core/list-maintain-aspect-ratio/scss/_style.scss';
import '@uixkit/core/list-side-by-side/scss/_style.scss';
import '@uixkit/core/list-side-by-side-img/scss/_style.scss';
import '@uixkit/core/mouse-animation-scroll/scss/_style.scss';
import '@uixkit/core/overlay/scss/_style.scss';
import '@uixkit/core/ribbon/scss/_style.scss';
import '@uixkit/core/shape-animation/scss/_style.scss';
import '@uixkit/core/single-post/scss/_comments.scss';
import '@uixkit/core/single-post/scss/_editing.scss';
import '@uixkit/core/striking/scss/_style.scss';
import '@uixkit/core/team-fullwidth/scss/_style.scss';
import '@uixkit/core/team-grid/scss/_style.scss';
import '@uixkit/core/testimonials/scss/_style.scss';
import '@uixkit/core/tooltip/scss/_style.scss';
import '@uixkit/core/vertical-separator/scss/_style.scss';
import '@uixkit/core/wave-background/scss/_style.scss';







