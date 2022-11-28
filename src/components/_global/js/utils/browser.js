

/*
 * Determine whether it is a special browser
 *
 * @private
 */
// Add feature test for passive event listener support
let supportsPassive = false;
try {
  document.addEventListener("test", null, { get passive() { supportsPassive = true }});
} catch(e) {}


export const UixBrowser = {
    isMobile        : /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
	isAndroid       : /(android)/i.test(navigator.userAgent),
	isPC            : !navigator.userAgent.match(/(iPhone|iPod|Android|ios|Mobile)/i),
	isSafari        : !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/), /*Test to 9, 10. */
	isIE            : !!window.ActiveXObject || "ActiveXObject" in window,     /*Test to 6 ~ 11 (not edge) */
    supportsPassive : supportsPassive
};

