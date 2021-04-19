module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  // 使用 elementUI 需导入以下配置
  plugins: [
    [
      "component",
      {
        libraryName: "element-ui",
        styleLibraryName: "theme-chalk"
      }
    ]
  ]
}
