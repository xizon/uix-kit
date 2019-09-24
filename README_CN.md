<p align="center">
  <a href="https://github.com/xizon/uix-kit">
	  <img src="https://raw.githubusercontent.com/xizon/uix-kit/master/misc/screenshots/logo-colorful.png"  alt="Uix Kit"  width="180" >
  </a>
</p>

<center><strong>超过120+基础模块，快速搭建你的响应式网站!</strong></center>

Uix Kit是一个偏视觉交互的工具集合，它基于常用的脚本库，帮助开发者快速完成一套完整的交互型网站。**它不是一个框架**，所有的模块脚本和样式，全部由你掌控！

---

- [English Documentation](README.md)
- [中文版说明文档](README_CN.md)

---

## 演示

[https://xizon.github.io/uix-kit/examples/](https://xizon.github.io/uix-kit/examples/)

GitHub pages只提供静态内容访问，AJAX和PHP请求无法预览效果，你可以通过线上服务器进行完整预览。

[https://uiux.cc/uix-kit](https://uiux.cc/uix-kit) 


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
│   │   ├── ES5/  ------------------------- # 第三方插件(直接合并，不经过ES6的编译)
│   │   ├── ES6/_global ------------------- # 网站通用代码模块
│   │   ├── ES6/_main  -------------------- # 网站定制化文件目录【用于二次开发或者新网站开发。网站新的HTML模板和其它样式脚本可以直接放到此文件夹】
│   │   └── ES6/  ------------------------- # 网站通用功能模块【一般不需要去修改它们，可以根据情况修改其样式和脚本】
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

4. 网站的定制化模块功能在 `src/components/ES6/_global` 和 `src/components/ES6/_main` 中，`src/components/ES6/*` 其它模块是通用型的功能模块。HTML文件将会自动打包生成到 `examples/` 文件夹中，核心JavaScript和CSS文件会自动打包到 `dist/` 文件夹里

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

**Step 4.** 可以使用下面的网址来访问，建议使用本地服务器来访问，因为下面的网址是静态访问，不会执行ajax异步请求，一些网站需要异步来测试效果

```sh
http://localhost:8080/examples/
```


### FAQ:
 
如果出现nodejs的环境或权限问题，可以使用下面的命令解决，注意把{username}换成你自己的设备里的名字。

```sh
$ sudo chown -R $USER:$(id -gn $USER) /Users/{username}/.config
```

