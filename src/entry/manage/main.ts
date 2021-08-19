import appFunc from "../main";
// App
import App from "./App.vue";

// router
import routerFunc from "@/router";
// data
import store from "@/store";

const router = routerFunc("./manage");

export default appFunc({
  router,
  store,
  useInstall: true,
  App
});
