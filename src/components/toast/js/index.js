
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
    module.TOAST.version       = '0.1.0';
    module.TOAST.documentReady = function( $ ) {

 
        const $$ToastItem = function(
            _data, 
            _depth, 
            _lock, 
            _schemeBody,
            _schemeHeader,
            _closeBtnColor,
            _closeDisabled,
            _cascading,
            _autoCloseTime
            ) {
        
            const   lock = _lock,
                    cascading = _cascading,
                    schemeBody = _schemeBody,
                    schemeHeader = _schemeHeader,
                    closeBtnColor = _closeBtnColor,
                    closeDisabled = _closeDisabled,
                    autoCloseTime = _autoCloseTime;
        
                        
            let resItems = '';
            const dataRes = _data;
        
            (dataRes).forEach((item, i) => {
         
                const props = {
                    onlyOne: dataRes.length === 1 ? true : false,
                    index: i,
                    title: item.title,
                    note: item.note,
                    theme: item.theme,
                    message: item.message,
                    itemDepth: _depth - i
                };
        
                const {
                    onlyOne,
                    index,
                    title,
                    note,
                    theme,
                    message,
                    itemDepth
                } = props;
        
        
                const itemStyle =  cascading ? `transform: perspective(100px) translateZ(-${2 * index}px) translateY(${35 * index}px);
        z-index: ${itemDepth};` : `z-index: ${itemDepth}`;
        
                const hideTitle = (title === '' || title === false) && (note === '' || note === false);
        
                resItems += `<div
                    class="${`toast-container ${onlyOne ? 'only-one' : ''}`}"
                    data-index="${index}"
                    style="${itemStyle}">
        
                    <!-- Bootstrap toast -->
                    <div class="${`toast fade show ${schemeBody ? schemeBody : ''} ${theme ? `bg-${theme}` : ''}`}" role="alert">
                        
                        ${hideTitle ? '' : `<div class="${`toast-header ${schemeHeader ? schemeHeader : ''}`}">
                            <strong class="me-auto">${title === '' || title === false ? '' : title}</strong>
                            <small class="text-muted">${note === '' || note === false ? '' : note}</small>
                            ${!lock ? `${!closeDisabled ? `<button data-close="1" data-index="${index}" tabindex="-1" type="button" class="btn-close"><svg width="12px" height="12px" viewBox="0 0 16 16"><path fill="${`${closeBtnColor ? closeBtnColor : '#000000'}`}" d="M9.41 8l3.29-3.29c.19-.18.3-.43.3-.71a1.003 1.003 0 00-1.71-.71L8 6.59l-3.29-3.3a1.003 1.003 0 00-1.42 1.42L6.59 8 3.3 11.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71L8 9.41l3.29 3.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71L9.41 8z" fill-rule="evenodd"></path></svg></button>` : ''}` : ''}</div>`}
        
                        <div class="toast-body">
                            ${message}
        
                            ${hideTitle ? `${!closeDisabled ? `<button data-close="1" data-index="${index}" tabindex="-1" type="button" class="btn-close position-absolute top-0 end-0 me-2 mt-2"><svg width="12px" height="12px" viewBox="0 0 16 16"><path fill="${`${closeBtnColor ? closeBtnColor : '#000000'}`}" d="M9.41 8l3.29-3.29c.19-.18.3-.43.3-.71a1.003 1.003 0 00-1.71-.71L8 6.59l-3.29-3.3a1.003 1.003 0 00-1.42 1.42L6.59 8 3.3 11.29c-.19.18-.3.43-.3.71a1.003 1.003 0 001.71.71L8 9.41l3.29 3.29c.18.19.43.3.71.3a1.003 1.003 0 00.71-1.71L9.41 8z" fill-rule="evenodd"></path></svg></button>` : ''}` : ''}
        
        
                            <!-- PROGRESS -->
                            <div data-progress-index="${index}" class="${`progress active toast-progress ${autoCloseTime === false ? 'd-none' : ''}`}" role="progressbar">
                                <div class="progress-bar"></div>
                            </div>
                            <!-- /PROGRESS -->
        
        
                        </div>
                    </div>
        
                </div>`;
            });
        
            return resItems;
        
        }
        
        
        const $$Toast = function(props, callback) {
            const {
                async,
                alternateAnimForOne,
                direction,
                autoCloseTime,
                lock,
                cascading,
                data,
                schemeBody,
                schemeHeader,
                closeBtnColor,
                closeDisabled,
                id,
                onClose
            } = props;
        
            let sendData = data;

            const DEFAULT_AUTO_CLOSE_TIME = 3000;
            const uniqueID = 0;
            const idRes = id || uniqueID;
            const rootId = `uix-toasts__wrapper-js-${idRes}`;
        
            const depth = sendData.length + 1;
            const cascadingEnabled = typeof cascading === 'undefined' ? true : cascading; // auto close
        
            const AUTO_CLOSE_TIME = typeof autoCloseTime === 'undefined' || autoCloseTime === false ? false : autoCloseTime; // progress animation
        
            const PROGRESS_TRANSITION_TIME = typeof autoCloseTime === 'undefined' || autoCloseTime === false ? DEFAULT_AUTO_CLOSE_TIME : autoCloseTime;
            let progressPausedRef = sendData.map(v => false); 
            let progressObjRef = [];
            let progressIntervalRef = sendData.map(v => null);
    
                    
        
            let rootRef = document.createElement('div');
            rootRef.id = rootId;
            rootRef.dataset.async = async ? `${async}` : `false`;
            rootRef.className = `uix-toasts__wrapper-js uix-toasts__wrapper uix-toasts__wrapper--${direction ? direction : 'bottom-center'} ${cascadingEnabled ? 'uix-toasts__wrapper--cascading' : ''} app-core-toast`;
    
            const rootRefContent = `
            <div class="uix-toasts">
                ${$$ToastItem(
                    sendData,
                    depth,
                    lock,
                    schemeBody,
                    schemeHeader,
                    closeBtnColor,
                    closeDisabled,
                    cascadingEnabled,
                    AUTO_CLOSE_TIME
                )}
            </div>
            `;
            
        
        
            const startProgressTimer = (el, i) => {
    
                // init progress
                let progressCurrentChunk = 100 / (PROGRESS_TRANSITION_TIME / 100);
                const _bar = el.querySelector('.progress-bar');
                _bar.style.width = 100 + '%';
                _bar.ariaValueNow = 100; // animation
        
                progressIntervalRef[i] = setInterval(() => {
                    // console.log('toast setInterval');
                    
                    if (!progressPausedRef[i]) {
                        const progPercent = 100 - progressCurrentChunk; // console.log('interval');
        
                        _bar.style.width = progPercent + '%';
                        _bar.ariaValueNow = progPercent;
                        progressCurrentChunk++; //
        
                        if (progPercent === 0 || progPercent < 1) {
                            el.classList.add('complete'); //
        
                            // stop current animation
                            stopProgressTimer(i);
                            
        
                            const currentItem = el.closest('.toast-container');
                            handleClose(i, currentItem);
                        }
                    }
                }, PROGRESS_TRANSITION_TIME / 100);
            };
        
        
            const clearAllProgressTimer = (arr, curIndex = undefined) => {
                if (typeof curIndex === 'undefined') {
                    sendData.forEach((item, i) => {
                        clearInterval(arr[i]);
                        arr[i] = null;
                    });
                } else {
                    sendData.forEach((item, i) => {
                        if (i === curIndex) {
                            clearInterval(arr[i]);
                            arr[i] = null;
                        }
                    });
                }
            };
        
    
            const stopProgressTimer = (index) => {
                clearInterval(progressIntervalRef[index]);
                progressIntervalRef[index] = null;
            };
        
            function progressAnimBegin(progressObjs) {
                sendData.forEach((item, i) => {
                    const el = progressObjs[i];
                    if (el !== null && typeof el !== 'undefined') startProgressTimer(el, i);
                });
            }
        
            function handleProgressPaused(e) {
                const _currentIndex = e.target.dataset.index;
                progressPausedRef[_currentIndex] = true;
            }
        
            function handleProgressStart(e) {
                const _currentIndex = e.target.dataset.index;
                progressPausedRef[_currentIndex] = false;
                
            }
        
            function checkProgressCompleted() {
                const _progressObjs = [].slice.call(rootRef.querySelectorAll('.toast-container .toast-progress'));
                _progressObjs.forEach(node => {
                    if (node.classList.contains('complete')) {
                        const _currentItem = node.closest('.toast-container');
                        _currentItem.classList.add('hide-end');
                        
                    }
                });  
            }
        
            function init() {
    
                // Check progress has completed
                //------------------------------------------
                checkProgressCompleted();
        
                // Move HTML templates to tag end body </body>
                // render() don't use "Fragment", in order to avoid error "Failed to execute 'insertBefore' on 'Node'"
                // prevent "transform", "filter", "perspective" attribute destruction fixed viewport orientation
                //------------------------------------------
                if (document.body !== null) {
                    if (document.getElementById(rootId) === null) {
                        document.body.appendChild(rootRef);
                    }
    
                    //
                    document.getElementById(rootId).innerHTML = rootRefContent;
                    rootRef = document.getElementById(rootId);
                    
    
                    //
                    [].slice.call(rootRef.querySelectorAll('[data-close]')).forEach(node => {
                        node.addEventListener('pointerdown', e => {
                            const index = node.dataset.index;
                            const currentItem = node.closest('.toast-container');
                            handleClose(index, currentItem);
                        });
                    });
                    [].slice.call(rootRef.querySelectorAll('.toast-container')).forEach(node => {
                        node.addEventListener('mouseenter', handleProgressPaused);
                        node.addEventListener('mouseleave', handleProgressStart);
                    }); // Automatically hide multiple items
                    // It creates a transition animation effect with multiple records and only one displayed.
        
        
                    progressObjRef = [].slice.call(document.getElementById(rootId).querySelectorAll('.toast-container .toast-progress'));
        
                    
                  
                    if (alternateAnimForOne) {
                        const _list = [].slice.call(rootRef.querySelectorAll('.toast-container'));
        
                        _list.forEach((node, i) => {
    
                            if (i !== _list.length - 1) {
                                node.classList.add('auto-anim-switch');
                            } else {
                                node.classList.add('auto-anim-switch--initfirst', 'auto-anim-switch--initfirst-js');
                                node.classList.add('auto-anim-switch--first', 'auto-anim-switch--first-js');
                            }
                        });
    
                    }
        
        
                    autoClose(progressObjRef); // Remove the global list of events, especially as scroll and interval.
        
        
                    // callback
                    if (typeof callback === 'function') {
                        callback(rootId);
                    }
                    
                } 
                
                
                // Initialize data
                //--------------
                const $toast = document.querySelector(`#${rootRef.id}`);
        
                if ($toast !== null) {
                    if ($toast.dataset.async == 'true') {
                        const _list = [].slice.call(rootRef.querySelectorAll('.toast-container'));
        
                        _list.forEach((node, i) => {
                            node.classList.remove('hide-end'); // rearrange
        
                            if (cascadingEnabled) node.style.transform = `perspective(100px) translateZ(-${2 * i}px) translateY(${35 * i}px)`;
                        });
                    }
                }
            }
        
            function autoClose(progressObjs) {
                // Auto hide
                //--------------
                if (AUTO_CLOSE_TIME !== false) {
    
                    // start animation
                    progressAnimBegin(progressObjs);
                }
            }
        
            function handleClose(index, currentItem) {
                const curIndex = Number(index);
        
                if (rootRef === null) return;
        
                const _list = [].slice.call(rootRef.querySelectorAll('.toast-container'));
        
                currentItem.classList.add('hide-start'); //Let the removed animation show
    
    
                setTimeout(() => {
                    _list.forEach((node, i) => {
                        node.classList.remove('hide-start');
                    }); // remove current
        
        
                    currentItem.classList.add('hide-end'); // rearrange
        
                    if (cascadingEnabled) {
                        _list.filter(node => !node.classList.contains('hide-end')).forEach((node, k) => {
                            node.style.transform = `perspective(100px) translateZ(-${2 * k}px) translateY(${35 * k}px)`;
                        });
                    } //
        
        
                    // check progress has completed
                    [].slice.call(document.querySelectorAll('.uix-toasts__wrapper-js')).forEach((el) => {
                        checkProgressCompleted(el);
                    });
            
                    // stop all animations or current animation
                    if (_list.length === 1) {
                        clearAllProgressTimer(progressIntervalRef);
                    } else {
                        clearAllProgressTimer(progressIntervalRef, curIndex);
                    }
    
    
                    if (typeof onClose === 'function') {
                        onClose(rootRef, curIndex, _list.filter(node => !node.classList.contains('hide-end')));
                    }
                }, 300);
    
            }
        
    
            init();
        
            
        }	

        /* ------------- Global -------------- */
        if ( typeof (window) !== 'undefined' ) {
            window.UixToast = $$Toast;
        }
        
		
    };


    module.components.documentReady.push( module.TOAST.documentReady );
	

	return class TOAST {
		constructor() {
			this.module = module;
		}
		
	};
	
})( UixModuleInstance, jQuery, window, document );




