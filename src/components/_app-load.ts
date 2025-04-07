/*
 * Common website functions, Can be called separately in HTML pages or custom JavaScript.
 *    
 */
import '@uixkit/core/_global/js/fn/UixModuleFilter';
import '@uixkit/core/_global/js/fn/UixApplyAsyncScripts';
import '@uixkit/core/_global/js/fn/UixApplyAsyncAllScripts';



/*
 * Import modules} from components
 *    
 */
/******/
/******/
/* base */
/* Note: The CSS style file has been included by JavaScript files */
import '@uixkit/core/_global/js/modules/body-and-header';
import '@uixkit/core/_global/js/modules/common-height';
import '@uixkit/core/_global/js/modules/custom-data-attrs';
import '@uixkit/core/_global/js/modules/loader';
import '@uixkit/core/_global/js/modules/mega-menu';
import '@uixkit/core/_global/js/modules/mobile-menu';
import '@uixkit/core/_global/js/modules/navigation';
import '@uixkit/core/_global/js/modules/set-background';
import '@uixkit/core/_global/js/modules/videos';

	
/******/
/******/
/* pages */	
/* Note: The CSS style file has been included by JavaScript files */
import '@uixkit/core/_main/js';
import '@uixkit/core/accordion-img/js';
import '@uixkit/core/accordion/js';
import '@uixkit/core/advanced-slider/js/basic';
import '@uixkit/core/advanced-slider/js/special';
import '@uixkit/core/AJAX-push/js';
import '@uixkit/core/AJAX/js';
import '@uixkit/core/back-to-top/js';
import '@uixkit/core/circle-layout/js';
import '@uixkit/core/counter/js';
import '@uixkit/core/dropdown-menu/js';
import '@uixkit/core/dropdown-menu2/js';
import '@uixkit/core/cascading-dropdown-list/js';
import '@uixkit/core/floating-side-element/js';
import '@uixkit/core/form-progress/js';
import '@uixkit/core/form/js';
import '@uixkit/core/gallery/js';
import '@uixkit/core/hybrid-content-slider/js';
import '@uixkit/core/hover-delay-interaction/js';
import '@uixkit/core/image-shapes/js';
import '@uixkit/core/infinite-scrolling-element/js';
import '@uixkit/core/lava-lamp-style-menu/js';
import '@uixkit/core/lightbox/js';
import '@uixkit/core/list-bulleted/js';
import '@uixkit/core/list-posts/js';
import '@uixkit/core/fullwidth-column-to-edge/js';
import '@uixkit/core/login-templates/js';
import '@uixkit/core/modal-dialog/js';
import '@uixkit/core/mousewheel-interaction/js';
import '@uixkit/core/multi-items-carousel/js';
import '@uixkit/core/one-page/js';
import '@uixkit/core/one-page2/js';
import '@uixkit/core/parallax/js';
import '@uixkit/core/periodical-scroll/js';
import '@uixkit/core/pricing/js';
import '@uixkit/core/progress-bar/js';
import '@uixkit/core/progress-line/js';
import '@uixkit/core/retina/js';
import '@uixkit/core/rotating-elements/js';
import '@uixkit/core/scroll-reveal/js';
import '@uixkit/core/scrollspy-animate/js';
import '@uixkit/core/show-more-less/js';
import '@uixkit/core/skew-on-scroll/js';
import '@uixkit/core/smooth-scrolling-anchor-link/js';
import '@uixkit/core/smooth-scrolling-page/js';
import '@uixkit/core/sticky-elements/js';
import '@uixkit/core/svg-map/js/china';
import '@uixkit/core/svg-map/js/world';
import '@uixkit/core/svg-mask-slider/js';
import '@uixkit/core/swiper/js';
import '@uixkit/core/simple-3D-background-three/js';
import '@uixkit/core/simple-3D-background-three2/js';
import '@uixkit/core/simple-3D-background-three3/js';
import '@uixkit/core/simple-3D-background/js';
import '@uixkit/core/simple-3D-carousel/js';
import '@uixkit/core/simple-3D-gallery/js';
import '@uixkit/core/simple-3D-image-transition/js';
import '@uixkit/core/simple-3D-model/js';
import '@uixkit/core/simple-3D-pages/js';
import '@uixkit/core/simple-3D-particle-effect/js';
import '@uixkit/core/simple-3D-sphere-three/js';
import '@uixkit/core/simple-3D-obj-anim-interaction/js';
import '@uixkit/core/simple-3D-mouse-interaction/js';
import '@uixkit/core/simple-3D-mouse-interaction2/js';
import '@uixkit/core/simple-3D-explosive-particle-slider/js';
import '@uixkit/core/simple-3D-liquid-scrollspy-slider/js';
import '@uixkit/core/simple-3D-filmic-effects/js';
import '@uixkit/core/simple-3D-simulate-html-layout/js';
import '@uixkit/core/table/js/basic';
import '@uixkit/core/table/js/sorter';	
import '@uixkit/core/tabs/js';
import '@uixkit/core/team-focus/js';
import '@uixkit/core/text-effect/js';
import '@uixkit/core/timeline/js';
import '@uixkit/core/toast/js';
import '@uixkit/core/vertical-menu/js';
import '@uixkit/core/wordpress/js';


// typescript test
import TestButton from '@uixkit/core/_ts-test/js';



	
/******/
/******/
/* pages */	
/* Note: These modules do not contain JavaScript */
import '@uixkit/core/bootstrap-extend/scss/_style.scss';
import '@uixkit/core/badges/scss/_style.scss';
import '@uixkit/core/blended-grid-layout/scss/_style.scss';
import '@uixkit/core/breadcrumbs/scss/_style.scss';
import '@uixkit/core/button/scss/_style.scss';
import '@uixkit/core/card/scss/_style.scss';
import '@uixkit/core/circle-text/scss/_style.scss';
import '@uixkit/core/coach-mark/scss/_style.scss';
import '@uixkit/core/content-placeholder-animated/scss/_style.scss';
import '@uixkit/core/dividing-line/scss/_style.scss';
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
import '@uixkit/core/separator-of-rule-with-text/scss/_style.scss';
import '@uixkit/core/shape-animation/scss/_style.scss';
import '@uixkit/core/single-post/scss/_comments.scss';
import '@uixkit/core/single-post/scss/_editing.scss';
import '@uixkit/core/striking/scss/_style.scss';
import '@uixkit/core/team-fullwidth/scss/_style.scss';
import '@uixkit/core/team-grid/scss/_style.scss';
import '@uixkit/core/testimonials/scss/_style.scss';
import '@uixkit/core/tooltip/scss/_style.scss';
import '@uixkit/core/toast/scss/_style.scss';
import '@uixkit/core/wave-background/scss/_style.scss';







