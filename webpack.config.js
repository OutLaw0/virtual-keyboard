const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

let mode = 'development'
if (process.env.NODE_ENV === 'production') {
    mode = 'production'
}
console.log(mode + ' mode')

module.exports = {
    mode: mode,
    entry: {
        scripts: './src/index.js',

    },
    output: {
        filename: '[name].js', // '[name].[contenthash].js',
        assetModuleFilename: "assets/[name][ext][query]", // "assets/[hash][ext][query]",
        clean: true
    },
    devtool: 'eval-source-map',
    devServer: {
        hot: false, // Включает автоматическую перезагрузку страницы при изменениях
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css' //'[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new ESLintPlugin()
    ],
    module: {
        rules: [{
                test: /\.html$/i,
                loader: 'html-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader, // (mode === 'development') ?  'style-loader' : MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            //options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    "sass-loader",
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource'
            },


            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }


                }
            }

        ]
    },
    /* stats: {
         children: true,
       },*/
};