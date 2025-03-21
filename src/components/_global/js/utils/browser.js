

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

const userAgent = window.navigator.userAgent.toLowerCase();
const mobileKeywords = [
    'android',
    'iphone',
    'ipad',
    'ipod',
    'webos',
    'blackberry',
    'windows phone',
    'opera mini',
    'mobile',
    'tablet'
];

const _isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);
const _isMobile = mobileKeywords.some(keyword => userAgent.includes(keyword));
const _isAndroid = ['android'].some(keyword => userAgent.includes(keyword));

export const UixBrowser = {
    isTablet        : _isTablet,
    isMobile        : _isMobile,
    isAndroid       : _isAndroid,
    isPC            : !_isTablet && !_isMobile,
    isSafari        : !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/), /*Test to 9, 10. */
    isIE            : !!window.ActiveXObject || "ActiveXObject" in window,     /*Test to 6 ~ 11 (not edge) */
    supportsPassive : supportsPassive
};

