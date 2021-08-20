// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");

const resolve = (dir = "") => path.join(__dirname, "./src", dir);

module.exports = {
  devServer: {
    host: "0.0.0.0",
    port: "4200",
    hot: true
  },
  pages: {
    login: {
      // page 的入口
      entry: "src/entry/login/main.ts",
      // 模板来源
      // template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "template/login/index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "登录",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "login"]
    },
    manage: {
      // page 的入口
      entry: "src/entry/manage/main.ts",
      // 模板来源
      // template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "template/manage/index.html",
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: "管理",
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ["chunk-vendors", "chunk-common", "manage"]
    }
  },
  chainWebpack: webpackConfig => {
    // 修复HMR
    webpackConfig.resolve.symlinks(true);
    // vueLoaderIgnore(webpackConfig);
    // pages.forEach(page => {
    //   webpackConfig.plugins.delete(`prefetch-${page}`);
    //   webpackConfig.plugins.delete(`preload-${page}`);
    // });
    // webpackConfig.plugin('provide').use(webpack.ProvidePlugin, [
    //   {
    //     Vue: ['vue/dist/vue.runtime.esm.js', 'default']
    //   }
    // ]);
    // webpackConfig.plugin('define').tap(args => {
    //   Object.assign(args[0]['process.env'], customEnv);
    //   return args;
    // });
  },
  configureWebpack: () => {
    const config = {
      // devtool: 'source-map',
      resolve: {
        alias: {
          common: resolve("common"),
          assets: resolve("assets")
        }
      },
      plugins: [
        // new CopyPlugin([
        //   {
        //     from: "/Users/xiongxiong/项目/hu/mini-console/public",
        //     to: "/Users/xiongxiong/项目/hu/mini-console/dist",
        //   }
        // ])
      ]
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
    loaderOptions: {
      sass: {
        additionalData:
          '@import "@/assets/style/_var.scss";@import "@/assets/style/_mixin.scss";'
      }
    }
  }
};
