import router from "@/router";
import { RouteLocationRaw } from "vue-router";
export const jumpToPush = (config: RouteLocationRaw) => {
  router.push(config);
};

export const jumpToBack = () => {
  router.back();
};

export default {};
