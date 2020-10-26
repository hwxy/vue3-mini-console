import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Product",
    component: () =>
      import(/* webpackChunkName: "product" */ "@/views/product.vue")
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
