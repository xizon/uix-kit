'use strict';

const webpack                    = require('webpack');
const express                    = require('express');
const fs                         = require('fs');
const path                       = require('path');
const TerserPlugin               = require("terser-webpack-plugin");
const MiniCssExtractPlugin       = require('mini-css-extract-plugin');
const CssMinimizerPlugin         = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin }     = require('clean-webpack-plugin');
const glob                       = require('glob');
const randomString               = require('random-string');
const IncludeFileWebpackPlugin   = require('include-file-webpack-plugin');
const moment                     = require('moment');
const json                       = JSON.parse(fs.readFileSync('./package.json'));
const webpackDevMiddleware       = require('webpack-dev-middleware');
const WebpackConcatPlugin        = require('webpack-concat-files-plugin');

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
	pathCore              : './src/components',
	pathThirdPartyPlugins : './src/components/_third-party-plugins',
};


/*! 
 *************************************
 * Site Info
 *************************************
 */
const charset                  = 'utf-8';
const lang                     = 'en-US';
const dirLTR                   = 'ltr';
const dirRTL                   = 'rtl';
const customWebsiteVersion     = json.version,
	  customWebsiteAuthor      = ( Object.prototype.toString.call( json.author ) == '[object Object]' ) ? json.author.name : json.author,
	  customWebsiteTitle       = json.projectName,
	  customWebsiteDesc        = json.description,
	  customWebsiteGenerator   = 'Uix Kit',
	  customWebsiteHash        = randomString({length: 20}),
	  customWebsiteComment     = `
DO NOT OVERRIDE THIS FILE.
Generated with "npm run build"

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
const tempPagesES6 = glob.sync( globs.pathCore + '/**/*.html' );
const targetTempFilesName = [];
const targetAllTempFilesName = [];

const tempPagesArrays = [
  tempPagesES6
];
const tempAllPages = [].concat(...tempPagesArrays);


tempAllPages.map( ( event ) => {
	const filename = event.split( '/' ).pop();
	
	targetAllTempFilesName.push( [ event, event.split( '/' ).pop() ] );
	
	if ( filename.indexOf( 'include-' ) < 0 ) {
		targetTempFilesName.push( [ event, event.split( '/' ).pop() ] );
	}
	
});


// Return to the HTML template file that will be watched
const targetFilesNameArrays = [
  targetAllTempFilesName
];
const targetAllWatchFilesName = [].concat(...targetFilesNameArrays);


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
 *  Run command after webpack build
 *************************************
 */
	
 class MyPluginCompiledFunction {
	// Define `apply` as its prototype method which is supplied with compiler as its argument
	apply(compiler) {
		// Specify the event hook to attach to
		compiler.hooks.done.tap('MyPluginCompiledFunction', (compilation) => {

			const coreJSsFile = globs.pathCore + '/_app-load.js';
			if ( fs.existsSync( coreJSsFile ) ) {
				fs.readFile( coreJSsFile, 'utf8', function( err, content ) {
					if ( err ) throw err;
			
					//---
					console.log(colors.fg.Yellow, `----------------------------------------------`, colors.Reset);
			
					const targetJSFile = './'+globs.dist+'/js/uix-kit.js';
		
					//
					const tocBuildedFiles = [
						'./'+globs.dist+'/css/uix-kit.css', 
						'./'+globs.dist+'/css/uix-kit-rtl.css', 
						targetJSFile 
					];

					const tocBuildedTotal = tocBuildedFiles.length;
					let tocBuildedIndex = 1;
					
					// Read all core css and js files and build a table of contents
					//---------------------------------------------------------------------
					// Build a table of contents (TOC)
					tocBuildedFiles.forEach( ( filepath ) => {
		
						if ( fs.existsSync( filepath ) ) {
		
							fs.readFile( filepath, 'utf8', function( err, content ) {
		
								if ( err ) throw err;
		
								
								const curCon  = content.toString(),
										newtext = curCon.match(/<\!\-\-.*?(?:>|\-\-\/>)/gi );
		
								
		
								//is the matched group if found
								if ( newtext && newtext.length > 0 ) {  
		
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
									const resultData = curCon.replace(/\$\{\{TOC\}\}/gi, curToc );
		
									fs.writeFile( filepath, resultData, 'utf8', function (err) {
		
										if ( err ) {
											console.log(colors.fg.Red, err, colors.Reset);
											return;
										}
										//file written successfully	
										console.log(colors.fg.Green, `${filepath}'s table of contents generated successfully! (${tocBuildedIndex}/${tocBuildedTotal})`, colors.Reset);
		
										tocBuildedIndex++;
		
		
									});
		
		
								}
		
		
							});// fs.readFile( filepath ...
		
		
						}//endif fs.existsSync( filepath ) 
		
		
					});	//.map( ( filepath )...
					
					
				});
			
			}

			
		});
	}
}
  


