const config = [
  {
    path: "/",
    name: "Product",
    meta: {
      keepAlive: true,
      sign: "product"
    },
    component: () =>
      import(/* webpackChunkName: "manage-product" */ "@/manage/product.vue")
  },
  {
    path: "/productedit",
    name: "ProductEdit",
    meta: {
      sign: "product"
    },
    component: () =>
      import(
        /* webpackChunkName: "manage-product-edit" */ "@/manage/product-edit.vue"
      )
  }
];
export default config;
