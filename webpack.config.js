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
const randomString               = require('random-string');
const IncludeFileWebpackPlugin   = require('include-file-webpack-plugin');
const moment                     = require('moment');
const WebpackDevServer           = require('webpack-dev-server');
const json                       = JSON.parse(fs.readFileSync('./package.json'));
const webpackDevMiddleware       = require('webpack-dev-middleware');
const ConcatPlugin               = require('webpack-concat-plugin');
const UglifyJS                   = require("uglify-js");
const colors = {
    Reset: "\x1b[0m",
    Bright: "\x1b[1m",
    Dim: "\x1b[2m",
    Underscore: "\x1b[4m",
    Blink: "\x1b[5m",
    Reverse: "\x1b[7m",
    Hidden: "\x1b[8m",
    fg: {
        Black: "\x1b[30m",
        Red: "\x1b[31m",
        Green: "\x1b[32m",
        Yellow: "\x1b[33m",
        Blue: "\x1b[34m",
        Magenta: "\x1b[35m",
        Cyan: "\x1b[36m",
        White: "\x1b[37m",
        Crimson: "\x1b[38m" //القرمزي
    },
    bg: {
        Black: "\x1b[40m",
        Red: "\x1b[41m",
        Green: "\x1b[42m",
        Yellow: "\x1b[43m",
        Blue: "\x1b[44m",
        Magenta: "\x1b[45m",
        Cyan: "\x1b[46m",
        White: "\x1b[47m",
        Crimson: "\x1b[48m"
    }
};

let globs = {
	port                  : 8080,
	examples              : 'examples',
	build                 : 'src',
	dist                  : 'dist',
	pathCore              : './src/components/ES6',
	pathThirdPartyPlugins : './src/components/ES5',
	concatES5_JSFile      : 'uix-kit.concat.es5.3rd-party-plugins.js' //This file is used for the mergence of JS script files that do not require ES6 compilation.
};


/*! 
 *************************************
 * Site Info
 *************************************
 */
let charset                  = 'utf-8';
let lang                     = 'en-US';
let dirLTR                   = 'ltr';
let dirRTL                   = 'rtl';
let customWebsiteVersion     = json.version,
	customWebsiteAuthor      = ( Object.prototype.toString.call( json.author ) == '[object Object]' ) ? json.author.name : json.author,
	customWebsiteTitle       = json.projectName,
	customWebsiteDesc        = json.description,
	customWebsiteGenerator   = 'Uix Kit',
	customWebsiteHash        = randomString({length: 20}),
	customWebsiteComment     = `
## Project Name        :  ` + customWebsiteTitle + `
## Project Description :  ` + customWebsiteDesc + `
## Project URL         :  ` + json.projectURL + `
## Version             :  ` + customWebsiteVersion + `
## Based on            :  Uix Kit (` + json.homepage + `)
## Last Update         :  ` + moment().format( "MMMM D, YYYY" ) + `
## Created by          :  ` + json.createdInfo + ( json.email != '' ? ' (' + json.email + ')' : '' ) + `
## Released under the ` + json.license + ` license.
	`;


// Get all the HTML template files
let tempPagesES5 = glob.sync( globs.pathThirdPartyPlugins + '/**/*.html' );
let tempPagesES6 = glob.sync( globs.pathCore + '/**/*.html' );
let targetTempFilesName = [];
let targetAllTempFilesName = [];

let tempPagesArrays = [
  tempPagesES5,
  tempPagesES6
];
let tempAllPages = [].concat(...tempPagesArrays);


tempAllPages.map( ( event ) => {
	let filename = event.split( '/' ).pop();
	
	targetAllTempFilesName.push( [ event, event.split( '/' ).pop() ] );
	
	if ( filename.indexOf( 'include-' ) < 0 ) {
		targetTempFilesName.push( [ event, event.split( '/' ).pop() ] );
	}
	
});


// Get all the js component files with ES5
// Third-party plugins adopt pure file merger and do not import and export
let pureMergeJSDependenciesFile = globs.pathThirdPartyPlugins + '/_plugins-Miscellaneous/js/_dependencies.js';
let targetJSComFilesName = '';
let JSComFiles = globs.pathThirdPartyPlugins + '/_app-load.js';
if ( fs.existsSync( JSComFiles ) ) {

	let content = fs.readFileSync( JSComFiles );
	let curCon  = content
						.toString()
	                    .replace(/\/\/(.*)$/gm, '' )
						.replace(/\'/g, '"' )
						.replace(/\s/g, '' )
						.replace(/[\r\n]/g, '' )
						.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '' );


	let filesJSON = curCon.match(/UIXKIT_3RD_PARTY_PLUGINS_IMPORT\=\{.*?(?:\}|\})/gi );
	filesJSON = filesJSON[0].replace( 'UIXKIT_3RD_PARTY_PLUGINS_IMPORT=', '' );
	filesJSON = JSON.parse( filesJSON );

	targetJSComFilesName = filesJSON.files;	


}


let targetFilesNameArrays = [
  targetAllTempFilesName,
  targetJSComFilesName
];
let targetAllWatchFilesName = [].concat(...targetFilesNameArrays);




// String replacement for page templates
class ReplacePlaceholderForFile {
	constructor( options ) {
		this.options = options;
	}
	apply( compiler ) {
		compiler.hooks.done.tap('ReplacePlaceholderForFile', ( stats ) => {
			
			const filepath = this.options.filepath;
			
			// When the Node module is running, this plugin may be executed 
			// at the same time, which will result in incomplete content reading.
			/*
			@Other method:
			
			try {  
				let data = fs.readFileSync('file.html', 'utf8');
				console.log(data);    
			} catch(e) {
				console.log('Error:', e.stack);
			}
			*/
			fs.readFile( filepath, 'utf8', function(err, data ){

				if ( err ) {
					console.log(colors.fg.Red, err, colors.Reset);
				} else {
					
					
					if ( data.length > 0 && data.indexOf( '</html>' ) >= 0 ) {
						data = data.replace(/\@\@\{website_title\}/g, customWebsiteTitle )
									.replace(/\@\@\{website_desc\}/g, customWebsiteDesc )
									.replace(/\@\@\{website_author\}/g, customWebsiteAuthor )
									.replace(/\@\@\{website_generator\}/g, customWebsiteGenerator )
									.replace(/\@\@\{website_version\}/g, customWebsiteVersion )
									.replace(/\@\@\{website_comment\}/g, customWebsiteComment )
									.replace(/\@\@\{website_hash\}/g, customWebsiteHash )
									.replace(/\@\@\{website_charset\}/g, charset )
									.replace(/\@\@\{website_lang\}/g, lang )
									.replace(/\@\@\{website_dirLTR\}/g, dirLTR )
									.replace(/\@\@\{website_dirRTL\}/g, dirRTL );

						fs.writeFile( filepath, data, (err) => {
							if ( err ) {
								console.log(colors.fg.Red, err, colors.Reset);
								return;
							}
							//file written successfully
							//console.log(colors.fg.Green, `${filepath} written successfully!`, colors.Reset);

						});		
					}


				}


			}); //end fs.readFile

		});
	}
}


/*! 
 *************************************
 *  Main configuration
 *************************************
 */
