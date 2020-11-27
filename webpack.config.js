const env = process.env.NODE_ENV;
const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const getEnvType = () => {
  switch (env) {
    case 'development':
      return 'env.dev';
      break;
    case 'production':
      return 'env.myhyundai_dev_aperto_systems';
      break;
    default:
      return 'env';
  }
};

module.exports = {
  // webpack will take the files from ./src/index
  entry: path.resolve(__dirname, 'src/index'),
  // and output it into /dist as bundle.js
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  module: {
    rules: [
      // exports HTML as string. HTML is minimized after triggering run build
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      // we use babel-loader to load our jsx and tsx files
      {
        test: /\.(js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: ['./src/styles/Colors.scss']
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // it makes sure that in the build folder there is a single main.js file
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[name].build.css'
    }),
    new Dotenv({
      path: `./env/.${getEnvType()}`
    })
  ],
  devServer: {
    historyApiFallback: true
  },
  performance: {
    hints: false
  },
  devtool: 'inline-source-map'
};
