<p align="center">
  <a href="https://github.com/xizon/uix-kit">
	  <img src="https://raw.githubusercontent.com/xizon/uix-kit/master/misc/screenshots/logo-colorful.png"  alt="Uix Kit"  width="180" >
  </a>
</p>

  <p align="center">超过<strong>120+</strong>基础模块，快速搭建你的响应式网站!</p>
  <p align="center">
      <a href="https://travis-ci.org/xizon/uix-kit/" title="Travis CI"><img src="https://img.shields.io/travis/xizon/uix-kit/master?style=for-the-badge"/></a>
      <a href="https://validator.w3.org/nu/?doc=https%3A%2F%2Fxizon.github.io%2Fuix-kit%2Fexamples%2F" title="w3c"><img src="https://img.shields.io/w3c-validation/html?style=for-the-badge&targetUrl=https%3A%2F%2Fxizon.github.io%2Fuix-kit%2Fexamples%2F"/></a>
	  <a href="https://www.npmjs.com/package/uix-kit" title="npm version"><img src="https://img.shields.io/npm/v/uix-kit?style=for-the-badge"/></a>
	  <a href="https://github.com/xizon/uix-kit/blob/master/LICENSE" title="license"><img src="https://img.shields.io/badge/license-MIT-brightgreen.svg?style=for-the-badge"/></a>
	   
  </p>

Uix Kit是一个偏视觉交互的开发工具包，帮助开发者快速完成一套完整的交互型网站。**它不是一个框架**，所有的模块脚本和样式，全部由你掌控！


这是一个不依赖任何框架的Web开发构建工具/脚手架。 您可以导入任何外部库、框架或本机ES模块进行生产。 dist目录中生成的核心文件可以在任何网站中单独使用。

---

- [English Documentation](README.md)
- [中文版说明文档](README_CN.md)

---

## 演示

