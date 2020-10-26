// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
const resolve = (dir = "") => path.join(__dirname, "./src", dir);

module.exports = {
  // devServer: {
  //   host: '0.0.0.0',
  //   port: '4200',
  //   open: true,
  //   openPage: 'login',
  //   proxy: {
  //     ...pages.reduce((res, page) => {
  //       res[`^${config.baseUrl}${page}$`] = {
  //         target: 'http://localhost:4200/',
  //         pathRewrite: { [page]: `${page}.html` }
  //       };
  //       return res;
  //     }, {}),
  //     '/1.0': {
  //       target: config.apiBase,
  //       changeOrigin: true
  //     }
  //   }
  // },
  // chainWebpack: webpackConfig => {
  //   // 修复HMR
  //   webpackConfig.resolve.symlinks(true);
  //   vueLoaderIgnore(webpackConfig);
  //   pages.forEach(page => {
  //     webpackConfig.plugins.delete(`prefetch-${page}`);
  //     webpackConfig.plugins.delete(`preload-${page}`);
  //   });
  //   webpackConfig.plugin('provide').use(webpack.ProvidePlugin, [
  //     {
  //       Vue: ['vue/dist/vue.runtime.esm.js', 'default']
  //     }
  //   ]);
  //   webpackConfig.plugin('define').tap(args => {
  //     Object.assign(args[0]['process.env'], customEnv);
  //     return args;
  //   });
  // },
  configureWebpack: () => {
    const config = {
      // devtool: 'source-map',
      resolve: {
        alias: {
          common: resolve("common"),
          assets: resolve("assets")
        }
      }
      // optimization: {
      //   runtimeChunk: {
      //     name: entrypoint => `runtime~${entrypoint.name}`
      //   },
      //   splitChunks: {
      //     minChunks: 2,
      //     minSize: 20000,
      //     maxAsyncRequests: 20,
      //     maxInitialRequests: 30,
      //     name: false,
      //     cacheGroups: {
      //       element: {
      //         name: 'vendors-element-ui', // 单独将 element-ui 拆包
      //         priority: 4,
      //         // test: /[\\/]node_modules[\\/]@leapcloud[\\/]element-ui[\\/]lib[\\/](tree|table|table-column|form|form-item|tabs|tab-pane|date-picker|time-picker)/
      //         test: /[\\/]node_modules[\\/]@leapcloud[\\/]element-ui[\\/]/,
      //         reuseExistingChunk: true
      //       },
      //       tinymce: {
      //         name: 'vendors-tinymce', // 单独将 tinymce 拆包
      //         priority: 3,
      //         test: /[\\/]node_modules[\\/]tinymce[\\/]/,
      //         reuseExistingChunk: true
      //       },
      //       core: {
      //         name: 'vendors-core', // 单独将 core 拆包
      //         priority: 2,
      //         test: /[\\/]src[\\/]core[\\/]/,
      //         reuseExistingChunk: true
      //       },
      //       'won-mixins': {
      //         name: 'vendors-won-mixins', // 单独将 mixins 拆包
      //         priority: 1,
      //         test: /[\\/]src[\\/]won-service[\\/]_mixins[\\/]/,
      //         reuseExistingChunk: true
      //       },
      //       'won-components': {
      //         name: 'vendors-won-components', // 单独将 components 拆包
      //         priority: 0,
      //         test: /[\\/]src[\\/]won-service[\\/]_components[\\/]/,
      //         reuseExistingChunk: true
      //       }
      //     }
      //   }
    };
    return config;
  },
  css: {
    // 是否构建样式地图，false 将提高构建速度
    sourceMap: false,
    extract: { ignoreOrder: true },
    loaderOptions: {
      sass: {
        additionalData:
          '@import "@/assets/style/_var.scss";@import "@/assets/style/_mixin.scss";'
      }
    }
  }
};
