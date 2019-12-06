<p align="center">
  <a href="https://github.com/xizon/uix-kit">
	  <img src="https://raw.githubusercontent.com/xizon/uix-kit/master/misc/screenshots/logo-colorful.png"  alt="Uix Kit"  width="180" >
  </a>
  <p align="center">Make over <strong>120+</strong> components to wear again and again!</p>
  <p align="center">
      <a href="https://travis-ci.org/xizon/uix-kit/" title="Travis CI"><img src="https://api.travis-ci.org/xizon/uix-kit.svg?branch=master"/></a>
	  <a href="https://www.npmjs.com/package/uix-kit" title="npm version"><img src="https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&type=6&v=4.0.1&x2=0"/></a>
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
* [Description](#description)
* [Installation And Test](#installation-and-test)
* [How To Use？](#how-to-use)
* [Contributing](#contributing)
* [Changelog](#changelog)
* [Browser Support](#browser-support)
* [Licensing](#licensing)
* [Buy Me a Coffee](#buy-me-a-coffee)



## Getting Started with Videos

[https://www.youtube.com/watch?v=aRDY9Cr-1-E](https://www.youtube.com/watch?v=aRDY9Cr-1-E)




## Key Features

* Supports 3D and 2D rendering with three.js and pixi.js.
* Using Sass to Control Scope With BEM Naming
* Automatically generate a table of contents for each module comment of the name.
* Simple custom CSS and JS core files
* 100% Responsive & Mobile Ready
* Prepare some generic plug-ins in advance
* Compatible with Bootstrap 4.x
* Provides a common web page components and layouts
* W3C Standard Support
* Support PJAX no refresh method for loading pages
* Support JS, HTML and SASS component library automatically packaged.
* Make a foundation for the React architecture.
* The core module adopts ES6 import and export, and the third-party plugins adopt pure file merger and do not import and export.


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
│   │   ├── ES6/_global ------------------- # Generic modules
│   │   ├── ES6/_main  -------------------- # Customization site file directory (for secondary or new website development)
│   │   └── ES6/*  ------------------------ # Core functional modules
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