[https://xizon.github.io/uix-kit/examples/](https://xizon.github.io/uix-kit/examples/)

GitHub pages只提供静态内容访问，AJAX和PHP请求无法预览效果，你可以通过线上服务器进行完整预览。

[https://uiux.cc/uix-kit](https://uiux.cc/uix-kit) 


## 为何使用它？

* 它不是可重用的组件结构
* 它不是一个JavaScript框架
* 它是一个基于Webpack的开发环境的工具箱
* 您可以用最喜欢的方式使用任意JavaScript库来构建样式和动画脚本
* 适用于开发视觉交互类型的网站和WordPress模板
* 遵循W3C标准和SEO优化
* 使用BEM命名，因此核心Uix Kit项目不会与其他项目冲突
* 自动为每个模块的名称注释生成目录
* 每个模块均包含SASS/SCSS，JavaScript和HTML文件
* 为React架构提供开发环境配置
* 与Bootstrap 4.x兼容
* 提供常见的网页组件和布局，提高开发效率和页面质量标准
* 使用ES6导入或导出多个模块，第三方插件可以采用纯文件合并的方式不进行导入和导出
* 完整的示例目录可以在没有Node.js开发环境的情况下独立开发响应式网站



## 核心目录结构:


```sh

uix-kit/
├── README.md   --------------------------- # 主要文档
├── CHANGELOG.md   ------------------------ # 更新日志
├── CONTRIBUTING.md   --------------------- # 引用资源
├── LICENSE     --------------------------- # 许可证
├── webpack.config.js  -------------------- # webpack脚手架配置
├── package.json  ------------------------- # 项目配置文件【网站编译生成的注释信息可以在此修改】
├── package-lock.json
├── dist/
│   ├── css/
│   │   ├── uix-kit.css  ------------------ # 网站核心样式（已编译）
│   │   ├── uix-kit.css.map
│   │   ├── uix-kit.min.css  -------------- # 网站核心样式压缩版，默认产品调用（已编译）
│   │   ├── uix-kit.min.css.map
│   │   ├── uix-kit-rtl.css   ------------- # 网站核心RTL样式（已编译）
│   │   ├── uix-kit-rtl.css.map
│   │   ├── uix-kit-rtl.min.css   --------- # 网站核心RTL样式压缩版，默认产品调用（已编译）
│   │   └── uix-kit-rtl.min.css.map
│   └── js/
│   │   ├── uix-kit.js   ------------------ # 网站核心脚本（已编译）
│   │   ├── uix-kit.js.map
│   │   ├── uix-kit.min.js  --------------- # 网站核心样式压缩版，默认产品调用（已编译）
│   │   ├── uix-kit.min.js.map
│   │   ├── uix-kit-rtl.js
│   │   ├── uix-kit-rtl.js.map
│   │   ├── uix-kit-rtl.min.js
│   │   └── uix-kit-rtl.min.js.map
├── misc/                
│   ├── screenshots/  --------------------- # 截图
│   └── grid/ ----------------------------- # PSD版本网格系统，辅助UI设计
├── src/
│   ├── components/
│   │   ├── _app-load.js  ------------- # 网站需要使用的模块导入入口文件
│   │   ├── _app-load-rtl.js  --------- # 网站需要使用的RTL模块导入入口文件
│   │   ├── _global/ ------------------ # 网站通用代码模块
│   │   ├── _main/  ------------------- # 网站定制化文件目录【用于二次开发或者新网站开发。网站新的HTML模板和其它样式脚本可以直接放到此文件夹】
│   │   ├── _third-party-plugins/  ---- # 第三方插件
│   │   └── */  ----------------------- # 网站通用功能模块【一般不需要去修改它们，可以根据情况修改其样式和脚本】
├── examples/                                
│   ├── *.html  --------------------------- # 编译后的纯HTML模板，用于后端整合或者演示
│   └── assets/  -------------------------- # 静态资源目录
│   │       ├── css/
│   │       ├── fonts/
│   │       ├── images/
│   │       ├── videos/
│   │       ├── models/
│   │       ├── json/
│   │       └── js/
└──
```


## 开发者基本操作:


1. 配置你电脑的Node.js环境

2. 下载完资源后，进入到 `uix-kit` 目录下，运行 `npm run build`, 进入开发模式

3. 当你需要配置脚手架和网站基础信息和结构的时候，请直接编辑 `package.json` 文件。

4. 网站的定制化模块功能在 `src/components/_global` 和 `src/components/_main` 中，`src/components/*` 其它模块是通用型的功能模块。HTML文件将会自动打包生成到 `examples/` 文件夹中，核心JavaScript和CSS文件会自动打包到 `dist/` 文件夹里

不建议跳过开发模式直接修改examples/ 文件夹里的文件，因为代码量非常大，很难去维护和定制各种动画、交互、结构。



## 命令使用方法:


![quick overview 1](https://raw.githubusercontent.com/xizon/uix-kit/master/misc/screenshots/quick-overview-1.gif)

![quick overview 2](https://raw.githubusercontent.com/xizon/uix-kit/master/misc/screenshots/quick-overview-2.gif)


**Step 1.** 使用命令进入 `uix-kit/` 目录, {your_directory}换成你的目录路径

```sh
$ cd /{your_directory}/uix-kit
```


**Step 2.** 如果没有`node_modules`文件夹，则需要运行下面的代码来安装开发环境

```sh
$ sudo npm install --only=dev --unsafe-perm --production
```


**Step 3.** 运行下面的代码来实时开发项目，修改模块功能

```sh
$ npm run build
```

**Step 4.** 可以使用下面的网址来访问，建议使用本地服务器来访问，因为下面的网址是静态访问，不会执行AJAX请求，一些模块需要异步来测试效果

```sh
http://localhost:8080/examples/
```


### FAQ:
 
 **a) ERROR: npm update check failed.**
 
如果出现如上错误，表示nodejs的环境或权限问题，可以使用下面的命令解决，注意把{username}换成你自己的设备里的名字。

```sh
$ sudo chown -R $USER:$(id -gn $USER) /Users/{username}/.config
```

**b) 如何使用模块?**

您可以在`src/components/_app-load.js` and `src/components/_app-load-rtl.js`中自定义要导入的模块。如果模块导入过多，因此您至少需要等待5.5秒（默认值，根据模块数量自动计算), 您可以根据需要导入相应的模块，在`webpack.config.js`中可以设置编译等待时间。


**c) 网站配置修改**

修改`package.json`文件即可：

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

**d) 如果升级Node版本，请执行以下代码:**

```sh
$ sudo npm install
$ sudo npm rebuild node-sass
```



## 如何创建一个新的自定义模块?

假设你下载的文件位于根目录中，并且想要在`src/components/`目录中创建模块。 您可以创建一个新目录并将其命名为**demo-module**。

&#128071;&#128071;&#128071;

这是一个自定义模块目录结构示例：


```sh

uix-kit/
├── src/
│   ├── components/
│   │     ├── _app-load.js
│   │     ├── _app-load-rtl.js
│   │     └── demo-module/
│   │              ├── scss/*.scss
│   │              ├── scss-rtl/*.scss
│   │              ├── js/*.js
│   │              └── *.html
└──
```


