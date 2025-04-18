
/* 
 *************************************
 * <!-- Toast -->
 *************************************
 */

import {
    UixModuleInstance,
} from '@uixkit/core/_global/js';


import '../scss/_style.scss';


export const TOAST = ( ( module, $, window, document ) => {
	if ( window.TOAST === null ) return false;
	
	
    module.TOAST               = module.TOAST || {};
    module.TOAST.version       = '0.2.0';
    module.TOAST.documentReady = function( $ ) {



        const REFER_LIB = "funda-ui";
        const REFER_COMPONENT = "toast";
    
        // Constants
        const DEFAULT_AUTO_CLOSE_TIME = 3000;
        const ANIM_SPEED = 300;
    

        /**
         * Toast
         * @since 20250417
         * @based https://github.com/xizon/funda-ui/tree/main/packages/Toast
         * @param {*} props 
         */

        /**
         * Configuration options for the FU_Toast function
         * @typedef {Object} ToastOptions
         * @property {(string|number|null|undefined)} [actionId='default'] - The identifier of toast, which can be used to determine whether different toast calls
         * @property {(string|boolean)} [title=false] - Specifies an alternate and title for the toast
         * @property {(string|boolean)} [note=false] - A light-colored comment next to the title, which can be information such as time
         * @property {(string)} [message=false] - Specifies the content, or HTML elements to the toast
         * @property {(string)} [hint=false] - Hint's content
         * @property {(boolean)} [hintAutoShow=false] - Whether or not to automatically display additional hints
         * @property {('primary'|'secondary'|'success'|'info'|'warning'|'danger'|'light'|'dark')} [theme='dark'] - Specifies a theme to .toast. All these colors are available as a Sass map of Bootstrap
         * @property {string} [wrapperClassName=''] - The class name of the toast wrapper
         * @property {boolean} [onlyShowOne=false] - Only ever going to show one toast at a time
         * @property {boolean} [lock=false] - You can not close pop-win when it is enabled
         * @property {boolean} [cascading=false] - Whether to use cascading styles
         * @property {string} [schemeBody] - Self-defined class name for body, such as: 'align-items-center text-white bg-primary border-0'
         * @property {string} [schemeHeader] - Self-defined class name for header, such as: 'text-white bg-dark'
         * @property {string} [closeBtnColor] - Set the color of the close button
         * @property {boolean} [closeDisabled=false] - Disable the close button
         * @property {boolean} [reverseDisplay=false] - Allow data to be reversed
         * @property {('bottom-left'|'bottom-center'|'bottom-right'|'top-left'|'top-center'|'top-right'|'vertical-center')} [direction='bottom-center'] - The direction of the toast
         * @property {(boolean|number)} [autoCloseTime=false] - Set an automatic closing time, multiple items will be accumulated in order. Amount of time measured in milliseconds. If false or without this attribute, Auto-Close will be disabled
         * @property {function(HTMLDivElement, string): void} [onClose] - Callback function when toast is closed. Parameters: (currentElement, currentToastId)
         */

        /**
         * Creates and displays a toast notification
         * @param {ToastOptions} options - The configuration options for the toast
         * @param {function(string): void} [callback] - Optional callback function that receives the toast ID
         * @returns {{close: function(): void}} Object containing methods to control the toast
         * 
         */

        /*
        @Examples:


        const showCustomToast1 = () => {

            window.UixToast({
                actionId: 'test-1',
                title: "Custom Toast 1",
                message: `<div>Text here (${Math.random()})</div>`,
                autoCloseTime: 1000,
                theme: 'warning',
                schemeHeader: 'bg-transparent text-light',
                onlyShowOne: true
            });
        };


        const showCustomToast2 = () => {
            window.UixToast({
                actionId: 'test-2',
                title: "Custom Toast 2",
                message: `<div style="color:orange">Text here (${Math.random()})</div>`,
                theme: "dark",
                autoCloseTime: 5000,
                direction: 'bottom-center',
                schemeBody: 'align-items-center text-white border-0 p-2',
                closeBtnColor: '#333',
                hint: 'There are some warnings that need your attention',
                hintAutoShow: false,
                onClose: (currentElement, currentToastId) => {
                    console.log(currentElement, currentToastId);
                }
            
            });
            
        };

        const showCustomToast3 = () => {
            window.UixToast({
                actionId: 'test-3',
                note: "11 mins ago", 
                message: `<div style="color:orange">Text here (${Math.random()})</div>`,
                autoCloseTime: 5000,
                cascading: true,
                direction: 'bottom-right',
                closeBtnColor: '#333',
                reverseDisplay: true
            
            });
        };

        const showCustomToast4 = () => {
            window.UixToast({
                actionId: 'test-4',
                title: "Note",
                message: `<div>Text here (${Math.random()})</div>`,
                autoCloseTime: 5000,
                direction: 'vertical-center',
                theme: 'light',
                schemeBody: '',
                closeBtnColor: '#333'
            
            });
        };


        const showCustomToast5 = () => {
            window.UixToast({
                actionId: 'test-5',
                closeDisabled: true,
                message: `<div style="color:orange">Text here (${Math.random()})</div>`,
                autoCloseTime: 5000,
                direction: 'bottom-left',
                schemeHeader: 'p-0',
                schemeBody: 'align-items-center text-white bg-dark border-0'
            
            });
        };



        const showCustomToast6 = () => {
            window.UixToast({
                actionId: 'test-6',
                direction: 'top-right',
                title: "Custom Toast 1",
                message: `<div>Text here (${Math.random()})</div>`,
                theme: 'success',
                schemeHeader: 'bg-transparent text-light',
                autoCloseTime: 3000,
            }, () => {
                console.log('The presentation is complete');
            });
        };


        <button onclick="showCustomToast1()">Custom Toast 1 (Only one is shown)</button>
        <button onclick="showCustomToast2()">Custom Toast 2</button>
        <button onclick="showCustomToast3()">Custom Toast 3</button>
        <button onclick="showCustomToast4()">Custom Toast 4</button>
        <button onclick="showCustomToast5()">Custom Toast 5</button>
        <button onclick="showCustomToast6()">Custom Toast 6</button>
        */

        const $$FU_Toast = (options, callback) => {
            // Default configuration
            const defaults = {
                wrapperClassName: '',
                actionId: 'default',
                cascading: false,
                autoCloseTime: DEFAULT_AUTO_CLOSE_TIME,
                direction: "top-center",
                schemeBody: "align-items-center text-white border-0 p-2",
                closeBtnColor: "#fff",
                reverseDisplay: false,
                onlyShowOne: false,
                onClose: (currentElement, currentToastId) => {},
    
                // single message
                theme: 'dark',
                title: false,
                note: false,
                hint: false,
                hintAutoShow: false,
                message: ''
            };
        
            // Merge options with defaults
            const config = { ...defaults, ...options };
        
            // Generate unique ID for the toast
            const uniqueID = Math.random().toString(36).substring(2, 9);
            const toastId = 'toast-' + uniqueID;
            
            // Create or get toast wrapper
            let rootRef = document.getElementById('uix-toasts__wrapper-global-js__' + config.actionId);
            if (!rootRef) {
                rootRef = document.createElement('div');
                rootRef.id = 'uix-toasts__wrapper-global-js__' + config.actionId;
                
                // Combine all class names
                const wrapperClasses = [
                    'uix-toasts__wrapper',
                    `uix-toasts__wrapper--${config.direction}`,
                    config.wrapperClassName
                ].filter(Boolean);
        
                rootRef.className = wrapperClasses.join(' ');
        
                // 
                if (config.cascading) rootRef.classList.add('uix-toasts__wrapper--cascading');
                if (config.onlyShowOne) rootRef.classList.add('uix-toasts__wrapper--only-one');
                
                const toastsContainer = document.createElement('div');
                toastsContainer.className = 'uix-toasts';
                rootRef.appendChild(toastsContainer);
                document.body.appendChild(rootRef);
            } else {
                const wrapperClasses = [
                    'uix-toasts__wrapper',
                    `uix-toasts__wrapper--${config.direction}`,
                    config.wrapperClassName,
                    config.cascading ? 'uix-toasts__wrapper--cascading' : '',
                    config.onlyShowOne ? 'uix-toasts__wrapper--only-one' : ''
                ].filter(Boolean);
        
                rootRef.className = wrapperClasses.join(' ');
            }
        
            // Create toast element
            const toast = document.createElement('div');
            toast.id = toastId;
            toast.dataset.toastId = uniqueID;
            toast.className = `toast-container ${config.onlyOne ? 'only-one' : ''} animate-ready`;
    
            // Get the number of toasts in the current container as an index
            const currentToasts = rootRef.querySelectorAll('.toast-container');
            const index = currentToasts.length;
            const itemDepth = currentToasts.length + 1;
            
    
            // Calculate item style based on cascading option
            const itemStyle = config.cascading ? 
                `transform: perspective(100px) translateZ(-${2 * index}px) translateY(${35 * index}px);
                z-index: ${itemDepth};` : 
                `z-index: ${itemDepth}`;
    
            toast.setAttribute('style', itemStyle);
            toast.dataset.index = index; 
    
    
            //
            const hideTitle = (config.title === '' || config.title === false) && (config.note === '' || config.note === false);
            
            // Generate hint content based on auto show option
            const hintContent = config.hint && config.hint !== '' ? 
                config.hintAutoShow ? 
                    `<div class="app-io-hint-detail">${config.hint}</div>` :
                    `<a href="#" class="app-io-hint-btn">Details</a><div class="app-io-hint-detail d-none">${config.hint}</div>` :
                '';
    
            // Generate close button if not locked or disabled
            const closeButton = !config.lock && !config.closeDisabled ? 
                `<button data-close="1" tabindex="-1" type="button" class="btn-close">
                    <svg width="12px" height="12px" viewBox="0 0 16 16">
                        <path fill="${config.closeBtnColor || '#000000'}" d="M9.41 8l3.29-3.29c.19-.18.3-.43.3-.71a1.003 1.003 0 00-1.71-.71L8 6.59l-3.29-3.3a1.003 1.003 0 00-1.42 1.42L6.59 8 3.3 11.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71L8 9.41l3.29 3.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71L9.41 8z" fill-rule="evenodd"></path>
                    </svg>
                </button>` : 
                '';
    
            // Generate toast item HTML
            toast.innerHTML = `
                <div class="toast fade show ${config.schemeBody || ''} ${config.theme ? `bg-${config.theme}` : ''}" role="alert">
                    ${!hideTitle ? `
                    <div class="toast-header ${config.schemeHeader || ''}">
                        <strong class="me-auto">${config.title || ''}</strong>
                        <small class="text-muted">${config.note || ''}</small>
                        ${closeButton}
                    </div>
                    ` : ''}
                    
                    <div class="toast-body">
                        ${config.message}
                        ${hintContent}
                        ${hideTitle ? `<div class="position-absolute top-0 end-0 me-2 mt-2">${closeButton}</div>` : ''}
                        
                        <div class="toast-progress active toast-progress ${config.autoCloseTime === false ? 'd-none' : ''}" role="progressbar">
                            <div class="progress-bar"></div>
                        </div>
                    </div>
                </div>
            `;
        
            // Handle only show one
            if (config.onlyShowOne) {
                const existingToasts = rootRef.querySelectorAll('.toast-container');
                existingToasts.forEach(t => t.remove());
            }
        
            // After adding a new toast, update the index and style of all existing toasts
            function updateToastIndexes() {
                const allToasts = rootRef.querySelectorAll('.toast-container');
                allToasts.forEach((t, idx) => {
                    const depth = allToasts.length - idx;
                    const style = config.cascading ? 
                        `transform: perspective(100px) translateZ(-${2 * idx}px) translateY(${35 * idx}px);
                        z-index: ${depth};` : 
                        `z-index: ${depth}`;
                    
                    t.setAttribute('style', style);
                    t.dataset.index = idx;
                });
            }
    
    
            // Add toast to container
            const toastsContainer = rootRef.querySelector('.uix-toasts');
            if (config.reverseDisplay) {
                toastsContainer.appendChild(toast);
            } else {
                toastsContainer.insertBefore(toast, toastsContainer.firstChild);
            }
        
    
            // Update the index of all toasts
            updateToastIndexes();
    
            // Animation
            requestAnimationFrame(() => {
                setTimeout(() => {
                    toast.classList.add('animate-in');
                }, 50);
            });
        
            // Progress bar and auto close
            if (config.autoCloseTime !== false) {
                const progressBar = toast.querySelector('.toast-progress');
                let startTime = Date.now();
                let isPaused = false;
        
                const updateProgress = () => {
                    if (!isPaused) {
                        const elapsed = Date.now() - startTime;
                        const progress = Math.max(0, 100 - (elapsed / config.autoCloseTime * 100));
                        progressBar.style.width = `${progress}%`;
                        progressBar.setAttribute('aria-valuenow', progress);
        
                        if (progress > 0) {
                            requestAnimationFrame(updateProgress);
                        } else {
                            closeToast();
                        }
                    }
                };
        
                toast.addEventListener('mouseenter', () => {
                    isPaused = true;
                });
        
                toast.addEventListener('mouseleave', () => {
                    isPaused = false;
                    startTime = Date.now() - (config.autoCloseTime * (1 - parseInt(progressBar.getAttribute('aria-valuenow')) / 100));
                    requestAnimationFrame(updateProgress);
                });
        
                requestAnimationFrame(updateProgress);
            }
        
            // Close button handler
            const closeBtn = toast.querySelector('.btn-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => closeToast());
            }
        
            // Close toast function
            function closeToast() {
                toast.classList.add('hide-start');
                setTimeout(() => {
                    toast.classList.add('hide-end');
                    setTimeout(() => {
                        toast.remove();
    
                        // Update the index of all toasts
                        updateToastIndexes();
    
                        if (rootRef.querySelector('.uix-toasts').children.length === 0) {
                            rootRef.remove();
                        }
    
                        // Callback
                        if (typeof config.onClose === 'function') {
                            config.onClose(toast, toast.dataset.toastId);
                        }
                    }, ANIM_SPEED);
                }, ANIM_SPEED);
            }
    
            // Initialize hint buttons
            rootRef.querySelectorAll('.app-io-hint-btn').forEach(btn => {
                if (!btn.dataset.click) {
                    btn.addEventListener('click', function(e) {
                        e.preventDefault();
                        const detail = e.target.nextElementSibling;
                        if (detail?.classList.contains('app-io-hint-detail')) {
                            detail.style.setProperty('display', 'block', 'important');
                        }
                        e.target.style.display = 'none';
                    });
                    btn.dataset.click = '1';
                }
            });
    
            // Execute callback with toast ID
            if (typeof callback === 'function') {
                callback(toastId);
            }
        
            // Return methods for controlling the toast
            return {
                close: closeToast
            };
        }

        // Add to global scope
        if (typeof window !== 'undefined') {
            window.UixToast = $$FU_Toast;
            
        }
		
    };


    module.components.documentReady.push( module.TOAST.documentReady );
	

	return class TOAST {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );




