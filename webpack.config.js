'use strict';

const webpack                    = require('webpack');
const express                    = require('express');
const fs                         = require('fs');
const path                       = require('path');
const UglifyJsPlugin             = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin       = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin    = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin         = require('clean-webpack-plugin');
const glob                       = require('glob');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');
const randomString               = require('random-string');
const IncludeFileWebpackPlugin   = require('include-file-webpack-plugin');
const moment                     = require('moment');
const WebpackDevServer           = require('webpack-dev-server');
const json                       = JSON.parse(fs.readFileSync('./package.json'));
const webpackDevMiddleware       = require('webpack-dev-middleware');
const ConcatPlugin               = require('webpack-concat-plugin');
const minify                     = require('@node-minify/core');
const uglifyJS                   = require('@node-minify/uglify-js');


let globs = {
	port         : 8080,
	examples     : 'examples',
	build        : 'src',
	dist         : 'dist',
	notES6JS     : 'uix-kit.not-es6.dev.js' //This file is used for the mergence of JS script files that do not require ES6 compilation.
};



/*! 
 *************************************
 * Site Info
 *************************************
 */

let customWebsiteVersion     = json.version,
	customWebsiteAuthor      = json.author,
	customWebsiteTitle       = 'Uix Kit Demo',
	customWebsiteDesc        = 'Free Responsive HTML5 UI Kit for Fast Web Design Based On Bootstrap v4.',
	customWebsiteCanonical   = '<link rel="canonical" href="https://uiux.cc" />',
	customWebsiteGenerator   = 'Uix Kit',
	customWebsiteHash        = randomString({length: 20}),
	customWebsiteComment     = `
## Project Name        :  ` + customWebsiteTitle + `
## Project Description :  ` + customWebsiteDesc + `
## Version             :  ` + customWebsiteVersion + `
## Based on            :  Uix Kit (https://github.com/xizon/uix-kit)
## Last Update         :  ` + moment().format( "MMMM D, YYYY" ) + `
## Created by          :  UIUX Lab (https://uiux.cc)
## Contact Us          :  uiuxlab@gmail.com
## Released under the MIT license.
	`;


// Get all the HTML template files

let tempPages = glob.sync( './'+globs.build+'/components/**/*.html' );
let targetTempFilesName = [];
let targetAllTempFilesName = [];

tempPages.map( ( event ) => {
	let filename = event.split( '/' ).pop();
	
	targetAllTempFilesName.push( [ event, event.split( '/' ).pop() ] );
	
	if ( filename.indexOf( 'include-' ) < 0 ) {
		targetTempFilesName.push( [ event, event.split( '/' ).pop() ] );
	}
	
});



// Get all the js component files

let targetJSComFilesName = '';
let JSComFiles = './'+globs.build+'/components/_global/js/_all.js';
if ( fs.existsSync( JSComFiles ) ) {

	let content = fs.readFileSync( JSComFiles );
	let curCon  = content
						.toString()
						.replace(/\'/g, '"' )
						.replace(/\s/g, '' )
						.replace(/[\r\n]/g, '' )
						.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '' );


	let filesJSON = curCon.match(/UIX_KIT_IMPORT\=\{.*?(?:\}|\})/gi );
	filesJSON = filesJSON[0].replace( 'UIX_KIT_IMPORT=', '' );
	filesJSON = JSON.parse( filesJSON );

	targetJSComFilesName = filesJSON.files;	


}

//console.log( targetJSComFilesName );


/*! 
 *************************************
 *  Main configuration
 *************************************
 */
