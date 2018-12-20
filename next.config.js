const withCss = require('@zeit/next-css')
const withPlugins = require('next-compose-plugins')

require('dotenv').config()

const css = withCss({
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/i,
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192,
          publicPath: './',
          outputPath: 'static/css/',
          name: '[name].[ext]'
        }
      }
    })

    return config
  }
})

module.exports = withPlugins([css], {
  publicRuntimeConfig: {
    // Will be available on both server and client
    AWS_BUCKET: process.env.AWS_BUCKET,
    AWS_REGION: process.env.AWS_REGION,
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID
  }
})
