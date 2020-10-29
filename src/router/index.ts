import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
// util
import asyncLoading from "common/utils/asyncLoading";

let configRouters: RouteRecordRaw[] = [];
const routers = require.context("./", true, /\.ts$/);
routers.keys().forEach(key => {
  if (key === "./index.ts" || !routers(key).default) return;
  const newComp = routers(key).default;
  newComp.component = asyncLoading(newComp.component);
  configRouters = configRouters.concat(routers(key).default);
});

const router = createRouter({
  history: createWebHistory(),
  routes: configRouters
});

export default router;
