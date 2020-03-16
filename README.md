<p align="center">
  <a href="https://github.com/xizon/uix-kit">
	  <img src="https://raw.githubusercontent.com/xizon/uix-kit/master/misc/screenshots/logo-colorful.png"  alt="Uix Kit"  width="180" >
  </a>
  <p align="center">Make over <strong>120+</strong> components to wear again and again!</p>
  <p align="center">
      <a href="https://travis-ci.org/xizon/uix-kit/" title="Travis CI"><img src="https://api.travis-ci.org/xizon/uix-kit.svg?branch=master"/></a>
      <a href="https://img.shields.io/w3c-validation/html?targetUrl=https%3A%2F%2Fxizon.github.io%2Fuix-kit%2Fexamples%2F" title="w3c"><img src="https://img.shields.io/w3c-validation/html?targetUrl=https%3A%2F%2Fxizon.github.io%2Fuix-kit%2Fexamples%2F"/></a>
	  <a href="https://www.npmjs.com/package/uix-kit" title="npm version"><img src="https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&type=6&v=4.1.53&x2=0"/></a>
	  <a href="https://github.com/xizon/uix-kit/blob/master/LICENSE" title="license"><img src="https://img.shields.io/badge/license-MIT-brightgreen.svg"/></a>
	   
  </p>
  <br>
</p>

**Uix Kit is not a framework, just a UI toolkit based on some common libraries for building beautiful responsive website.**

Uix Kit isn't a reusable component structure, mostly custom CSS and JavaScript based. Definitely interesting, and if you're developing mostly web content and not applications this is particularly useful. 

It can be used separately, or merge components and grid systems using bootstrap. Support JS, HTML and SASS component library automatically packaged. Automatically convert ES6 JS to ES5 using Babel in this scaffold. 

**Uix Kit is now in Long Term Support (LTS) mode.**


---

- [English Documentation](README.md)
- [中文版说明文档](README_CN.md)

---


## Demo

