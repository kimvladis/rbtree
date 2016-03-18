module.exports = {
	entry: {
		javascript: "./src/app.js"
	},
	output: {
		path: __dirname + "/dist",
		filename: "./js/app.js"
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel', // 'babel-loader' is also a legal name to reference
				query: {
					presets: ['es2015']
				}
			}
		]
	}
};