**Step 1.** 在新创建的目录中新建两个文件夹: `/scss` 和 `/js` 用来存放JS和CSS代码. 如果你需要网站支持RTL布局, 则再创建一个文件夹 `/scss-rtl`.


**Step 2.** 进入目录`src/components/demo-module/scss/`，创建一个SASS/SCSS文件并命名为: `_style.scss`. 记得在文件中导入全局变量和函数，下面是示例代码:

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

**Step 2-2 (可选的).** 当然，如果你还需要支持RTL布局.再创建另一个SASS/SCSS文件到目录 `src/components/demo-module/scss-rtl/` 中，同样命名为 `_style.scss`. 下面是示例代码:

```sh
/* ====================================================== 
   <!-- Demo Module Stylesheets --> 
/* ====================================================== */
@import '@uixkit/core/_global/scss/_variable-and-mixin.scss';

.app-demo {
    text-align: right;
}
```


**Step 3.** 进入目录`src/components/demo-module/js/` 创建一个JAVASCRIPT文件 `index.js`. 为了使其正确工作，需要导入网站全局变量和函数到 index.js 中. 

同时，你可以将SASS/SCSS文件一起导入到 `src/components/demo-module/js/index.js` 文件中，使样式生效.

代码如下:.

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
    
    
    // 页面打开时就开始执行
    module.DEMO_MODULE.documentReady = function( $ ) {
		/* 
		 ---------------------------
		 函数名
		 ---------------------------
		 */ 
		// 任意JS代码，可以使用任意第三方库，第三方库已经通过HTML来加载（当然你也可以修改webpack配置文件来直接导入第三方库）
	
    };
    module.components.documentReady.push( module.DEMO_MODULE.documentReady );
	
    
    
    // 等待页面中的图像等资源全部加载完成后才执行
    module.DEMO_MODULE.pageLoaded    = function() {
		/* 
		 ---------------------------
		 函数名
		 ---------------------------
		 */ 
		// 任意JS代码，可以使用任意第三方库，第三方库已经通过HTML来加载（当然你也可以修改webpack配置文件来直接导入第三方库）
		
    };
    module.components.pageLoaded.push( module.DEMO_MODULE.pageLoaded );	


	return class DEMO_MODULE {
		constructor() {
			this.module = module;
		}
	};
})( UixModuleInstance, jQuery, window, document );

```



**Step 4.** 最后，你还需要动态导入刚刚创建好的模块到 `src/components/_app-load.js` 文件中. 下面是示例代码:


```sh
import DEMO_MODULE from '@uixkit/core/demo-module/js';
```


**Step 4-2  (可选的).** 如果需要网站支持RTL布局, 再 `src/components/_app-load-rtl.js` 中导入样式即可:


```sh
import '@uixkit/core/demo-module/scss-rtl/_style.scss';
```

这些RTL模块都不需要JavaScript，因此只需要导入SASS/SCSS文件即可。（如果你想使用JS也未尝不可）


**Step 5 (可选的).** 您也可以创建一个HTML文件来单独运行此模块的演示，所有HTML文件将自动导出到目录`examples/`. HTML文件的演示代码如下：


```sh
<!DOCTYPE html>
<html lang="@@{website_lang}" dir="@@{website_dirLTR}">
<head>
	<meta charset="@@{website_charset}" />
	<title>模块标题 - @@{website_title}</title>	
	@@include('./src/components/_global/include-header.html')
</head>  
<body class="page">
     
    @@include('./src/components/_global/include-loader.html')
    @@include('./src/components/_global/include-toggle-trigger.html')
 
    <div class="uix-wrapper">
        <!-- Header Area
        ============================================= -->      
        <header class="uix-header__container">
             <div class="uix-header">
                 <div class="container">
                        @@include('./src/components/_global/include-brand.html')
                        @@include('./src/components/_global/include-menu.html')
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
							<h3>模块标题</h3>
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
        
        @@include('./src/components/_global/include-copyright.html')
        
    </div>
    <!-- .uix-wrapper end -->
        
    @@include('./src/components/_global/include-footer.html')
```


**提示 &#128161;:** 您可以调用指定的模块脚本，该脚本通常用于AJAX异步请求的回调。 演示代码在这里:

```sh
import { UixModuleInstance } from '@uixkit/core/_global/js';

if ( UixModuleInstance.DEMO_MODULE ) UixModuleInstance.DEMO_MODULE.pageLoaded();
if ( UixModuleInstance.DEMO_MODULE ) UixModuleInstance.DEMO_MODULE.documentReady($);
```


**由于Uix Kit不是JavaScript框架，因此您可以使用任何第三方库以最直观的方式构建自定义模块样式和动画脚本。**






