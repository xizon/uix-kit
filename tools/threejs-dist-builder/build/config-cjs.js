const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');


module.exports = {
    resolve: {
        fallback: {
            fs: false
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.sass']
    },

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                test: /\.min\.js$/,
                terserOptions: {
                    compress: {
                        drop_console: true,
                        drop_debugger: true
                    },
                    output: {
                        comments: false
                    }
                }
            })
        ]
    },

    //Exclude react from bundle
    externals: {
        'react': {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react',
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom',
        },
    },

    entry: {
        'three': './src/175/three.module.js',
        'three.min': './src/175/three.module.js'
    },

    output: {
        globalObject: 'this',
        library: "THREE",
        libraryTarget: "umd",
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist')
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, '../node_modules'),
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
				exclude: path.resolve(__dirname, '../node_modules'),
				use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
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
			}


        ],



    },
    //devtool: 'source-map',
};

