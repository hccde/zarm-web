const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const config = require('./config.base');

config.mode = 'production';
config.output.filename = 'js/[name].[chunkhash:8].js';
config.output.publicPath = './';
config.entry = {
  index: ['./site/index.js'],
};
config.optimization = {
  minimizer: [
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true,
      uglifyOptions: {
        output: {
          comments: false,
        },
      },
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessorPluginOptions: {
        parser: safePostCssParser,
        preset: ['default', { reduceTransforms: false }],
      },
    }),
  ],
};
config.plugins.push(
  // new BundleAnalyzerPlugin({
  //   analyzerMode: 'static',
  // }),
  new MiniCssExtractPlugin({
    filename: 'stylesheet/[name].[contenthash:8].css',
    chunkFilename: 'stylesheet/[id].[contenthash:8].css',
  }),
  new webpack.optimize.SplitChunksPlugin({
    chunks: 'async',
    minSize: 30000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    automaticNameDelimiter: '~',
    name: true,
    // cacheGroups: {
    //   styles: {
    //     name: 'styles',
    //     test: /\.s?css$/,
    //     chunks: 'all',
    //     minChunks: 5,
    //     enforce: true,
    //   },
    // },
  }),
  new webpack.optimize.RuntimeChunkPlugin({
    name: 'manifest',
  }),
);
config.plugins.push(new HtmlWebpackPlugin({
  template: './site/index.html',
  filename: 'index.html',
  chunks: ['manifest', 'index'],
  favicon: './site/favicon.ico',
}));
config.resolve.alias = {
  'zarm-web': process.cwd(),
  '@': path.resolve(__dirname, '../../'),
  '@site': path.resolve(__dirname, '../../site'),
};

module.exports = config;