const webpackConfig = {
	devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : false,
    mode: 'production',
	watch: true,
	node: { fs: 'empty' },
    resolve: {
        extensions: ['.js', '.es6', '.vue', '.jsx' ]
    },
	entry: {
		'uix-kit': './'+globs.build+'/index.js',
		'uix-kit.min': './'+globs.build+'/index.js',
		'uix-kit-rtl': './'+globs.build+'/index-rtl.js',
		'uix-kit-rtl.min': './'+globs.build+'/index-rtl.js',
	},
    output: {
        path: path.resolve(__dirname, './' + globs.dist ),
        filename: '[name].js',
    },

	optimization: {
	    minimizer: [

			new UglifyJsPlugin({
				sourceMap: true,
				test: /\.min\.js$/i,
			}),
			
			new MiniCssExtractPlugin({
				// Options similar to the same options in webpackOptions.output
				// both options are optional
				filename: "[name].css",
				chunkFilename: "[id].css"
			}),
			new OptimizeCssAssetsPlugin({
				assetNameRegExp: /\.min\.css$/g,
				cssProcessorPluginOptions: {
				    preset: ['default', { discardComments: { removeAll: false } }],
				},
				canPrint: true
			}),
	
		],
		
	},
    module: {
        rules: [
			{
				test: /\.json$/,
				use: 'json-loader'
			},
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: path.resolve( __dirname, 'node_modules' ),
                query: {  
				  'presets': [
					  '@babel/preset-env', 
					  '@babel/preset-react'
				  ]
                }
			},
			{
				
				test: /\.(sa|sc|c)ss$/,
				include: path.resolve( __dirname, './' + globs.build ),
				use: [

					// fallback to style-loader in development
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							// you can specify a publicPath here
							// by default it use publicPath in webpackOptions.output
							publicPath: path.resolve(__dirname, './' + globs.dist )
						}
					},
					'css-loader',
					'sass-loader',

					
				]
			},
			
			{
				test: /\.html$/,
				use: [ 
					{
						loader: 'html-loader',
						options: {
							minimize: false,
							removeComments: false,
							collapseWhitespace: false
						}
					}
				]
			},
			
		
			/*
			{
				test: /\.scss$/,
				loader: 'prettier-loader',
				// force this loader to run first if it's not first in loaders list
				enforce: 'pre',
				// avoid running prettier on all the files!
				// use it only on your source code and not on dependencies!
				options: {
					'parser': 'postcss',
					// additional prettier options assigned to options in
					// - .prettierrc,
					// - prettier.config.js,
					// - "prettier" property in package.json
					'printWidth': 120,    
					'tabWidth': 4,
					'semi': true,           
					'singleQuote': true,   
					'trailingComma': 'none', 
					'bracketSpacing': true,
					'jsxBracketSameLine': false, 
					'arrowParens': 'avoid', 
					'requirePragma': false, 
					'proseWrap': 'preserve' 
					
				},
			},	
			*/
			
	
			
        ],
		
		

    },
	plugins: [
		
	]
	
	
};

/*! 
 *************************************
 *  Remove include files and extra CSS files
 *************************************
 */
webpackConfig.plugins.push(
    new CleanWebpackPlugin([
		globs.build + '/**/*.css',
		globs.examples + '/*.html',
		
	]),
	
	new webpack.BannerPlugin( customWebsiteComment ),
	
);

/*! 
 *************************************
 *  Batch processing HTML template files
 *************************************
 */
targetTempFilesName.map( ( event ) => {
	
	webpackConfig.plugins.push(
		
		new IncludeFileWebpackPlugin({
			directory: '',
			input: `${event[0]}`,
			output: `./${globs.examples}/${event[1]}`,
			processIncludeContents: function(html) {
				return html;
			}
		}),	
		
		new ReplaceInFileWebpackPlugin([
			{
				dir: globs.examples,
				files: [ event[1], event[1] ],
				rules: [
					{ search: '@@{website_title}', replace: customWebsiteTitle },
					{ search: '@@{website_desc}', replace: customWebsiteDesc },
					{ search: '@@{website_canonical}', replace: customWebsiteCanonical },
					{ search: '@@{website_author}', replace: customWebsiteAuthor },
					{ search: '@@{website_generator}', replace: customWebsiteGenerator },
					{ search: '@@{website_version}', replace: customWebsiteVersion },
					{ search: '@@{website_comment}', replace: customWebsiteComment },
					{ search: '@@{website_hash}', replace: customWebsiteHash },

				]
			}
		]),	
		
		
	);
});

/*! 
 *************************************
 *  Add .min.css files souce map
 *************************************
 */
webpackConfig.plugins.push(
	new webpack.SourceMapDevToolPlugin({
	  filename: '[name].css.map',
	}),

);


/*! 
 *************************************
 * Merge all js files
 *
 * This file is used for the mergence of JS script files that do 
 * not require ES6 compilation.
 *************************************
 */
webpackConfig.plugins.push(
	
	new ConcatPlugin({
		uglify: false,
		sourceMap: true,
		name: 'result',
		outputPath: '',
		fileName: globs.notES6JS,
		filesToConcat: targetJSComFilesName,
		attributes: {
			async: true
		}
	}),

);




/*! 
 *************************************
 *  Hook our plugins to fix webpack dev server is not serving the latest compiled code
 *************************************
 */
const compiler = webpack( webpackConfig );
const app = express();
const instance = webpackDevMiddleware( compiler );
app.use( instance );


//Watch for Files Changes in Node.js
require('log-timestamp');

