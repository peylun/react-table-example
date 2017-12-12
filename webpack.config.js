var webpack = require('webpack');
var path = require('path');
var jshintConfig = require('./jshint.json');

var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'app');

var config = {
	entry: APP_DIR + '/app.js',
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.jsx?/,
			include: APP_DIR,
			loader: 'babel-loader'
		}, { 
			test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
			loader: 'url-loader?limit=10000&mimetype=application/font-woff'
		}, { 
			test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
			loader: 'file-loader'
		}, {
			test: /\.less$/,
			loader: 'style-loader!css-loader!less-loader'
		}]
	}
};

module.exports = config;