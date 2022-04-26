const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader');

const trueFalse = require('./manifest.json');

module.exports = (env, options) => ({
  devtool: 'source-map',
  optimization: {
    minimize: process.env.NODE_ENV == 'production',
    minimizer: [new ESBuildMinifyPlugin({ css: true })],
  },
  entry: {
    [trueFalse.id + '_authoring']: './src/tf/authoring.ts',
    [trueFalse.id + '_delivery']: './src/tf/delivery.ts',
  },
  output: {
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.ts', '.scss', '.css', '.ttf'],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              loader: 'tsx',
            },
          },
        ],
      },
      {
        test: /\.(png|gif|jpg|jpeg|svg)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '../css/[name].css' })
  ],
});
