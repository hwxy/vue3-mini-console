import { createApp, Component } from "vue";
// plugin
import "@/plugins/antd.ts";
// scss
import "assets/style/common/index.scss";
// utils
import findParent from "common/utils/findParent";
// comp
import { Modal, message, notification } from "ant-design-vue";
// 异常监控
import * as Sentry from "@sentry/browser";
import { Vue as VueIntegration } from "@sentry/integrations";
import { Integrations } from "@sentry/tracing";
// const
import { isDev } from "common/const/main";

// 全局func
const install = function(app: any) {
  app.config.globalProperties.$message = message;
  app.config.globalProperties.$notification = notification;
  app.config.globalProperties.$info = Modal.info;
  app.config.globalProperties.$success = Modal.success;
  app.config.globalProperties.$error = Modal.error;
  app.config.globalProperties.$warning = Modal.warning;
  app.config.globalProperties.$confirm = Modal.confirm;
  app.config.globalProperties.$destroyAll = Modal.destroyAll;
};

interface Config {
  router?: any;
  store?: any;
  useInstall?: boolean;
  App: Component;
}

export default (config: Config) => {
  let app = createApp(config.App);
  if (config.router) {
    app = app.use(config.router);
  }

  if (config.store) {
    app = app.use(config.store);
  }

  if (config.useInstall) {
    app = app.use(install);
  }

  // 前端异常监控
  if (!isDev) {
    Sentry.init({
      dsn:
        "https://49169fee443b45bc983fd071369a37d1@o470385.ingest.sentry.io/5500911",
      integrations: [
        new VueIntegration({
          Vue: app as any,
          tracing: true
        }),
        new Integrations.BrowserTracing()
      ],
      tracesSampleRate: 1.0
    });
  }

  // 错误信息处理
  // app.config.errorHandler = (err, vm, info) => {
  //   // 处理错误
  //   // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  // };
  // 全局注入
  app.config.globalProperties.$message = message;
  app.config.globalProperties.$notification = notification;
  app.config.globalProperties.$info = Modal.info;
  app.config.globalProperties.$success = Modal.success;
  app.config.globalProperties.$error = Modal.error;
  app.config.globalProperties.$warning = Modal.warning;
  app.config.globalProperties.$confirm = Modal.confirm;
  app.config.globalProperties.$destroyAll = Modal.destroyAll;
  app.config.globalProperties.$findParent = findParent;

  app.mount("#app");

  return app;
};
