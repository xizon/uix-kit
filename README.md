# Uix Kit


[![Travis CI](https://api.travis-ci.org/xizon/uix-kit.svg?branch=master)](https://travis-ci.org/xizon/uix-kit/)
[![npm version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&type=6&v=1.6.0&x2=0)](https://www.npmjs.com/package/uix-kit)
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](LICENSE)


<p align = "center">
    <img src="https://uiux.cc/uix-kit/assets/images/logo.png">
</p>

---


[Demo](https://uiux.cc/uix-kit) | [NPM](https://www.npmjs.com/package/uix-kit)



## Table of Contents


* [Getting Started](#getting-started)
* [Description](#description)
* [Installation And Test](#installation-and-test)
* [Structures](#structures)
* [Licensing](#licensing)
* [Contributing](#contributing)
* [Changelog](#changelog)
* [How To Use](#how-to-use)
* [Buy Me a Coffee](#buy-me-a-coffee)
* [Browser Support](#browser-support)


## Getting Started

[![How To Use Uix Kit?](https://github.com/xizon/uix-kit/tree/master/_screenshots/video-cover.jpg)](https://www.youtube.com/watch?v=ckYJBMfPtBs "How To Use Uix Kit? Tutorial")




## Description

Free Responsive HTML5 UI Kit for Fast Web Design Based On Bootstrap.

An underlying front-end system that makes it easy to extend and modify core files. This spec is a living document that will be updated as we continue to develop the tenets and specifics of Uix Kit. Support JS and CSS component( SCSS ) development with Gulp & Webpack together.

Enjoy the fluid grid system based on **12** columns. Uix Kit is built over Bootstrap and has all the benefits that the framework comes with. Regardless of the screen size, the website content will naturally fit the given resolution. Using the Uix Kit will save you large amount of time to build your projects.

* Supports 3D and 2D rendering with three.js and pixi.js.
* Automatically generate table of contents with Gulp for each module comment of name.
* Simple custom CSS and JS core files
* 100% Responsive & Mobile Ready
* Prepare some generic plug-ins in advance
* Support Chinese and English
* Core style sheet compatible with Bootstrap 3.x (Optimized reference to Bootstrap 4.x)
* Provides a common web page components and layouts
* Standard Code
* W3C Standard Support
* Support JS and CSS component( SCSS ) development with Gulp & Webpack together


* * *


## Installation And Test

**Step 1.** Use NPM (Locate your current directory of project, and enter the following command.) or download the latest version from [Github](https://github.com/xizon/uix-kit). For nodejs you have to install some dependencies.

```sh
$ npm install uix-kit
```

Or clone the repo to get all source files including build scripts: 

```sh
$ git clone git://github.com/xizon/uix-kit.git
$ cd uix-kit
```


**Step 2.** Before doing all dev stuff make sure you have node installed. After that, run the following code in the main directory to install the node module dependencies.

```sh
$ npm install --dev
```


**Step 3.** Run the following code to enter development mode.

```sh
$ gulp default
```

**Step 4.** When you done, please open the browser and enter the following URL to check out.

```sh
http://localhost:8080/examples/
```

**Step 5.** Directly edit the entries in the components folder in order to modify the core files. (E.g. `examples/assets/css/uix-kit.css`, `examples/assets/css/uix-kit.min.css`, `examples/assets/css/rtl/uix-kit-rtl.css`, `examples/assets/js/uix-kit.js`, `examples/assets/js/uix-kit.min.js` ).


> ### Components:
> 
> HTML/JS/CSS Components: `_components/*`  
> `00.global` and `01.index` are required components.


* * *


## Structures


### 1\. Custom Core Files

You can customize these files to meet the different needs of the site you want :-)

The `examples/assets-demo/` folder can be deleted.


#### File Structures:

```sh

uix-kit/
├── README.md
├── gulpfile.js
├── main.js
├── LICENSE
├── package-lock.json
├── package.json
├── docs/
├── _grid/
├── _screenshots/
├── _components/
│   ├── 00.global/
│   ├── 01.*/
│   └── 02.*/
├── examples/
│   ├── assets/
│   │       ├── css/
│   │       ├── fonts/
│   │       ├── images/
│   │       ├── videos/
│   │       ├── json/
│   │       └── js/
└──
```


#### Core CSS:

*   `examples/assets/css/uix-kit.css`
*   `examples/assets/css/uix-kit.min.css`
*   `examples/assets/css/uix-kit.IE.css`

#### Core CSS(RTL):

*   `examples/assets/css/rtl/uix-kit-rtl.css`

#### Core Javascript:

*   `examples/assets/js/uix-kit.js`
*   `examples/assets/js/uix-kit.min.js`

#### Core Images:

*   `examples/assets/images/*`

#### Core Fonts:

*   `examples/assets/fonts/*`


### 2\. PSD Grid Templates

You can download the corresponding .PSD grid files based on Bootstrap 3.x from the `_grid` folder.

*   `_grid/bootstrap3_1170_grid_web.psd` (Default Container: 1170px)
*   `_grid/bootstrap3_1278_grid_web.psd` (XL Container: 1278px)
*   `_grid/bootstrap3_1410_grid_web.psd` (XXL Container: 1410px)



## Licensing

Licensed under the [MIT](https://opensource.org/licenses/MIT).


## Contributing

Finding bugs, sending pull requests or improving our docs - any contribution is welcome and highly appreciated. To get started, head over to our [contribution guidelines](docs/contributing.md). Thanks!


## Changelog

[Check Out Here](docs/changelog.md)


## How To Use

How to use and quickly understand, please [check out the documentation](docs/getting-starded.md)


## Buy Me a Coffee
Donations would be more than welcome :)

[![Donate](https://www.paypalobjects.com/en_US/GB/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PYZLU7UZNQ6CE)


## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | iOS  | Android
--- | --- | --- | --- | --- | --- | --- | --- |
45+ ✔ | 38+ ✔ | 12+ ✔ | 9+ ✔ | 9.1+ ✔ | 30+ ✔ | 10+ ✔ | 4.4+ ✔ |