[https://xizon.github.io/uix-kit/examples/](https://xizon.github.io/uix-kit/examples/)

GitHub pages can only serve static content, and there is no way to run PHP or get Ajax request on the pages. You need to visit the link below to see some special demos &#128071;

[https://uiux.cc/uix-kit](https://uiux.cc/uix-kit) 



## Table of Contents


* [Getting Started with Videos](#getting-started-with-videos)
* [Why use it](#why-use-it)
* [Installation And Test](#installation-and-test)
* [How To Use？](#how-to-use)
* [How to Create a Custom Module？ &#128293; ](#how-to-create-a-custom-module)
* [Contributing](#contributing)
* [Changelog](#changelog)
* [Browser Support](#browser-support)
* [Licensing](#licensing)
* [Buy Me a Coffee](#buy-me-a-coffee)



## Getting Started with Videos

[https://www.youtube.com/watch?v=aRDY9Cr-1-E](https://www.youtube.com/watch?v=aRDY9Cr-1-E)




## Why use it

* Not a reusable component structure
* Not a JavaScript framework
* Webpack-based dev environment which is an intuitive toolkit system
* Use any JavaScript libraries in your favorite way to build styles and animation scripts
* W3C standard and SEO 
* Control scope with BEM naming, so the core Uix Kit project is not in conflict with the other projects
* Automatically generate a table of contents for each module comment of the name
* Each module consists of SASS / SCSS, JavaScript and HTML files
* Make a foundation for the React architecture
* Compatible with Bootstrap 4.x
* Provides a common web page components and layouts
* Using ES6 to import or export multiple modules, the third-party plugins could adopt pure file merger method and do not import and export
* The complete directory of examples in order to develop a responsive website independently without Node.js dev environment
* Suitable for developing the standardized responsive website and WordPress templates

* * *


## Installation And Test

![quick overview 1](https://raw.githubusercontent.com/xizon/uix-kit/master/misc/screenshots/quick-overview-1.gif)

![quick overview 2](https://raw.githubusercontent.com/xizon/uix-kit/master/misc/screenshots/quick-overview-2.gif)

You will need to have [node](https://nodejs.org/) setup on your machine. That will output the built distributables to `./dist/*` and `./examples/*.html`.


**Step 1.** Use NPM (Locate your current directory of project, and enter the following command.) or download the latest version from [Github](https://github.com/xizon/uix-kit). For nodejs you have to install some dependencies.

```sh
$ sudo npm install uix-kit
```

Or clone the repo to get all source files including build scripts: 

```sh
$ git clone git://github.com/xizon/uix-kit.git
```


**Step 2.** First, using an absolute path into your `"uix-kit/"` folder directory.

```sh
$ cd /{your_directory}/uix-kit
```


**Step 3.** Before doing all dev stuff make sure you have `Node 10+` installed. After that, run the following code in the main directory to install the node module dependencies.

```sh
$ sudo npm install --only=dev --unsafe-perm --production
```


**Step 4.** When you’re ready to deploy to production, create a minified bundle with:

```sh
$ npm run build
```

**Step 5.** When you have done, this will spin up a server that can be accessed at

```sh
http://localhost:8080/examples/
```


### Note:
 
**a) ERROR: npm update check failed.**

```sh
$ sudo chown -R $USER:$(id -gn $USER) /Users/{username}/.config
```

**b) How to use modules?**

You could custom modules of what to import in `src/components/ES6/_app-load.js` and `src/components/ES6/_app-load-rtl.js`. Because the modules are imported too much, you need to wait at least 5.5 seconds (default value). You can set the compilation wait time in the `webpack.config.js` according to the imported modules you want.


**c) Site Info Configuration**

You can update the Placeholders in Templates by modifying the Site Info configuration of `package.json`. Like this:

```json
{
  "author": "UIUX Lab",
  "name": "uix-kit",
  "email": "uiuxlab@gmail.com",
  "version": "1.0.0",
  "projectName": "Uix Kit",
  "createdInfo": "UIUX Lab (https://uiux.cc)",
  "projectURL": "https://uiux.cc",
  "description": "A free web kits for fast web design and development, compatible with Bootstrap v4.",
  ...
}
```



* * *


## How To Use

### 1\. HTML Structure

```html
<!DOCTYPE html>
<html dir="ltr" lang="en-US">
<head>
	<meta charset="utf-8" />
	<title></title>
	<!-- Mobile Settings
	============================================= -->
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
	<!-- Mobile Settings end -->
	
	<!-- Vendor
	============================================= -->
	<script src="assets/js/wp-jquery/jquery.min.js?ver=3.3.1"></script>
	<script src="assets/js/wp-jquery/jquery.migrate.min.js?ver=1.4.1"></script>
	<!-- Vendor  end -->
	
	<!-- Compatibility
	============================================= -->
	<script src="assets/js/min/modernizr.min.js?ver=3.5.0"></script>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<!-- Compatibility  end -->
	
	<!-- Core & Theme CSS
	============================================= -->
	<!-- Basic  -->
	<link rel="stylesheet" href="assets/css/bootstrap.min.css?ver=4.2.1" media="all" />
	<link rel="stylesheet" href="assets/css/video.min.css?ver=7.4.1" media="all" />
	<!-- Icons  -->
	<link rel="stylesheet" href="assets/fonts/fontawesome/css/all.min.css?ver=5.7.0">
	<link rel="stylesheet" href="assets/fonts/fontawesome/css/v4-shims.min.css?ver=5.7.0">
	<!-- Theme  -->
	<link rel="stylesheet" href="../dist/css/uix-kit.min.css?ver=1.0.0" media="all" />
	<!--[if lt IE 10]>
           <link rel="stylesheet" href="assets/css/IE.css?ver=1.0.0" media="all" />
        <![endif]-->
	<!-- Core & Theme CSS  end -->
	
	<!-- Break free from CSS prefix hell!
	============================================= -->
	<script src="assets/js/min/prefixfree.min.js?ver=1.0.7"></script>
</head>

<body> 
	
	{your_html_codes_here}
	
	
	<!-- Vendor -->
	<script src="assets/js/min/jquery.easing.min.js?ver=1.3"></script>
	<script src="assets/js/min/jquery.waitforimages.min.js?ver=1.0"></script>
	<script src="assets/js/min/video.min.js?ver=7.4.1"></script>
	<script src="assets/js/min/jquery.waypoints.min.js?ver=4.0.1"></script>
	<script src="assets/js/min/template7.min.js?ver=1.2.5"></script>
	<script src="assets/js/min/TweenMax.min.js?ver=2.0.2"></script>
	<script src="assets/js/min/pixi.min.js?ver=4.8.4"></script>
	<script src="assets/js/min/three.min.js?ver=r99"></script>
	<script src="assets/js/min/anime.min.js?ver=2.2.0"></script>
	<script src="assets/js/min/hammer.min.js?ver=2.0.8"></script>
	<script src="assets/js/min/muuri.min.js?ver=0.7.1"></script>

	<!-- Your Plugins & Theme Scripts
	============================================= -->
	<script>
	var REVISION = "1.0.0",
	APP_ROOTPATH = {
		"templateUrl": "", //If the file is in the root directory, you can leave it empty. If in another directory, you can write: "/blog"
		"homeUrl": "", //Eg. https://uiux.cc
	"ajaxUrl": "" //Eg. https://uiux.cc/wp-admin/admin-ajax.php
	};
	</script>
	<script src="../dist/js/uix-kit.min.js?ver=1.0.0"></script>
	
</body>

</html>

```


### 2\. File Structures


```sh

uix-kit/
├── README.md   --------------------------- # Main Documentation
├── CHANGELOG.md   ------------------------ # Changelog
├── CONTRIBUTING.md   --------------------- # External resource references
├── LICENSE     --------------------------- # License
├── webpack.config.js  -------------------- # Webpack scaffold configuration file
├── package.json  ------------------------- # Project configuration file (site info can be modified here)
├── package-lock.json
├── dist/
│   ├── css/
│   │   ├── uix-kit.css  ------------------ # Main css file
│   │   ├── uix-kit.css.map
│   │   ├── uix-kit.min.css  -------------- # Main css file which is used for production
│   │   ├── uix-kit.min.css.map
│   │   ├── uix-kit-rtl.css   ------------- # Main RTL css file
│   │   ├── uix-kit-rtl.css.map
│   │   ├── uix-kit-rtl.min.css   --------- # Main RTL css file which is used for production
│   │   └── uix-kit-rtl.min.css.map
│   └── js/
│   │   ├── uix-kit.js   ------------------ # Main js file
│   │   ├── uix-kit.js.map
│   │   ├── uix-kit.min.js  --------------- # Main js file which is used for production
│   │   ├── uix-kit.min.js.map
│   │   ├── uix-kit-rtl.js
│   │   ├── uix-kit-rtl.js.map
│   │   ├── uix-kit-rtl.min.js
│   │   └── uix-kit-rtl.min.js.map
├── misc/                
│   ├── screenshots/  --------------------- # Screenshots
│   └── grid/ ----------------------------- # PSD grid system
├── src/
│   ├── components/
│   │   ├── ES5/  ------------------------- # Third-party plugins adopt pure file merger and do not import and export
│   │   ├── ES6/_app-load.js  ------------- # Import your modules to be used
│   │   ├── ES6/_app-load-rtl.js  --------- # Import your RTL modules to be used
│   │   ├── ES6/_global/ ------------------ # Generic modules
│   │   ├── ES6/_main/  ------------------- # Customization site file directory (for secondary or new website development)
│   │   └── ES6/*/  ----------------------- # Core functional modules
├── examples/                                
│   ├── *.html  --------------------------- # HTML templates
│   └── assets/  -------------------------- # Static resource directory
│   │       ├── css/
│   │       ├── fonts/
│   │       ├── images/
│   │       ├── videos/
│   │       ├── models/
│   │       ├── json/
│   │       └── js/
└──
```



### 3\. PSD Grid Templates

You can download the corresponding .PSD grid files.

*   `misc/grid/bootstrap3_1170_grid_web.psd` (Default Container: 1170px)
*   `misc/grid/bootstrap3_1278_grid_web.psd` (XL Container: 1278px)
*   `misc/grid/bootstrap3_1410_grid_web.psd` (XXL Container: 1410px)



## How to Create a Custom Module

Assuming you are in your application's root directory and want to create components inside `src/components/ES6/` as you show above. You can create a new directory and name it **demo-module**. 

&#128071;&#128071;&#128071;


Here’s a sample custom module directory structure, I’ve included some examples of files that would sit inside of each folder:


```sh

uix-kit/
├── src/
│   ├── components/
│   │   └── ES6/
│   │       ├── _app-load.js
│   │       ├── _app-load-rtl.js
│   │       └── demo-module/
│   │                ├── scss/*.scss
│   │                ├── scss-rtl/*.scss
│   │                ├── js/*.js
│   │                └── *.html
└──
```


**Step 1.** Inside that folder create two sub folders: `/scss` and `/js`. If you need to support RTL, create another `/scss-rtl`.


**Step 2.** Create a SASS/SCSS file. Go into the `src/components/ES6/demo-module/scss/` folder and create a file called: `_style.scss`. Please import global variables or functions. Here's an example:

```sh
/* ====================================================== 
   <!-- Demo Module Stylesheets --> 
/* ====================================================== */
@import '@uixkit/core/_global/scss/_variable-and-mixin.scss';

.app-demo {
	font-size: $basic-font-size;
    text-align: left;
}
```

**Step 2-2 (Optional).** Alright, so if you need to support RTL. You need create a new SASS/SCSS file. Go into the `src/components/ES6/demo-module/scss-rtl/` folder and create a file called: `_style.scss`. Like this:

```sh
/* ====================================================== 
   <!-- Demo Module Stylesheets --> 
/* ====================================================== */
@import '@uixkit/core/_global/scss/_variable-and-mixin.scss';

.app-demo {
    text-align: right;
}
```


**Step 3.** Create a JS file. Go into the `src/components/ES6/demo-module/js/` folder and create a file called: `index.js`. In order to make it work we need to import the global variables or functions in file index.js. 

Simultaneously, Now you’re ready to import your Stylesheets to use with this component. Import SASS/SCSS file in `src/components/ES6/demo-module/js/index.js`.

Like this:.

```sh
/* 
 *************************************
 * <!-- Demo Module Scripts  -->
 *************************************
 */
import {
    templateUrl,
    homeUrl,
    ajaxUrl,
    browser,
    UixModuleInstance,
    UixGUID,
    UixMath,
    UixCssProperty
} from '@uixkit/core/_global/js';

import '../scss/_style.scss';

export const DEMO_MODULE = ( ( module, $, window, document ) => {
	if ( window.DEMO_MODULE === null ) return false;

    module.DEMO_MODULE               = module.DEMO_MODULE || {};
    module.DEMO_MODULE.version       = '0.0.1';
    
    
    // executes when HTML-Document is loaded and DOM is ready
    module.DEMO_MODULE.documentReady = function( $ ) {
		/* 
		 ---------------------------
		 Function Name
		 ---------------------------
		 */ 
		// your code here...
	
    };
    module.components.documentReady.push( module.DEMO_MODULE.documentReady );
	
    
    
    // executes when complete page is fully loaded, including all frames, objects and images
    module.DEMO_MODULE.pageLoaded    = function() {
		/* 
		 ---------------------------
		 Function Name
		 ---------------------------
		 */ 
		 // your code here...
		
    };
    module.components.pageLoaded.push( module.DEMO_MODULE.pageLoaded );	


	return class DEMO_MODULE {
		constructor() {
			this.module = module;
		}
	};
})( UixModuleInstance, jQuery, window, document );

```



**Step 4.** So far, to dynamically import the module you just created in `src/components/ES6/_app-load.js`.  The simplest version directly imports the default:


```sh
import DEMO_MODULE from '@uixkit/core/demo-module/js';
```


**Step 4-2  (Optional).** If you need to support RTL, in `src/components/ES6/_app-load-rtl.js`.  like this:


```sh
import '@uixkit/core/demo-module/scss-rtl/_style.scss';
```

These RTL modules do not need JavaScript.


**Step 5 (Optional).** You could also create an HTML file to run the demo of this module separately, all HTML files will be automatically exported into the directory `examples/`. The demo code of the HTML file is as follows:


```sh
<!DOCTYPE html>
<html lang="@@{website_lang}" dir="@@{website_dirLTR}">
<head>
	<meta charset="@@{website_charset}" />
	<title>Demo Module - @@{website_title}</title>	
	@@include('./src/components/ES6/_global/include-header.html')
</head>  
<body class="page">
     
    @@include('./src/components/ES6/_global/include-loader.html')
    @@include('./src/components/ES6/_global/include-toggle-trigger.html')
 
    <div class="uix-wrapper">
        <!-- Header Area
        ============================================= -->      
        <header class="uix-header__container">
             <div class="uix-header">
                 <div class="container">
                        @@include('./src/components/ES6/_global/include-brand.html')
                        @@include('./src/components/ES6/_global/include-menu.html')
                  </div>
                  <!-- .container end -->
                  
                  <div class="uix-clearfix"></div>
             </div>
        
        </header>
        <div class="uix-header__placeholder js-uix-header__placeholder-autoheight"></div>
    
		<main id="uix-maincontent">
			<!-- Content   
			====================================================== -->
			<section class="uix-spacing--s uix-spacing--no-bottom">
				<div class="container">
					<div class="row">
						<div class="col-12">
							<h3>Demo Module</h3>
							<hr>
						</div>
					</div>
				</div>
			</section>
			
		   <!-- Content  
			====================================================== -->
			<section class="uix-spacing--s">
				<div class="container uix-t-c">
                    <div class="row">
                        <div class="col-12">
                            ...
                        </div>
                    </div>
				</div>
			</section>   
		</main> 
        
        @@include('./src/components/ES6/_global/include-copyright.html')
        
    </div>
    <!-- .uix-wrapper end -->
        
    @@include('./src/components/ES6/_global/include-footer.html')
```

**Note &#128161;:** You could call a specified module script which is commonly used for callbacks of AJAX Response from Asynchronous method. The demo code is here:

```sh
import { UixModuleInstance } from '@uixkit/core/_global/js';

if ( UixModuleInstance.DEMO_MODULE ) UixModuleInstance.DEMO_MODULE.pageLoaded();
if ( UixModuleInstance.DEMO_MODULE ) UixModuleInstance.DEMO_MODULE.documentReady($);
```



**Since Uix Kit is not a JavaScript framework, you could use any third-party libraries to build your custom module styles and animation scripts in the most intuitive way.**





## Contributing

Finding bugs, sending pull requests or improving our docs - any contribution is welcome and highly appreciated. To get started, head over to our [contribution guidelines](CONTRIBUTING.md). Thanks!


## Changelog

[releases](CHANGELOG.md)



## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | iOS  | Android
--- | --- | --- | --- | --- | --- | --- | --- |
45+ ✔ | 38+ ✔ | 12+ ✔ | 9+ ✔ | 9.1+ ✔ | 30+ ✔ | 10+ ✔ | 4.4+ ✔ |



## Licensing

Licensed under the [MIT](https://opensource.org/licenses/MIT).



## Buy Me a Coffee
Donations would be more than welcome :)

[![Donate](https://www.paypalobjects.com/en_US/GB/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PYZLU7UZNQ6CE)

