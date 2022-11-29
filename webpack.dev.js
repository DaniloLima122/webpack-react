const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');


module.exports = {
	mode: 'development',
	entry: './src/index.tsx',
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.(tsx|ts)?$/,
				loader: 'ts-loader',
				exclude: [/node_modules/,/\.(spec.tsx|spec.ts)?$/],
			},
			{
				test: /\.(jsx|js)?$/,
				use: 'babel-loader',
				exclude: [/node_modules/,/\.(spec.jsx|spec.js)?$/],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader',
				]
			}
		],
	},
	devServer: {
		static: path.resolve(__dirname, 'dist'),
		port: 3000
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'development',
			template: './public/index.html'
		}),
		new NodePolyfillPlugin()
	],
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		plugins: [new TsconfigPathsPlugin()]
	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},
}