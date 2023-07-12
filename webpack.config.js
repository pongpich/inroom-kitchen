const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },

      {
        test: /\.json$/,
        loader: 'json-loader'
      },

      {
        test: /\.(css|scss)$/i,
        use: ['style-loader', 'css-loader'],
      },
      
      {
        test: /\.(png|jpg|gif|ico)$/,
        use: {
          loader: 'url-loader'
        }
      },
      
      {
        test: /\.svg$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              encoding: 'utf8',
            },
          },
        ]
      },

      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      },

      {
        test: /\.(mov|mp4)$/,
        use: [
          'file-loader'
        ]
      },

      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },

      // {
      //   test: /locales/,
      //   loader: '@alienfast/i18next-loader'
      // }

    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    })
  ],
  
};