const webpackConfig = {
	devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : false,
    performance: {
        hints: process.env.NODE_ENV === 'production' ? "warning" : false
    },
    mode: 'production',
	watch: true,
	node: { fs: 'empty' },
    resolve: {
        extensions: ['.js', '.es6', '.vue', '.jsx' ],
		alias: {
			
			// Uix Kit specific mappings.
			'@uixkit/core': path.resolve(__dirname, globs.pathCore ),
			'@uixkit/3rd-party-plugins': path.resolve(__dirname, globs.pathThirdPartyPlugins ),
		}
    },
	
	//Exclude react from bundle
//    externals: {
//      'react': 'React',
//		'react-dom': 'ReactDOM',
//	    'jquery': 'jQuery',
//    },
	
	entry: {
		'uix-kit': './'+globs.build+'/index.js',
		'uix-kit.min': './'+globs.build+'/index.js',
		'uix-kit-rtl': './'+globs.build+'/index-rtl.js',
		'uix-kit-rtl.min': './'+globs.build+'/index-rtl.js',
	},
    output: {
        path: path.resolve(__dirname, './' + globs.dist + '/js' ),
        filename: '[name].js'
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
				filename: '../css/[name].css'
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
						loader: MiniCssExtractPlugin.loader
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

// Remove include files and extra CSS files
webpackConfig.plugins.push(
    new CleanWebpackPlugin([
		globs.build + '/**/*.css',
		globs.examples + '/*.html',
		
	])
);

// Adds a banner to the top of each generated chunk.
webpackConfig.plugins.push(
    new webpack.BannerPlugin( customWebsiteComment )
);


// Batch processing HTML template files
targetTempFilesName.map( ( event ) => {
	
	webpackConfig.plugins.push(
		new IncludeFileWebpackPlugin({
			directory: '',
			input: `${event[0]}`,
			output: `./${globs.examples}/${event[1]}`,
			processIncludeContents: function(html) {
				return html;
			}
		})
	);
});

// String replacement for page templates
targetTempFilesName.map( ( event ) => {
	
	webpackConfig.plugins.push(
		new ReplacePlaceholderForFile({
			filepath: `./${globs.examples}/${event[1]}`
		})
	);

});



// Add .min.css files souce map
webpackConfig.plugins.push(
	new webpack.SourceMapDevToolPlugin({
	  filename: '../css/[name].css.map',
	})
);


// Merge all js files
// This file is used for the mergence of JS script files that do 
// not require ES6 compilation.
webpackConfig.plugins.push(
	
	new ConcatPlugin({
		uglify: false,
		sourceMap: true,
		name: 'result',
		outputPath: '',
		fileName: globs.concatES5_JSFile,
		filesToConcat: targetJSComFilesName,
		attributes: {
			async: true
		}
	})
);


// Create vendor.js from all third-party generic script library

//webpackConfig.plugins.push(
//	
//	new ConcatPlugin({
//		uglify: false,
//		sourceMap: false,
//		name: 'result',
//		outputPath: '',
//		fileName: 'vendor.js',
//		filesToConcat: [
//			'./vendor/files/jquery.easing.min.js',
//			'./vendor/files/jquery.waitforimages.min.js',
//			'./vendor/files/video.min.js',
//			'./vendor/files/jquery.waypoints.min.js',
//			'./vendor/files/template7.min.js',
//			'./vendor/files/TweenMax.min.js',
//			'./vendor/files/pixi.min.js',
//			'./vendor/files/three.min.js',
//			'./vendor/files/anime.min.js',
//			'./vendor/files/hammer.min.js',
//			'./vendor/files/muuri.min.js',
//		],
//		attributes: {
//			async: true
//		}
//	})
//);



/*! 
 *************************************
 * Hook our plugins to fix webpack dev server is 
 * not serving the latest compiled code
 *************************************
 */
const compiler = webpack( webpackConfig );
const app = express();
const instance = webpackDevMiddleware( compiler );
app.use( instance );

//Provides a way to customize how progress is reported during a compilation.
new webpack.ProgressPlugin().apply(compiler);


//Watch for Files Changes in Node.js
require('log-timestamp');

targetAllWatchFilesName.map( ( event ) => {
	
	let curFile = `${event[0]}`;

	fs.watchFile( curFile, (curr, prev) => {
		
		console.log(colors.fg.Yellow, `${curFile} file Changed`, colors.Reset);
		
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

				new ReplacePlaceholderForFile({
					filepath: `./${globs.examples}/${event[1]}`
				})
				
			);

		

		});

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
	    return console.log(colors.fg.Red, err, colors.Reset);
	}


	console.log(colors.fg.Yellow, 'Listening at http://localhost:8080/', colors.Reset);
})



/*! 
 *************************************
 * Process of processing files after compilation
 * 
 * Step 1 => read pureMergeJSFile
 * Step 2 => read targetJSFile
 * Step 3 => write targetJSFile
 * Step 4 => compress targetJSFile
 * Step 5 => read all core css and js files and build a table of contents (TOC)
 *************************************
 */
