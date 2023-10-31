const slsw = require('serverless-webpack')
const nodeExternals = require('webpack-node-externals')
const path = require('path')

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  // Generate sourcemaps for proper error messages
  devtool: 'source-map',
  // Since 'aws-sdk' is not compatible with webpack,
  // we exclude all node dependencies
  externals: [nodeExternals()],
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  optimization: {
    // We no not want to minimize our code.
    minimize: false
  },
  performance: {
    // Turn off size warnings for entry points
    hints: false
  },
  // Run babel on all .js files and skip those in node_modules
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: __dirname,
        exclude: /node_modules/
      }
    ]
  },
  output: {
    libraryTarget: 'commonjs2',
    filename: '[name].cjs',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.*', '.js'],
    alias: {
      __fixtures__: path.resolve(__dirname, 'src/__fixtures__'),
      config: path.resolve(__dirname, 'src/config'),
      controllers: path.resolve(__dirname, 'src/controllers'),
      db: path.resolve(__dirname, 'src/db'),
      middlewares: path.resolve(__dirname, 'src/middlewares'),
      queries: path.resolve(__dirname, 'src/queries'),
      routes: path.resolve(__dirname, 'src/routes'),
      schemas: path.resolve(__dirname, 'src/schemas'),
      services: path.resolve(__dirname, 'src/services'),
      templates: path.resolve(__dirname, 'src/templates'),
      utils: path.resolve(__dirname, 'src/utils'),
      index: path.resolve(__dirname, 'src/index.js'),
      initEvents: path.resolve(__dirname, 'src/initEvents.js')
    }
  },
  optimization: {
    concatenateModules: false
  }
}