/*! 
 *************************************
 *  Main configuration
 *************************************
 */
const devMode = process.env.NODE_ENV !== 'production';
const webpackConfig = {
	devtool: devMode ? 'source-map' : false,
    performance: {
        hints: !devMode ? "warning" : false
    },
    watch: true,
    mode: 'production',
    resolve: {
		fallback: {
			fs: false
		},
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.sass'],
		alias: {
			
			// specific mappings.
			// Supports directories and custom aliases for specific files when the express server is running, 
			// you need to configure the following files at the same time:
			// 1) `babel.config.js`    --> "plugins": [["module-resolver", {"alias": {...}} ]]
			//  2) `tsconfig.json`      --> "compilerOptions": { "paths": {...} }
			//  3) `package.json`       --> "jest": { "moduleNameMapper": {...} }
			
			'@uixkit/core': path.resolve(__dirname, globs.pathCore ),
			'@uixkit/plugins': path.resolve(__dirname, globs.pathThirdPartyPlugins ),
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
		minimize: true,
	    minimizer: [

			new TerserPlugin({
				test: /\.min\.js$/i
			}),
			
			new MiniCssExtractPlugin({
				// Options similar to the same options in webpackOptions.output
				// both options are optional
				filename: '../css/[name].css'
			}),

            new CssMinimizerPlugin({
                test: /\.min\.css$/i,
                parallel: true,
                minimizerOptions: {
                    preset: [
                        "default",
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                },
            }),
	
	
		],
		
	},
    module: {
        rules: [
            {
                test: /\.(glsl|vs|fs|vert|frag)$/,
                exclude: path.resolve(__dirname, './node_modules'),
                use: [
                    'raw-loader',
                    'glslify-loader'
                ]
            },
			{
                test: /\.json$/,
                exclude: path.resolve(__dirname, './node_modules'),
                loader: "json-loader"       
            },
            {
				test: /\.(js|jsx|ts|tsx)$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, './node_modules' ),
                options: {  
				  'presets': [
					  '@babel/preset-env',
					  '@babel/preset-react',
					  '@babel/preset-typescript',
					  {
						plugins: [
						  '@babel/plugin-proposal-class-properties'
						]
					  }	
				  ]
                }
			},
			{
				
				test: /\.(sa|sc|c)ss$/,
				include: path.resolve( __dirname, './' + globs.build ),
				use: [
					/**
					 * Note:
					 * You can use `style-loader` to inject CSS into the DOM to generate a final js file
					 */
					{
						loader: MiniCssExtractPlugin.loader, //Extracts CSS into separate files  ( Step 3 )
						options: {
							// you can specify a publicPath here
							// by default it use publicPath in webpackOptions.output
							publicPath: `../../${globs.dist}/js/`

						}
					},

					{
						loader: "css-loader",  // interprets @import and url() and will resolve them. ( Step 2 )
						options: {
							sourceMap: true
						}
					},
					{
                        loader: 'sass-loader', // compiles Sass to CSS ( Step 1 )
                        options: {
                            implementation: require("sass"),
                            sourceMap: true,
                            /* (nested | expanded | compact | compressed) */
                            sassOptions: {
                                outputStyle: 'expanded',
                            },

                        }

					},
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
			
			// Compatible with webpack 5.76.0+
			{
				test: /\.(png|jpe?g|gif|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
			   loader: 'file-loader', 
			   options: {
				 esModule: false, //change the css path via output
				 outputPath: (url, resourcePath, context) => { //the files from `./src/...` will copy to `./dist/`
					 
					//original name: path.basename(resourcePath)
					
					//fonts
					if ( resourcePath.indexOf( 'webfonts/' ) >= 0 || resourcePath.indexOf( 'fonts/' ) >= 0 ) {
						return '../fonts/' + url;
					}
					 
					//imags
					if ( resourcePath.indexOf( 'images/' ) >= 0 || resourcePath.indexOf( 'img/' ) >= 0 ) {
						return '../images/' + url;
					} 
					 
						
					return '../misc/' + url;
				   
				 },
				 publicPath: (url, resourcePath, context) => { //the css path of output 

					// If the file is in the root directory, you can leave it empty. If in another directory, 
					// you can write: "/blog". (but no trailing slash)
					const websiteRootDir = '';
					
					//fonts
					if ( resourcePath.indexOf( 'webfonts/' ) >= 0 || resourcePath.indexOf( 'fonts/' ) >= 0 ) {
						return `${websiteRootDir}/${globs.dist}/fonts/${url}`;
					}
				   
					//imags
					if ( resourcePath.indexOf( 'images/' ) >= 0 || resourcePath.indexOf( 'img/' ) >= 0 ) {
						return `${websiteRootDir}/${globs.dist}/images/${url}`;
					} 
					 
						
					return `${websiteRootDir}/${globs.dist}/misc/${url}`;
					 
				   
				 }
			   }
		   }


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
		new MyPluginCompiledFunction()
	]
	
	
};

// Remove include files and extra CSS files
webpackConfig.plugins.push(
    new CleanWebpackPlugin({
        // Removes files after every build (including watch mode) that match this pattern.
        cleanAfterEveryBuildPatterns: [
            globs.build + '/**/*.css',
            globs.examples + '/*.html',
        ],
    })
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
		filename: '../js/[file].map'
	})
);



// Create vendor.js from all third-party generic script library

// webpackConfig.plugins.push(

// 	new WebpackConcatPlugin({
// 		bundles: [
// 			{
// 				dest: './' + globs.dist + '/js/vendor.js',
// 				src: [
// 					'./vendor/files/axios.min.js',
// 					'./vendor/files/jquery.waitforimages.min.js',
// 					'./vendor/files/video.min.js',
// 					'./vendor/files/TweenMax.min.js',
// 					'./vendor/files/pixi.min.js',
// 					'./vendor/files/three.min.js',
// 					'./vendor/files/anime.min.js',
// 					'./vendor/files/hammer.min.js',
// 				],
// 			},
// 		],
// 	})
// );



/*! 
 *************************************
 * Hook our plugins to fix webpack dev server is 
 * not serving the latest compiled code
 *************************************
 */
const compiler = webpack( webpackConfig, () => {});
//
const app = express();
const instance = webpackDevMiddleware( compiler );
app.use( instance );
app.use(express.static( './' ));



//Watch for Files Changes in Node.js
require('log-timestamp');

targetAllWatchFilesName.map( ( event ) => {
	
	let curFile = `${event[0]}`;

	fs.watchFile( curFile, (curr, prev) => {
		
		console.log(colors.fg.Yellow, `${curFile} file Changed`, colors.Reset);
		
		// After a short delay the configuration is changed and a banner plugin is added
		// to the config
        new CleanWebpackPlugin({
            // Removes files after every build (including watch mode) that match this pattern.
            cleanAfterEveryBuildPatterns: [
                globs.build + '/**/*.css'
            ],
        }).apply(compiler);

	
		targetTempFilesName.map( ( event ) => {

			new IncludeFileWebpackPlugin({
				directory: '',
				input: `${event[0]}`,
				output: `./${globs.examples}/${event[1]}`,
				processIncludeContents: function(html) {
					return html;
				}
			}).apply(compiler);

			new ReplacePlaceholderForFile({
				filepath: `./${globs.examples}/${event[1]}`
			}).apply(compiler);

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

app.listen(globs.port, () => console.log(`Frontend service listening on port: ${globs.port}, access http://localhost:${globs.port} in the web browser`));


/*
const WebpackDevServer = require('webpack-dev-server');
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
	console.log(colors.fg.Yellow, 'Listening at http://localhost:' + globs.port, colors.Reset);
});
*/


						
/*! 
 *************************************
 *  Exporting webpack module
 *************************************
 */
module.exports = webpackConfig;