const compilerDelayTimePer = 50; //The time it takes to load each js (ms)
let compilerCoreFiles = 0;


//Calculate the number of JSs of imported modules
compilerCoreFiles = compilerCoreFiles + targetJSComFilesName.length;

//
const compilerCoreJSsFile = globs.pathCore + '/_app-load.js';
if ( fs.existsSync( compilerCoreJSsFile ) ) {
    fs.readFile( compilerCoreJSsFile, 'utf8', function( err, content ) {
        if ( err ) throw err;
        let curCon  = content.toString();
        let strCount = (curCon.match(/import\s/g) || []).length;
        
        compilerCoreFiles = compilerCoreFiles + strCount;
        
        const compilerDelayTimeTotal = compilerCoreFiles * compilerDelayTimePer; //The time it takes to load all js (ms)

        //---
        console.log(colors.fg.Yellow, `----------------------------------------------`, colors.Reset);
        console.log(colors.fg.Yellow, `The time to wait for all module JS files to be processed: ${compilerDelayTimeTotal/1000}s`, colors.Reset);

        compiler.hooks.done.tap( 'MyPlugin', ( compilation ) => {


            let pureMergeJSFile              = './'+globs.dist+'/js/' + globs.concatES5_JSFile,
                targetJSFile                 = './'+globs.dist+'/js/uix-kit.js',
                targetJSMinFile              = './'+globs.dist+'/js/uix-kit.min.js';


            setTimeout ( () => {



                let oldContent = '';
                let pureMergeJSDependenciesFileData = '';
                let buildingFileTotal = 5;




                // Determine if the rtl file exists
                //---------------------------------------------------------------------
                if ( ! fs.existsSync( './'+globs.dist+'/css/uix-kit-rtl.css' ) ) {
                    buildingFileTotal = 4;
                }

                // Step 1 => read pureMergeJSFile
                //---------------------------------------------------------------------
                if ( fs.existsSync( pureMergeJSFile ) ) {

                    fs.readFile( pureMergeJSFile, 'utf8', function(err, data ){

                        if (err) throw err;

                        oldContent = data;


                        //get pureMergeJSDependenciesFile content
                        if ( fs.existsSync( pureMergeJSDependenciesFile ) ) {
                            fs.readFile( pureMergeJSDependenciesFile, 'utf8', function( err, content ) {
                                if ( ! err ) {
                                    pureMergeJSDependenciesFileData = content;


                                    // Step 2 => read targetJSFile
                                    //---------------------------------------------------------------------
                                    //Prevent JS from adding code repeatedly
                                    //Check if the uix-kit.concat.es5.3rd-party-plugins.js file has been 
                                    //merged into the uix-kit.js file?
                                    fs.readFile( targetJSFile, 'utf8', function(err, data ){


                                        if (err) throw err;

                                        //Add string on top file with NodeJS
                                        //Fixed a bug that Cannot read property 'fn' of undefined for jQuery 1.xx.x.

                                        let resultData;
                                        if ( data.indexOf( pureMergeJSDependenciesFileData ) >= 0 ) {
                                            resultData = data;
                                        } else {
                                            data = data.toString().split("\n");
                                            let customWebsiteCommentArr = customWebsiteComment.toString().split("\n");

                                            data.splice(customWebsiteCommentArr.length + 2, 0, pureMergeJSDependenciesFileData );
                                            resultData = data.join("\n");	
                                        }



                                        if ( data.indexOf( 'sourceMappingURL='+globs.concatES5_JSFile+'.map' ) < 0 ) {

                                            resultData = resultData + oldContent;

                                            let compressedresultData = UglifyJS.minify( resultData, { warnings: true } );

                                            if ( typeof compressedresultData.code != typeof undefined && oldContent.length > 0 ) {


                                                // Step 3 => write targetJSFile
                                                //---------------------------------------------------------------------
                                                fs.writeFile( targetJSFile, resultData, 'utf8', function (err) {

                                                    if ( err ) {
                                                        console.log(colors.fg.Red, err, colors.Reset);
                                                        return;
                                                    }

                                                    //file written successfully	
                                                    console.log(colors.fg.Green, `${targetJSFile} created successfully! (1/${buildingFileTotal})`, colors.Reset);



                                                    // Step 4 => compress targetJSFile
                                                    //---------------------------------------------------------------------	
                                                    fs.writeFile( targetJSMinFile, compressedresultData.code, 'utf8', function (err) {

                                                        if ( err ) {
                                                            console.log(colors.fg.Red, err, colors.Reset);
                                                            return;
                                                        }

                                                        //file written successfully	
                                                        console.log(colors.fg.Green, `${targetJSMinFile} created successfully! (2/${buildingFileTotal})`, colors.Reset);


                                                        // Step 5 => read all core css and js files and build a table of contents
                                                        //---------------------------------------------------------------------
                                                        // Build a table of contents (TOC)
                                                        let tocBuildedIndex = 3;
                                                        ['./'+globs.dist+'/css/uix-kit.css', './'+globs.dist+'/css/uix-kit-rtl.css', targetJSFile ].map( ( filepath ) => {

                                                            if ( fs.existsSync( filepath ) ) {

                                                                fs.readFile( filepath, 'utf8', function( err, content ) {

                                                                    if ( err ) throw err;

                                                                    let curCon  = content.toString(),
                                                                        newtext = curCon.match(/<\!\-\-.*?(?:>|\-\-\/>)/gi );


                                                                    //is the matched group if found
                                                                    if ( newtext && newtext.length > 1 ) {  

                                                                        let curToc = '';

                                                                        for ( let p = 0; p < newtext.length; p++ ) {

                                                                            let curIndex = p + 1,
                                                                                newStr   = newtext[ p ].replace( '<!--', '' ).replace( '-->', '' ).replace(/^\s+|\s+$/g, '' );

                                                                            if ( p > 0 ) {
                                                                                curToc += '    ' + curIndex + '.' + newStr + '\n';
                                                                            } else {
                                                                                curToc +=  curIndex + '.' + newStr + '\n';
                                                                            }

                                                                        }

                                                                        //Replace a string in a file with nodejs
                                                                        let resultData = curCon.replace(/\$\{\{TOC\}\}/gi, curToc );

                                                                        fs.writeFile( filepath, resultData, 'utf8', function (err) {

                                                                            if ( err ) {
                                                                                console.log(colors.fg.Red, err, colors.Reset);
                                                                                return;
                                                                            }
                                                                            //file written successfully	
                                                                            console.log(colors.fg.Green, `${filepath}'s table of contents generated successfully! (${tocBuildedIndex}/${buildingFileTotal})`, colors.Reset);

                                                                            tocBuildedIndex++;


                                                                        });


                                                                    }


                                                                });// fs.readFile( filepath ...


                                                            }//endif fs.existsSync( filepath ) 


                                                        });	//.map( ( filepath )...



                                                    });// fs.writeFile( targetJSMinFile ...




                                                });// fs.writeFile( targetJSFile ...



                                            } else {
                                                return console.log(colors.bg.Red, colors.fg.White, `===[ ERROR: ${compressedresultData.error} ]===File update failed! Please wait 10 seconds to rebuild.`, colors.Reset);
                                            }




                                         }// endif data.indexOf( 'sourceMappingURL='+globs.concatES5_JSFile+'.map' )

                                    }); //fs.readFile( targetJSFile ...



                                }

                            });// fs.readFile( pureMergeJSDependenciesFile ...
                        }//endif fs.existsSync( pureMergeJSDependenciesFile ) 



                    });// fs.readFile( pureMergeJSFile


                }// endif fs.existsSync( pureMergeJSFile )



            //The more modules, the longer the time, the default 5500ms 
            //can guarantee the time-consuming compilation of 150 modules.
            }, compilerDelayTimeTotal );


        });
  
        
        
    });

}

				
									
									
/*! 
 *************************************
 *  Exporting webpack module
 *************************************
 */
module.exports = webpackConfig;


