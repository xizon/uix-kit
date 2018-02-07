# Uix Kit

[Demo Here](https://uiux.cc/uix-kit).


<a href="https://uiux.cc/uix-kit" target="_blank"><img src="https://github.com/xizon/uix-kit/blob/master/_screenshots/cover.jpg" width="300" height="300"></a>


## Description

Free Responsive HTML5 UI Kit for Fast Web Design Based On Bootstrap.

An underlying front-end system that makes it easy to extend and modify core files. This spec is a living document that will be updated as we continue to develop the tenets and specifics of Uix Kit. Support JS and CSS component( SCSS ) development with Gulp & Webpack together.

Enjoy the fluid grid system based on **12** columns. Uix Kit is built over Bootstrap and has all the benefits that the framework comes with. Regardless of the screen size, the website content will naturally fit the given resolution. Using the Uix Kit will save you large amount of time to build your projects.


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

**Step 1.** Use NPM `npm install uix-kit` or download the latest version from [Github](https://github.com/xizon/uix-kit/archive/master.zip). For nodejs you have to install some dependencies.

**Step 2.** Before doing all dev stuff make sure you have node installed. After that, run the following code in the main directory to install the node module dependencies.

```sh
`$ npm install --dev`
```


**Step 3.** Run the following code to enter development mode.

```sh
`$ gulp default`
```

**Step 4.** When you done, please open the browser and enter `http://localhost:8080/examples/` to check out.


> ### Entry Components:
> 
> HTML/JS/CSS Components: `_components/*`  
> `00.global` and `01.index` are required components.


* * *


### 1\. Custom Core Files

You can customize these files to meet the different needs of the site you want :-)

The `examples/assets-demo/` folder can be deleted.


#### File Structures:

```sh

uix-kit/
├── README.md
├── CHANGELOG.md
├── CONTRIBUTING.md
├── DOCUMENTATION.md
├── gulpfile.js
├── main.js
├── LICENSE
├── readme.txt
├── package-lock.json
├── package.json
├── _config.yml
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
│   │       └── js/
│   └── assets-demo/
│           ├── images/
│           ├── json/
│           └── videos/
	
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

Finding bugs, sending pull requests or improving our docs - any contribution is welcome and highly appreciated. To get started, head over to our [contribution guidelines](CONTRIBUTING.md). Thanks!


## Changelog

[Check Out Here](CHANGELOG.md)


## How To Use?

How to use and quickly understand, please [check out the documentation](DOCUMENTATION.md)




## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png)
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | 9+ ✔ | 9.1+ ✔ | Latest ✔ |