targetAllTempFilesName.map( ( event ) => {
	
	let htmlTempFiles = `${event[0]}`;

	fs.watchFile( htmlTempFiles, (curr, prev) => {
	    console.log(`${htmlTempFiles} file Changed`);
		
		// After a short delay the configuration is changed and a banner plugin is added
		// to the config
		compiler.apply(

			new CleanWebpackPlugin([
				globs.build + '/**/*.css'
			])

		);


		targetTempFilesName.map( ( event ) => {

			compiler.apply(

				new IncludeFileWebpackPlugin({
					directory: '',
					input: `${event[0]}`,
					output: `./${globs.examples}/${event[1]}`,
					processIncludeContents: function(html) {
						return html;
					}
				}),

				new ReplaceInFileWebpackPlugin([
					{
						dir: globs.examples,
						files: [ event[1], event[1] ],
						rules: [
							{ search: '@@{website_title}', replace: customWebsiteTitle },
							{ search: '@@{website_desc}', replace: customWebsiteDesc },
							{ search: '@@{website_canonical}', replace: customWebsiteCanonical },
							{ search: '@@{website_author}', replace: customWebsiteAuthor },
							{ search: '@@{website_generator}', replace: customWebsiteGenerator },
							{ search: '@@{website_version}', replace: customWebsiteVersion },
							{ search: '@@{website_comment}', replace: customWebsiteComment },
							{ search: '@@{website_hash}', replace: customWebsiteHash },

						]
					}
				])



			);



		});

		// Recompile the bundle with plugins:
		instance.invalidate();	
	});
	
});


targetJSComFilesName.map( ( event ) => {
	
	let jsTempFiles = `${event[0]}`;

	fs.watchFile( jsTempFiles, (curr, prev) => {
	    console.log(`${jsTempFiles} file Changed`);
		
		// After a short delay the configuration is changed and a banner plugin is added
		// to the config
		compiler.apply(

			new ConcatPlugin({
				uglify: false,
				sourceMap: true,
				name: 'result',
				outputPath: '',
				fileName: globs.notES6JS,
				filesToConcat: targetJSComFilesName,
				attributes: {
					async: true
				}
			})


		);


		// Recompile the bundle with plugins:
		instance.invalidate();	
	});
	
});


/*! 
 *************************************
 *  Listen the server
 *************************************
 */

const server = new WebpackDevServer( compiler, {
					contentBase: [
						path.resolve(__dirname, './' )
					],
	                hot: true,
					watchContentBase: true,
	
				});

server.listen( globs.port, "localhost", function (err, result) {
	if (err) {
	    return console.log(err);
	}


	console.log('Listening at http://localhost:8080/');
})


/*! 
 *************************************
 *  Merge all js files & Build a table of contents (TOC)
 *************************************
 */

compiler.plugin( 'done', () => { 
	
	
	let mainJSFile      = './'+globs.dist+'/' + globs.notES6JS,
		targetJSFile    = './'+globs.dist+'/uix-kit.js',
		targetJSMinFile = './'+globs.dist+'/uix-kit.min.js';
	
	
	setTimeout ( () => {
		
		// Build a table of contents (TOC)
		['./'+globs.dist+'/uix-kit.css', './'+globs.dist+'/uix-kit-rtl.css', './'+globs.dist+'/' + globs.notES6JS].map( ( filepath ) => {

			if ( fs.existsSync( filepath ) ) {

				fs.readFile( filepath, function( err, content ) {

					if ( err ) throw err;

					let curCon  = content.toString(),
						newtext = curCon.match(/<\!\-\-.*?(?:>|\-\-\/>)/gi );


					//is the matched group if found
					if ( newtext && newtext.length > 1 ) {  

						let curToc = '';

						for ( var p = 0; p < newtext.length; p++ ) {

							let curIndex = p + 1,
								newStr   = newtext[ p ].replace( '<!--', '' ).replace( '-->', '' ).replace(/^\s+|\s+$/g, '' );

							if ( p > 0 ) {
								curToc += '    ' + curIndex + '.' + newStr + '\n';
							} else {
								curToc +=  curIndex + '.' + newStr + '\n';
							}

						}

						//Replace a string in a file with nodejs
						var result = curCon.replace(/\$\{\{TOC\}\}/gi, curToc );

						fs.writeFile( filepath, result, 'utf8', function (err) {
							console.log( filepath + ' \'s table of contents generated successfully!' );
							if (err) return console.log(err);
						});


					}


				});			


			}


		});	
		
		
	}, 1000 );

	setTimeout ( () => {
		
		
		//merge all js files

		let oldContent = '';
		
		if ( fs.existsSync( mainJSFile ) ) {
			fs.readFile( mainJSFile, function(err, data ){

				if (err) throw err;
				
				let oldContent = data;
				
				//Update the normal js file
				fs.appendFile( targetJSFile, oldContent, 'utf8', function (err) {

					console.log( targetJSFile + ' file written successfully!' );

					
					//Update the compressed js file
					minify({
						compressor: uglifyJS,
						input: targetJSFile,
						output: targetJSMinFile,
						callback: function(err, min) {
						    console.log( targetJSMinFile + ' file written successfully!' );
						}
					});
					
					if (err) {
						console.error(err);
						return;
					}
				});

			});	
		}
	
	}, 1100 );	
	
	

});
									
									
/*! 
 *************************************
 *  Exporting webpack module
 *************************************
 */
module.exports = webpackConfig;


