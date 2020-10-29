import { createApp } from "vue";
// app
import App from "./App.vue";
// router
import router from "./router";
// data
import store from "./store";
// plugin
import "./plugins/antd.ts";
// scss
import "assets/style/common/index.scss";

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
