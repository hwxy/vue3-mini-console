const config = {
  path: "/",
  name: "Product",
  component: () =>
    import(/* webpackChunkName: "manage-product" */ "@/manage/product.vue")
};
export default config;
