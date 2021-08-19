const config = [
  {
    path: "/product",
    name: "Product",
    meta: {
      keepAlive: true,
      sign: "product"
    },
    component: () =>
      import(
        /* webpackChunkName: "manage-product" */ "@/pages/manage/product/index.vue"
      )
  },
  {
    path: "/productAddEdit/:id?",
    name: "productAddEdit",
    props: true,
    meta: {
      sign: "product"
    },
    component: () =>
      import(
        /* webpackChunkName: "manage-product-edit" */ "@/pages/manage/product/index-add-edit.vue"
      )
  }
];
export default config;
