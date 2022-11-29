const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
	mode: 'production',
	entry: './src/index.tsx',
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.(tsx|ts)?$/,
				loader: 'ts-loader',
				exclude: [/node_modules/, /\.(spec.tsx|spec.ts)?$/],
			},
			{
				test: /\.(jsx|js)?$/,
				use: 'babel-loader',
				exclude: [/node_modules/, /\.(spec.jsx|spec.js)?$/],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [autoprefixer(), cssnano()]
							}
						}
					},
					'sass-loader',
				]
			}
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: "[id].css",
		}),
		new HtmlWebpackPlugin({
			title: 'production',
			template: './public/index.html'
		}),
	],
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		plugins: [new TsconfigPathsPlugin({
			extensions: ['.tsx', '.ts', '.js']
		})]
	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()],
	},
}