// const path = require('path');
// const webpack = require('webpack');
// const cpus = require('os').cpus().length;
// // const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

// const resolve = (dir = '') => path.join(__dirname, './src', dir);

// const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
// const IS_DEV = ['development', 'dev'].includes(process.env.NODE_ENV);
// // const IS_ANALYSIS = false;

// const env = process.env.ENV || 'dev';
// const config = require('./config')[env];

// const customEnv = (function() {
//   const result = {};
//   for (const envKey in config.env) {
//     const envVaule = config.env[envKey];
//     const type = typeof envVaule;
//     result[envKey] = ['boolean', 'number'].includes(type)
//       ? envVaule
//       : `"${envVaule}"`;
//   }
//   return result;
// })();

// // 多页面
// let pages = ['login', 'manage', 'ama', 'bigmall', 'signup', 'wizard', 'static'];

// if (IS_DEV) {
//   pages = ['login', 'manage', 'ama', 'bigmall', 'signup', 'wizard', 'static'];
// }

// const vueLoaderIgnore = webpackConfig => {
//   if (!IS_DEV) return;
//   let allPages = [
//     'login',
//     'manage',
//     'bigmall',
//     'ama',
//     'signup',
//     'wizard',
//     'static'
//   ];
//   if (allPages.length == pages.length) return;
//   let exclude = webpackConfig.module.rule('vue').test(/\.vue$/).exclude;
//   allPages.forEach(page => {
//     if (!pages.includes(page)) {
//       exclude.add(resolve(`/views/${page}`));
//     }
//   });
// };

module.exports = {
  // outputDir: config.outputDir,
  // publicPath: config.baseUrl,
  // productionSourceMap: false,
  // lintOnSave: !IS_PROD,
  // pages: pages.reduce((res, page) => {
  //   res[page] = {
  //     entry: `src/${page}`,
  //     filename: `${page}.html`,
  //     template: `public/${page}.html`,
  //     chunks: [`chunk-vendors`, `chunk-common`, `runtime~${page}`, page]
  //   };
  //   return res;
  // }, {}),
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
  // configureWebpack: () => {
  //   const config = {
  //     // devtool: 'source-map',
  //     resolve: {
  //       alias: {
  //         won: resolve('won-service'),
  //         U: resolve('core/utils/functions'),
  //         C: resolve('core/utils/C'),
  //         Bus: resolve('core/utils/Bus'),
  //         core: resolve('core'),
  //         assets: resolve('assets'),
  //         'won-mixins': resolve('won-service/_mixins'),
  //         'won-biz': resolve('won-service/biz'),
  //         'won-comp': resolve('won-service/_components'),
  //         'won-config': resolve('won-service/_config'),
  //         'won-json': resolve('won-service/_json'),
  //         'element-ui': '@leapcloud/element-ui'
  //       }
  //     },
  //     optimization: {
  //       runtimeChunk: {
  //         name: entrypoint => `runtime~${entrypoint.name}`
  //       },
  //       splitChunks: {
  //         minChunks: 2,
  //         minSize: 20000,
  //         maxAsyncRequests: 20,
  //         maxInitialRequests: 30,
  //         name: false,
  //         cacheGroups: {
  //           element: {
  //             name: 'vendors-element-ui', // 单独将 element-ui 拆包
  //             priority: 4,
  //             // test: /[\\/]node_modules[\\/]@leapcloud[\\/]element-ui[\\/]lib[\\/](tree|table|table-column|form|form-item|tabs|tab-pane|date-picker|time-picker)/
  //             test: /[\\/]node_modules[\\/]@leapcloud[\\/]element-ui[\\/]/,
  //             reuseExistingChunk: true
  //           },
  //           tinymce: {
  //             name: 'vendors-tinymce', // 单独将 tinymce 拆包
  //             priority: 3,
  //             test: /[\\/]node_modules[\\/]tinymce[\\/]/,
  //             reuseExistingChunk: true
  //           },
  //           core: {
  //             name: 'vendors-core', // 单独将 core 拆包
  //             priority: 2,
  //             test: /[\\/]src[\\/]core[\\/]/,
  //             reuseExistingChunk: true
  //           },
  //           'won-mixins': {
  //             name: 'vendors-won-mixins', // 单独将 mixins 拆包
  //             priority: 1,
  //             test: /[\\/]src[\\/]won-service[\\/]_mixins[\\/]/,
  //             reuseExistingChunk: true
  //           },
  //           'won-components': {
  //             name: 'vendors-won-components', // 单独将 components 拆包
  //             priority: 0,
  //             test: /[\\/]src[\\/]won-service[\\/]_components[\\/]/,
  //             reuseExistingChunk: true
  //           }
  //         }
  //       }
  //     }
  //   };
  //   // return !IS_ANALYSIS ? config : new SpeedMeasurePlugin().wrap(config);
  //   return config;
  // },
  // css: {
  //   // 是否构建样式地图，false 将提高构建速度
  //   sourceMap: false,
  //   extract: { ignoreOrder: true },
  //   loaderOptions: {
  //     sass: {
  //       data:
  //         '@import "@/assets/style/_var.scss";@import "@/assets/style/_mixin.scss";'
  //     }
  //   }
  // },

  // //https://libin1991.github.io/vue-text-clamp/demo/?lang=zh
  // transpileDependencies: ['vue-clamp', 'resize-detector'],

  // // 构建时开启多进程处理 babel 编译
  // parallel: cpus > 1
};
