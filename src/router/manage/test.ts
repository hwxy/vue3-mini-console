const config = [
  {
    path: "/test",
    name: "Test",
    meta: {
      keepAlive: true,
      sign: "test"
    },
    component: () =>
      import(/* webpackChunkName: "manage-test" */ "@/pages/manage/test.vue")
  }
];
export default config;
