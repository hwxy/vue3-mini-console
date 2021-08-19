import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
// util
import asyncLoading from "common/utils/asyncLoading";

const routers = require.context("./", true, /\.ts$/);

export default (path: string) => {
  let configRouters: RouteRecordRaw[] = [];
  routers.keys().forEach(key => {
    if (key === "./index.ts" || !routers(key).default || !key.includes(path))
      return;
    const newComp = routers(key).default;
    newComp.component = asyncLoading(newComp.component);
    configRouters = configRouters.concat(routers(key).default);
  });

  const router = createRouter({
    history: createWebHashHistory(),
    routes: configRouters
  });

  return router;
};
