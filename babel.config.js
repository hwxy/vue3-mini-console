module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    "lodash",
    [
      "import",
      {
        libraryName: "ant-design-vue",
        libraryDirectory: "es",
        style: false
      },
      "ant-design-vue"
    ]
  ]
};
