'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')
var devConfig
try {
  devConfig = require('./dev-config.js')
} catch (e) { console.log(e) }

if (!devConfig || !devConfig.devServer) {
  console.log('***************未找到dev-config.js，使用默认http://localhost:8081*****************')
} else {
  console.log('***************找到dev-config.js，使用' + devConfig.devServer + '*****************')
}
function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Admin Template' // page title

const port = process.env.port || process.env.npm_config_port || 8080 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  // entry: 'src/main.ts',
  // publicPath:  process.env.NODE_ENV === 'development'? '/front_screen':'.',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    historyApiFallback: true,
    allowedHosts: 'all',
    client: {
      overlay: {
        warnings: false,
        errors: true
      }
    },
    proxy: {
      '/api/*': {
        target: devConfig
          ? devConfig.devServer
          : null || 'http://10.0.10.58:8081/',
        changeOrigin: true,
        secure: false
      }
    }

  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('eval-source-map')
      )

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
