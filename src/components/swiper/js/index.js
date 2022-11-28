
/* 
 *************************************
 * <!-- Swiper -->
 *************************************
 */
import {
    templateUrl,
    homeUrl,
    ajaxUrl,
    UixBrowser,
    UixModuleInstance,
    UixGUID,
    UixMath,
    UixCssProperty,
    UixDebounce,
    UixThrottle
} from '@uixkit/core/_global/js';

//IMPORT_DEFAULT
import '../third-party/Swiper/src/swiper.scss';

//IMPORT_COMPONENTS
import "../third-party/Swiper/src/components/zoom/zoom.scss";
import "../third-party/Swiper/src/components/thumbs/thumbs.scss";
import "../third-party/Swiper/src/components/scrollbar/scrollbar.scss";
import "../third-party/Swiper/src/components/pagination/pagination.scss";
import "../third-party/Swiper/src/components/navigation/navigation.scss";
import "../third-party/Swiper/src/components/lazy/lazy.scss";
import "../third-party/Swiper/src/components/effect-flip/effect-flip.scss";
import "../third-party/Swiper/src/components/effect-fade/effect-fade.scss";
import "../third-party/Swiper/src/components/effect-cube/effect-cube.scss";
import "../third-party/Swiper/src/components/effect-coverflow/effect-coverflow.scss";
import "../third-party/Swiper/src/components/core/core.scss";
import "../third-party/Swiper/src/components/controller/controller.scss";
import "../third-party/Swiper/src/components/a11y/a11y.scss";

import Swiper from '../third-party/Swiper/src/swiper.js';


//
import '../scss/_style.scss';


