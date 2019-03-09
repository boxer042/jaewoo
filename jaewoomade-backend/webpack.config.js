const path = require('path');
// eslint-disable-next-line import/no-unresolved
const slsw = require('serverless-webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  resolve: {
    modules: [
      path.resolve('./src'),
      'node_modules',
    ],
  },
  module: {
    loaders: [
      {
        test: /node_modules[/\\]rc/i,
        use: {
          loader: require.resolve('shebang-loader'),
        },
      },
      {
        test: /\.js$/,
        include: __dirname,
        exclude: /node_modules\/(?!(koa-bodyparser)\/).*/,
        loader: 'babel-loader',
        options: {
          plugins: ['transform-object-rest-spread', 'transform-async-to-generator', 'transform-decorators-legacy'],
          presets: [
            'flow',
          ],
        },
      },
    ],
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({ 'global.GENTLY': false }),
  ],
};
