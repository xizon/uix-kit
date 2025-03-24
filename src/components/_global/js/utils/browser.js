

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


const detectDeviceType = () => {
    // 1. First check if window and navigator are available (SSR compatibility)
    if (typeof window === 'undefined' || !navigator) {
        return 'desktop'; // Default to desktop
    }

    // 2. Get user agent string
    const ua = navigator.userAgent.toLowerCase();
    
    // 3. Get platform info
    const platform = navigator.platform.toLowerCase();
    
    // 4. Check screen characteristics using window.matchMedia
    const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
                   
    const isPortrait = window.matchMedia('(orientation: portrait)').matches;
    const isLandscape = window.matchMedia('(orientation: landscape)').matches;
    
    // 5. Get screen dimensions
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    const minScreenSize = Math.min(screenWidth, screenHeight);
    const maxScreenSize = Math.max(screenWidth, screenHeight);

    // Define device characteristics
    const isTablet = (
        // Traditional UA detection
        /ipad/.test(ua) || 
        (/android/.test(ua) && !/mobile/.test(ua)) ||
        /tablet/.test(ua) ||
        /playbook/.test(ua) ||
        /nexus (7|9|10)/.test(ua) ||
        /sm-t/.test(ua) ||
        /huawei(.*)mediapad/.test(ua) ||
        
        // Special detection for iPad Pro and newer iPads
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) ||
        
        // Screen size characteristics (tablets typically fall within this range)
        (minScreenSize >= 600 && maxScreenSize <= 1366 && isTouch) ||
        
        // Specific device detection
        /kindle|silk|kftt|kfot|kfjwa|kfjwi|kfsowi|kfthwa|kfthwi|kfapwa|kfapwi/i.test(ua)
    );

    const isMobile = (
        !isTablet && ( // Prevent tablets from being detected as phones
            // Traditional mobile device detection
            /iphone|ipod|android.*mobile|windows phone|mobi/.test(ua) ||
            
            // Screen size characteristics (phones typically smaller than 600px)
            (minScreenSize < 600 && isTouch) ||
            
            // Additional mobile device detection
            /blackberry|\bbb\d+|meego|webos|palm|phone|pocket|mobile|mini|iemobile/i.test(ua)
        )
    );

    // 6. Comprehensive decision logic
    if (isMobile) {
        // Additional check for small tablets
        if (maxScreenSize >= 1024 && isTouch) {
            return 'tablet';
        }
        return 'mobile';
    }
    
    if (isTablet) {
        // Additional check for touch-enabled laptops
        if (maxScreenSize > 1366 && /windows/.test(ua)) {
            return 'desktop';
        }
        return 'tablet';
    }

    // 7. Check for touch-enabled laptops
    if (isTouch && /windows/.test(ua) && maxScreenSize > 1366) {
        return 'desktop';
    }

    return 'desktop';
};

const _ua = navigator.userAgent.toLowerCase();
const _vendor = navigator.vendor.toLowerCase();
const _isSafari = (
    /safari/.test(_ua) && 
    /apple computer/.test(_vendor) && 
    !/chrome/.test(_ua) && 
    !/chromium/.test(_ua) &&
    !/android/.test(_ua)
);

const _isAndroid = /android/.test(_ua);


export const UixBrowser = {
    isTablet        : detectDeviceType() === 'tablet',
    isMobile        : detectDeviceType() === 'mobile',
    isAndroid       : _isAndroid,
    isPC            : detectDeviceType() === 'desktop',
    isSafari        : _isSafari,
    isIE            : !!window.ActiveXObject || "ActiveXObject" in window,     /*Test to 6 ~ 11 (not edge) */
    supportsPassive : supportsPassive
};