export const SWIPER = ( ( module, $, window, document ) => {
	if ( window.SWIPER === null ) return false;
	
	
	
    module.SWIPER               = module.SWIPER || {};
    module.SWIPER.version       = '0.0.6';
    module.SWIPER.documentReady = function( $ ) {
		
		$( '.uix-swiper' ).each( function()  {
			
			const $el = $( this );
			const actived = $el.data( 'activated' );
			if( typeof actived === typeof undefined ) {

				


				//Synchronize multiple objects
				//------------------------------------------
				if ( $el.find( '#app-slider1' ).length > 0 ) {
					const swiper2 = new Swiper('#app-slider2', {
						slidesPerView: 5,
						spaceBetween: 10,
						allowTouchMove: false
					});

					const swiper1 = new Swiper('#app-slider1', {
						slidesPerView: 1,
						spaceBetween: 10,
						speed: 1000,
						pagination: {
							el: '.swiper-pagination',
							clickable: true,
							renderBullet: function (index, className) {
								return '<span class="' + className + '">' + (index + 1) + '</span>';
							},	
						},
						navigation: {
							nextEl: '.swiper-button-next',
							prevEl: '.swiper-button-prev',
						},
						breakpoints: {
							640 : {
								slidesPerView: 2,
								spaceBetween: 20,
							},
							768 : {
								slidesPerView: 4,
								spaceBetween: 40,
							},
							1024 : {
								slidesPerView: 5,
								spaceBetween: 50,
							},
						},
					});
					
					//Sync swiper slider
					swiper1.on( 'slideChange', function() {

						const index = this.activeIndex;
						swiper2.slideTo( index, 1000, false );

					});

					
	
				}
				




				//Swiper custom slides transform effect (Parallax effect)
				//------------------------------------------
				
				if ( $el.find( '#app-slider3' ).length > 0 ) {
					const interleaveOffset = 0.5;
					const swiper3 = new Swiper('#app-slider3', {
						slidesPerView: 1,
						spaceBetween: 0,
						loop: false,
						speed: 1000,
						grabCursor: false,
						watchSlidesProgress: true,
						mousewheelControl: false,
						keyboardControl: false,
						pagination: {
							el: '.swiper-pagination',
							clickable: true,
							renderBullet: function (index, className) {
								return '<span class="' + className + '">' + (index + 1) + '</span>';
							},	
						},
						navigation: {
							nextEl: '.swiper-button-next',
							prevEl: '.swiper-button-prev',
						},
						on: {
							progress: function( e ) {

								const thisSwiper = this;
								for (let i = 0; i < thisSwiper.slides.length; i++) {
									const slideProgress = thisSwiper.slides[i].progress;
									const innerOffset = thisSwiper.width * interleaveOffset;
									const innerTranslate = slideProgress * innerOffset;
									thisSwiper.slides[i].querySelector(".slide-inner").style.transform = "translate3d(" + innerTranslate + "px, 0, 0)";

									//console.log( e.passedParams );
								}
							},
							touchStart: function( e ) {
								const passedParams = e.passedParams;
								const thisSwiper = this;
								for (let i = 0; i < thisSwiper.slides.length; i++) {
									thisSwiper.slides[i].style.transition = "";
								}
							},
							setTransition: function( e ) {

								const passedParams = e.passedParams;
								const thisSwiper = this;
								for (let i = 0; i < thisSwiper.slides.length; i++) {
									thisSwiper.slides[i].style.transition = passedParams.speed + "ms";
									thisSwiper.slides[i].querySelector(".slide-inner").style.transition = passedParams.speed + "ms";
								}
							}
						}

					});


					//AutoPlay
					swiper3.autoplay.start();
					//swiper3.autoplay.stop();			
				}
				

				
				
				//Swiper custom slides transform effect (Scale Effect without left/right swipe)
				//------------------------------------------
				
				if ( $el.find( '#app-slider4' ).length > 0 ) {
					const swiper4 = new Swiper('#app-slider4', {
						slidesPerView: 1,
						spaceBetween: 0,
						loop: false,
						speed: 1000,
						grabCursor: false,
						watchSlidesProgress: true,
						mousewheelControl: false,
						keyboardControl: false,
						virtualTranslate: true, /* Required */
						pagination: {
							el: '.swiper-pagination',
							clickable: true,
							renderBullet: function (index, className) {
								return '<span class="' + className + '">' + (index + 1) + '</span>';
							},	
						},
						navigation: {
							nextEl: '.swiper-button-next',
							prevEl: '.swiper-button-prev',
						},
						on: {
							progress: function( translate ) {

								const thisSwiper = this;

								for (let i = 0; i < thisSwiper.slides.length; i++) {
									const slideProgress = thisSwiper.slides[i].progress;
									console.log( translate.params );
								}
							},
							touchStart: function( translate ) {
								const params = translate.params;
								const thisSwiper = this;

							},
							setTransition( translate ) {
								const params = translate.params;
								const thisSwiper = this;
							},
							setTranslate(translate) {

								const params = translate.params;
								const thisSwiper = this;



								/*
								A weird way to find this out but I've found no other.
								Checks if the progress on the active slide is 1 or -1 which happens when swiper navigates to next/previous slide on click and keybord navigation.
								If not then the slider is being dragged, so we get the right index by finding the startTranslate from touchEvents in array of transitions the swiper snaps to.
								The startTranslate doesn't exist on initial load so we use the initialSlide index instead.
								*/
								const getActiveIndexBeforeTransitionStart = function(curSwiper, curSlides) {
									const isDragging = !Math.abs(curSlides[curSwiper.activeIndex].progress === 1);
									if (isDragging) {
										return curSwiper.slidesGrid.indexOf( -curSwiper.touchEventsData.startTranslate || curSwiper.params.initialSlide);
									} else {
										return curSwiper.activeIndex;
									}
								};


								const getDirection = function(animationProgress) {
									if (animationProgress === 0) {
										return "NONE";
									} else if (animationProgress > 0) {
										return "NEXT";
									} else {
										return "BACK";
									}
								};



								const durationInSeconds = params.speed / 1000;
								// convert slides object to plain array
								const slides = thisSwiper.slides;

								// get the index of the slide active before transition start (activeIndex changes halfway when dragging)
								const originIndex = getActiveIndexBeforeTransitionStart(thisSwiper, slides);
								// get information about animation progress from the active slide - the active slide's value is always -1 to 1.
								/* 
								every slide has a progress attribute equal to the "distance" from the current active index.
								*/
								const animationProgress = slides[originIndex].progress;
								// you can then get the drag direction like so:
								const direction = getDirection(animationProgress);
								// console.log(direction);
								// do magic with each slide
								slides.map(function (perSlide, index) {
									// to put the slides behind each other we have to set their CSS translate accordingly since by default they are arranged in line.
									const offset = perSlide.swiperSlideOffset;
									let x = -offset;
									if (!thisSwiper.params.virtualTranslate) x -= thisSwiper.translate;
									let y = 0;
									if (!thisSwiper.isHorizontal()) {
										y = x;
										x = 0;
									}
									TweenMax.set(perSlide, {
										x,
										y
									});

									// do our animation stuff!
									const clip = function clip(val, min, max) {
										return Math.max(min, Math.min(val, max));
									};
									const ZOOM_FACTOR = 0.05;

									const opacity = Math.max(1 - Math.abs(perSlide.progress), 0);

									const clippedProgress = clip(perSlide.progress, -1, 1);
									const scale = 1 - ZOOM_FACTOR * clippedProgress;

									// you can do your CSS animation instead of using tweening.
									TweenMax.to(perSlide, durationInSeconds, {
										scale,
										opacity
									});
								});



							}
						}

					});


					//AutoPlay
					swiper4.autoplay.start();
					//swiper4.autoplay.stop();			
				}
				
	


				
				//Centered Slides
				//------------------------------------------	
				
				if ( $el.find( '#app-slider5' ).length > 0 ) {
					const swiper5 = new Swiper('#app-slider5', {
						slidesPerView: 3,
						spaceBetween: 30,
						loop: true,
						speed: 1000,
						centeredSlides: true,
						pagination: {
							el: '.swiper-pagination',
							clickable: true,
							renderBullet: function (index, className) {
								return '<span class="' + className + '">' + (index + 1) + '</span>';
							},	
						},
						navigation: {
							nextEl: '.swiper-button-next',
							prevEl: '.swiper-button-prev',
						}

					});
			
				}		

		
				
				
				//Display half on both sides
				//------------------------------------------		
				
				if ( $el.find( '#app-slider6' ).length > 0 ) {
					const swiper6 = new Swiper('#app-slider6', {
						slidesPerView: 'auto',//Number of slides per view, and it must be "auto"!
						spaceBetween: 30,
						loop: true,
						speed: 1000,
						centeredSlides: true, //If true, then active slide will be centered, not always on the left side.
						pagination: {
							el: '.swiper-pagination',
							clickable: true,
							renderBullet: function (index, className) {
								return '<span class="' + className + '">' + (index + 1) + '</span>';
							},	
						},
						navigation: {
							nextEl: '.swiper-button-next',
							prevEl: '.swiper-button-prev',
						}

					});

			
				}

				
				
				//Custom Progress Bar
				//------------------------------------------

				if ( $el.find( '#app-slider7' ).length > 0 ) {
					const cusProgressBar = function( speed, length, curIndex ) {
						TweenMax.set( '#app-slider7__progress', {
							width: 0,
							onComplete: function() {
								TweenMax.to( '#app-slider7__progress', speed/1000, {
									width: '100%'
								});	
							}
						});


						TweenMax.set( '#app-slider7__progress2', {
							width: 100/length * (curIndex) + '%',
							onComplete: function() {
								TweenMax.to( '#app-slider7__progress2', speed/1000, {
									width: 100/length * (curIndex+1) + '%'
								});	
							}
						});
					};


					const swiper7 = new Swiper('#app-slider7', {
						slidesPerView: 1,
						spaceBetween: 0,
						loop: false,
						speed: 3500,
						grabCursor: false,
						watchSlidesProgress: true,
						mousewheelControl: false,
						keyboardControl: false,
						pagination: {
							el: '.swiper-pagination',
							clickable: true,
							renderBullet: function (index, className) {
								return '<span class="' + className + '">' + (index + 1) + '</span>';
							},	
						},
						navigation: {
							nextEl: '.swiper-button-next',
							prevEl: '.swiper-button-prev',
						},
						on: {
							init: function( e ) {
								const thisSwiper = this;
								console.log( 'current index: ' + thisSwiper.activeIndex );
								cusProgressBar( e.passedParams.speed, thisSwiper.slides.length, thisSwiper.activeIndex );

							},
							slideChange: function( e ) {
								const thisSwiper = this;
								console.log( 'current index: ' + 	thisSwiper.activeIndex );
								cusProgressBar( e.passedParams.speed, thisSwiper.slides.length, thisSwiper.activeIndex );

							}	

						}

					});	
				}
				
	
				//Gallery with center thumbs automatically
				//------------------------------------------
				if ( $el.find( '#app-slider8' ).length > 0 ) {
					const swiper8 = new Swiper('#app-slider8', {
						spaceBetween: 10,
						grabCursor: false,
						loop: true,
						loopedSlides: 4,
						autoplay: {
							delay: 5000
						},
						// other parameters
						on: {
							click: function() {
								/* do something */
							}
						},
						keyboard: {
							enabled: true,
							onlyInViewport: false
						},
						autoHeight: true,
						pagination: {
							el: '.swiper-pagination',
							clickable: true,
							renderBullet: function (index, className) {
								return '<span class="' + className + '">' + (index + 1) + '</span>';
							},	
						},
						navigation: {
							nextEl: '.swiper-button-next',
							prevEl: '.swiper-button-prev',
						},
						speed: 1000
					});
					

					/* thumbs */
					const swiper8Thumbs = new Swiper( '#app-slider8-thumbs', {
						spaceBetween: 10,
						centeredSlides: true,
						slidesPerView: "auto", //If you use it with "auto" value and along with loop: true then you need to specify loopedSlides parameter with amount of slides to loop (duplicate)
						touchRatio: 0.4,
						slideToClickedSlide: true,
						loop: true,
						loopedSlides: 4,
						keyboard: {
							enabled: true,
							onlyInViewport: false
						},
						speed: 1000
					});

					/* set conteoller  */
					swiper8.controller.control = swiper8Thumbs;
					swiper8Thumbs.controller.control = swiper8;

	
				}
				
				
				
	
				//Gallery with manual triggers
				//------------------------------------------
				if ( $el.find( '#app-slider9' ).length > 0 ) {
					const swiper9 = new Swiper('#app-slider9', {
						spaceBetween: 10,
						grabCursor: false,
						autoplay: {
							delay: 5000
						},
						// other parameters
						on: {
							click: function() {
								/* do something */
							}
						},
						keyboard: {
							enabled: true,
							onlyInViewport: false
						},
						autoHeight: true,
						pagination: {
							el: '.swiper-pagination',
							clickable: true,
							renderBullet: function (index, className) {
								return '<span class="' + className + '">' + (index + 1) + '</span>';
							},	
						},
						navigation: {
							nextEl: '.swiper-button-next',
							prevEl: '.swiper-button-prev',
						},
						speed: 1000,
						on: {
							init: function( e ) {
								const thisSwiper = this;
								swiper9BTN( thisSwiper.activeIndex, true );

							}	

						}
					});
					
					
					//Sync swiper slider
					swiper9.on( 'slideChange', function() {

						const index = this.activeIndex;
						swiper9BTN( index, false );

					});
	

					$( '#app-slider9-triggers > div' ).on( 'click', function() {
						swiper9BTN( $( this ).index(), false );
					});

					
					function swiper9BTN( index, init ) {
						const _btns = $( '#app-slider9-triggers > div' );
						_btns.removeClass( 'is-active' );
						_btns.eq( index ).addClass( 'is-active' );
						
						if ( !init ) {
							swiper9.slideTo( index, 1000 );
						}
						
					}
					
					

	
				}
				

				
				//------------------------------------------

				//Prevents front-end javascripts that are activated in the background to repeat loading.
				$el.data( 'activated', 1 );



			}//endif actived
		});

	
		
		
    };

    module.components.documentReady.push( module.SWIPER.documentReady );
	

	return class SWIPER {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );


