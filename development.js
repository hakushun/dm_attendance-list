import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Dotenv from 'dotenv-webpack';
const CopyPlugin = require('copy-webpack-plugin');

const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
	.BundleAnalyzerPlugin;

export default {
	mode: 'production',
	entry: src + '/client/index.tsx',

	output: {
		path: dist,
		filename: '[name].js',
	},
	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin()],
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		historyApiFallback: true,
		inline: true,
		open: true,
		host: 'localhost',
		port: 8080,
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				secure: false,
				logLevel: 'debug',
				changeOrigin: true,
			},
		},
	},
	module: {
		rules: [
			{
				// 拡張子 .ts もしくは .tsx の場合
				test: /\.tsx?$/,
				exclude: /node_modules/,
				// TypeScript をコンパイルする
				use: [{ loader: 'babel-loader' }, { loader: 'ts-loader' }],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.css/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: { url: false },
					},
				],
			},
		],
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: src + '/client/index.html',
			filename: 'index.html',
		}),
		new BundleAnalyzerPlugin(),
		new Dotenv({ systemvars: true }),
		new CopyPlugin({
			patterns: [
				{ from: src + '/client/PWA' },
				{ from: src + '/client/assets' },
			],
		}),
	],
	node: {
		fs: 'empty',
	},
};
